import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { firstName, lastName, phone, address, email, password } =
      await request.json();

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        phone,
        address,
        email,
        password,
      },
    });

    return new Response(
      JSON.stringify({
        status: 200,
        messege: "Signed Up Successful",
        id: newUser.id,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        status: 500,
        messege: "Failed to Sign Up",
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
