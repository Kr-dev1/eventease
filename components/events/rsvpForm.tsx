"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import axios from "axios";

const rsvpSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, "First name is required")
        .max(50, "First name is limited to 50 characters"),
    lastName: z
        .string()
        .trim()
        .min(1, "Last name is required")
        .max(50, "Last name is limited to 50 characters"),
    email: z.string().email("Invalid email address"),
    attending: z.enum(["yes", "no", "maybe"], {
        required_error: "Please select if you are attending",
    }),
    message: z.string().max(200).optional(),
});

type RsvpFormProps = {
    id: string;
};

export default function RsvpForm({ id }: RsvpFormProps) {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false)

    const form = useForm<z.infer<typeof rsvpSchema>>({
        resolver: zodResolver(rsvpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            attending: "yes",
            message: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof rsvpSchema>) => {
        console.log(data);

        setIsSubmitting(true);
        try {
            const response = axios.post(`/api/event/${id}/rsvp`, { data })
            toast.success(`RSVP received for ${data.firstName}!`);
            form.reset();
            setSubmitted(true)
        } catch (error) {
            toast.error("Failed to submit RSVP.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-zinc-900">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                EventEase RSVP
            </h2>
            <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                Please fill out the form below to confirm your attendance.
            </p>
            <Form {...form}>
                <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <LabelInputContainer className="mb-4">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <FormControl>
                                            <Input
                                                id="firstName"
                                                placeholder="Tyler"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </LabelInputContainer>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <LabelInputContainer className="mb-4">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <FormControl>
                                            <Input
                                                id="lastName"
                                                placeholder="Durden"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </LabelInputContainer>
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="email">Email Address</Label>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            placeholder="you@email.com"
                                            type="email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </LabelInputContainer>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="attending"
                        render={({ field }) => (
                            <FormItem className="mb-4">
                                <Label>Are you attending?</Label>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex space-x-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="yes" id="attending-yes" />
                                            <Label htmlFor="attending-yes">Yes</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="maybe" id="attending-yes" />
                                            <Label htmlFor="attending-maybe">Maybe</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="no" id="attending-no" />
                                            <Label htmlFor="attending-no">No</Label>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <LabelInputContainer className="mb-4">
                                    <Label htmlFor="message">Message (optional)</Label>
                                    <FormControl>
                                        <Input
                                            id="message"
                                            placeholder="Any notes for the host?"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </LabelInputContainer>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        variant="outline"
                        disabled={isSubmitting}
                        className="group/btn relative block h-10 w-full rounded-md font-medium text-white bg-zinc-800 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-800 shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                    >
                        {isSubmitting ? "Submitting..." : "RSVP →"}
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
