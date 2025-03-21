'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoginPage from "@/config/LoginPage";

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            router.back();
        }
    }, [router]);

    return (
        <div className="min-h-screen text-white flex flex-col items-center justify-center p-8">
            { LoginPage() }
        </div>
    );
}
