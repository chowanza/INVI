import { DashboardSubNav } from "@/components/DashboardSubNav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-[#060B19] flex flex-col">
            <DashboardSubNav />
            <div className="flex-1 w-full">
                {children}
            </div>
        </div>
    );
}
