#!/bin/bash
# Tiaohai Global - 快速启动（跳过依赖检查）

export NODE_HOME="/Users/frank/Desktop/tiaohai-global/.tools/node"
export PATH="$NODE_HOME/bin:$PATH"

PROJECT_DIR="/Users/frank/Desktop/tiaohai-global"
cd "$PROJECT_DIR"

# 启动 Docker 服务
echo "🐳 启动数据库..."
docker-compose up -d > /dev/null 2>&1

# 等待数据库
until docker exec tiaohai-postgres pg_isready -U tiaohai > /dev/null 2>&1; do
    sleep 0.5
done

echo "🚀 启动服务..."
echo ""
echo "  🌐 前端: http://localhost:3000"
echo "  🔌 API:  http://localhost:3001/api/v1"
echo "  🤖 AI:   http://localhost:3002 (Mock模式)"
echo ""
echo "按 Ctrl+C 停止所有服务"
echo ""

# 并行启动所有服务
$NODE_HOME/bin/node node_modules/.bin/concurrently \
    --prefix "[{name}]" \
    --names "API,WEB,AI" \
    --prefix-colors "blue,green,yellow" \
    --kill-others \
    "cd apps/api && $NODE_HOME/bin/node $NODE_HOME/lib/node_modules/npm/bin/npm-cli.js run start:dev" \
    "cd apps/web && $NODE_HOME/bin/node $NODE_HOME/lib/node_modules/npm/bin/npm-cli.js run dev" \
    "cd apps/ai && $NODE_HOME/bin/node $NODE_HOME/lib/node_modules/npm/bin/npm-cli.js run dev"
