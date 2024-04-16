import express, { Request, Response } from "express";
import { PrismaClient, Prisma, $Enums } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/add-product", async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      price,
      userId,
      rate,
      rent,
      status,
      categories,
    } = req.body;

    const categoryIds = await Promise.all(
      categories.map(async (category: { name: string }) => {
        const existingCategory = await prisma.category.findUnique({
          where: { name: category.name },
        });

        if (existingCategory) {
          return existingCategory.id;
        } else {
          const newCategory = await prisma.category.create({
            data: { name: category.name },
          });
          return newCategory.id;
        }
      })
    );

    await prisma.product.create({
      data: {
        title,
        description,
        price,
        userId,
        rate,
        rent,
        status,
        categories: { connect: categoryIds.map((id) => ({ id })) },
      },
    });

    return res
      .status(200)
      .json({ status: 200, message: "Added product successfully" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).json({
        status: 500,
        message: "Failed to create the product",
        error: error.message,
      });
    } else {
      console.error(error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error" });
    }
  }
});

router.get("/get-products", async (req: Request, res: Response) => {
  console.log("get-products");
  try {
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const exceptUserId = searchParams.get("exceptUserId");
    const exceptStatus = searchParams.get("exceptStatus");

    const whereClause: Prisma.ProductWhereInput = {};

    if (userId) {
      whereClause.userId = userId;
    }

    if (status) {
      whereClause.status =
        status as Prisma.EnumRentStatusNullableFilter<"Product">;
    }

    if (status === "null") {
      whereClause.status = { equals: null };
    }

    if (exceptUserId || exceptStatus) {
      whereClause.NOT = {
        OR: [
          ...(exceptUserId ? [{ userId: exceptUserId }] : []),
          ...(exceptStatus
            ? [{ status: exceptStatus as $Enums.RentStatus }]
            : []),
        ],
      };
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: { categories: true },
    });

    return res.status(200).json(products);
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      return res.status(500).json({
        status: 500,
        message: "Failed to fetch products",
        error: error.message,
      });
    } else {
      console.error("Unknown error:", error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error" });
    }
  }
});

router.put("/update-product", async (req: Request, res: Response) => {
  try {
    const {
      id,
      title,
      description,
      price,
      userId,
      rate,
      rent,
      status,
      categories,
    } = req.body;

    const categoryIds = await Promise.all(
      categories.map(
        async (category: { name: string; id: string; [key: string]: any }) => {
          const existingCategory = await prisma.category.findUnique({
            where: { name: category.name },
          });

          if (existingCategory) {
            return existingCategory.id;
          } else {
            const newCategory = await prisma.category.create({
              data: { name: category.name },
            });
            return newCategory.id;
          }
        }
      )
    );

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        price,
        userId,
        rate,
        rent,
        status,
        categories: { set: categoryIds.map((id) => ({ id })) },
      },
      include: { categories: true },
    });

    return res.status(200).json({
      status: 200,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).json({
        status: 500,
        message: "Failed to update the product",
        error: error.message,
      });
    } else {
      console.error(error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error" });
    }
  }
});

router.put("/update-product", async (req: Request, res: Response) => {
  try {
    const {
      id,
      title,
      description,
      price,
      userId,
      rate,
      rent,
      status,
      categories,
    } = req.body;

    const categoryIds = await Promise.all(
      categories.map(
        async (category: { name: string; id: string; [key: string]: any }) => {
          const existingCategory = await prisma.category.findUnique({
            where: { name: category.name },
          });

          if (existingCategory) {
            return existingCategory.id;
          } else {
            const newCategory = await prisma.category.create({
              data: { name: category.name },
            });
            return newCategory.id;
          }
        }
      )
    );

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        title,
        description,
        price,
        userId,
        rate,
        rent,
        status,
        categories: { set: categoryIds.map((id) => ({ id })) },
      },
      include: { categories: true },
    });

    return res.status(200).json({
      status: 200,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).json({
        status: 500,
        message: "Failed to update the product",
        error: error.message,
      });
    } else {
      console.error(error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error" });
    }
  }
});

router.delete("/delete-product", async (req: Request, res: Response) => {
  try {
    const { productId } = req.body;
    await prisma.product.delete({ where: { id: productId } });
    return res
      .status(200)
      .json({ status: 200, message: "Product deleted successfully" });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).json({
        status: 500,
        message: "Failed to delete the product",
        error: error.message,
      });
    } else {
      console.error(error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error" });
    }
  }
});

router.post("/buy-product", async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!user || !product) {
      return res
        .status(404)
        .json({ status: 404, message: "User or product not found" });
    }

    await prisma.purchase.create({ data: { userId, productId } });

    await prisma.product.update({
      where: { id: productId },
      data: { status: "SOLD" },
    });

    return res
      .status(200)
      .json({ status: 200, message: "Product purchased successfully" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).json({
        status: 500,
        message: "Failed to purchase product",
        error: error.message,
      });
    } else {
      console.error(error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error" });
    }
  }
});

router.post("/rent-product", async (req: Request, res: Response) => {
  try {
    const { userId, productId, startDate, endDate } = req.body;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!user || !product) {
      return res
        .status(404)
        .json({ status: 404, message: "User or product not found" });
    }

    if (product.status !== null) {
      return res
        .status(400)
        .json({ status: 400, message: "Product is not available for rent" });
    }

    await prisma.rental.create({
      data: { userId, productId, startDate, endDate },
    });

    await prisma.product.update({
      where: { id: productId },
      data: { status: "RENTED" },
    });

    return res
      .status(200)
      .json({ status: 200, message: "Product rented successfully" });
  } catch (error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).json({
        status: 500,
        message: "Failed to rent product",
        error: error.message,
      });
    } else {
      console.error(error);
      return res
        .status(500)
        .json({ status: 500, message: "Internal server error" });
    }
  }
});

export default router;
