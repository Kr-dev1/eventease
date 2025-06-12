"use client";

import { useEffect, useState } from "react";
import {
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Bar,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttendeeTable } from "../events/attendeeTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { NoDataPlaceholder } from "../placeholder";

interface RSVP {
    id: string;
    name: string;
    email: string;
    attending: string;
    message: string;
    createdAt: string;
}

interface Event {
    id: string;
    title: string;
    dateTime: string;
    RSVP: RSVP[];
}

export default function Dashboard({ data }: { data: Event[] }) {
    const [rsvpCountData, setRsvpCountData] = useState<{ name: string; count: number }[]>([]);
    const [attendanceTypeData, setAttendanceTypeData] = useState<
        { name: string; yes: number; no: number; maybe: number }[]
    >([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    useEffect(() => {
        if (data.length) {
            const chartData = data.map((event) => ({
                name: event.title,
                count: event.RSVP.length,
            }));

            const compareData = data.map((event) => {
                const counts = { yes: 0, no: 0, maybe: 0 };
                event.RSVP.forEach((rsvp) => {
                    const val = rsvp.attending.toLowerCase();
                    if (val === "yes") counts.yes++;
                    else if (val === "no") counts.no++;
                    else if (val === "maybe") counts.maybe++;
                });
                return {
                    name: event.title,
                    ...counts,
                };
            });

            setRsvpCountData(chartData);
            setAttendanceTypeData(compareData);
            setSelectedEvent(data[0]);
        }
    }, [data]);

    return (
        <div className="space-y-8">
            {/* Chart Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>RSVP Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        {rsvpCountData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={rsvpCountData}>
                                    <CartesianGrid stroke="transparent" />
                                    <XAxis dataKey="name" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="#4f46e5" name="RSVPs" />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <NoDataPlaceholder message="No RSVP data available." />
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Attendance Comparison</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        {attendanceTypeData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={attendanceTypeData}>
                                    <CartesianGrid stroke="transparent" />
                                    <XAxis dataKey="name" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="yes" stackId="a" fill="#22c55e" name="Yes" />
                                    <Bar dataKey="no" stackId="a" fill="#ef4444" name="No" />
                                    <Bar dataKey="maybe" stackId="a" fill="#facc15" name="Maybe" />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <NoDataPlaceholder message="No attendance breakdown available." />
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Events Table Tabs */}
            <Card>
                <CardHeader>
                    <CardTitle>Events</CardTitle>
                </CardHeader>
                <CardContent>
                    {data.length && selectedEvent ? (
                        <Tabs
                            value={selectedEvent.id}
                            onValueChange={(val) => {
                                const found = data.find((event) => event.id === val);
                                if (found) setSelectedEvent(found);
                            }}
                            className="w-full"
                        >
                            <TabsList className="flex overflow-x-auto">
                                {data.map((event) => (
                                    <TabsTrigger
                                        key={event.id}
                                        value={event.id}
                                        className="wrap-normal"
                                    >
                                        {event.title}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {data.map((event) => (
                                <TabsContent key={event.id} value={event.id}>
                                    <Separator className="my-4" />
                                    {event.RSVP.length > 0 ? (
                                        <AttendeeTable data={event.RSVP} />
                                    ) : (
                                        <NoDataPlaceholder message="No attendees yet for this event." />
                                    )}
                                </TabsContent>
                            ))}
                        </Tabs>
                    ) : (
                        <NoDataPlaceholder message="No events available." />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
