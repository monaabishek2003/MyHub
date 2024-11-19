"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { navItems } from '@/constants';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface sidebarProps {
  fullName : string,
  avatar : string,
  email : string
}
const SideBar = ({fullName, avatar, email} : sidebarProps) => {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full-brand.svg"
          alt='logo'
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />
        <Image
          src="/assets/icons/logo-brand.svg"
          alt='logo'
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>
      <nav className="sidebar-nav ">
        <ul className='flex flex-col gap-4 flex-1'>
          {navItems.map(({name, icon, url})=>(
            <Link key={name} href={url} className="lg:w-full">
              <li
                className={cn(
                  "sidebar-nav-item",
                  pathname === url && "shad-active",
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    "nav-icon",
                    pathname === url && "nav-icon-active",
                  )}
                />
                <p className='hidden lg:block'>{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Image
        src="/assets/images/files-2.png"
        alt="logo"
        width={406}
        height={318}
        className="w-full"
      />
      <div className="sidebar-user-info">
        <Image
          src={''}
          alt={avatar ?? ""}
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  )
}

export default SideBar;
