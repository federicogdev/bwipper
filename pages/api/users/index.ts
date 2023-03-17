import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import exclude from "@/util/user-cleanup";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      // select all the fields we want
      //we cant unfortunately just remove fields we dont want like in mongoose select('-nameOfTheFieldToRemove')
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        email: true,
        emailVerified: true,
        image: true,
        coverImage: true,
        profileImage: true,
        createdAt: true,
        updatedAt: true,
        followingIds: true,
        hasNotification: true,
      },
      // include: { posts: true },
    });

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);

    return res.status(400).end();
  }
}
