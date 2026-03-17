# 跳海Global AI客服 - LLM抽象层架构设计

> **版本**: v1.0  
> **作者**: Archie (系统架构师)  
> **日期**: 2026-03-16  
> **状态**: 设计完成

---

## 1. 设计概览

### 1.1 核心目标

| 目标 | 说明 | 实现方式 |
|------|------|----------|
| **统一接口** | 所有LLM通过相同接口调用 | 抽象层 + Provider适配器模式 |
| **配置切换** | 通过配置切换模型，不改代码 | 环境变量 + 配置文件 + 工厂模式 |
| **功能完整** | 支持多轮对话、流式输出、错误处理 | 标准化Request/Response + 中间件 |
| **易于扩展** | 新增模型只需实现适配器 | 接口定义 + 适配器模板 |

### 1.2 架构分层图

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AI客服应用层 (AI Service Layer)                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   对话服务   │  │   意图识别   │  │   知识问答   │  │     RAG检索服务      │  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └─────────────────────┘  │
│         └──────────────────┬──────────────────┘                               │
└────────────────────────────┼─────────────────────────────────────────────────┘
                             │ LLM Service Interface
                             ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        LLM抽象层 (LLM Abstraction Layer)                     │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │                    LLMService (统一接口定义)                              │ │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐  │ │
│  │  │  ChatRequest    │  │  ChatResponse   │  │   LLMFactory            │  │ │
│  │  │  ChatMessage    │  │  ChatChoice     │  │   - createProvider()    │  │ │
│  │  │  StreamChunk    │  │  Usage          │  │   - getProvider()       │  │ │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────┬─────────────────────────────────────────────────┘
                             │ Provider Routing
                             ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     Provider适配器层 (Provider Adapters)                      │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐ │
│  │ OpenAIAdapter│ │DeepSeekAdapter│ │ KimiAdapter  │ │  MiniMaxAdapter      │ │
│  │              │ │              │ │              │ │                      │ │
│  │ - send()     │ │ - send()     │ │ - send()     │ │ - send()             │ │
│  │ - stream()   │ │ - stream()   │ │ - stream()   │ │ - stream()           │ │
│  │ - validate() │ │ - validate() │ │ - validate() │ │ - validate()         │ │
│  └──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────────┬───────────┘ │
└─────────┼────────────────┼────────────────┼────────────────────┼─────────────┘
          │                │                │                    │
          ▼                ▼                ▼                    ▼
    ┌──────────┐     ┌──────────┐    ┌──────────┐         ┌──────────┐
    │ OpenAI   │     │ DeepSeek │    │  Moonshot│         │ MiniMax  │
    │ API      │     │ API      │    │  API     │         │ API      │
    └──────────┘     └──────────┘    └──────────┘         └──────────┘
```

### 1.3 数据流图

```
┌──────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   用户    │────▶│  AI客服服务   │────▶│ LLM抽象层    │────▶│  Provider    │
│          │     │              │     │              │     │   Adapter    │
└──────────┘     └──────────────┘     └──────────────┘     └──────┬───────┘
     ▲                                                              │
     │         ┌────────────────────────────────────────────────────┘
     │         │
     │    ┌────▼───────┐     ┌──────────────┐     ┌──────────────┐
     └────│  Response  │◀────│  Format/     │◀────│  LLM API     │
          │  (用户可见) │     │  Parse       │     │  Response    │
          └────────────┘     └──────────────┘     └──────────────┘


┌─────────────────────────────────────────────────────────────────────────────┐
│                              RAG知识库集成流程                                │
└─────────────────────────────────────────────────────────────────────────────┘

用户提问 ──▶ 意图识别 ──┬──▶ 需要知识检索? ──▶ 向量检索 ──▶ 相关文档片段
                       │                              │
                       │                              ▼
                       │                       ┌─────────────┐
                       │                       │  上下文组装  │
                       │                       │ (系统提示+   │
                       │                       │  检索结果+   │
                       │                       │  用户问题)   │
                       │                       └──────┬──────┘
                       │                              │
                       └──▶ 直接回答 ◀───────────────┘
                                    │
                                    ▼
                              LLM生成回答
```

---

## 2. 核心接口设计

### 2.1 数据类型定义 (TypeScript)

```typescript
// ============================================================
// 基础类型定义
// ============================================================

/** 消息角色 */
type MessageRole = 'system' | 'user' | 'assistant' | 'function' | 'tool';

/** 消息内容类型 */
type ContentType = 'text' | 'image_url' | 'audio';

/** 单个消息 */
interface ChatMessage {
  role: MessageRole;
  content: string | ContentPart[];
  name?: string;           // 用于function/tool消息
  tool_calls?: ToolCall[]; // 助手消息中的工具调用
  tool_call_id?: string;   // 工具响应消息
}

/** 多模态内容块 */
interface ContentPart {
  type: ContentType;
  text?: string;
  image_url?: { url: string; detail?: 'low' | 'high' | 'auto' };
  audio?: { data: string; format: 'mp3' | 'wav' };
}

/** 工具定义 */
interface Tool {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: object;  // JSON Schema
  };
}

/** 工具调用 */
interface ToolCall {
  id: string;
  type: 'function';
  function: {
    name: string;
    arguments: string;  // JSON字符串
  };
}

// ============================================================
// 请求/响应类型定义
// ============================================================

/** 聊天请求 */
interface ChatRequest {
  // 必需字段
  messages: ChatMessage[];
  
  // 模型配置（运行时覆盖配置文件的设置）
  model?: string;              // 具体模型ID，如 "gpt-4", "deepseek-chat"
  temperature?: number;        // 0.0 - 2.0，默认0.7
  max_tokens?: number;         // 最大生成token数
  top_p?: number;              // 核采样
  frequency_penalty?: number;  // -2.0 - 2.0
  presence_penalty?: number;   // -2.0 - 2.0
  
  // 功能开关
  stream?: boolean;            // 是否流式输出，默认false
  tools?: Tool[];              // 可用工具列表
  tool_choice?: 'auto' | 'none' | { type: 'function'; function: { name: string } };
  
  // 扩展字段（Provider特定）
  extra?: Record<string, unknown>;
  
  // 请求元数据
  metadata?: {
    requestId: string;
    sessionId?: string;
    userId?: string;
    timestamp: number;
  };
}

/** 聊天响应 */
interface ChatResponse {
  // 响应标识
  id: string;
  requestId: string;
  model: string;
  provider: string;      // 实际使用的Provider，如 "openai", "deepseek"
  
  // 响应内容
  choices: ChatChoice[];
  
