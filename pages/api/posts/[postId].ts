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
    const { postId } = req.query;
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: {
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
        },
        comments: {
          include: {
            user: {
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
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
