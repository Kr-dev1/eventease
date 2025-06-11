import { auth } from "@/auth"
import DeleteModalButton from "@/components/dialogs/deleteDialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { prisma } from "@/lib/prisma/prisma"
import { CalendarDaysIcon, LocateIcon } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

const getEvents = async () => {
    const session = await auth()
    const user = session?.user.id
    if (!session || !session?.user) {
        redirect('/login')
    }
    console.log(session);

    const events = await prisma.event.findMany({
        where: {
            ownerId: user
        }
    })

    return events
}

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg">
        <CalendarDaysIcon className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">No events found</h3>
        <p className="text-sm text-gray-500 mb-4">Get started by creating your first event.</p>
        <Link
            href="/event/create"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md inline-flex items-center gap-2"
        >
            Create Event
        </Link>
    </div>
)

const Page = async () => {
    const events = await getEvents()
    return (
        <div className="container mx-auto p-3">
            <div className="flex justify-between items-center">
                <h1 className="md:mt-12 text-2xl font-semibold">Events</h1>
                <Link href='/event/create' className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
                    Create Event
                </Link>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events && events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.id}>
                            <Card className="hover:shadow-lg transition-shadow">
                                <Link href={`event/${event.id}/view`}>
                                    <CardContent className="p-6 space-y-4">
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-medium">{event.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <CalendarDaysIcon className="w-4 h-4" />
                                                <span>{event.dateTime instanceof Date ? event.dateTime.toLocaleString() : event.dateTime}</span>
                                                <LocateIcon className="w-4 h-4" />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {event.description}
                                        </p>
                                    </CardContent>
                                </Link>
                                <div className="px-6 pb-4 flex justify-end gap-2">
                                    <Link
                                        href={`/event/${event.id}/edit`}
                                    >
                                        <Button variant='outline'>
                                            Edit
                                        </Button>
                                    </Link>
                                    <DeleteModalButton eventId={event.id} />
                                </div>
                            </Card>
                        </div>
                    ))
                ) : (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center min-h-[600px]">
                        <EmptyState />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Page
