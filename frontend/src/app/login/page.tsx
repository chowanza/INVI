import { login, signup } from "./actions";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string }>;
}) {
    const message = (await searchParams).message;

    return (
        <div className="flex h-screen w-full items-center justify-center p-4">
            <div className="w-full max-w-md">
                {message && (
                    <div className="mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive text-center">
                        {message}
                    </div>
                )}
                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                        <TabsTrigger value="signup">Registrarse</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <Card>
                            <CardHeader>
                                <CardTitle>Bienvenido de vuelta</CardTitle>
                                <CardDescription>
                                    Ingresa tus credenciales para acceder a tu cuenta INVI.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email-login">Correo electrónico</Label>
                                        <Input id="email-login" name="email" type="email" placeholder="m@ejemplo.com" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password-login">Contraseña</Label>
                                        <Input id="password-login" name="password" type="password" required />
                                    </div>
                                    <Button formAction={login} className="w-full">
                                        Iniciar Sesión
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="signup">
                        <Card>
                            <CardHeader>
                                <CardTitle>Crear Cuenta</CardTitle>
                                <CardDescription>
                                    Únete a INVI para empezar a invertir en bienes raíces.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="fullname-signup">Nombre Completo</Label>
                                        <Input id="fullname-signup" name="full_name" type="text" placeholder="Juan Pérez" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="document-signup">Cédula o RIF</Label>
                                        <Input id="document-signup" name="document_id" type="text" placeholder="V-12345678" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email-signup">Correo electrónico</Label>
                                        <Input id="email-signup" name="email" type="email" placeholder="m@ejemplo.com" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password-signup">Contraseña</Label>
                                        <Input id="password-signup" name="password" type="password" required />
                                    </div>
                                    <Button formAction={signup} className="w-full">
                                        Registrarse
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
