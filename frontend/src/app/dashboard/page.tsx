import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { signout } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Wallet, TrendingUp, Briefcase, ArrowUpRight, ArrowDownRight, Building2, PieChart } from "lucide-react";

export default async function DashboardPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Obtener datos del perfil extendido
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    return (
        <div className="flex flex-col gap-8 p-4 md:p-8 max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Resumen General</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Bienvenido de vuelta, {profile?.full_name?.split(' ')[0] || user.email?.split('@')[0]}
                    </p>
                </div>
                {profile?.kyc_status !== 'APPROVED' && (
                    <div className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 px-4 py-2 rounded-lg text-sm font-medium border border-amber-200 dark:border-amber-800 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
                        Validación KYC pendiente
                        <Button variant="link" size="sm" className="ml-2 text-amber-700 dark:text-amber-300 font-bold p-0" asChild>
                            <a href="/dashboard/kyc">Completar ahora</a>
                        </Button>
                    </div>
                )}
            </div>

            {/* Top Metrics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Billetera */}
                <Card className="bg-primary text-primary-foreground shadow-lg border-none relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Wallet className="w-24 h-24" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <CardTitle className="text-sm font-medium opacity-90">
                            Saldo Disponible
                        </CardTitle>
                        <Wallet className="h-4 w-4 opacity-90" />
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-3xl font-black mb-4">
                            ${Number(profile?.wallet_balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-none w-full justify-center">
                                <ArrowDownRight className="w-4 h-4 mr-1" /> Depositar
                            </Button>
                            <Button size="sm" variant="ghost" className="hover:bg-white/10 text-white w-full justify-center">
                                Retirar
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Capital Invertido */}
                <Card className="shadow-sm border-slate-200 dark:border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Capital Invertido
                        </CardTitle>
                        <Briefcase className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                            $45,000.00
                        </div>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center mt-1">
                            <ArrowUpRight className="w-3 h-3 mr-1" /> +$5,000 este mes
                        </p>
                    </CardContent>
                </Card>

                {/* Rendimiento Acumulado */}
                <Card className="shadow-sm border-slate-200 dark:border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Rendimiento Acumulado
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            +$6,250.00
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Beneficios cobrados e imputados
                        </p>
                    </CardContent>
                </Card>

                {/* Tasa Promedio */}
                <Card className="shadow-sm border-slate-200 dark:border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Tasa Promedio (TIR)
                        </CardTitle>
                        <PieChart className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                            13.8%
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Promedio ponderado anual
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Area */}
            <div className="grid gap-6 md:grid-cols-3">

                {/* Active Projects List */}
                <Card className="col-span-2 shadow-sm border-slate-200 dark:border-slate-800">
                    <CardHeader>
                        <CardTitle>Proyectos Activos</CardTitle>
                        <CardDescription>
                            El estado físico y financiero de tus participaciones actuales.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {[
                                { name: "Torre Empresarial Horizonte", type: "Préstamo", amount: 25000, status: "En Proceso", return: 14.5 },
                                { name: "Residencial Contrueces", type: "Plusvalía", amount: 20000, status: "Financiado", return: 13.0 },
                            ].map((project, i) => (
                                <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/20">
                                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                        <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                            <Building2 className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-slate-900 dark:text-white">{project.name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                                    {project.type}
                                                </span>
                                                <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                                                    {project.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto mt-2 sm:mt-0">
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">${project.amount.toLocaleString()}</p>
                                            <p className="text-xs text-emerald-600 dark:text-emerald-400">TIR {project.return}%</p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="ml-4 sm:ml-0 text-primary hover:text-primary">
                                            Ver detalle
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 w-full flex justify-center">
                            <Button variant="outline" className="w-full sm:w-auto">Ver todo mi portafolio</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Sidebar Actions / Summary */}
                <Card className="col-span-1 shadow-sm border-slate-200 dark:border-slate-800 bg-[#161B26] text-white">
                    <CardHeader>
                        <CardTitle>Mi Perfil (MVP)</CardTitle>
                        <CardDescription className="text-slate-400">
                            Datos verificados por INVI.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b border-slate-800 pb-2">
                                <span className="text-sm text-slate-400">Nombre:</span>
                                <span className="text-sm font-medium">{profile?.full_name || 'No especificado'}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800 pb-2">
                                <span className="text-sm text-slate-400">Correo:</span>
                                <span className="text-sm font-medium">{user.email}</span>
                            </div>
                            <div className="flex justify-between border-b border-slate-800 pb-2">
                                <span className="text-sm text-slate-400">Documento:</span>
                                <span className="text-sm font-medium">{profile?.document_id || 'No registrado'}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
