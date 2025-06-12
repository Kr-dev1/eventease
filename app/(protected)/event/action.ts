"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma/prisma";
import { revalidatePath } from "next/cache";

export const getEvents = async () => {
  const session = await auth();
  const user = session?.user.id;
  if (!session || !session?.user) {
    redirect("/login");
  }

  const events =
    session.user.role !== "OWNER"
      ? await prisma.event.findMany({
          orderBy: {
            createdAt: "desc",
          },
        })
      : await prisma.event.findMany({
          where: {
            ownerId: user,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

  return { events, session };
};

export async function deleteEvent(eventId: string) {
  await prisma.event.delete({
    where: { id: eventId },
  });
  revalidatePath("/event");
}

export const getEventById = async (eventId: string) => {
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
};
