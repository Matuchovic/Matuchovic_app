'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import { registerSchema, type RegisterInput } from '@/lib/validations'
import { showToast } from './Toaster'

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  async function onSubmit(data: RegisterInput) {
    setIsLoading(true)
    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        showToast(result.error || 'Registrace se nezdařila', 'error')
      } else {
        showToast('Účet byl vytvořen! Nyní se přihlaste.', 'success')
        router.push('/auth/login')
      }
    } catch {
      showToast('Nastala chyba, zkuste to znovu', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="glass rounded-2xl p-8 border border-white/7">
        <div className="mb-8">
          <p className="text-[9px] tracking-[0.16em] uppercase text-white/30 mb-3">Nový účet</p>
          <h1 className="text-2xl font-bold tracking-tight text-white">Registrace</h1>
          <p className="text-sm text-white/40 mt-2">Vytvořte si přístup do klientské zóny</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-[10px] tracking-[0.1em] uppercase text-white/40 mb-2">
              Celé jméno
            </label>
            <input
              {...register('name')}
              type="text"
              placeholder="Jan Novák"
              className="input-dark w-full px-4 py-3 rounded-xl text-sm font-medium"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.1em] uppercase text-white/40 mb-2">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="vas@email.cz"
              className="input-dark w-full px-4 py-3 rounded-xl text-sm font-medium"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.1em] uppercase text-white/40 mb-2">
              Heslo
            </label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimálně 8 znaků"
                className="input-dark w-full px-4 py-3 rounded-xl text-sm font-medium pr-12"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.1em] uppercase text-white/40 mb-2">
              Potvrdit heslo
            </label>
            <input
              {...register('confirmPassword')}
              type="password"
              placeholder="Zopakujte heslo"
              className="input-dark w-full px-4 py-3 rounded-xl text-sm font-medium"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold text-background font-bold text-[10px] tracking-[0.1em] uppercase py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                Vytvořit účet
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-white/30">
            Již máte účet?{' '}
            <Link href="/auth/login" className="text-gold hover:text-gold-light transition-colors font-medium">
              Přihlásit se
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-[10px] tracking-widest uppercase text-white/20 hover:text-white/40 transition-colors">
            ← Zpět na web
          </Link>
        </div>
      </div>
    </div>
  )
}
