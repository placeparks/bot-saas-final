/**
 * Centralized model + provider definitions for all AI providers supported by OpenClaw.
 * Used by both onboarding (provider-config.tsx) and settings (agent-settings.tsx).
 *
 * Provider IDs must match the Prisma AIProvider enum values.
 * Model IDs use the OpenClaw format: "provider/model-name".
 */

export interface ModelOption {
  id: string
  name: string
  description: string
}

export interface ProviderDefinition {
  id: string // matches AIProvider enum
  name: string
  description: string
  badge?: string
  models: ModelOption[]
  defaultModel: string
  getKeyUrl: string
  envVar: string // environment variable name for the API key
}

export const PROVIDERS: ProviderDefinition[] = [
  {
    id: 'ANTHROPIC',
    name: 'Anthropic',
    description: 'Claude models — best reasoning and long context',
    badge: 'Recommended',
    defaultModel: 'anthropic/claude-sonnet-4-5-20250929',
    getKeyUrl: 'https://console.anthropic.com/settings/keys',
    envVar: 'ANTHROPIC_API_KEY',
    models: [
      { id: 'anthropic/claude-opus-4-6', name: 'Claude Opus 4.6', description: 'Most powerful' },
      { id: 'anthropic/claude-sonnet-4-5-20250929', name: 'Claude Sonnet 4.5', description: 'Balanced' },
      { id: 'anthropic/claude-haiku-4-5-20251001', name: 'Claude Haiku 4.5', description: 'Fast & cheap' },
    ],
  },
  {
    id: 'OPENAI',
    name: 'OpenAI',
    description: 'GPT & o-series — fast and versatile',
    defaultModel: 'openai/gpt-4o',
    getKeyUrl: 'https://platform.openai.com/api-keys',
    envVar: 'OPENAI_API_KEY',
    models: [
      { id: 'openai/gpt-4.1', name: 'GPT-4.1', description: 'Latest flagship' },
      { id: 'openai/gpt-4.1-mini', name: 'GPT-4.1 Mini', description: 'Latest efficient' },
      { id: 'openai/gpt-4.1-nano', name: 'GPT-4.1 Nano', description: 'Ultra-fast' },
      { id: 'openai/o3', name: 'o3', description: 'Best reasoning' },
      { id: 'openai/o3-mini', name: 'o3-mini', description: 'Fast reasoning' },
      { id: 'openai/o4-mini', name: 'o4-mini', description: 'Efficient reasoning' },
      { id: 'openai/gpt-4o', name: 'GPT-4o', description: 'Great all-rounder' },
      { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', description: 'Cheapest' },
    ],
  },
  {
    id: 'GOOGLE',
    name: 'Google Gemini',
    description: 'Gemini models — multimodal and fast',
    defaultModel: 'google/gemini-2.5-pro',
    getKeyUrl: 'https://aistudio.google.com/apikey',
    envVar: 'GEMINI_API_KEY',
    models: [
      { id: 'google/gemini-2.5-pro', name: 'Gemini 2.5 Pro', description: 'Most capable' },
      { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Fast & efficient' },
      { id: 'google/gemini-2.0-flash', name: 'Gemini 2.0 Flash', description: 'Budget option' },
    ],
  },
  {
    id: 'XAI',
    name: 'xAI',
    description: 'Grok models — real-time knowledge',
    defaultModel: 'xai/grok-3',
    getKeyUrl: 'https://console.x.ai',
    envVar: 'XAI_API_KEY',
    models: [
      { id: 'xai/grok-3', name: 'Grok 3', description: 'Most capable' },
      { id: 'xai/grok-3-mini', name: 'Grok 3 Mini', description: 'Fast & efficient' },
    ],
  },
  {
    id: 'GROQ',
    name: 'Groq',
    description: 'Ultra-fast inference on open models',
    defaultModel: 'groq/llama-3.3-70b-versatile',
    getKeyUrl: 'https://console.groq.com/keys',
    envVar: 'GROQ_API_KEY',
    models: [
      { id: 'groq/llama-3.3-70b-versatile', name: 'Llama 3.3 70B', description: 'Best quality' },
      { id: 'groq/llama-3.1-8b-instant', name: 'Llama 3.1 8B', description: 'Fastest' },
      { id: 'groq/mixtral-8x7b-32768', name: 'Mixtral 8x7B', description: '32K context' },
      { id: 'groq/deepseek-r1-distill-llama-70b', name: 'DeepSeek R1 70B', description: 'Reasoning' },
      { id: 'groq/qwen-qwq-32b', name: 'Qwen QWQ 32B', description: 'Reasoning (Qwen)' },
    ],
  },
  {
    id: 'MISTRAL',
    name: 'Mistral',
    description: 'European AI — strong multilingual',
    defaultModel: 'mistral/mistral-large-latest',
    getKeyUrl: 'https://console.mistral.ai/api-keys',
    envVar: 'MISTRAL_API_KEY',
    models: [
      { id: 'mistral/mistral-large-latest', name: 'Mistral Large', description: 'Most capable' },
      { id: 'mistral/mistral-medium-latest', name: 'Mistral Medium', description: 'Balanced' },
      { id: 'mistral/mistral-small-latest', name: 'Mistral Small', description: 'Fast & cheap' },
      { id: 'mistral/codestral-latest', name: 'Codestral', description: 'Code specialist' },
    ],
  },
  {
    id: 'DEEPSEEK',
    name: 'DeepSeek',
    description: 'Open-weight models — reasoning and code',
    defaultModel: 'deepseek/deepseek-chat',
    getKeyUrl: 'https://platform.deepseek.com/api_keys',
    envVar: 'DEEPSEEK_API_KEY',
    models: [
      { id: 'deepseek/deepseek-chat', name: 'DeepSeek V3', description: 'General purpose' },
      { id: 'deepseek/deepseek-reasoner', name: 'DeepSeek R1', description: 'Reasoning' },
    ],
  },
  {
    id: 'CEREBRAS',
    name: 'Cerebras',
    description: 'Fastest inference — hardware-accelerated',
    defaultModel: 'cerebras/llama-3.3-70b',
    getKeyUrl: 'https://cloud.cerebras.ai/',
    envVar: 'CEREBRAS_API_KEY',
    models: [
      { id: 'cerebras/llama-3.3-70b', name: 'Llama 3.3 70B', description: 'Best quality' },
      { id: 'cerebras/llama-3.1-8b', name: 'Llama 3.1 8B', description: 'Ultra-fast' },
    ],
  },
  {
    id: 'VENICE',
    name: 'Venice',
    description: 'Privacy-first AI — uncensored models',
    defaultModel: 'venice/llama-3.3-70b',
    getKeyUrl: 'https://venice.ai/settings/api',
    envVar: 'VENICE_API_KEY',
    models: [
      { id: 'venice/llama-3.3-70b', name: 'Llama 3.3 70B', description: 'Best quality' },
      { id: 'venice/deepseek-r1-671b', name: 'DeepSeek R1 671B', description: 'Reasoning' },
      { id: 'venice/qwen-2.5-coder-32b', name: 'Qwen 2.5 Coder', description: 'Code specialist' },
    ],
  },
  {
    id: 'OPENROUTER',
    name: 'OpenRouter',
    description: 'Gateway to 200+ models from all providers',
    badge: 'Most Models',
    defaultModel: 'openrouter/anthropic/claude-sonnet-4-5',
    getKeyUrl: 'https://openrouter.ai/keys',
    envVar: 'OPENROUTER_API_KEY',
    models: [
      { id: 'openrouter/anthropic/claude-sonnet-4-5', name: 'Claude Sonnet 4.5', description: 'Via OpenRouter' },
      { id: 'openrouter/anthropic/claude-opus-4-6', name: 'Claude Opus 4.6', description: 'Via OpenRouter' },
      { id: 'openrouter/openai/gpt-4o', name: 'GPT-4o', description: 'Via OpenRouter' },
      { id: 'openrouter/openai/gpt-4.1', name: 'GPT-4.1', description: 'Via OpenRouter' },
      { id: 'openrouter/google/gemini-2.5-pro', name: 'Gemini 2.5 Pro', description: 'Via OpenRouter' },
      { id: 'openrouter/meta-llama/llama-3.3-70b', name: 'Llama 3.3 70B', description: 'Via OpenRouter' },
      { id: 'openrouter/deepseek/deepseek-r1', name: 'DeepSeek R1', description: 'Via OpenRouter' },
      { id: 'openrouter/mistralai/mistral-large', name: 'Mistral Large', description: 'Via OpenRouter' },
      { id: 'openrouter/qwen/qwen-2.5-72b', name: 'Qwen 2.5 72B', description: 'Via OpenRouter' },
    ],
  },
]

/** Get provider definition by ID */
export function getProviderDef(id: string): ProviderDefinition | undefined {
  return PROVIDERS.find(p => p.id === id)
}

/** Get models for a provider */
export function getModelsForProvider(providerId: string): ModelOption[] {
  return getProviderDef(providerId)?.models || []
}

/** Get the default model for a provider */
export function getDefaultModel(providerId: string): string {
  return getProviderDef(providerId)?.defaultModel || 'anthropic/claude-sonnet-4-5-20250929'
}

/** Get the env var name for a provider's API key */
export function getProviderEnvVar(providerId: string): string {
  return getProviderDef(providerId)?.envVar || 'ANTHROPIC_API_KEY'
}
