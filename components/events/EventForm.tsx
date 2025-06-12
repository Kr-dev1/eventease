'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { CalendarIcon, PlusCircle, X } from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import { eventSchema } from "@/schema/eventSchema";

interface EventFormProps {
    initialData?: any;
    actionType: "create" | "edit";
}

const EventForm = ({ initialData, actionType }: EventFormProps) => {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: initialData ? {
            ...initialData,
            dateTime: new Date(initialData.dateTime).toISOString().slice(0, 16),
            customFields: initialData.customFields || []
        } : {
            title: "",
            description: "",
            dateTime: "",
            location: "",
            customFields: []
        }
    });

    const {
        formState: { isDirty }
    } = form;

    const { fields, append, remove } = useFieldArray({
        name: "customFields",
        control: form.control
    });

    const onSubmit = async (values: z.infer<typeof eventSchema>) => {
        // Remove customFields with empty label and value before submitting
        const filteredValues = {
            ...values,
            customFields: Array.isArray(values.customFields)
                ? values.customFields.filter(
                    (f) => f.label.trim() !== "" || f.value.trim() !== ""
                )
                : [],
        };

        try {
            const url = actionType === "create"
                ? "/api/event"
                : `/api/event/${initialData.id}`;

            const response = await axios({
                method: actionType === "create" ? "POST" : "PATCH",
                url: url,
                data: filteredValues,
            });

            if (response.data) {
                toast.success(
                    actionType === "create"
                        ? "Event created successfully!"
                        : "Event updated successfully!"
                );
                router.push("/event");
                router.refresh();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || "Something went wrong";
                toast.error(errorMessage);
                console.error("API Error:", errorMessage);
            } else {
                toast.error("An unexpected error occurred");
                console.error("Error:", error);
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="dateTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date and Time</FormLabel>
                            <FormControl>
                                <div
                                    className="relative cursor-pointer"
                                    onClick={(e) => {
                                        const input = e.currentTarget.querySelector('input');
                                        if (input) {
                                            input.showPicker();
                                        }
                                    }}
                                >
                                    <Input
                                        type="datetime-local"
                                        className="pr-10 [&::-webkit-calendar-picker-indicator]:opacity-0 cursor-pointer"
                                        min={new Date().toISOString().slice(0, 16)}
                                        {...field}
                                    />
                                    <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <FormLabel>Custom Fields</FormLabel>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="cursor-pointer"
                            disabled={fields.length >= 5}
                            onClick={() => append({ label: '', value: '' })}
                        >
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Add Field
                        </Button>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-4 items-start">
                            <FormField
                                control={form.control}
                                name={`customFields.${index}.label`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input placeholder="Field Label" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`customFields.${index}.value`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input placeholder="Field Value" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer"
                                onClick={() => remove(index)}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end items-center gap-4">
                    <Button variant='outline'>
                        <Link href="/event">
                            Cancel
                        </Link>
                    </Button>
                    <Button
                        type="submit"
                        disabled={!isDirty}
                    >
                        {actionType === "create" ? "Create" : "Update"} Event
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default EventForm;