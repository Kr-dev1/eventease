import { auth } from "@/auth";
import { prisma } from "@/lib/prisma/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    if (session.user.role === "USER" || session.user.role === "STAFF") {
      return Response.json(
        {
          success: false,
          message:
            "User dosent meet the role requirements to perform this action",
        },
        { status: 400 }
      );
    }

    const body = await req.json();
    const event = await prisma.event.create({
      data: {
        title: body.title,
        dateTime: new Date(body.dateTime),
        location: body.location,
        description: body.description,
        ownerId: session.user.id,
        customFields: body.customFields,
      },
    });

    const updatedEvent = await prisma.event.update({
      where: { id: event.id },
      data: {
        rsvpUrl: `${process.env.BASE_URL}/event/${event.id}`,
      },
    });

    return Response.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Error in POST /api/event:", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
