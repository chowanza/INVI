"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, PieChart, ArrowLeftRight, User } from "lucide-react";

export function DashboardSubNav() {
    const pathname = usePathname();

    const tabs = [
        { name: "Resumen", href: "/dashboard", icon: LayoutDashboard },
        { name: "Portafolio", href: "/dashboard/portfolio", icon: PieChart },
        { name: "Movimientos", href: "/dashboard/transactions", icon: ArrowLeftRight },
        { name: "Perfil", href: "/dashboard/kyc", icon: User },
    ];

    return (
        <div className="w-full bg-white dark:bg-[#0a0f1c] border-b border-slate-200 dark:border-slate-800 sticky top-16 z-40">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                <nav className="flex space-x-8 overflow-x-auto no-scrollbar" aria-label="Tabs">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = pathname === tab.href;
                        return (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={cn(
                                    isActive
                                        ? "border-primary text-primary"
                                        : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 hover:border-slate-300",
                                    "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium whitespace-nowrap transition-colors"
                                )}
                            >
                                <Icon
                                    className={cn(
                                        isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-500",
                                        "mr-2 h-4 w-4"
                                    )}
                                    aria-hidden="true"
                                />
                                {tab.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
