import { prisma } from "@/lib/prisma/prisma";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await req.json();
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return Response.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    const existing = await prisma.rSVP.findFirst({
      where: {
        email: body.data.email,
        eventId: event.id,
      },
    });

    if (existing) {
      return Response.json(
        { success: false, message: "You have already RSVP'd to this event." },
        { status: 409 }
      );
    }

    const newRsvp = await prisma.rSVP.create({
      data: {
        name: `${body.data.firstName} ${body.data.lastName}`,
        email: body.data.email,
        attending: body.data.attending,
        message: body.data.message,
        eventId: event.id,
      },
    });

    const updatedEvent = await prisma.event.findFirst({
      where: { id },
      include: {
        RSVP: true,
      },
    });
    return Response.json(
      {
        success: true,
        message: "Response submitted successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        success: true,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
