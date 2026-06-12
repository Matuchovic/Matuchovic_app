import type { Metadata } from 'next'
import { LoginForm } from '@/components/ui/LoginForm'

export const metadata: Metadata = {
  title: 'Přihlášení — MATUCHOVIC',
}

export default function LoginPage() {
  return <LoginForm />
}
