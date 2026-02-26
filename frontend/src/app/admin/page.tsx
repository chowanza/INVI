import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export default async function AdminPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Verificar si es ADMIN
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "ADMIN") {
        return (
            <div className="flex h-[80vh] w-full items-center justify-center p-4">
                <Card className="max-w-md bg-destructive/5 border-destructive/20 border">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 bg-destructive/10 p-3 rounded-full w-fit">
                            <ShieldAlert className="h-8 w-8 text-destructive" />
                        </div>
                        <CardTitle className="text-destructive font-bold text-2xl">Acceso Denegado</CardTitle>
                        <CardDescription className="text-base mt-2">
                            No tienes los permisos necesarios para acceder al panel de administración de INVI.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center pt-2">
                        <Button asChild variant="outline">
                            <a href="/dashboard">Volver a mi Panel</a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-8 max-w-6xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Admin INVI</h1>
                    <p className="text-muted-foreground mt-1">Gestión de proyectos y usuarios de la plataforma.</p>
                </div>
                <Button>Crear Nuevo Proyecto</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Inversores
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">128</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            KYC Pendientes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-amber-500">14</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Proyectos en Fondeo
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Capital Gestionado
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            $1.4M
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Últimos Proyectos</CardTitle>
                    <CardDescription>Catálogo en fase de recaudación</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-muted-foreground bg-muted p-8 rounded-md text-center border-dashed border-2">
                        Aquí se listarán en una tabla los proyectos activos conectados a Supabase.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