  // 用量统计
  usage?: TokenUsage;
  
  // 性能指标
  latency?: {
    total: number;       // 总耗时(ms)
    firstToken?: number; // 首token耗时(ms)，流式响应有意义
  };
  
  // 原始响应（调试/审计用）
  raw?: unknown;
}

/** 单个选择 */
interface ChatChoice {
  index: number;
  message: ChatMessage;
  finish_reason: 'stop' | 'length' | 'tool_calls' | 'content_filter' | 'error' | null;
  delta?: ChatMessage;   // 流式响应中的增量内容
}

/** Token用量 */
interface TokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

/** 流式响应块 */
interface StreamChunk {
  id: string;
  requestId: string;
  model: string;
  provider: string;
  
  choices: StreamChoice[];
  usage?: TokenUsage;    // 通常只有最后一个chunk包含
  
  // 流控制
  done: boolean;         // 是否结束
}

interface StreamChoice {
  index: number;
  delta: Partial<ChatMessage>;
  finish_reason: ChatChoice['finish_reason'];
}
```

### 2.2 LLM Provider接口

```typescript
/** Provider配置 */
interface ProviderConfig {
  // 认证信息
  apiKey: string;
  baseUrl?: string;      // 自定义endpoint，如私有化部署
  
  // 默认模型配置
  defaultModel: string;
  defaultTemperature?: number;
  defaultMaxTokens?: number;
  
  // 请求配置
  timeout?: number;      // 请求超时(ms)，默认30000
  maxRetries?: number;   // 最大重试次数，默认3
  retryDelay?: number;   // 重试间隔(ms)，默认1000
  
  // 功能开关
  supportsStreaming?: boolean;
  supportsTools?: boolean;
  supportsVision?: boolean;
  
  // 限流配置
  rateLimit?: {
    requestsPerMinute?: number;
    tokensPerMinute?: number;
  };
}

/** Provider接口 - 所有适配器必须实现 */
interface ILLMProvider {
  /** Provider唯一标识 */
  readonly name: string;
  
  /** Provider显示名称 */
  readonly displayName: string;
  
  /** 初始化配置 */
  initialize(config: ProviderConfig): void;
  
  /** 验证配置是否有效 */
  validateConfig(): Promise<boolean>;
  
  /** 获取Provider能力 */
  getCapabilities(): ProviderCapabilities;
  
  /** 非流式对话 */
  sendMessage(request: ChatRequest): Promise<ChatResponse>;
  
  /** 流式对话 */
  streamMessage(request: ChatRequest): AsyncIterableIterator<StreamChunk>;
  
  /** 获取可用模型列表 */
  listModels(): Promise<ModelInfo[]>;
  
  /** 健康检查 */
  healthCheck(): Promise<HealthStatus>;
}

/** Provider能力声明 */
interface ProviderCapabilities {
  streaming: boolean;
  functionCalling: boolean;
  vision: boolean;
  jsonMode: boolean;
  maxContextTokens: number;
  supportedModels: string[];
}

/** 模型信息 */
interface ModelInfo {
  id: string;
  name: string;
  description?: string;
  maxTokens: number;
  pricing?: {
    inputPer1K: number;
    outputPer1K: number;
  };
}

/** 健康状态 */
interface HealthStatus {
  healthy: boolean;
  latency: number;
  error?: string;
  checkedAt: Date;
}
```

### 2.3 错误处理机制

```typescript
/** LLM错误类型 */
enum LLMErrorCode {
  // 客户端错误 (4xx)
  INVALID_REQUEST = 'INVALID_REQUEST',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  CONTEXT_LENGTH_EXCEEDED = 'CONTEXT_LENGTH_EXCEEDED',
  INVALID_MODEL = 'INVALID_MODEL',
  
  // 服务端错误 (5xx)
  PROVIDER_ERROR = 'PROVIDER_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  
  // 业务错误
  CONTENT_FILTERED = 'CONTENT_FILTERED',
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  
  // 系统错误
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  CONFIGURATION_ERROR = 'CONFIGURATION_ERROR',
}

/** LLM错误 */
class LLMError extends Error {
  constructor(
    public code: LLMErrorCode,
    message: string,
    public provider?: string,
    public requestId?: string,
    public retryable: boolean = false,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'LLMError';
  }
}

/** 错误分类与处理建议 */
const ErrorHandlingGuide: Record<LLMErrorCode, { retryable: boolean; fallback: boolean; action: string }> = {
  [LLMErrorCode.INVALID_REQUEST]: { retryable: false, fallback: false, action: '检查请求参数' },
  [LLMErrorCode.AUTHENTICATION_ERROR]: { retryable: false, fallback: true, action: '检查API Key' },
  [LLMErrorCode.RATE_LIMIT_EXCEEDED]: { retryable: true, fallback: true, action: '等待后重试或切换Provider' },
  [LLMErrorCode.CONTEXT_LENGTH_EXCEEDED]: { retryable: false, fallback: true, action: '截断上下文或切换长上下文模型' },
  [LLMErrorCode.INVALID_MODEL]: { retryable: false, fallback: true, action: '检查模型ID或切换Provider' },
  [LLMErrorCode.PROVIDER_ERROR]: { retryable: true, fallback: true, action: '稍后重试或切换Provider' },
  [LLMErrorCode.TIMEOUT_ERROR]: { retryable: true, fallback: true, action: '增加超时时间或切换Provider' },
  [LLMErrorCode.NETWORK_ERROR]: { retryable: true, fallback: true, action: '检查网络或切换Provider' },
  [LLMErrorCode.CONTENT_FILTERED]: { retryable: false, fallback: false, action: '修改输入内容' },
  [LLMErrorCode.INSUFFICIENT_BALANCE]: { retryable: false, fallback: true, action: '充值或切换Provider' },
  [LLMErrorCode.UNKNOWN_ERROR]: { retryable: true, fallback: true, action: '记录日志，人工排查' },
  [LLMErrorCode.CONFIGURATION_ERROR]: { retryable: false, fallback: false, action: '检查配置文件' },
};
```

---

## 3. Provider适配器实现

### 3.1 适配器基类

```typescript
/** Provider适配器基类 */
abstract class BaseProvider implements ILLMProvider {
  protected config!: ProviderConfig;
  protected initialized = false;
  
  abstract readonly name: string;
  abstract readonly displayName: string;
  
  initialize(config: ProviderConfig): void {
    this.config = {
      timeout: 30000,
      maxRetries: 3,
      retryDelay: 1000,
      ...config,
    };
    this.initialized = true;
  }
  
