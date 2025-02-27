"use client"
import { Button } from '@/components/ui/button'
import { UserDetailContext } from '@/data/context/UserDetailContext'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import LoginDialog from './LoginDialog'; 

const Header = () => {
  const { userDetail, setUserDetail } = useContext<any>(UserDetailContext)
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = (isOpen: boolean) => {
    setOpenDialog(isOpen)
  }

  return (
    <div className='p-4 flex items-center justify-between'>
      <a href='/'>
      <Image src={"https://bolt.new/static/favicon.svg"} alt='Logo' width={50} height={50} />
      </a>
      {!userDetail?.name && (
        <div className='flex gap-5'>
          <Button variant={'ghost'} onClick={handleOpenDialog}>Sign in</Button>
          <Button className='bg-[#2ba6ff] text-white' onClick={handleOpenDialog}>Get started</Button>
        </div>
      )}
      <LoginDialog openDialog={openDialog} closeDialog={handleCloseDialog} />
    </div>
  )
}

export default Header