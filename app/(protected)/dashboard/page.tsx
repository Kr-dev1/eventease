import { getEventsWithRSVPs } from "@/app/(protected)/dashboard/actions";
import Dashboard from "@/components/dashboard/dashboardCharts";

export default async function page() {
    const events = await getEventsWithRSVPs();

    // Convert dateTime and createdAt to string if needed
    const eventsForDashboard = events.map(event => ({
        ...event,
        dateTime: event.dateTime instanceof Date ? event.dateTime.toISOString() : event.dateTime,
        createdAt: event.createdAt instanceof Date ? event.createdAt.toISOString() : event.createdAt,
        RSVP: event.RSVP?.map(rsvp => ({
            ...rsvp,
            createdAt: rsvp.createdAt instanceof Date ? rsvp.createdAt.toISOString() : rsvp.createdAt,
        })) ?? [],
    }));

    return (
        <div className="p-4">
            <Dashboard data={eventsForDashboard} />
        </div>
    );
}
