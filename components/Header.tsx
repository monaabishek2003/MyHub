import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className='header'>
      SEARCH
      <div className='header-wrapper'>
        FILEUPLOADER
        <form>
          <Button type='submit' className='sign-out-button'>
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
