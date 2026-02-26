import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Upload, AlertCircle } from "lucide-react";

export default async function KYCPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("kyc_status, document_id")
        .eq("id", user.id)
        .single();

    if (profile?.kyc_status === 'APPROVED') {
        return redirect("/dashboard");
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center p-4">
            <Card className="max-w-md w-full">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                        <ShieldCheck className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Validación de Identidad</CardTitle>
                    <CardDescription>
                        Para proteger a todos los inversores y cumplir con las normativas, necesitamos verificar tu identidad.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-muted p-4 rounded-lg flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div className="text-sm text-muted-foreground">
                            <p className="font-medium text-foreground mb-1">Tu cuenta está casi lista</p>
                            Tu documento de identidad registrado es: <span className="font-mono bg-background px-1 py-0.5 rounded">{profile?.document_id || 'No registrado'}</span>. Por favor, sube una foto clara de tu documento para finalizar el proceso.
                        </div>
                    </div>

                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center space-y-4 hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="mx-auto bg-background p-3 rounded-full w-fit shadow-sm border">
                            <Upload className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Haz clic para subir tu documento</p>
                            <p className="text-xs text-muted-foreground mt-1">PNG, JPG o PDF hasta 5MB</p>
                        </div>
                    </div>

                    <Button className="w-full" asChild>
                        <a href="/dashboard">
                            Continuar al Dashboard
                        </a>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                        Nota: Esta es una pantalla de demostración (MVP). Puedes continuar al dashboard incluso sin subir un archivo.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
