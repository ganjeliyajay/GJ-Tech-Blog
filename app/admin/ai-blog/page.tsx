import { redirect } from "next/navigation";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import AIBlogGenerator from "@/components/admin/AIBlogGenerator";

export default async function AIBlogPage() {
    const authenticated = await isAdminAuthenticated();

    if (!authenticated) {
        redirect("/admin/login");
    }

    return <AIBlogGenerator />;
}