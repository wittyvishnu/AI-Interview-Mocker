"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'

function Header() {
    const path = usePathname();
    const router = useRouter();

    useEffect(() => {
        console.log(path)
    }, [path])

    return (
        <div className='flex justify-between items-center bg-secondary shadow-sm px-4 py-2'>
            <Image src={'/pinit-logo.svg'} alt="Logo" width={150} height={100} className='scale-130 ml-4' />
            <ul className='hidden md:flex gap-6'>
                <li
                    onClick={() => router.push('/dashboard')}
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' ? 'text-primary font-bold' : ''}`}
                >
                    Dashboard
                </li>
                <li
                    onClick={() => router.push('/dashboard/questions')}
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/questions' ? 'text-primary font-bold' : ''}`}
                >
                    Questions
                </li>
                <li
                    onClick={() => router.push('/dashboard/upgrade')}
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' ? 'text-primary font-bold' : ''}`}
                >
                    Upgrade
                </li>
                <li
                    onClick={() => router.push('/dashboard/how-it-works')}
                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/how-it-works' ? 'text-primary font-bold' : ''}`}
                >
                    How it works ?
                </li>
            </ul>
            <UserButton />
        </div>
    )
}

export default Header
