"use server";

import { prisma } from "@/lib/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function deleteEvent(eventId: string) {
  await prisma.event.delete({
    where: { id: eventId },
  });
  revalidatePath("/event");
}
