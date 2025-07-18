import { prisma } from "@/lib/prisma/prisma";
import { signUpSchema } from "@/schema/signUpSchema";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    // Validate inputs with schema
    const parsed = signUpSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        {
          success: false,
          errors: parsed.error.errors.map((e) => ({
            field: e.path[0],
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    const { email, password, name } = parsed.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "User already exists for this email",
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    console.log(newUser);

    return Response.json(
      {
        success: true,
        message: "User created successfully",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};
