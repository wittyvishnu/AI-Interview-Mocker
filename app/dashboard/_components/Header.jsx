"use client"
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const Header = () => {
  const pathname = usePathname()
  const router = useRouter()

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/dashboard/questions', label: 'Questions' },
    { path: '/dashboard/upgrade', label: 'Upgrade' },
    { path: '/dashboard/how-it-works', label: 'How it works' }
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Desktop Logo - Hidden on mobile */}
        <div className="hidden md:flex items-center">
          <Image 
            src="/pinit-logo.svg" 
            alt="PinIT Logo" 
            width={120} 
            height={40}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => router.push('/dashboard')}
          />
        </div>

        {/* Mobile Menu Button - Hidden on desktop */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger className="p-2 rounded-md hover:bg-slate-100 transition-colors">
              <Menu className="h-6 w-6 text-slate-700" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <div className="flex flex-col h-full pt-8">
                <div className="mb-8">
                  <Image 
                    src="/pinit-logo.svg" 
                    alt="PinIT Logo" 
                    width={120} 
                    height={40}
                    className="mx-auto hover:opacity-80 transition-opacity"
                  />
                </div>
                <nav className="flex-1">
                  <ul className="space-y-4">
                    {navLinks.map((link) => (
                      <li key={link.path}>
                        <button
                          onClick={() => router.push(link.path)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all
                            ${
                              pathname === link.path
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'hover:bg-slate-100 text-slate-700'
                            }`}
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => router.push(link.path)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all
                ${
                  pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 hover:text-primary hover:bg-slate-100'
                }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* User Button */}
        <div className="flex items-center">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
}

export default Header