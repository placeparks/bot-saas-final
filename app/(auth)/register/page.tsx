'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Shield, Sparkles, Check } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Registration failed')
        return
      }

      // Auto sign-in after successful registration
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        router.push('/login')
        return
      }

      router.push('/onboard')
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
          <CardTitle className="mt-3 text-2xl font-bold">Create your <span className="text-red-500">Claw Club</span> account</CardTitle>
          <CardDescription className="text-white/40 font-mono text-xs">
            Launch your private OpenClaw gateway in minutes.
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
              <Label htmlFor="name" className="text-sm text-white/60">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                required
                className="mt-2 border-red-500/15 bg-white/5 text-white placeholder:text-white/20 font-mono text-sm"
              />
            </div>

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
              <p className="mt-2 text-[10px] text-white/25 flex items-center gap-2 font-mono">
                <Check className="h-3 w-3 text-red-500/50" /> At least 8 characters
              </p>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-sm text-white/60">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
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
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>

            <div className="grid gap-3 rounded-lg border border-red-500/10 bg-white/[0.02] p-4 text-xs text-white/30 font-mono">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-500/50" />
                Your keys stay private and encrypted.
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-red-500/50" />
                Pair channels after the first deploy.
              </div>
            </div>

            <div className="text-center text-sm">
              <span className="text-white/30">Already have an account? </span>
              <Link href="/login" className="text-red-500 hover:underline">
                Sign in
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
