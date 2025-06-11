import { auth } from "@/auth";
import DeleteModalButton from "@/components/dialogs/deleteDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma/prisma";
import { CalendarDaysIcon, Clock, MapPin, User } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const getEvent = async (id: string) => {
    const session = await auth();
    if (!session || !session.user) {
        redirect("/login");
    }

    const event = await prisma.event.findUnique({
        where: { id },
        include: {
            owner: true,
        },
    });
    if (!event) {
        redirect("/event");
    }
    return { event, session };

};

export default async function Page({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params
    const { event, session } = await getEvent(id);

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <Link href="/event">
                        <Button variant="outline">← Back to Events</Button>
                    </Link>
                    {session.user.role !== "USER" && (
                        <div className="flex gap-2">
                            <Link href={`/event/${id}/edit`}>
                                <Button variant="outline">Edit Event</Button>
                            </Link>
                            <DeleteModalButton eventId={id} />
                        </div>
                    )}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <CalendarDaysIcon className="w-5 h-5 text-gray-500" />
                                    <span>{new Date(event.dateTime).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-gray-500" />
                                    <span>{new Date(event.dateTime).toLocaleTimeString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-gray-500" />
                                    <span>{event.location}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-gray-500" />
                                    <span>Organized by {event.owner.name}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-xl font-semibold mb-2">About this event</h3>
                            <p className="text-gray-500 whitespace-pre-wrap">{event.description}</p>
                        </div>
                        {
                            Array.isArray(event.customFields) && event.customFields.map((field: any, idx: number) => (
                                <div key={idx} className="mt-6">
                                    <h3 className="text-xl font-semibold mb-2">{field.label}</h3>
                                    <p className="text-gray-500 whitespace-pre-wrap">{field.value}</p>
                                </div>
                            ))
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
