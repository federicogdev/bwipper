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
    const { userId } = req.query;

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
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
    });

    // const userWithoutPassword = exclude(user, ["hashedPassword"]);

    // counts the users that have the userId in the followingIds
    const followersCount = await prisma.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });

    return res.status(200).json({ ...user, followersCount });
  } catch (error) {
    console.log(error);

    return res.status(400).end();
  }
}
