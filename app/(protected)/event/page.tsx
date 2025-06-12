import DeleteModalButton from "@/components/dialogs/deleteDialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDaysIcon, LocateIcon } from "lucide-react"
import Link from "next/link"
import { getEvents } from "./action"

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
    const { events, session } = await getEvents()
    return (
        <div className="container mx-auto p-3">
            <div className="flex justify-between items-center md:mt-12">
                <h1 className="text-2xl font-semibold">Events</h1>
                {!(session.user.role === "USER" || session.user.role === "STAFF") && (
                    <Link href="/event/create">
                        <Button>Create Event</Button>
                    </Link>
                )}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events && events.length > 0 ? (
                    events.map((event) => (
                        <div key={event.id} className="h-full">
                            <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
                                <Link href={`event/${event.id}/view`} className="flex-1">
                                    <CardContent className="p-6 space-y-4">
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-medium">{event.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                <CalendarDaysIcon className="w-4 h-4" />
                                                <span>{event.dateTime instanceof Date ? event.dateTime.toLocaleString(undefined, { hour12: true, timeStyle: 'short', dateStyle: 'short' }) : event.dateTime}</span>
                                                <LocateIcon className="w-4 h-4" />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 break-words line-clamp-2">
                                            {event.description}
                                        </p>
                                    </CardContent>
                                </Link>
                                {session.user.role !== 'USER' &&
                                    <div className="px-6 pb-4 flex justify-end gap-2 mt-auto">
                                        <Link href={`/event/${event.id}/edit`}>
                                            <Button variant='outline'>
                                                Edit
                                            </Button>
                                        </Link>
                                        <DeleteModalButton eventId={event.id} />
                                    </div>}
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
