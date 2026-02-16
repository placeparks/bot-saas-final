'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ExternalLink, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PROVIDERS } from '@/lib/models'

interface ProviderConfigProps {
  config: any
  onChange: (updates: any) => void
}

export default function ProviderConfig({ config, onChange }: ProviderConfigProps) {
  const [showApiKey, setShowApiKey] = useState(false)

  return (
    <div className="space-y-6">
      {/* Provider Selection */}
      <div>
        <Label className="text-lg mb-4 block text-white/90">Choose AI Provider</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PROVIDERS.map(p => {
            const isSelected = config.provider === p.id
            return (
              <Card
                key={p.id}
                className={`p-4 cursor-pointer border transition-all duration-300 ${
                  isSelected
                    ? 'border-red-500/50 bg-red-500/[0.04] ring-2 ring-red-500/40 shadow-[0_0_25px_rgba(220,38,38,0.12)]'
                    : 'border-white/10 bg-white/[0.02] hover:border-red-500/30'
                }`}
                onClick={() => onChange({ provider: p.id, model: p.defaultModel })}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white/90">{p.name}</h4>
                  {p.badge && (
                    <span className="bg-red-600 text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {p.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm text-white/40">{p.description}</p>
              </Card>
            )
          })}
        </div>
      </div>

      {/* API Key Input */}
      <div>
        <Label htmlFor="apiKey" className="text-lg mb-2 block text-white/90">
          API Key
        </Label>
        <p className="text-sm text-white/40 mb-3">
          Your API key is encrypted and never shared. We use it only to run your bot.
        </p>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              id="apiKey"
              type={showApiKey ? 'text' : 'password'}
              placeholder={`Enter your ${PROVIDERS.find(p => p.id === config.provider)?.name || 'provider'} API key`}
              value={config.apiKey}
              onChange={(e) => onChange({ apiKey: e.target.value })}
              className="pr-10 border-red-500/15 bg-white/[0.03] text-white placeholder:text-white/20 focus:border-red-500/40"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showApiKey ? (
                <EyeOff className="h-4 w-4 text-white/30 hover:text-white/50 transition-colors" />
              ) : (
                <Eye className="h-4 w-4 text-white/30 hover:text-white/50 transition-colors" />
              )}
            </button>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              const prov = PROVIDERS.find(p => p.id === config.provider)
              if (prov) window.open(prov.getKeyUrl, '_blank')
            }}
            className="border-red-500/30 text-red-400 hover:border-red-500/50 hover:text-red-300 hover:bg-red-500/5"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Get Key
          </Button>
        </div>
      </div>

      {/* Model Selection (Optional) */}
      <div>
        <Label htmlFor="model" className="text-lg mb-2 block text-white/90">
          Model (Optional)
        </Label>
        <p className="text-sm text-white/40 mb-3">
          We{"'"}ll use the best model by default. Advanced users can override this.
        </p>
        <select
          id="model"
          className="w-full h-10 rounded-md border border-red-500/15 bg-white/[0.03] px-3 py-2 text-sm text-white focus:border-red-500/40 transition-colors"
          value={config.model}
          onChange={(e) => onChange({ model: e.target.value })}
        >
          <option value="" className="text-black bg-white">
            Default (Recommended)
          </option>
          {PROVIDERS
            .find(p => p.id === config.provider)
            ?.models.map(m => (
              <option key={m.id} value={m.id} className="text-black bg-white">
                {m.name} — {m.description}
              </option>
            ))}
        </select>
      </div>
    </div>
  )
}
