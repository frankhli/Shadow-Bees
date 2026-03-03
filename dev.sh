#!/bin/bash
# Tiaohai Global 开发环境启动脚本

# 设置 Node.js 路径
export NODE_HOME="/Users/frank/Desktop/tiaohai-global/.tools/node"
export PATH="$NODE_HOME/bin:$PATH"

cd "/Users/frank/Desktop/tiaohai-global"

# 验证 Node.js
echo "Node.js: $(node --version)"
echo ""

case "$1" in
  web)
    echo "🚀 启动 Web 前端 (port 3000)..."
    cd apps/web
    exec node ../../node_modules/next/dist/bin/next dev -p 3000
    ;;
  api)
    echo "🚀 启动 API 服务 (port 3001)..."
    cd apps/api
    # 使用 ts-node 直接运行 NestJS
    exec node -r ts-node/register -r tsconfig-paths/register src/main.ts
    ;;
  ai)
    echo "🚀 启动 AI 服务 (port 3002)..."
    cd apps/ai
    # Fastify 需要 tsx 或 ts-node
    exec node ../../node_modules/tsx/dist/cli.mjs src/main.ts
    ;;
  *)
    echo "Tiaohai Global 开发服务器"
    echo ""
    echo "用法: ./dev.sh [web|api|ai]"
    echo ""
    echo "示例 (需要3个终端):"
    echo "  终端1: ./dev.sh web    # http://localhost:3000"
    echo "  终端2: ./dev.sh api    # http://localhost:3001/api/v1"
    echo "  终端3: ./dev.sh ai     # http://localhost:3002"
    ;;
esac
