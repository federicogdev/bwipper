import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).end();
  }

  try {
    const { userId } = req.body;

    const { currentUser } = await serverAuth(req);

    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid ID");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
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

    if (!user) {
      throw new Error("Invalid ID");
    }

    //sets a var to either whatver the following usersIds of currentUser are or an empty array
    let updatedFollowingIds = [...(user.followingIds || [])];

    if (req.method === "POST") {
      //pushed the userId into the updatedFollowingIds
      updatedFollowingIds.push(userId);
    }

    if (req.method === "DELETE") {
      //removes the user.id in the updatedFollowingIds that matches the userId coming from body
      updatedFollowingIds = updatedFollowingIds.filter(
        (followingId) => followingId !== userId
      );
    }

    //based on what we did in the POST or DELETE REQUEST updates the user making the request
    // assigning to his following ids array the updatedFollowingIds
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        followingIds: updatedFollowingIds,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