  async validateConfig(): Promise<boolean> {
    if (!this.config?.apiKey) {
      throw new LLMError(
        LLMErrorCode.CONFIGURATION_ERROR,
        'API Key is required',
        this.name
      );
    }
    return this.healthCheck().then(h => h.healthy);
  }
  
  abstract getCapabilities(): ProviderCapabilities;
  abstract sendMessage(request: ChatRequest): Promise<ChatResponse>;
  abstract streamMessage(request: ChatRequest): AsyncIterableIterator<StreamChunk>;
  abstract listModels(): Promise<ModelInfo[]>;
  abstract healthCheck(): Promise<HealthStatus>;
  
  /** 带重试的请求包装 */
  protected async withRetry<T>(
    operation: () => Promise<T>,
    context: { requestId: string; operation: string }
  ): Promise<T> {
    const maxRetries = this.config.maxRetries || 3;
    let lastError: Error | null = null;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        // 判断是否应该重试
        if (!this.shouldRetry(error) || attempt === maxRetries) {
          throw this.normalizeError(error, context);
        }
        
        // 指数退避
        const delay = this.config.retryDelay! * Math.pow(2, attempt);
        await sleep(delay);
      }
    }
    
    throw lastError;
  }
  
  /** 判断错误是否可重试 */
  protected shouldRetry(error: unknown): boolean {
    if (error instanceof LLMError) {
      return ErrorHandlingGuide[error.code]?.retryable ?? false;
    }
    // 网络错误默认可重试
    return true;
  }
  
  /** 标准化错误 */
  protected abstract normalizeError(
    error: unknown,
    context: { requestId: string; operation: string }
  ): LLMError;
  
  /** 构建HTTP请求头 */
  protected abstract buildHeaders(): Record<string, string>;
  
  /** 转换请求格式 */
  protected abstract transformRequest(request: ChatRequest): unknown;
  
  /** 转换响应格式 */
  protected abstract transformResponse(response: unknown): ChatResponse;
  
  /** 转换流式响应块 */
  protected abstract transformStreamChunk(chunk: unknown): StreamChunk;
}
```

### 3.2 OpenAI适配器示例

```typescript
class OpenAIAdapter extends BaseProvider {
  readonly name = 'openai';
  readonly displayName = 'OpenAI';
  private client: OpenAI;
  
  initialize(config: ProviderConfig): void {
    super.initialize(config);
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseUrl,
      timeout: config.timeout,
    });
  }
  
  getCapabilities(): ProviderCapabilities {
    return {
      streaming: true,
      functionCalling: true,
      vision: true,
      jsonMode: true,
      maxContextTokens: 128000,
      supportedModels: [
        'gpt-4o',
        'gpt-4o-mini',
        'gpt-4-turbo',
        'gpt-4',
        'gpt-3.5-turbo',
      ],
    };
  }
  
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    return this.withRetry(async () => {
      const response = await this.client.chat.completions.create({
        model: request.model || this.config.defaultModel,
        messages: this.transformMessages(request.messages),
        temperature: request.temperature ?? this.config.defaultTemperature ?? 0.7,
        max_tokens: request.max_tokens ?? this.config.defaultMaxTokens,
        tools: request.tools,
        tool_choice: request.tool_choice,
        stream: false,
      });
      
      return this.transformResponse(response);
    }, { requestId: request.metadata?.requestId || generateId(), operation: 'sendMessage' });
  }
  
  async *streamMessage(request: ChatRequest): AsyncIterableIterator<StreamChunk> {
    const stream = await this.client.chat.completions.create({
      model: request.model || this.config.defaultModel,
      messages: this.transformMessages(request.messages),
      temperature: request.temperature ?? this.config.defaultTemperature ?? 0.7,
      max_tokens: request.max_tokens ?? this.config.defaultMaxTokens,
      stream: true,
    });
    
    for await (const chunk of stream) {
      yield this.transformStreamChunk(chunk);
    }
  }
  
  private transformMessages(messages: ChatMessage[]): OpenAI.Chat.ChatCompletionMessageParam[] {
    return messages.map(msg => ({
      role: msg.role,
      content: msg.content,
      name: msg.name,
      tool_calls: msg.tool_calls,
      tool_call_id: msg.tool_call_id,
    })) as OpenAI.Chat.ChatCompletionMessageParam[];
  }
  
  protected transformResponse(response: OpenAI.Chat.Completions.ChatCompletion): ChatResponse {
    return {
      id: response.id,
      requestId: generateId(),
      model: response.model,
      provider: this.name,
      choices: response.choices.map(choice => ({
        index: choice.index,
        message: {
          role: choice.message.role as MessageRole,
          content: choice.message.content || '',
          tool_calls: choice.message.tool_calls?.map(tc => ({
            id: tc.id,
            type: 'function',
            function: {
              name: tc.function.name,
              arguments: tc.function.arguments,
            },
          })),
        },
        finish_reason: choice.finish_reason as ChatChoice['finish_reason'],
      })),
      usage: response.usage ? {
        prompt_tokens: response.usage.prompt_tokens,
        completion_tokens: response.usage.completion_tokens,
        total_tokens: response.usage.total_tokens,
      } : undefined,
    };
  }
  
  protected transformStreamChunk(chunk: OpenAI.Chat.Completions.ChatCompletionChunk): StreamChunk {
    return {
      id: chunk.id,
      requestId: generateId(),
      model: chunk.model,
      provider: this.name,
      choices: chunk.choices.map(choice => ({
        index: choice.index,
        delta: {
          role: choice.delta.role as MessageRole,
          content: choice.delta.content,
          tool_calls: choice.delta.tool_calls,
        },
        finish_reason: choice.finish_reason as ChatChoice['finish_reason'],
      })),
      done: chunk.choices.length === 0 || chunk.choices[0]?.finish_reason === 'stop',
    };
  }
  
  protected normalizeError(error: unknown, context: { requestId: string }): LLMError {
    if (error instanceof OpenAI.APIError) {
      const code = this.mapOpenAIErrorCode(error.status, error.code);
      return new LLMError(
        code,
        error.message,
        this.name,
        context.requestId,
        ErrorHandlingGuide[code]?.retryable ?? false,
        error
      );
    }
    return new LLMError(
      LLMErrorCode.UNKNOWN_ERROR,
      error instanceof Error ? error.message : 'Unknown error',
      this.name,
      context.requestId,
      true,
      error
    );
  }
  
  private mapOpenAIErrorCode(status?: number, code?: string): LLMErrorCode {
    switch (status) {
      case 401: return LLMErrorCode.AUTHENTICATION_ERROR;
      case 429: return LLMErrorCode.RATE_LIMIT_EXCEEDED;
      case 400:
        if (code === 'context_length_exceeded') {
          return LLMErrorCode.CONTEXT_LENGTH_EXCEEDED;
        }
        return LLMErrorCode.INVALID_REQUEST;
      case 500:
      case 502:
      case 503:
        return LLMErrorCode.PROVIDER_ERROR;
      default:
        return LLMErrorCode.UNKNOWN_ERROR;
    }
  }
  
  async listModels(): Promise<ModelInfo[]> {
    const models = await this.client.models.list();
    return models.data.map(m => ({
      id: m.id,
      name: m.id,
      maxTokens: m.id.includes('gpt-4') ? 128000 : 16385,
    }));
  }
  
  async healthCheck(): Promise<HealthStatus> {
    const start = Date.now();
    try {
      await this.client.models.list();
      return {
        healthy: true,
        latency: Date.now() - start,
        checkedAt: new Date(),
      };
    } catch (error) {
      return {
        healthy: false,
        latency: Date.now() - start,
        error: error instanceof Error ? error.message : 'Unknown error',
        checkedAt: new Date(),
      };
    }
  }
}
```

### 3.3 DeepSeek适配器（简化示例）

```typescript
class DeepSeekAdapter extends BaseProvider {
  readonly name = 'deepseek';
  readonly displayName = 'DeepSeek';
  
