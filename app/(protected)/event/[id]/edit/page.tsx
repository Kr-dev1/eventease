import { auth } from "@/auth";
import EventForm from "@/components/events/EventForm";
import { prisma } from "@/lib/prisma/prisma";
import { redirect } from "next/navigation";

async function getEvent(eventId: string) {
    const session = await auth();
    if (!session) redirect('/login');

    const event = await prisma.event.findUnique({
        where: { id: eventId }
    });

    if (!event) redirect('/event');

    // Check authorization
    const isAuthorized =
        session.user.role === 'ADMIN' ||
        session.user.role === 'STAFF' ||
        event.ownerId === session.user.id;

    if (!isAuthorized) {
        redirect('/event');
    }

    return { event, session };
}

export default async function Page({ params }: { params: { id: string } }) {
    const { event } = await getEvent(params.id);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-8">Edit Event</h1>
            <EventForm 
                initialData={event}
                actionType="edit"
            />
        </div>
    );
}