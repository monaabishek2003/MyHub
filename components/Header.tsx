import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { signOutUser } from '@/lib/actions/user.actions';
import FileUploader from './FileUploader';
import Search from './Search';

interface HeaderProps {
  ownerId : string;
  accountId : string;
}

const Header = ({ownerId , accountId} : HeaderProps) => {
  return (
    <header className='header'>
      <Search/>
      <div className='header-wrapper'>
        <FileUploader ownerId={ownerId} accountId={accountId}/>
        <form  
          action={async()=>{
            "use server"
            await signOutUser()
          }}
        >
          <Button 
            type='submit' 
            className='sign-out-button'
            
          >
            <Image
              src="assets/icons/logout.svg"
              alt="logout"
              width={24}
              height={24}
              className='w-4'
            >

            </Image>
          </Button>
        </form>
      </div>
    </header>
  )
}

export default Header;
