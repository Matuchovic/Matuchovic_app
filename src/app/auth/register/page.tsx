import type { Metadata } from 'next'
import { RegisterForm } from '@/components/ui/RegisterForm'

export const metadata: Metadata = {
  title: 'Registrace — MATUCHOVIC',
}

export default function RegisterPage() {
  return <RegisterForm />
}