  private baseURL = 'https://api.deepseek.com/v1';
  
  getCapabilities(): ProviderCapabilities {
    return {
      streaming: true,
      functionCalling: true,
      vision: false,  // 当前版本不支持
      jsonMode: true,
      maxContextTokens: 64000,
      supportedModels: [
        'deepseek-chat',
        'deepseek-reasoner',
        'deepseek-coder',
      ],
    };
  }
  
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.transformRequest(request)),
    });
    
    if (!response.ok) {
      throw await this.parseError(response);
    }
    
    return this.transformResponse(await response.json());
  }
  
  async *streamMessage(request: ChatRequest): AsyncIterableIterator<StreamChunk> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...this.transformRequest(request), stream: true }),
    });
    
    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');
    
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      for (const line of chunk.split('\n')) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            yield { id: '', requestId: '', model: '', provider: this.name, choices: [], done: true };
            return;
          }
          yield this.transformStreamChunk(JSON.parse(data));
        }
      }
    }
  }
  
  protected transformRequest(request: ChatRequest): unknown {
    return {
      model: request.model || this.config.defaultModel,
      messages: request.messages,
      temperature: request.temperature ?? this.config.defaultTemperature ?? 0.7,
      max_tokens: request.max_tokens ?? this.config.defaultMaxTokens,
      stream: request.stream ?? false,
      // DeepSeek特有参数
      ...(request.extra?.deepseek || {}),
    };
  }
  
  // ... 其他方法实现
}
```

### 3.4 Provider工厂

```typescript
class LLMFactory {
  private static providers = new Map<string, new () => ILLMProvider>();
  private static instances = new Map<string, ILLMProvider>();
  
  /** 注册Provider */
  static register(name: string, ProviderClass: new () => ILLMProvider): void {
    this.providers.set(name, ProviderClass);
  }
  
  /** 获取Provider实例 */
  static getProvider(name: string): ILLMProvider {
    // 检查缓存
    if (this.instances.has(name)) {
      return this.instances.get(name)!;
    }
    
    // 创建新实例
    const ProviderClass = this.providers.get(name);
    if (!ProviderClass) {
      throw new LLMError(
        LLMErrorCode.INVALID_MODEL,
        `Unknown provider: ${name}. Registered: ${Array.from(this.providers.keys()).join(', ')}`
      );
    }
    
    const instance = new ProviderClass();
    this.instances.set(name, instance);
    return instance;
  }
  
  /** 初始化所有Provider */
  static async initializeAll(config: LLMConfig): Promise<void> {
    for (const [name, providerConfig] of Object.entries(config.providers)) {
      const provider = this.getProvider(name);
      provider.initialize(providerConfig);
      
      // 验证配置
      const valid = await provider.validateConfig();
      if (!valid) {
        console.warn(`Provider ${name} config validation failed`);
      }
    }
  }
  
  /** 获取默认Provider */
  static getDefaultProvider(config: LLMConfig): ILLMProvider {
    return this.getProvider(config.defaultProvider);
  }
  
  /** 列出所有已注册Provider */
  static listProviders(): string[] {
    return Array.from(this.providers.keys());
  }
}

// 注册所有Provider
LLMFactory.register('openai', OpenAIAdapter);
LLMFactory.register('deepseek', DeepSeekAdapter);
LLMFactory.register('kimi', KimiAdapter);
LLMFactory.register('minimax', MiniMaxAdapter);
// 添加更多...
```

---

## 4. 配置系统

### 4.1 配置文件结构 (YAML)

```yaml
# llm-config.yaml
# LLM服务配置文件

# ============================================================
# 全局配置
# ============================================================
defaultProvider: openai  # 默认Provider

# 全局重试策略
retry:
  maxRetries: 3
  retryDelay: 1000  # ms
  backoffMultiplier: 2

# 全局超时设置
timeout:
  request: 30000    # 请求超时
  streamChunk: 5000 # 流式响应块超时

