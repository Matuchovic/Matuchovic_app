'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react'
import { loginSchema, type LoginInput } from '@/lib/validations'
import { showToast } from './Toaster'

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginInput) {
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        showToast('Nesprávný email nebo heslo', 'error')
      } else {
        showToast('Přihlášení proběhlo úspěšně', 'success')
        router.push('/dashboard')
        router.refresh()
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
          <p className="text-[9px] tracking-[0.16em] uppercase text-white/30 mb-3">Vítejte zpět</p>
          <h1 className="text-2xl font-bold tracking-tight text-white">Přihlásit se</h1>
          <p className="text-sm text-white/40 mt-2">Zadejte své přihlašovací údaje</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                placeholder="••••••••"
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold text-background font-bold text-[10px] tracking-[0.1em] uppercase py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                Přihlásit se
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-white/30">
            Nemáte účet?{' '}
            <Link href="/auth/register" className="text-gold hover:text-gold-light transition-colors font-medium">
              Zaregistrovat se
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
