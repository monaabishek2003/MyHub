"use client"

import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image  from 'next/image'
import Link from 'next/link'
import { createAccount } from '@/lib/actions/user.actions'
import { log } from 'console'
import OtpModal from './OtpModal'
import { signInUser } from '@/lib/actions/user.actions'
 


type FormType = "sign-in" | "sign-up"

const authFormSchema = (formType : FormType) => {
  return z.object({
    email : z.string().email(),
    fullName : formType === "sign-up" ? z.string().min(2).max(50) : z.string().optional()
  })
}

const AuthForm = ({type}:{type : FormType}) => {

  const [isLoading,setIsLoading] = useState(false);
  const [errorMsg,setErrorMsg] = useState("");
  const [accountId,setaccountId] = useState("")

  const formSchema = authFormSchema(type)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email : "" , fullName : ""
    },
  })
  
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values.fullName);
    
    setErrorMsg("");
    setIsLoading(true);
    try{
      const user =
        type === "sign-up"
          ? await createAccount({
              fullName: values.fullName || "",
              email: values.email,
            })
          : await signInUser({ email: values.email });

      if(user.accountId===null) throw new Error(user.error)
      setaccountId(user.accountId);
    }catch{
      setErrorMsg("Failed to create Account, Try again");
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form ">
      <h1 className='form-title'>
        {type==="sign-in"?"Sign In":"Sign Up"}
      </h1>
      {type==="sign-up" && <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <div className="shad-form-item">
              <FormLabel className="shad-form-label">Full Name</FormLabel>
              <FormControl>
                <Input className="shad-input" placeholder="Enter your Name" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <div className="shad-form-item">
              <FormLabel className="shad-form-label">Email</FormLabel>
              <FormControl>
                <Input className="shad-input" placeholder="Enter your Email " {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <Button type="submit" className="form-submit-button">
        {type==="sign-in"?"Sign In":"Sign Up"}

        {isLoading &&
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className=" ml-2"
          />
        }
      </Button>
      {errorMsg && 
        <p className="error-message">
          {errorMsg}
        </p>
      }
      <div className='body-2 flex justify-center'>
        <p className="text-light-100">
          {type==="sign-in"? "Don't have an Account":"Already have an Account"}
        </p>
        <Link href={type==="sign-in"?"/sign-up":"/sign-in"} className="ml-2 font-medium text-brand">
          {type==="sign-in"?"Sign Up":"Sign In"}
        </Link>
      </div>

    </form>
  </Form>
  {accountId && <OtpModal email={form.getValues('email')} accountId={accountId}/>}
  </>
  )
}

export default AuthForm
