"use client";

import LoadingUnit from "@/config/LoadingUnit";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Login() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      router.refresh();
      router.back();
    }
  }, [router]);

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-8">
      {LoadingUnit("Login")}
    </div>
  );
}
