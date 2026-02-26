import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Button } from "./ui/button";
import { signout } from "@/app/login/actions";

export default async function Navbar() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="w-full max-w-7xl flex justify-between items-center p-3 px-5 text-sm">
                <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"} className="text-xl tracking-tighter">
                        INVI<span className="text-primary">.</span>
                    </Link>
                    <div className="hidden md:flex gap-4 font-normal text-muted-foreground ml-6">
                        <Link href="/#catalogo" className="hover:text-foreground transition-colors">Proyectos</Link>
                        <Link href="/#como-funciona" className="hover:text-foreground transition-colors">Cómo Funciona</Link>
                        <Link href="/#quienes-somos" className="hover:text-foreground transition-colors">Quiénes Somos</Link>
                        <Link href="/#contacto" className="hover:text-foreground transition-colors">Contacto</Link>
                    </div>
                </div>
                {!user ? (
                    <div className="flex gap-2">
                        <Button asChild variant="ghost" size="sm">
                            <Link href="/login">Iniciar Sesión</Link>
                        </Button>
                        <Button asChild size="sm">
                            <Link href="/login">Crear Cuenta</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-foreground/80 hidden sm:block">
                            {user.email}
                        </div>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/dashboard">Panel</Link>
                        </Button>
                        <form action={signout}>
                            <Button variant="ghost" size="sm">
                                Salir
                            </Button>
                        </form>
                    </div>
                )}
            </div>
        </nav>
    );
}
