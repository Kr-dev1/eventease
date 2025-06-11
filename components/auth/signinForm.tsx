"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { signInSchema } from "@/schema/signInSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from 'next-auth/react'

export default function SignInForm() {
    const router = useRouter()
    const handleSubmit = async (data: z.infer<typeof signInSchema>) => {
        try {
            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });
            if (response?.error) {
                toast.error(response.error);
                return;
            }

            toast.success("Signed in successfully!");
            router.push("/dashboard");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })
    return (
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-zinc-900">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                Welcome to EventEase
            </h2>
            <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                Your all-in-one platform for effortless event planning
            </p>
            <Form {...form}>
                <form className="my-8" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="email">Email Address</Label>
                                <FormControl>
                                    <Input id="email" placeholder="projectmayhem@fc.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </LabelInputContainer>
                        </FormItem>
                    )}
                    />
                    <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                            <LabelInputContainer className="mb-4">
                                <Label htmlFor="password">Password</Label>
                                <FormControl>
                                    <Input id="password" placeholder="••••••••" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </LabelInputContainer>
                        </FormItem>
                    )}
                    />
                    <Button
                        variant='default'
                        className="group/btn relative block h-10 w-full rounded-md font-medium text-white bg-zinc-800 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-800 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                        type="submit"
                    >
                        Sign In &rarr;
                        <BottomGradient />
                    </Button>
                </form>
            </Form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
            {children}
        </div>
    );
};
