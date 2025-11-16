"use client";

import { usePathname } from "next/navigation";

export default function PathnameWrapper({ children }: { children: React.ReactNode}) {
    const pathname = usePathname();

    console.log("Current pathname:", pathname);

    return <>{children}</>;
}