"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

    const path=usePathname();
    useEffect(()=>{
        console.log(path)
    })

  return (
    <div className='flex p-4 items-center justify-between bg-dark shadow-m'>
        <Image src={'/logo.svg'} width ={40} height={100} alt='logo'/>
        <ul className='hidden md:flex gap-6'>

            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard'&&'text-primary font-bold'}`}>
                <Link href={"/dashboard"}>
                    Dashboard
                </Link>
            </li>

            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/questions'&&'text-primary font-bold'}`}>
                Questions
            </li>

            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/upgrade'&&'text-primary font-bold'}`}>
                Upgrades
            </li>

            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path=='/dashboard/how'&&'text-primary font-bold'}`}>
                How It Works
            </li>

        </ul>
        <UserButton/>
    </div>
  )
}

export default Header