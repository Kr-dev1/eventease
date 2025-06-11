"use server";

import { prisma } from "@/lib/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function deleteEvent(eventId: string) {
  await prisma.event.delete({
    where: { id: eventId },
  });
  revalidatePath("/event");
}

export async function getEventById(eventId: string) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      owner: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  return event;
}
