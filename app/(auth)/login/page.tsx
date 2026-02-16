'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Shield, Sparkles } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6"
      style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-16 h-56 w-56 rounded-full bg-red-500/8 blur-[80px]" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-red-500/5 blur-[80px]" />
      </div>

      <Card className="relative w-full max-w-md border border-red-500/15 bg-white/[0.02] text-white shadow-[0_0_60px_rgba(0,0,0,0.5)]">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2">
            <Image src="/openclaw_icon.png" alt="Claw Club" width={48} height={48} className="drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]" />
          </div>
          <CardTitle className="mt-3 text-2xl font-bold">Welcome back to <span className="text-red-500">Claw Club</span></CardTitle>
          <CardDescription className="text-white/40 font-mono text-xs">
            Sign in to manage your private OpenClaw gateway.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-sm text-white/60">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="mt-2 border-red-500/15 bg-white/5 text-white placeholder:text-white/20 font-mono text-sm"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm text-white/60">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="mt-2 border-red-500/15 bg-white/5 text-white placeholder:text-white/20 font-mono text-sm"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-lg bg-red-600 text-white font-semibold hover:bg-red-500 transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)]"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <div className="grid gap-3 rounded-lg border border-red-500/10 bg-white/[0.02] p-4 text-xs text-white/30 font-mono">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-500/50" />
                Tokens stay private and encrypted.
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-red-500/50" />
                Your gateway spins up on demand.
              </div>
            </div>

            <div className="text-center text-sm">
              <span className="text-white/30">Don&apos;t have an account? </span>
              <Link href="/register" className="text-red-500 hover:underline">
                Sign up
              </Link>
            </div>

            <div className="text-center text-sm">
              <Link href="/" className="text-white/20 hover:text-red-500 transition-colors">
                &larr; Back to home
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
