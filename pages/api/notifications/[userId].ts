import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    //gets all the notifications userId from req.query
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    //updates te user to not have notifications after visiting
    await prisma.user.update({
      where: { id: userId },
      data: {
        hasNotification: false,
      },
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
