import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession['user']
  }
}

export interface NavItem {
  label: string
  href: string
}

export interface ServiceItem {
  icon: string
  title: string
  description: string
  featured?: boolean
}

export interface ProjectItem {
  tag: string
  title: string
  description: string
  featured?: boolean
}

export interface ProcessStep {
  number: string
  title: string
  description: string
  active?: boolean
}

export interface StatItem {
  value: string
  label: string
}
