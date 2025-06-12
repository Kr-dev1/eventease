import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import AppSideBar from "./dashboard/app-sidebar";
import {
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/auth";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "EventEase | Authorization",
    description: "EventEase is a modern full-stack event management application.",
};

const ProtectedLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const session = await auth();
    return (
        <div className="min-h-screen flex flex-col">
            <SidebarProvider>
                <div className="flex flex-1">
                    <AppSideBar session={session?.user} />
                    <main className="flex-1 p-6">
                        <div className="container mx-auto">
                            <SidebarTrigger />
                            {children}
                        </div>
                    </main>
                </div>
            </SidebarProvider>
            <Footer />
        </div>
    );
};

export default ProtectedLayout;