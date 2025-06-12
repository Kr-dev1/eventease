"use server";

import { prisma } from "@/lib/prisma/prisma";

export async function getEventsWithRSVPs() {
  const events = await prisma.event.findMany({
    include: {
      RSVP: true,
    },
    orderBy: {
      dateTime: "asc",
    },
  });

  return events;
}
