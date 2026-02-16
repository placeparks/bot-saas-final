'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Loader2, Save, RotateCw, X } from 'lucide-react'

interface ConfigSaveBarProps {
  show: boolean
  saving: boolean
  onSave: () => void
  onDiscard: () => void
}

export function ConfigSaveBar({ show, saving, onSave, onDiscard }: ConfigSaveBarProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-red-500/25 bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl shadow-red-500/10">
            <div className="flex items-center gap-2 pr-3 border-r border-red-500/10">
              <RotateCw className="h-3.5 w-3.5 text-red-400 animate-pulse" />
              <span className="text-xs font-mono text-white/50">
                Unsaved changes
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onDiscard}
              disabled={saving}
              className="h-8 px-3 border-white/10 text-white/40 hover:text-white/60 hover:border-white/20 text-xs font-mono"
            >
              <X className="h-3 w-3 mr-1" />
              Discard
            </Button>

            <Button
              size="sm"
              onClick={onSave}
              disabled={saving}
              className="h-8 px-4 bg-red-600 hover:bg-red-500 text-white border-0 text-xs font-mono"
            >
              {saving ? (
                <>
                  <Loader2 className="h-3 w-3 mr-1.5 animate-spin" />
                  Applying...
                </>
              ) : (
                <>
                  <Save className="h-3 w-3 mr-1.5" />
                  Save & Apply
                </>
              )}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
