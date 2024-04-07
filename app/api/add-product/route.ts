// src/pages/api/add-product.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { name, description, price, userId, rate, rent, status, categories } =
      await request.json();

    // Fetch or create categories
    const categoryIds = await Promise.all(
      categories.map(async (category) => {
        const existingCategory = await prisma.category.findUnique({
          where: { name: category.name },
        });
        if (existingCategory) {
          return existingCategory.id;
        } else {
          const newCategory = await prisma.category.create({
            data: {
              name: category.name,
            },
          });
          return newCategory.id;
        }
      })
    );

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        userId,
        rate,
        rent,
        status,
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
      },
      include: {
        categories: true,
      },
    });

    return new Response(
      JSON.stringify({ status: 200, messege: "Added product successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        status: 500,
        messege: "Failed to create the product",
        error: error,
      }),
      {
        status: 500,
      }
    );
  }
}