# ============================================================
# Provider配置
# ============================================================
providers:
  
  # OpenAI配置
  openai:
    apiKey: ${OPENAI_API_KEY}
    baseUrl: ${OPENAI_BASE_URL:-https://api.openai.com/v1}
    defaultModel: gpt-4o-mini
    defaultTemperature: 0.7
    defaultMaxTokens: 4096
    supportsStreaming: true
    supportsTools: true
    supportsVision: true
    timeout: 30000
    maxRetries: 3
    
  # DeepSeek配置
  deepseek:
    apiKey: ${DEEPSEEK_API_KEY}
    baseUrl: ${DEEPSEEK_BASE_URL:-https://api.deepseek.com/v1}
    defaultModel: deepseek-chat
    defaultTemperature: 0.7
    defaultMaxTokens: 4096
    supportsStreaming: true
    supportsTools: true
    supportsVision: false
    timeout: 30000
    maxRetries: 3
    
  # 月之暗面Kimi配置
  kimi:
    apiKey: ${KIMI_API_KEY}
    baseUrl: ${KIMI_BASE_URL:-https://api.moonshot.cn/v1}
    defaultModel: moonshot-v1-8k
    defaultTemperature: 0.7
    defaultMaxTokens: 4096
    supportsStreaming: true
    supportsTools: true
    supportsVision: false
    timeout: 30000
    maxRetries: 3
    
  # MiniMax配置
  minimax:
    apiKey: ${MINIMAX_API_KEY}
    baseUrl: ${MINIMAX_BASE_URL:-https://api.minimax.chat/v1}
    defaultModel: abab6.5-chat
    defaultTemperature: 0.7
    defaultMaxTokens: 4096
    supportsStreaming: true
    supportsTools: false
    supportsVision: false
    timeout: 30000
    maxRetries: 3

# ============================================================
# 路由配置（用于多Provider负载均衡/降级）
# ============================================================
routing:
  # 主Provider，失败时按顺序尝试fallback
  strategy: fallback  # fallback | round-robin | weighted
  
  # Provider优先级（fallback策略使用）
  priority:
    - openai
    - deepseek
    - kimi
    - minimax
  
  # 健康检查配置
  healthCheck:
    enabled: true
    interval: 30000     # 检查间隔(ms)
    timeout: 5000       # 检查超时(ms)
    failureThreshold: 3 # 连续失败多少次标记为不健康

# ============================================================
# 模型别名（业务层使用别名，底层映射到具体模型）
# ============================================================
modelAliases:
  # 轻量级对话
  lite:
    openai: gpt-4o-mini
    deepseek: deepseek-chat
    kimi: moonshot-v1-8k
    minimax: abab6.5s-chat
    
  # 标准对话
  standard:
    openai: gpt-4o
    deepseek: deepseek-chat
    kimi: moonshot-v1-32k
    minimax: abab6.5-chat
    
  # 长上下文对话
  long-context:
    openai: gpt-4o
    deepseek: deepseek-chat
    kimi: moonshot-v1-128k
    minimax: abab6.5-chat
    
  # 推理/复杂任务
  reasoning:
    openai: gpt-4o
    deepseek: deepseek-reasoner
    kimi: moonshot-v1-32k
    minimax: abab6.5-chat

# ============================================================
# 功能开关
# ============================================================
features:
  streaming: true
  functionCalling: true
  vision: true
  jsonMode: true
  
  # 审计日志
  auditLog:
    enabled: true
    logRequests: true
    logResponses: true
    logLatency: true
    retention: 30  # 保留天数
```

### 4.2 环境变量配置

```bash
# .env 示例

# ============================================================
# OpenAI
# ============================================================
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_BASE_URL=https://api.openai.com/v1  # 可选，用于代理/私有化部署

# ============================================================
# DeepSeek
# ============================================================
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1

# ============================================================
# Kimi (Moonshot)
# ============================================================
KIMI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx
KIMI_BASE_URL=https://api.moonshot.cn/v1

# ============================================================
# MiniMax
# ============================================================
MINIMAX_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
MINIMAX_GROUP_ID=xxxxxxxxxxxxxxxxxxxxxxxx
MINIMAX_BASE_URL=https://api.minimax.chat/v1

# ============================================================
# 全局配置
# ============================================================
LLM_DEFAULT_PROVIDER=openai
LLM_REQUEST_TIMEOUT=30000
LLM_MAX_RETRIES=3
```

### 4.3 配置加载器

```typescript
import yaml from 'js-yaml';
import { config as dotenvConfig } from 'dotenv';

/** 配置管理器 */
class ConfigManager {
  private static config: LLMConfig | null = null;
  
  /** 加载配置 */
  static async load(configPath?: string): Promise<LLMConfig> {
    // 加载环境变量
    dotenvConfig();
    
    const path = configPath || process.env.LLM_CONFIG_PATH || './llm-config.yaml';
    
    // 读取YAML文件
    const content = await fs.readFile(path, 'utf-8');
    const rawConfig = yaml.load(content) as Record<string, unknown>;
    
    // 处理环境变量替换
    const processedConfig = this.processEnvVars(rawConfig);
    
    // 验证配置
    this.validate(processedConfig);
    
    this.config = processedConfig as LLMConfig;
    return this.config;
  }
  
  /** 获取配置 */
  static getConfig(): LLMConfig {
    if (!this.config) {
      throw new Error('Config not loaded. Call load() first.');
    }
    return this.config;
  }
  
  /** 运行时更新配置（热更新） */
  static updateProviderConfig(providerName: string, updates: Partial<ProviderConfig>): void {
    if (!this.config) {
      throw new Error('Config not loaded');
    }
    
    const provider = this.config.providers[providerName];
    if (!provider) {
      throw new Error(`Provider ${providerName} not found`);
    }
    
    this.config.providers[providerName] = { ...provider, ...updates };
    
    // 重新初始化Provider
    const instance = LLMFactory.getProvider(providerName);
    instance.initialize(this.config.providers[providerName]);
  }
  
  /** 处理环境变量替换 ${VAR:-default} */
  private static processEnvVars(obj: unknown): unknown {
    if (typeof obj === 'string') {
      return obj.replace(/\$\{([^}]+)\}/g, (_, expr) => {
        const [key, defaultValue] = expr.split(':-');
        return process.env[key] || defaultValue || '';
      });
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => this.processEnvVars(item));
    }
    
    if (obj && typeof obj === 'object') {
      return Object.fromEntries(
        Object.entries(obj).map(([k, v]) => [k, this.processEnvVars(v)])
      );
    }
    
    return obj;
  }
  
  /** 验证配置 */
  private static validate(config: unknown): asserts config is LLMConfig {
    // 使用zod或joi进行验证
    // 省略具体实现
  }
}

// 使用示例
async function bootstrap() {
  const config = await ConfigManager.load();
  await LLMFactory.initializeAll(config);
}
```

---

## 5. 知识库集成（RAG架构）

### 5.1 RAG架构图

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            RAG知识库系统架构                                  │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              数据层 (Data Layer)                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────────────────┐  │
│  │  144h政策文档     │  │  酒店信息         │  │  常见问题FAQ               │  │
│  │  - 免签政策       │  │  - 酒店介绍       │  │  - 入住流程                │  │
│  │  - 申请条件       │  │  - 设施服务       │  │  - 退改政策                │  │
│  │  - 停留时间       │  │  - 价格房型       │  │  - 周边信息                │  │
│  └────────┬─────────┘  └────────┬─────────┘  └─────────────┬──────────────┘  │
│           │                     │                          │                 │
│           └─────────────────────┼──────────────────────────┘                 │
│                                 ▼                                            │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                    文档处理流水线 (Document Pipeline)                    │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │  │
│  │  │ 文档加载  │─▶│ 文本分割  │─▶│ 向量化   │─▶│ 索引存储  │─▶│ 元数据管理│  │  │
│  │  │ Loader   │  │ Splitter │  │ Embedding│  │ Index    │  │ Metadata │  │  │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │  │
│  └────────────────────────────────────────┬───────────────────────────────┘  │
└───────────────────────────────────────────┼──────────────────────────────────┘
                                            ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           向量存储层 (Vector Store)                           │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                    向量数据库接口 (预留)                                  │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────────┐  │  │
│  │  │ Pinecone    │  │  Milvus     │  │  Chroma     │  │  PGVector      │  │  │
│  │  │ (云端)      │  │ (分布式)    │  │ (轻量)      │  │ (PostgreSQL)   │  │  │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └────────────────┘  │  │
│  │                                                                          │  │
│  │  向量维度: 1536 (OpenAI) / 1024 (其他模型)                                 │  │
│  │  距离度量: Cosine Similarity / Euclidean Distance                         │  │
│  │  索引类型: HNSW / IVF                                                      │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                                            ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          RAG服务层 (RAG Service)                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                         RAGRetriever                                    │  │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────┐  │  │
│  │  │  queryEmbedding │  │  similaritySearch│  │  contextAssembly       │  │  │
│  │  │  查询向量化      │  │  相似度检索      │  │  上下文组装            │  │  │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
│                                    │                                        │
│                                    ▼                                        │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │                         LLM Service                                    │  │
│  │  ┌──────────────────────────────────────────────────────────────────┐  │  │
│  │  │ 系统提示: 你是一个跳海Global酒店的AI助手。基于以下信息回答用户问题... │  │  │
│  │  │ ─────────────────────────────────────────────────────────────────  │  │  │
│  │  │ 检索结果:                                                          │  │  │
│  │  │ 1. [144h政策] 符合条件的外国人在中国可免签停留144小时...             │  │  │
│  │  │ 2. [酒店信息] 跳海Global酒店提供24小时前台服务...                   │  │  │
│  │  │ ─────────────────────────────────────────────────────────────────  │  │  │
│  │  │ 用户问题: 我想了解144小时免签政策...                                │  │  │
│  │  └──────────────────────────────────────────────────────────────────┘  │  │
│  │                                    │                                    │  │
│  │                                    ▼                                    │  │
│  │                        LLM生成回答                                     │  │
│  └────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 RAG核心组件

```typescript
// ============================================================
// RAG核心接口定义
// ============================================================

/** 文档块 */
interface DocumentChunk {
  id: string;
  content: string;
  metadata: {
    source: string;        // 来源文档
    sourceType: 'policy' | 'hotel' | 'faq' | 'other';
    chunkIndex: number;
    totalChunks: number;
    title?: string;
    category?: string;
    tags?: string[];
    createdAt: Date;
    updatedAt: Date;
  };
  embedding?: number[];    // 向量表示
}

/** 检索请求 */
interface RetrievalRequest {
  query: string;
  topK?: number;           // 返回结果数量，默认5
  threshold?: number;      // 相似度阈值，默认0.7
  filters?: {
    sourceType?: string[]; // 按来源类型过滤
    category?: string[];   // 按分类过滤
    tags?: string[];       // 按标签过滤
  };
}

/** 检索结果 */
interface RetrievalResult {
  chunks: DocumentChunk[];
  scores: number[];        // 相似度分数
  totalFound: number;
  latency: number;         // 检索耗时(ms)
}

/** 向量存储接口 */
interface IVectorStore {
  /** 初始化 */
  initialize(config: VectorStoreConfig): Promise<void>;
  
  /** 添加文档 */
  addDocuments(chunks: DocumentChunk[]): Promise<void>;
  
  /** 相似度检索 */
  similaritySearch(request: RetrievalRequest): Promise<RetrievalResult>;
  
  /** 删除文档 */
  deleteDocuments(ids: string[]): Promise<void>;
  
  /** 更新文档 */
  updateDocument(chunk: DocumentChunk): Promise<void>;
  
  /** 清空 */
  clear(): Promise<void>;
}

/** RAG检索器 */
interface IRAGRetriever {
  /** 检索相关知识 */
  retrieve(request: RetrievalRequest): Promise<RetrievalResult>;
  
  /** 组装Prompt上下文 */
  buildContext(results: RetrievalResult, maxTokens?: number): string;
}

// ============================================================
// RAG检索器实现
// ============================================================

class RAGRetriever implements IRAGRetriever {
  constructor(
    private vectorStore: IVectorStore,
    private embeddingService: IEmbeddingService
  ) {}
  
  async retrieve(request: RetrievalRequest): Promise<RetrievalResult> {
    // 1. 将查询向量化
    const queryEmbedding = await this.embeddingService.embed(request.query);
    
    // 2. 向量检索
    const results = await this.vectorStore.similaritySearch({
      ...request,
      query: request.query,  // 实际使用embedding进行检索
    });
    
    return results;
  }
  
  buildContext(results: RetrievalResult, maxTokens: number = 3000): string {
    const contextParts: string[] = [];
    let currentTokens = 0;
    
    for (let i = 0; i < results.chunks.length; i++) {
      const chunk = results.chunks[i];
      const score = results.scores[i];
      
      // 简单估算token数 (中文字符 ≈ 0.5 tokens)
      const estimatedTokens = Math.ceil(chunk.content.length * 0.5);
      
      if (currentTokens + estimatedTokens > maxTokens) {
        break;
      }
      
      contextParts.push(
        `[来源: ${chunk.metadata.source}, 相关度: ${(score * 100).toFixed(1)}%]\n${chunk.content}`
      );
      currentTokens += estimatedTokens;
    }
    
    return contextParts.join('\n\n---\n\n');
  }
}

// ============================================================
// 增强型LLM服务（集成RAG）
// ============================================================

class RAGEnhancedLLMService {
  constructor(
    private llmProvider: ILLMProvider,
    private retriever: IRAGRetriever,
    private config: RAGConfig
  ) {}
  
  async chatWithRAG(
    userMessage: string,
    history: ChatMessage[],
    options?: RAGOptions
  ): Promise<ChatResponse> {
    // 1. 检索相关知识
    const retrievalResult = await this.retriever.retrieve({
      query: userMessage,
      topK: options?.topK || 5,
      threshold: options?.threshold || 0.7,
      filters: options?.filters,
    });
    
    // 2. 组装上下文
    const context = this.retriever.buildContext(
      retrievalResult,
      this.config.maxContextTokens
    );
    
    // 3. 构建系统提示
    const systemPrompt = this.buildSystemPrompt(context, retrievalResult);
    
    // 4. 构造完整消息列表
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...history.slice(-this.config.maxHistoryRounds * 2), // 保留最近N轮
      { role: 'user', content: userMessage },
    ];
    
    // 5. 调用LLM
    const request: ChatRequest = {
      messages,
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens,
      stream: false,
      metadata: {
        requestId: generateId(),
        timestamp: Date.now(),
      },
    };
    
    return this.llmProvider.sendMessage(request);
  }
  
  private buildSystemPrompt(context: string, results: RetrievalResult): string {
    return `你是跳海Global酒店的AI客服助手。请基于以下知识库信息回答用户问题。

## 知识库信息
${context}

## 回答要求
1. 基于提供的知识库信息回答，不要编造
2. 如果知识库中没有相关信息，请礼貌告知用户无法回答
3. 保持友好、专业的语气
4. 如果涉及政策类问题（如144h免签），请确保信息准确
5. 可以适当推荐相关酒店服务

## 当前知识来源
${results.chunks.map(c => `- ${c.metadata.source}`).join('\n')}`;
  }
}
```

### 5.3 向量数据库预留接口

```typescript
/** 向量存储配置 */
interface VectorStoreConfig {
  provider: 'pinecone' | 'milvus' | 'chroma' | 'pgvector' | 'custom';
  
  // 通用配置
  dimension: number;       // 向量维度
  metric: 'cosine' | 'euclidean' | 'dotproduct';
  
  // Provider特定配置
  connectionString?: string;
  apiKey?: string;
  indexName?: string;
  namespace?: string;
  
  // 性能配置
  batchSize?: number;
  timeout?: number;
}

/** 向量存储工厂 */
class VectorStoreFactory {
  static create(config: VectorStoreConfig): IVectorStore {
    switch (config.provider) {
      case 'pinecone':
        return new PineconeVectorStore(config);
      case 'milvus':
        return new MilvusVectorStore(config);
      case 'chroma':
        return new ChromaVectorStore(config);
      case 'pgvector':
        return new PGVectorStore(config);
      default:
        throw new Error(`Unknown vector store provider: ${config.provider}`);
    }
  }
}

// ============================================================
// 简单内存向量存储（开发/测试用）
// ============================================================

class InMemoryVectorStore implements IVectorStore {
  private documents: Map<string, DocumentChunk> = new Map();
  
  async initialize(): Promise<void> {}
  
  async addDocuments(chunks: DocumentChunk[]): Promise<void> {
    for (const chunk of chunks) {
      this.documents.set(chunk.id, chunk);
    }
  }
  
  async similaritySearch(request: RetrievalRequest): Promise<RetrievalResult> {
    const start = Date.now();
    
    // 简单线性搜索（实际应使用向量索引）
    const results: Array<{ chunk: DocumentChunk; score: number }> = [];
    
    for (const chunk of this.documents.values()) {
      if (request.filters?.sourceType && 
          !request.filters.sourceType.includes(chunk.metadata.sourceType)) {
        continue;
      }
      
      // 简化的相似度计算（实际应使用余弦相似度等）
      const score = this.calculateSimilarity(request.query, chunk.content);
      
      if (score >= (request.threshold || 0)) {
        results.push({ chunk, score });
      }
    }
    
    // 排序并取topK
    results.sort((a, b) => b.score - a.score);
    const topResults = results.slice(0, request.topK || 5);
    
    return {
      chunks: topResults.map(r => r.chunk),
      scores: topResults.map(r => r.score),
      totalFound: results.length,
      latency: Date.now() - start,
    };
  }
  
  private calculateSimilarity(query: string, content: string): number {
    // 简化实现：关键词匹配
    // 实际应使用向量相似度计算
    const queryWords = new Set(query.toLowerCase().split(/\s+/));
    const contentWords = content.toLowerCase().split(/\s+/);
    
    let matches = 0;
    for (const word of contentWords) {
      if (queryWords.has(word)) {
        matches++;
      }
    }
    
    return matches / Math.max(queryWords.size, contentWords.length);
  }
  
  async deleteDocuments(ids: string[]): Promise<void> {
    for (const id of ids) {
      this.documents.delete(id);
    }
  }
  
  async updateDocument(chunk: DocumentChunk): Promise<void> {
    this.documents.set(chunk.id, chunk);
  }
  
  async clear(): Promise<void> {
    this.documents.clear();
  }
}
```

---

## 6. 扩展指南

### 6.1 新增Provider适配器

```typescript
/**
 * 新增Provider适配器步骤
 * 
 * 1. 创建适配器类，继承 BaseProvider
 * 2. 实现所有抽象方法
 * 3. 注册到 LLMFactory
 * 4. 在配置文件中添加配置
 */

// Step 1: 创建适配器
class NewProviderAdapter extends BaseProvider {
  readonly name = 'newprovider';
  readonly displayName = 'New Provider';
  
  getCapabilities(): ProviderCapabilities {
    return {
      streaming: true,
      functionCalling: false,
      vision: false,
      jsonMode: true,
      maxContextTokens: 8192,
      supportedModels: ['model-1', 'model-2'],
    };
  }
  
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    // 实现HTTP调用
    const response = await fetch(`${this.config.baseUrl}/chat`, {
      method: 'POST',
      headers: this.buildHeaders(),
      body: JSON.stringify(this.transformRequest(request)),
    });
    
    if (!response.ok) {
      throw await this.parseError(response);
    }
    
    return this.transformResponse(await response.json());
  }
  
  async *streamMessage(request: ChatRequest): AsyncIterableIterator<StreamChunk> {
    // 实现流式响应
    const response = await fetch(`${this.config.baseUrl}/chat`, {
      method: 'POST',
      headers: this.buildHeaders(),
      body: JSON.stringify({ ...this.transformRequest(request), stream: true }),
    });
    
    // 处理SSE流
    // ...
  }
  
  protected transformRequest(request: ChatRequest): unknown {
    // 转换为Provider特定格式
    return {
      model: request.model || this.config.defaultModel,
      messages: request.messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
      temperature: request.temperature,
      max_tokens: request.max_tokens,
    };
  }
  
  protected transformResponse(response: unknown): ChatResponse {
    // 转换为统一格式
    return {
      id: (response as any).id,
      requestId: generateId(),
      model: (response as any).model,
      provider: this.name,
      choices: (response as any).choices.map((c: any) => ({
        index: c.index,
        message: {
          role: c.message.role,
          content: c.message.content,
        },
        finish_reason: c.finish_reason,
      })),
      usage: (response as any).usage,
    };
  }
  
  protected normalizeError(error: unknown, context: { requestId: string }): LLMError {
    // 错误映射
    return new LLMError(LLMErrorCode.UNKNOWN_ERROR, 'Unknown error', this.name);
  }
  
  async listModels(): Promise<ModelInfo[]> {
    return [
      { id: 'model-1', name: 'Model 1', maxTokens: 8192 },
      { id: 'model-2', name: 'Model 2', maxTokens: 32768 },
    ];
  }
  
  async healthCheck(): Promise<HealthStatus> {
    // 实现健康检查
    return { healthy: true, latency: 0, checkedAt: new Date() };
  }
  
  protected buildHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.config.apiKey}`,
      'Content-Type': 'application/json',
    };
  }
}

// Step 2: 注册适配器
LLMFactory.register('newprovider', NewProviderAdapter);

// Step 3: 添加配置
// llm-config.yaml:
providers:
  newprovider:
    apiKey: ${NEWPROVIDER_API_KEY}
    baseUrl: https://api.newprovider.com/v1
    defaultModel: model-1
    defaultTemperature: 0.7
    defaultMaxTokens: 2048
    supportsStreaming: true
    supportsTools: false
    supportsVision: false
```

