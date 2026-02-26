import Link from "next/link"
import { ShieldCheck, Mail, MapPin, ExternalLink, Instagram, Linkedin, Twitter, Youtube } from "lucide-react"

export function Footer() {
    return (
        <footer className="w-full bg-[#1A1F2B] text-slate-300">

            {/* Top Main Section */}
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Brand & Contact Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/#inicio" className="flex items-center space-x-2">
                            <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground">
                                IN
                            </span>
                            <span className="text-2xl font-bold text-white tracking-widest">
                                INVI
                            </span>
                        </Link>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center space-x-3 text-sm">
                                <div className="w-10 h-10 rounded-full bg-[#242B38] flex items-center justify-center flex-shrink-0">
                                    <span className="text-xl">📞</span>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Llámanos (L-V, 9h a 18h)</p>
                                    <p className="text-lg font-bold text-white font-mono">+58 (212) 555-0198</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 text-sm">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <a href="mailto:contacto@invi.com" className="text-base font-semibold text-primary hover:text-primary/80 transition-colors">
                                    contacto@invi.com
                                </a>
                            </div>
                        </div>

                        <div className="flex space-x-4 pt-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-[#242B38] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all content-center">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#242B38] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all content-center">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#242B38] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all content-center">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#242B38] flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all content-center">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Spacer */}
                    <div className="hidden lg:block lg:col-span-1"></div>

                    {/* Links: Ayuda */}
                    <div className="lg:col-span-3 space-y-6">
                        <h4 className="text-lg font-bold text-white flex items-center">
                            Ayuda
                        </h4>
                        <ul className="space-y-4">
                            <li><Link href="#" className="text-sm hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 mr-2"></span> FAQ</Link></li>
                            <li><Link href="#contacto" className="text-sm hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 mr-2"></span> Contacto</Link></li>
                            <li><Link href="#" className="text-sm hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 mr-2"></span> Información básica para el inversor</Link></li>
                            <li><Link href="#" className="text-sm hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 mr-2"></span> Cómo funciona</Link></li>
                        </ul>
                    </div>

                    {/* Links: Legal */}
                    <div className="lg:col-span-4 space-y-6">
                        <h4 className="text-lg font-bold text-white flex items-center">
                            Legal y Cuentas
                        </h4>
                        <ul className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                            <li><Link href="#" className="text-sm hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 mr-2"></span> Términos de uso</Link></li>
                            <li><Link href="#" className="text-sm hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 mr-2"></span> Política de privacidad</Link></li>
                            <li><Link href="#" className="text-sm hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 mr-2"></span> Política de Cookies</Link></li>
                            <li><Link href="#" className="text-sm hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 mr-2"></span> Información financiera</Link></li>
                            <li><Link href="#" className="text-sm hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 mr-2"></span> Canal de denuncias</Link></li>
                            <li><Link href="#" className="text-sm hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 mr-2"></span> Defensa del cliente</Link></li>
                            <li><Link href="#" className="text-sm hover:text-primary transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-600 mr-2"></span> Conflictos de interés</Link></li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Disclaimers & Legal Fine Print */}
            <div className="border-t border-[#242B38] bg-[#161B26]">
                <div className="container mx-auto px-4 md:px-6 py-8">
                    <div className="text-[11px] leading-relaxed text-slate-500 space-y-4 text-justify">
                        <p>
                            INVI Real Estate Platform CA es una plataforma tecnológica que facilita el acceso a oportunidades de inversión inmobiliaria a través de la formación de fideicomisos participativos y esquemas de co-inversión, operando bajo el marco de la legislación civil y mercantil vigente en la República Bolivariana de Venezuela. INVI NO es una entidad bancaria, compañía de seguros, caja de ahorros, ni casa de bolsa autorizada por la SUDEVAL.
                        </p>
                        <p>
                            La información publicada en invi.com.ve o en la aplicación móvil tiene fines ilustrativos e informativos y no constituye una asesoría financiera, legal ni fiscal, ni puede considerarse como una recomendación u obligación para invertir. Las proyecciones de rentabilidad y plazos (TIR, ROI, Cash-on-Cash) se basan en análisis de mercado exhaustivos y en el desempeño previo de los desarrolladores aliados, pero en ningún caso representan una garantía absoluta debido a la naturaleza intrínseca del mercado inmobiliario y las condiciones macroeconómicas.
                        </p>
                        <p>
                            Adyacente a cualquier inversión en activos reales pueden existir riesgos tales como la falta temporal de liquidez del activo, problemas constructivos de los contratistas, cambios en las normativas urbanísticas, depreciación en moneda local y la pérdida eventual del capital. Instamos enérgicamente a todos nuestros usuarios a diversificar sus carteras invirtiendo montos que estén en la capacidad de asumir bajo riesgo de pérdida o inmovilización de capital. En el caso de que el proyecto no recaude el 100% de la financiación dentro del lapso estipulado, INVI restituirá el importe depositado a cada participante en sus respectivas billeteras digitales internas íntegramente y sin ninguna comisión compensatoria.
                        </p>
                    </div>

                    {/* Bottom Branding / Copyright */}
                    <div className="mt-8 pt-6 border-t border-[#242B38] flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-slate-500">
                            © {new Date().getFullYear()} INVI Desarrollos Colectivos C.A. Todos los derechos reservados.
                        </p>
                        <div className="flex items-center space-x-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                            {/* Trust badges placeholders */}
                            <ShieldCheck className="w-6 h-6" />
                            <div className="h-4 w-px bg-slate-700"></div>
                            <span className="text-[10px] font-bold tracking-widest uppercase">Secured Platform</span>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    )
}
