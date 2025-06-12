import { auth } from "@/auth";
import { prisma } from "@/lib/prisma/prisma";

// GET: Fetch all users (admin only)
export async function GET() {
  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return Response.json({ success: true, users });
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH: Update user role (admin only)
export async function PATCH(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  const { id, role } = await req.json();
  if (!id || !role) {
    return Response.json(
      { success: false, message: "Missing user id or role" },
      { status: 400 }
    );
  }
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    return Response.json({ success: true, user: updatedUser });
  } catch (error) {
    return Response.json(
      { success: false, message: "Failed to update user role" },
      { status: 500 }
    );
  }
}
