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
 

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

type formType = "sign-in" | "sign-up"


const AuthForm = ({type}:{type : formType}) => {

  const [isLoading,setIsLoading] = useState(false)
  const [errorMsg,setErrorMsg] = useState("")

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
  
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
      <h1 className='form-title'>
        {type==="sign-in"?"Sign In":"Sign Up"}
      </h1>
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <div className="shad-form-item">
              <FormLabel className="shad-form-label">Username</FormLabel>
              <FormControl>
                <Input className="shad-input" placeholder="Enter your Name" {...field} />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
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
            className="animate-spin ml-2"
          />
        }
      </Button>
      {errorMsg && 
        <p className="error-message">
          {errorMsg}
        </p>
      }
      <div>
        <p>
          {type==="sign-in"? "Don't have an Account":"Already have an Account"}
        </p>
        <Link>
          {type==="sign-in"?"Sign In":"Sign Up"}
        </Link>
      </div>
    </form>
  </Form>
  )
}

export default AuthForm
