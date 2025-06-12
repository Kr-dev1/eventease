import { auth } from "@/auth";
import { prisma } from "@/lib/prisma/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;
    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return Response.json(
        {
          success: false,
          message: "No event found",
        },
        { status: 400 }
      );
    }

    // Check authorization
    if (
      session.user.role === "USER" ||
      (session.user.role !== "ADMIN" && event.ownerId !== session.user.id)
    ) {
      return Response.json(
        {
          success: false,
          message: "Forbidden",
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, description, dateTime, location, customFields } = body;

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        title,
        description,
        dateTime: new Date(dateTime),
        location,
        customFields,
      },
    });

    return Response.json({
      success: true,
      data: updatedEvent,
    });
  } catch (error) {
    console.error("[EVENT_PATCH]", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
