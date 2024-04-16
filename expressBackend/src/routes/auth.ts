import express, { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ status: 404, message: "User not found" });
    }

    const passwordMatch = password === user.password;
    if (!passwordMatch) {
      return res.status(401).json({ status: 401, message: "Invalid password" });
    }

    return res.status(200).json({ status: 200, userId: user.id });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).json({
        status: 500,
        message: "Failed to retrieve user ID",
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

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phone, address, email, password } = req.body;
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

    return res.status(200).json({
      status: 200,
      message: "Signed Up Successful",
      id: newUser.id,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(500).json({
        status: 500,
        message: "Failed to Sign Up",
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
