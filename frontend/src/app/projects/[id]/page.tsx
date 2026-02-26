import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, TrendingUp, Clock, FileText, LockKeyhole } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch project from DB
    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('id', params.id)
        .single();

    // For visual mock purposes if not found in DB
    const mockProject = {
        id: params.id,
        title: "Torre Empresarial Horizonte",
        location: "Chacao, Caracas",
        image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        target_amount: 500000,
        current_amount: 325000,
        estimated_return: 14.5,
        duration_months: 24,
        status: "FUNDING",
        investment_type: "PLUSVALIA",
        description: "Desarrollo de oficinas prime en el corazón financiero de la ciudad. El proyecto contempla la remodelación integral de un edificio de 4 plantas para adaptarlo a las nuevas normativas de espacios colaborativos (Coworking) y empresas tecnológicas. Incluye certificación LEED y áreas verdes.",
    };

    const projectData = project || mockProject;

    if (!projectData) {
        notFound();
    }

    const progress = (projectData.current_amount / projectData.target_amount) * 100;
    const isFunding = projectData.status === 'FUNDING';

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#060B19] pb-24">
            {/* Hero Header Section */}
            <div className="relative w-full h-[60vh] min-h-[500px] bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#060B19] via-slate-900/60 to-[#060B19]/40 z-10" />
                <Image
                    src={projectData.image_url || "/placeholder.jpg"}
                    alt={projectData.title}
                    fill
                    className="object-cover opacity-70"
                />

                <div className="absolute bottom-0 left-0 w-full z-20 pb-24 md:pb-32 pt-16 bg-gradient-to-t from-[#060B19] via-[#060B19]/80 to-transparent">
                    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                            {/* Title Column */}
                            <div className="lg:col-span-8">
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    <span className="bg-slate-300 text-slate-800 px-4 py-1.5 text-sm font-bold rounded-full">
                                        {isFunding ? 'Financiando' : projectData.status}
                                    </span>
                                    <span className="bg-[#1E2433] text-white border border border-white/10 px-4 py-1.5 text-sm font-semibold rounded-full flex items-center">
                                        <Building2 className="w-4 h-4 mr-2 text-primary" />
                                        {projectData.investment_type === 'RENTAS' ? 'Préstamo' : 'Plusvalía'}
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
                                    {projectData.title}
                                </h1>

                                <div className="flex items-center text-lg text-slate-300 font-medium">
                                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                                    {projectData.location}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content & Sidebar Grid */}
            <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-30 -mt-16 sm:-mt-20 md:-mt-24 mb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column (Content) */}
                    <div className="lg:col-span-8 bg-white dark:bg-[#0A0F1C] rounded-xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-100 dark:border-slate-800 relative z-30">

                        {/* Pre-Description Legal/Financial Summary Block */}
                        <div className="text-slate-900 dark:text-white mb-10 border-l-4 border-primary pl-6">
                            <h3 className="font-bold mb-2 uppercase text-xs tracking-wider text-primary">**PRÓXIMA APERTURA EL JUEVES 26 DE FEBRERO A LAS 16:00 (UTC-4)**</h3>
                            <h4 className="font-bold mt-4 mb-3 text-xl">Proyecto {projectData.title} | {projectData.location}</h4>
                            <ul className="list-none text-sm space-y-2 text-slate-600 dark:text-slate-300">
                                <li className="flex items-center"><TrendingUp className="w-4 h-4 mr-2 text-primary" /> Proyecto de deuda en {projectData.location}</li>
                                <li>Importe Tramo A: ${projectData.target_amount.toLocaleString()} // Plazo: {projectData.duration_months} meses</li>
                                <li>{projectData.estimated_return - 2}% Interés anual simple | {projectData.estimated_return}% Rentabilidad total</li>
                                <li>Intereses mínimos garantizados a 6 meses</li>
                                <li>Hipoteca de primer rango sobre el activo subyacente del proyecto.</li>
                            </ul>

                            <p className="text-sm mt-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                                Os presentamos un nuevo proyecto que consiste en la concesión de un préstamo para financiar parcialmente los costes de desarrollo estructural y gastos generales consistentes en un edificio comercial. El promotor abonará mediante Fondos Propios el importe restante de los costes de construcción...
                            </p>
                            <p className="text-sm mt-4 font-bold text-primary">
                                VER DETALLES ↓
                            </p>
                        </div>

                        {/* Blurred Description Section for Guests */}
                        <div className="h-px w-full bg-slate-200 dark:bg-slate-800 my-8"></div>
                        <section className={`bg-transparent relative overflow-hidden ${!user ? 'min-h-[450px]' : ''}`}>
                            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center">
                                <FileText className="w-5 h-5 mr-3 text-primary" />
                                Información Detallada del Proyecto
                            </h2>

                            <div className={`prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed ${!user ? 'blur-md select-none transition-all duration-500 rounded-xl' : ''}`}>
                                <p>
                                    {projectData.description || "Este proyecto representa una oportunidad única en el mercado actual debido a su ubicación estratégica y el déficit de oferta tipo A en la zona."}
                                </p>
                                <p className="mt-4">
                                    Actualmente, la estructura se encuentra en fase de permisología y con el promotor asegurando los primeros acuerdos de pre-alquiler. Los proyectos de este tipo suelen ofrecer resiliencia contra la inflación al estar anclados en activos reales generadores de flujo de caja.
                                </p>
                            </div>

                            {!user && (
                                <div className="absolute inset-0 top-14 z-[5] flex flex-col items-center justify-center bg-transparent backdrop-blur-[3px] rounded-xl p-4">
                                    <div className="bg-[#161B26] p-8 sm:p-10 rounded-2xl shadow-2xl border border-slate-800 text-center max-w-[420px] w-full">
                                        <LockKeyhole className="w-12 h-12 text-primary mx-auto mb-5" />
                                        <h3 className="text-xl font-bold mb-2 text-white leading-tight">Para ver esta información debes estar logueado</h3>
                                        <p className="text-slate-400 mb-8 text-sm">
                                            Si todavía no estás dado de alta, ¿a qué estás esperando?
                                        </p>
                                        <div className="flex flex-col gap-4 items-center w-full">
                                            <Button asChild className="w-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 h-12 rounded-lg text-sm">
                                                <Link href="/login">SABER MÁS</Link>
                                            </Button>
                                            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold transition-colors mt-1">
                                                Si ya tienes cuenta, accede aquí
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Right Column (Sidebar / The Dark Metrics Box) */}
                    <div className="lg:col-span-4 bg-[#161B26] border border-slate-800 rounded-xl shadow-2xl overflow-hidden sticky top-24 z-40">
                        {/* Top Accent Bar */}
                        <div className="w-full relative flex justify-end p-6 border-b border-slate-800 bg-[#1E2433]">
                            <div className="absolute top-0 right-0 bg-blue-400 text-blue-950 px-6 py-3 rounded-bl-xl font-bold flex flex-col items-center">
                                <span className="text-[10px] uppercase tracking-wider font-semibold opacity-80">Rentabilidad total</span>
                                <span className="text-2xl leading-none">{projectData.estimated_return}%</span>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="space-y-6">
                                {/* Financiado vs Total */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="block text-xs text-slate-400 font-medium mb-1">Financiado</span>
                                        <span className="font-bold text-lg text-white">${projectData.current_amount.toLocaleString()}</span>
                                    </div>
                                    <div className="border-l border-slate-800 pl-4">
                                        <span className="block text-xs text-slate-400 font-medium mb-1">Total</span>
                                        <span className="font-bold text-lg text-white">${projectData.target_amount.toLocaleString()}</span>
                                    </div>
                                </div>

                                <p className="text-xs text-slate-400 leading-relaxed border-b border-slate-800 pb-6">
                                    Este proyecto ya está financiado. Si deseas invertir, indica el importe y acepta las condiciones. En caso de que otro inversor desista durante el plazo legal, tu inversión se ejecturará automáticamente priorizando el orden de llegada.
                                </p>

                                {/* Inversores vs Plazo */}
                                <div className="grid grid-cols-2 gap-4 border-b border-slate-800 pb-6">
                                    <div>
                                        <span className="block text-xs text-slate-400 font-medium mb-1">Inversores</span>
                                        <span className="font-bold text-sm text-white">581</span>
                                    </div>
                                    <div className="border-l border-slate-800 pl-4">
                                        <span className="block text-xs text-slate-400 font-medium mb-1">Plazo De Inversión</span>
                                        <span className="font-bold text-sm text-white">{projectData.duration_months} meses</span>
                                    </div>
                                </div>

                                {/* Resumen económico */}
                                <div>
                                    <span className="block text-sm font-bold text-white mb-3">Resumen económico</span>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs text-slate-400">Tipo de interés</span>
                                        <span className="text-xs font-bold text-white">11%</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-xs text-slate-400">Rentabilidad Total</span>
                                        <span className="text-xs font-bold text-white">{projectData.estimated_return}%</span>
                                    </div>

                                    <Button asChild size="sm" className="w-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 text-xs rounded-full h-10">
                                        <Link href={user ? `/dashboard/invest/${projectData.id}` : "/login"}>
                                            {user ? "SOLICITAR INVERSIÓN" : "REGÍSTRATE PARA INVERTIR"}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