### 6.2 快速检查清单

**新增Provider前检查：**
- [ ] 阅读Provider API文档
- [ ] 确认支持的模型列表
- [ ] 确认支持的特性（streaming、tools、vision）
- [ ] 测试API连通性
- [ ] 了解错误码和限流策略

**适配器开发检查：**
- [ ] 实现所有必需方法
- [ ] 正确处理错误码映射
- [ ] 支持流式输出
- [ ] 包含单元测试
- [ ] 添加类型定义

**集成检查：**
- [ ] 在配置文件中注册
- [ ] 更新环境变量模板
- [ ] 更新文档
- [ ] 进行集成测试

---

## 7. 部署与运维

### 7.1 目录结构建议

```
llm-service/
├── src/
│   ├── adapters/              # Provider适配器
│   │   ├── base.ts            # 基类
│   │   ├── openai.ts
│   │   ├── deepseek.ts
│   │   ├── kimi.ts
│   │   ├── minimax.ts
│   │   └── index.ts           # 导出和注册
│   │
│   ├── core/                  # 核心接口和类型
│   │   ├── types.ts           # 类型定义
│   │   ├── interfaces.ts      # 接口定义
│   │   ├── errors.ts          # 错误处理
│   │   └── factory.ts         # Provider工厂
│   │
│   ├── config/                # 配置管理
│   │   ├── loader.ts
│   │   ├── validator.ts
│   │   └── types.ts
│   │
│   ├── rag/                   # RAG模块
│   │   ├── retriever.ts
│   │   ├── vector-store/
│   │   ├── embedding/
│   │   └── document/
│   │
│   ├── middleware/            # 中间件
│   │   ├── retry.ts
│   │   ├── circuit-breaker.ts
│   │   ├── rate-limiter.ts
│   │   └── logger.ts
│   │
│   └── index.ts               # 导出
│
├── config/
│   └── llm-config.yaml        # 配置文件
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── docs/
│   └── LLM_ABSTRACTION_v1.md  # 本文档
│
└── package.json
```

