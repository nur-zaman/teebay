import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const { productId } = await request.json();

    await prisma.product.delete({ where: { id: productId } });

    return new Response(
      JSON.stringify({ status: 200, messege: "Product deleted successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        status: 500,
        messege: "Failed to delete the product",
        //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
