"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, X, CalendarIcon } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const eventSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    dateTime: z.string({
        required_error: "Please select a date and time",
    }).min(1, "Date and time is required"),
    location: z.string({
        required_error: "Location is required",
    }).min(3, "Location must be at least 3 characters"),
    description: z.string({
        required_error: "Description is required",
    }).min(10, "Description must be at least 10 characters"),
    customFields: z.array(z.object({
        label: z.string(),
        value: z.string()
    }))
})

type EventFormData = z.infer<typeof eventSchema>

const Page = () => {
    const form = useForm<EventFormData>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            customFields: [],
            title: "",
            dateTime: "",
            location: "",
            description: ""
        }
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "customFields"
    })

    const onSubmit = async (data: EventFormData) => {
        try {
            const response = await fetch('/api/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Failed to create event')
            }
            window.location.href = '/event'
        } catch (error) {
            console.error('Error creating event:', error)
        }
    }

    return (
        <div className="container mx-auto p-6 max-w-3xl">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">Create New Event</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Event Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter event title" {...field} />
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
                                                <Input placeholder="Enter event location" {...field} />
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
                                                <Textarea
                                                    placeholder="Enter event description"
                                                    className="h-32"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <FormLabel>Custom Fields</FormLabel>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="cursor-pointer"
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

                            <Button type="submit" className="w-full cursor-pointer">
                                Create Event
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Page