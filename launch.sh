#!/bin/bash
# Tiaohai Global - 一键启动脚本 (VPN加速版)

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 使用项目自带的 Node.js
export NODE_HOME="/Users/frank/Desktop/tiaohai-global/.tools/node"
export PATH="$NODE_HOME/bin:$PATH"
NODE_CMD="$NODE_HOME/bin/node"
NPM_CMD="$NODE_CMD $NODE_HOME/lib/node_modules/npm/bin/npm-cli.js"
NPX_CMD="$NODE_CMD $NODE_HOME/lib/node_modules/npm/bin/npx-cli.js"

# 设置 npm 使用官方源（利用你的 VPN）
export NPM_CONFIG_REGISTRY="https://registry.npmjs.org"

echo -e "${BLUE}🚀 Tiaohai Global - 一键启动${NC}"
echo "========================================"
echo -e "Node.js 版本: ${GREEN}$($NODE_CMD --version)${NC}"
echo -e "npm 版本: ${GREEN}$($NPM_CMD --version)${NC}"
echo ""

# 项目目录
PROJECT_DIR="/Users/frank/Desktop/tiaohai-global"
cd "$PROJECT_DIR"

# 检查 Docker
if ! docker info > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Docker 未启动，正在启动...${NC}"
    open -a Docker
    sleep 8
fi

# 启动基础设施
echo -e "${BLUE}📦 启动基础设施 (PostgreSQL, Redis, Meilisearch)...${NC}"
docker-compose up -d

# 等待数据库就绪
echo -e "${BLUE}⏳ 等待 PostgreSQL 就绪...${NC}"
for i in {1..30}; do
    if docker exec tiaohai-postgres pg_isready -U tiaohai > /dev/null 2>&1; then
        echo -e "${GREEN}✅ 数据库已就绪${NC}"
        break
    fi
    sleep 1
    if [ $i -eq 30 ]; then
        echo -e "${RED}❌ 数据库启动超时${NC}"
        exit 1
    fi
done

# 安装依赖函数
install_deps() {
    local dir=$1
    local name=$2
    if [ ! -d "$dir/node_modules" ] || [ "$(find "$dir/package.json" -prune -newer "$dir/node_modules")" ]; then
        echo -e "${BLUE}📥 安装 $name 依赖...${NC}"
        cd "$PROJECT_DIR/$dir" && $NPM_CMD install --legacy-peer-deps --progress=false
    else
        echo -e "${GREEN}✅ $name 依赖已安装${NC}"
    fi
}

# 安装根目录依赖
if [ ! -d "node_modules" ]; then
    echo -e "${BLUE}📥 安装根目录依赖...${NC}"
    $NPM_CMD install --legacy-peer-deps --progress=false
fi

# 安装各 workspace 依赖
install_deps "packages/database" "database"
install_deps "apps/api" "API"
install_deps "apps/web" "Web"
install_deps "apps/ai" "AI"

cd "$PROJECT_DIR"

# 生成 Prisma Client
echo -e "${BLUE}🔧 生成 Prisma Client...${NC}"
cd packages/database && $NPX_CMD prisma generate 2>/dev/null || true
cd "$PROJECT_DIR"

# 运行数据库迁移
echo -e "${BLUE}🔄 检查数据库迁移...${NC}"
cd packages/database && $NPX_CMD prisma migrate dev --name init 2>/dev/null || echo -e "${YELLOW}迁移已是最新${NC}"
cd "$PROJECT_DIR"

# 安装 concurrently（如果没有）
if [ ! -f "node_modules/.bin/concurrently" ]; then
    echo -e "${BLUE}📥 安装 concurrently...${NC}"
    $NPM_CMD install concurrently --save-dev --legacy-peer-deps
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}🎉 所有服务启动中...${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "服务地址:"
echo -e "  🌐 ${YELLOW}前端:${NC} http://localhost:3000"
echo -e "  🔌 ${YELLOW}API:${NC}  http://localhost:3001"
echo -e "  🤖 ${YELLOW}AI:${NC}   http://localhost:3002"
echo -e "  💾 ${YELLOW}数据库:${NC} localhost:5432"
echo ""
echo -e "${BLUE}按 Ctrl+C 停止所有服务${NC}"
echo ""

# 并行启动所有服务
$NODE_CMD node_modules/.bin/concurrently \
    --prefix "[{name}]" \
    --names "API,WEB,AI" \
    --prefix-colors "blue,green,yellow" \
    --kill-others \
    "cd apps/api && $NPM_CMD run start:dev" \
    "cd apps/web && $NPM_CMD run dev" \
    "cd apps/ai && $NPM_CMD run dev"
