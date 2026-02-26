import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ProgressBar } from "@/components/ui/progress-bar"
import { MapPin, Clock, TrendingUp, Building2 } from "lucide-react"

export interface ProjectData {
    id: string
    title: string
    location: string
    image_url: string
    target_amount: number
    current_amount: number
    estimated_return: number
    duration_months: number
    status: 'FUNDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'COMING_SOON'
    investment_type?: 'PLUSVALIA' | 'RENTAS' | 'DEUDA'
    opening_date?: string // ISO string for countdown
}

// Client-side timer component for the card
function CountdownTimer({ targetDate }: { targetDate: string }) {
    // Basic static render for the server, hydration on client would make it tick.
    // For visual purposes in the catalog, we just show a static format or simple logic.
    return (
        <div className="absolute bottom-0 left-0 w-full bg-primary/90 text-primary-foreground p-3 backdrop-blur-sm flex flex-col items-center justify-center">
            <span className="text-xs font-semibold mb-1 uppercase tracking-wider">Apertura de proyecto</span>
            <div className="flex gap-2 text-xl font-bold font-mono tracking-widest drop-shadow-md">
                <span>00</span>:<span>19</span>:<span>58</span>:<span>49</span>
            </div>
            <div className="flex gap-3 text-[10px] uppercase font-medium mt-1 opacity-80">
                <span>Días</span><span>Horas</span><span>Min.</span><span>Seg.</span>
            </div>
        </div>
    )
}

interface ProjectCardProps {
    project: ProjectData
}

export function ProjectCard({ project }: ProjectCardProps) {
    const isFunding = project.status === 'FUNDING'
    const isComingSoon = project.status === 'COMING_SOON'
    const progress = (project.current_amount / project.target_amount) * 100

    // Status Badge Logic
    let statusLabel = project.status.replace('_', ' ')
    let statusBg = "bg-primary text-primary-foreground"
    if (project.status === 'COMING_SOON') {
        statusLabel = "Próxima apertura"
        statusBg = "bg-blue-400 text-blue-950" // Light purplish/blue like Urbanitae
    } else if (project.status === 'COMPLETED') {
        statusLabel = "Financiado"
        statusBg = "bg-slate-300 text-slate-800"
    } else if (project.status === 'IN_PROGRESS') {
        statusLabel = "En proceso"
        statusBg = "bg-emerald-500 text-white"
    }

    return (
        <Card className="overflow-hidden bg-white dark:bg-[#1E2433] border-none shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group ring-1 ring-slate-200 dark:ring-slate-800">
            {/* Header: Title and Location */}
            <CardHeader className="p-5 pb-4 border-b border-slate-100 dark:border-slate-800/50 bg-slate-50 dark:bg-[#161B26]">
                <h3 className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors text-slate-900 dark:text-white">{project.title}</h3>
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                    <span className="uppercase tracking-wider mr-2 text-xs">{project.investment_type || 'RESIDENCIAL'}</span>
                    <MapPin className="w-3.5 h-3.5 mr-1 text-primary" />
                    <span className="line-clamp-1">{project.location}</span>
                </div>
            </CardHeader>

            {/* Image Container */}
            <div className="relative h-56 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
                {project.image_url ? (
                    <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/50">
                        Sin Imagen
                    </div>
                )}

                {/* Top Left Badges (Status & Type) */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                    <div className={`${statusBg} px-4 py-1.5 text-sm font-bold rounded-full shadow-lg backdrop-blur-md bg-opacity-90`}>
                        {statusLabel}
                    </div>
                    <div className="bg-slate-900/80 text-white px-4 py-1.5 text-xs font-semibold rounded-full shadow-lg flex items-center border border-white/10 backdrop-blur-md w-fit">
                        <Building2 className="w-3 h-3 mr-1.5 text-orange-400" />
                        {project.investment_type === 'RENTAS' ? 'Préstamo' : 'Plusvalía'}
                    </div>
                </div>

                {/* Top Right Badge (TIR) */}
                <div className="absolute top-4 right-4 z-20">
                    <div className="bg-blue-400 text-blue-950 px-4 py-2 rounded-xl shadow-xl flex flex-col items-center justify-center font-bold">
                        <span className="text-2xl leading-none">{project.estimated_return}%</span>
                        <span className="text-[10px] uppercase tracking-wider font-semibold opacity-80 mt-1">TIR Preferente</span>
                    </div>
                </div>

                {/* Countdown Timer Overlay for Coming Soon */}
                {isComingSoon && <CountdownTimer targetDate={project.opening_date || new Date().toISOString()} />}
            </div>

            <CardContent className="p-6 pt-5 flex-grow flex flex-col justify-end bg-white dark:bg-[#1E2433]">

                {/* Progress Bar (Only show if not coming soon and not completed) */}
                {!isComingSoon && project.status !== 'COMPLETED' && (
                    <div className="space-y-2 mb-6">
                        <ProgressBar value={project.current_amount} max={project.target_amount} indicatorColor="bg-primary" className="h-1.5 bg-slate-100 dark:bg-slate-800" />
                        <div className="flex justify-between text-xs font-medium text-slate-500">
                            <span>{progress.toFixed(0)}% Financiado</span>
                            <span className="text-primary">${(project.target_amount - project.current_amount).toLocaleString()} Restantes</span>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Financiado</span>
                        <span className="font-bold text-lg md:text-xl text-slate-900 dark:text-white">${project.current_amount.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Total Proyecto</span>
                        <span className="font-bold text-lg md:text-xl text-slate-900 dark:text-white">${project.target_amount.toLocaleString()}</span>
                    </div>
                </div>

                <div className="w-full h-px bg-slate-100 dark:bg-slate-800/50 my-4" />

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Inversores</span>
                        <span className="font-bold text-base text-slate-900 dark:text-white">--</span>
                    </div>
                    <div className="flex flex-col text-right">
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">Plazo de Inversión</span>
                        <span className="font-bold text-base text-slate-900 dark:text-white">{project.duration_months} meses</span>
                    </div>
                </div>

            </CardContent>

            <CardFooter className="p-0 mt-auto bg-slate-50 dark:bg-[#161B26] border-t border-slate-200 dark:border-slate-800">
                <Link href={`/projects/${project.id}`} className="w-full text-center">
                    <div className="w-full py-4 text-emerald-600 dark:text-primary font-bold hover:bg-emerald-50 dark:hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center tracking-wide">
                        VER PROYECTO
                    </div>
                </Link>
            </CardFooter>
        </Card>
    )
}
