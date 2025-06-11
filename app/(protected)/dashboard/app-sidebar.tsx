"use client";

import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    CalendarCheck,
    LogOut,
    User
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";
import image from '@/public/image.png'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "next-auth/react"

interface AppSideBarProps {
    session?: {
        email?: string | null;
        id?: string | null;
        name?: string | null;
        role: string;
    };
}

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        roles: ["ADMIN", "EVENT_OWNER"]
    },
    {
        title: "Events",
        url: "/event",
        icon: CalendarCheck,
        roles: "all"
    },
    {
        title: "Users",
        url: "/users",
        icon: User,
        roles: ["ADMIN"]
    },
];

const AppSideBar = ({ session }: AppSideBarProps) => {
    const { open } = useSidebar();
    const pathname = usePathname();

    const handleSignOut = () => {
        signOut({ callbackUrl: '/login' });
    };

    return (
        <Sidebar collapsible="icon" variant="floating" className="">
            <SidebarHeader>
                <Image
                    src={image}
                    width={120}
                    height={100}
                    alt="Ask Repo Logo"
                    priority
                    className="w-auto h-auto"
                />
            </SidebarHeader>

            <SidebarContent className="flex justify-between">
                <div>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {items.map((item) => {
                                    const canAccess = item.roles === "all" ||
                                        (session?.role && item.roles.includes(session.role));

                                    if (!canAccess) return null;

                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <Link
                                                    href={item.url}
                                                    className={cn(
                                                        pathname === item.url && "!bg-background !text-white"
                                                    )}
                                                >
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </div>
                <div className="border-t">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {open && (
                                    <SidebarMenuItem>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="w-full flex items-center gap-2 justify-start px-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage src={""} />
                                                        <AvatarFallback>{session?.name?.[0] || "U"}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col items-start">
                                                        <span className="text-sm font-medium">{session?.name || "User"}</span>
                                                        <span className="text-xs text-muted-foreground">{session?.email || "No email"}</span>
                                                    </div>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuItem asChild>
                                                    <Link href="/profile">
                                                        <User className="mr-2 h-4 w-4" />
                                                        Profile
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={handleSignOut}>
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    Log out
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </SidebarMenuItem>
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </div>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSideBar;