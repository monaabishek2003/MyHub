import Header from '@/components/Header'
import MobileNavigation from '@/components/MobileNavigation'
import SideBar from '@/components/SideBar'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import React from 'react'

const layout = async ({children} : {children : React.ReactNode} ) => {
  const currentUser  = await getCurrentUser();

  if(!currentUser)  return redirect("/sign-in");
  
  return (
    <main className='flex h-screen'>
      <SideBar {...currentUser}/>
      <section className='flex flex-1 flex-col h-full'>
        <MobileNavigation {...currentUser}/>
        <Header ownerId={currentUser.$id} accountId={currentUser.accountId}/>
        <div className='main-content'>{children}</div>
      </section>
    </main>
  )
}

export default layout