### 7.2 依赖清单

```json
{
  "dependencies": {
    "openai": "^4.x",
    "js-yaml": "^4.x",
    "dotenv": "^16.x",
    "zod": "^3.x"
  },
  "devDependencies": {
    "@types/node": "^20.x",
    "@types/js-yaml": "^4.x",
    "typescript": "^5.x",
    "vitest": "^1.x"
  }
}
```

---

## 8. 附录

### 8.1 Provider能力对比表

| 特性 | OpenAI | DeepSeek | Kimi | MiniMax |
|------|--------|----------|------|---------|
| **Streaming** | ✅ | ✅ | ✅ | ✅ |
| **Function Calling** | ✅ | ✅ | ✅ | ❌ |
| **Vision** | ✅ | ❌ | ❌ | ❌ |
| **JSON Mode** | ✅ | ✅ | ✅ | ✅ |
| **Context Length** | 128K | 64K | 128K | 8K |
| **国内访问** | ⚠️ | ✅ | ✅ | ✅ |
| **价格** | $$$ | $ | $$ | $ |

### 8.2 模型推荐表

| 场景 | 推荐模型 | Provider | 理由 |
|------|----------|----------|------|
| **通用对话** | gpt-4o-mini | OpenAI | 性价比高 |
| | deepseek-chat | DeepSeek | 中文优秀，国内稳定 |
| **复杂推理** | gpt-4o | OpenAI | 综合能力最强 |
| | deepseek-reasoner | DeepSeek | 推理能力强 |
| **长上下文** | moonshot-v1-128k | Kimi | 128K上下文 |
| | gpt-4o | OpenAI | 128K上下文 |
| **代码相关** | deepseek-coder | DeepSeek | 代码能力优秀 |

