"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        redirect("/login?message=Could not authenticate user");
    }

    revalidatePath("/", "layout");
    redirect("/dashboard");
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    const document_id = formData.get("document_id") as string;

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        options: {
            data: {
                full_name: formData.get("full_name") as string,
                document_id,
            }
        }
    };

    const { data: authData, error } = await supabase.auth.signUp(data);

    if (error) {
        redirect("/login?message=Could not authenticate user");
    }

    if (authData.user) {
        const { error: profileError } = await supabase
            .from("profiles")
            .update({ document_id })
            .eq("id", authData.user.id);

        if (profileError) {
            console.error("Error updating profile document ID:", profileError);
        }
    }

    revalidatePath("/", "layout");
    redirect("/dashboard/kyc");
}

export async function signout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    redirect("/");
}
