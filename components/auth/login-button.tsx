"use client";

import { useRouter } from 'next/navigation';

import {
    Dialog,
    DialogContent,
    DialogTrigger
} from '@/components/ui/dialog'
interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean;
}

import React from 'react'
import LoginForm from './login-form';

const LoginButton = ({
    children,
    mode = "redirect",
    asChild
}: LoginButtonProps) => {
    const router = useRouter();
    const onClick = () => {
        router.push("/auth/login");
    }

    if (mode === "modal") {
        return (
            <Dialog>
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent className='p-0 w-auto bg-transparent border-none'>
                    <LoginForm />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <span onClick={onClick} className='cursor-pointer'>
            {children}
        </span>
    )
}

export default LoginButton