#!/bin/bash
# Tiaohai Global 启动脚本

# 设置 Node.js 路径
export NODE_HOME="/Users/frank/Desktop/tiaohai-global/.tools/node"
export PATH="$NODE_HOME/bin:$PATH"

# 定义 npm 命令
NPM_CMD="$NODE_HOME/bin/node $NODE_HOME/lib/node_modules/npm/bin/npm-cli.js"

# 验证 Node.js 版本
echo "Node.js 版本: $($NODE_HOME/bin/node --version)"
echo "npm 版本: $($NPM_CMD --version)"

# 获取脚本所在目录
SCRIPT_DIR="/Users/frank/Desktop/tiaohai-global"
cd "$SCRIPT_DIR"

# 安装根项目依赖
echo "📦 安装根项目依赖..."
$NPM_CMD install --legacy-peer-deps

# 安装各个 workspace 依赖
echo "📦 安装 web 依赖..."
cd "$SCRIPT_DIR/apps/web" && $NPM_CMD install --legacy-peer-deps

echo "📦 安装 api 依赖..."
cd "$SCRIPT_DIR/apps/api" && $NPM_CMD install --legacy-peer-deps

echo "📦 安装 ai 依赖..."
cd "$SCRIPT_DIR/apps/ai" && $NPM_CMD install --legacy-peer-deps

echo "📦 安装 database 依赖..."
cd "$SCRIPT_DIR/packages/database" && $NPM_CMD install --legacy-peer-deps

echo "✅ 所有依赖安装完成！"
