import React, { useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'
import { Button } from '@/components/ui/button'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { UserDetailContext } from '@/data/context/UserDetailContext'
// Removed Convex imports for static build
import uuid4 from 'uuid4'

  
//   @ts-ignore
const LoginDialog = ({openDialog,closeDialog}) => {
    const {userDetail,setUserDetail}=useContext<any>(UserDetailContext)
    // Removed Convex mutation for static build

    const  googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
          console.log(tokenResponse);
          const userInfo = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            { headers: { Authorization: 'Bearer '+ tokenResponse.access_token } },
          );
      
          console.log(userInfo);
          const user= userInfo.data;
          // For static build, just save to localStorage
          if(typeof window !== 'undefined'){
            localStorage.setItem('user',JSON.stringify(user))
          }
          setUserDetail(userInfo.data)
          closeDialog(false);
        },
        onError: errorResponse => console.log(errorResponse),
      });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog} >
        
        <DialogContent>
            <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription >
                <div className='flex flex-col justify-center items-center gap-2'>
                <h2 className='font-bold text-2xl text-white'>{Lookup.SIGNIN_HEADING}</h2>
                <p className='mt-2 text-center'>{Lookup.SIGNIN_SUBHEADING}</p>
                <Button onClick={() => googleLogin()} className='bg-blue-500 mt-2 hover:bg-blue-400'>Sign In with Google</Button>
                <p>{Lookup.SIGNIN_AGREEMENT_TEXT}</p>
                </div>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>

  )
}

export default LoginDialog
