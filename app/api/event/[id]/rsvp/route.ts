import { prisma } from "@/lib/prisma/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    console.log(body);

    const event = await prisma.event.findUnique({
      where: { id: params.id },
    });

    if (!event) {
      return Response.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }

    const checkAlreadySubmitted = await prisma.rSVP.findMany({
      where: {
        email: body.data.email,
      },
    });

    if (checkAlreadySubmitted) {
      return Response.json(
        { success: false, message: "Already submitted" },
        { status: 409 }
      );
    }

    await prisma.rSVP.create({
      data: {
        name: `${body.data.firstName} ${body.data.lastName}`,
        email: body.data.email,
        attending: body.data.attending,
        message: body.data.message,
        eventId: event.id,
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
    return Response.json(
      {
        success: true,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
