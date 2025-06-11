import { auth } from "@/auth"
import EventForm from "@/components/events/EventForm"
import { redirect } from "next/navigation"

const Page = async () => {
    const session = await auth()

    if (!session) {
        redirect('/login')
    }

    // Only allow ADMIN and STAFF to create events
    if (session.user.role === 'USER') {
        redirect('/event')
    }

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-8">Create New Event</h1>
                <EventForm actionType="create" />
            </div>
        </div>
    )
}

export default Page