### 8.3 决策记录 (ADR)

```
ADR-001: Provider适配器模式
- 决策: 使用适配器模式统一不同Provider接口
- 原因: 各Provider API格式不同，需要统一
- 替代方案: 直接使用OpenAI SDK兼容模式
- 结果: 各Provider可以有最佳实现

ADR-002: 配置驱动设计
- 决策: 通过配置文件切换Provider，不改代码
- 原因: 业务灵活，运维可控
- 替代方案: 硬编码Provider选择
- 结果: 支持运行时切换

ADR-003: RAG与LLM分离
- 决策: RAG作为独立服务，通过接口与LLM集成
- 原因: 职责分离，可独立扩展
- 替代方案: 耦合在LLM服务中
- 结果: 向量数据库可灵活替换
```

---

## 9. 总结

### 核心设计决策

| 决策 | 选择 | 理由 |
|------|------|------|
| **架构模式** | 适配器模式 | 统一接口，隔离Provider差异 |
| **配置方式** | YAML + 环境变量 | 灵活且安全 |
| **错误处理** | 统一错误码 | 便于上层处理 |
| **RAG集成** | 预留接口 | 未来可接入实际向量数据库 |
| **流式支持** | AsyncIterable | 标准JS异步迭代 |

### 下一步行动

1. **实现基础适配器**: OpenAI、DeepSeek优先
2. **搭建配置系统**: 支持环境变量和YAML配置
3. **集成RAG**: 接入向量数据库（推荐先使用内存版）
4. **添加监控**: 接入Prometheus/Grafana
5. **性能测试**: 压测各Provider响应时间

---

*文档结束*
