import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");

    const whereClause: Prisma.ProductWhereInput = {};

    if (userId) {
      whereClause.userId = userId;
    }

    if (status) {
      whereClause.status =
        status as Prisma.EnumRentStatusNullableFilter<"Product">;
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        categories: true,
      },
    });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        status: 500,
        messege: "Failed to fetch products",
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
