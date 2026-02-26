import { ProjectCard, ProjectData } from "@/components/ProjectCard"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShieldCheck, Building2, TrendingUp, Zap } from "lucide-react"
import { InvestmentSimulator } from "@/components/InvestmentSimulator"
import { TiposDeProyectos } from "@/components/TiposDeProyectos"
import { FeaturedProjectBanner } from "@/components/FeaturedProjectBanner"

import { createClient } from "@/utils/supabase/server"

export default async function Home() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
  }

  let activeProjects = projects || [];

  if (activeProjects.length === 0) {
    activeProjects = [
      {
        id: "mock-1",
        title: "Torre Empresarial Horizonte",
        location: "Chacao, Caracas",
        image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        target_amount: 500000,
        current_amount: 325000,
        estimated_return: 14.5,
        duration_months: 24,
        status: "FUNDING",
      },
      {
        id: "mock-2",
        title: "Residencias El Ávila",
        location: "Altamira, Caracas",
        image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
        target_amount: 120000,
        current_amount: 110000,
        estimated_return: 11.0,
        duration_months: 12,
        status: "IN_PROGRESS",
      },
      {
        id: "mock-3",
        title: "Logística Industrial GDL",
        location: "Valencia, Carabobo",
        image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
        target_amount: 250000,
        current_amount: 85000,
        estimated_return: 16.0,
        duration_months: 18,
        status: "FUNDING",
      }
    ] as ProjectData[];
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#0A1128] dark:bg-[#060B19] pt-28 pb-20 lg:pt-36 lg:pb-32 text-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0" />
        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="flex flex-col items-start text-left space-y-8">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></span>
                El Futuro de la Inversión Colectiva
              </div>

              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
                Invierte con los <br /> <span className="text-primary">Pies en la Tierra.</span>
              </h1>

              <p className="max-w-[600px] text-lg text-slate-300 md:text-xl leading-relaxed">
                Rentabilidad corporativa al alcance de todos. Participa en proyectos inmobiliarios prime en Venezuela desde <strong className="text-white font-semibold">$500</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button asChild size="lg" className="h-14 px-8 text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:-translate-y-1">
                  <Link href="#catalogo">Invierte Ahora</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base bg-white/5 border-slate-700 hover:bg-white/10 text-white transition-all">
                  <Link href="/login">Crear Cuenta Gratis</Link>
                </Button>
              </div>
            </div>

            <div className="relative h-[400px] lg:h-[500px] w-full hidden md:block">
              {/* Placeholder for Isometric Building Graphic */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-600/20 rounded-3xl blur-2xl" />
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-800/50 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" alt="Edificio corporativo" className="object-cover w-full h-full opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 hover:scale-105" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="w-full bg-[#060B19] border-y border-white/5 py-8">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10 text-center">
            <div className="flex flex-col p-4">
              <span className="text-3xl md:text-4xl font-bold text-white mb-2">+500</span>
              <span className="text-xs md:text-sm text-slate-400 uppercase tracking-wider font-medium">Inversores Activos</span>
            </div>
            <div className="flex flex-col p-4">
              <span className="text-3xl md:text-4xl font-bold text-primary mb-2">12.5%</span>
              <span className="text-xs md:text-sm text-slate-400 uppercase tracking-wider font-medium">Rentabilidad Promedio</span>
            </div>
            <div className="flex flex-col p-4">
              <span className="text-3xl md:text-4xl font-bold text-white mb-2">$2M+</span>
              <span className="text-xs md:text-sm text-slate-400 uppercase tracking-wider font-medium">Capital Fondeado</span>
            </div>
            <div className="flex flex-col p-4">
              <span className="text-3xl md:text-4xl font-bold text-white mb-2">12</span>
              <span className="text-xs md:text-sm text-slate-400 uppercase tracking-wider font-medium">Proyectos Exitosos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project Banner / Countdown */}
      <FeaturedProjectBanner />

      {/* Logos/Avalados por Section */}
      <section className="w-full py-12 bg-white dark:bg-[#0a0f1c] border-b border-slate-200 dark:border-slate-800/50 overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
            Avalados y respaldados por la confianza de
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Mock Badges using Lucide Icons or text for now */}
            <div className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              <ShieldCheck className="w-8 h-8" />
              <span>FirmaLegal</span>
            </div>
            <div className="flex items-center gap-2 font-black text-2xl text-slate-800 dark:text-slate-400 tracking-tighter hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              <Building2 className="w-8 h-8" />
              ConstruCorp
            </div>
            <div className="flex items-center gap-2 font-serif italic text-xl text-slate-800 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              <TrendingUp className="w-8 h-8" />
              CapitalBank
            </div>
            <div className="flex items-center gap-2 font-bold text-lg text-slate-800 dark:text-slate-400 uppercase tracking-widest hover:text-slate-900 dark:hover:text-slate-200 transition-colors">
              <Zap className="w-8 h-8" />
              TechAudit
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="w-full py-20 bg-slate-50 dark:bg-[#0a0f1c] z-10 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <InvestmentSimulator />
        </div>
      </section>

      {/* ¿Cómo Funciona? Section */}
      <section id="como-funciona" className="w-full py-24 bg-white dark:bg-[#060B19]">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">Invierte como los Grandes</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl">Un proceso transparente diseñado para democratizar el acceso al mercado inmobiliario corporativo y residencial.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-slate-200 dark:border-slate-800 z-0"></div>

            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 mb-8 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center justify-center text-primary rotate-3 group-hover:rotate-0 transition-all duration-300 ring-1 ring-slate-200 dark:ring-slate-800">
                <span className="text-4xl font-black">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Estudiamos el Mercado</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Nuestro equipo experto selecciona propiedades prime con alto potencial de plusvalía o modelos de rentas hiper-comprobables.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 mb-8 rounded-2xl bg-primary shadow-xl shadow-primary/20 flex items-center justify-center text-primary-foreground -rotate-3 group-hover:rotate-0 transition-all duration-300">
                <span className="text-4xl font-black">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Fondeo Colectivo</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Te unes a otros inversores aportando desde $500 y te conviertes en titular participativo a través de un Fideicomiso seguro.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 mb-8 rounded-2xl bg-slate-50 dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center justify-center text-primary rotate-3 group-hover:rotate-0 transition-all duration-300 ring-1 ring-slate-200 dark:ring-slate-800">
                <span className="text-4xl font-black">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Rentabilidad Real</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">Gestionamos el activo. Al finalizar la obra o mediante alquileres, recibes tus retornos directamente en tu billetera digital.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiénes Somos Section */}
      <section id="quienes-somos" className="w-full py-24 bg-slate-50 dark:bg-[#0a0f1c] border-y border-slate-200 dark:border-slate-800/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block rounded-lg bg-blue-500/10 dark:bg-blue-600/10 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-2">
                Nuestra Misión
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Democratizando el Acceso Inmobiliario en Venezuela.
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed md:text-xl">
                INVI no es solo tecnología. Somos la respuesta a la falta de financiamiento bancario tradicional. Nacimos con el propósito de conectar desarrollos inmobiliarios seguros y rentables con pequeños y medianos ahorristas que buscan proteger su capital contra la devaluación.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-center text-slate-700 dark:text-slate-300">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary mr-4 shrink-0">
                    ✓
                  </span>
                  <span>Transparencia absoluta en números e informes</span>
                </li>
                <li className="flex items-center text-slate-700 dark:text-slate-300">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary mr-4 shrink-0">
                    ✓
                  </span>
                  <span>Mitigación de riesgo estructurando sobre ladrillos reales</span>
                </li>
                <li className="flex items-center text-slate-700 dark:text-slate-300">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary mr-4 shrink-0">
                    ✓
                  </span>
                  <span>Creemos en el poder del capital trabajando en colectivo</span>
                </li>
              </ul>
            </div>

            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl shadow-primary/5">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent z-10mix-blend-overlay"></div>
              {/* Note: This is a placeholder graphic/photo of Caracas/Architecture to suit the About section */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542361345-89e58247f2d5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators (Bento Grid) */}
      <section className="relative w-full py-24 bg-white dark:bg-[#060913]">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Ingeniería Financiera a tu Alcance</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Estructuramos cada proyecto para maximizar la seguridad y el retorno de tu capital bajo estrictos estándares corporativos.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors duration-500" />
              <div className="relative z-10 flex flex-col h-full">
                <ShieldCheck className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-3">Respaldo Jurídico Inquebrantable</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md leading-relaxed">
                  Operamos bajo fideicomisos y contratos auditados. Cada participación está blindada legalmente en el marco normativo venezolano, garantizando la titularidad de tu inversión.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 hover:shadow-xl transition-all duration-300">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                    <Building2 className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Activos Tangibles</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Tu inversión no es humo. Se materializa en ladrillos, concreto y proyectos de alto perfil corporativo y residencial en zonas prime.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 group relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-slate-950 border border-slate-800 p-8 lg:p-12 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                <div className="max-w-xl">
                  <div className="inline-flex items-center rounded-lg bg-primary/20 px-3 py-1 text-sm text-primary mb-4 font-medium">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    +12% APY Estimado
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Rentabilidad que Supera al Mercado Tradicional</h3>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Estrategias duales de generación de valor: Capturamos plusvalía agresiva en remodelaciones u obra nueva, y generamos cash-flow pasivo a través de rentas corporativas y operación de coworking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipos de Proyectos */}
      <TiposDeProyectos />

      {/* Catalog Section */}
      <section id="catalogo" className="w-full py-20 lg:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Catálogo de Oportunidades</h2>
            <p className="max-w-[800px] text-slate-600 dark:text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explora los proyectos actuales. Analiza la factibilidad y decide dónde poner a trabajar tu dinero.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {activeProjects.length > 0 ? (
              activeProjects.map((project: ProjectData) => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center bg-muted/50 rounded-xl border-2 border-dashed">
                <h3 className="text-xl font-medium text-muted-foreground">Más proyectos próximamente</h3>
                <p className="text-sm text-muted-foreground mt-2">Estamos evaluando nuevas oportunidades para tu portafolio.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="w-full py-24 bg-white dark:bg-[#060B19] border-y border-slate-200 dark:border-slate-800/50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                ¿Tienes alguna duda?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Nuestro equipo de asesores financieros está listo para guiarte en tu primera inversión. Contáctanos por el canal que prefieras.
              </p>

              <div className="space-y-4 pt-4">
                <a href="https://wa.me/580000000000" target="_blank" rel="noreferrer" className="flex items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 border border-slate-200 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800/30 transition-all group">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Atención vía WhatsApp</h4>
                    <span className="text-sm text-slate-600 dark:text-slate-400">Respuesta inmediata en horario laboral</span>
                  </div>
                </a>

                <a href="mailto:hola@invi.com" className="flex items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800/30 transition-all group">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">Escríbenos un correo</h4>
                    <span className="text-sm text-slate-600 dark:text-slate-400">hola@invi.com</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Déjanos tus datos</h3>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Nombre Completo</label>
                  <input id="name" type="text" className="w-full flex h-12 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950" placeholder="Ej. Juan Pérez" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Correo Electrónico</label>
                  <input id="email" type="email" className="w-full flex h-12 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950" placeholder="juan@correo.com" />
                </div>
                <Button type="button" className="w-full h-12 text-base font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                  Solicitar Contacto
                </Button>
                <p className="text-xs text-center text-slate-500 mt-4">
                  Al enviar tus datos, aceptas nuestras <Link href="#" className="underline hover:text-primary">Políticas de Privacidad</Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
