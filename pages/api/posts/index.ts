import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req);

      const { body } = req.body;
      //   different than const { body } = req -> {body} comes from our prisma model for post
      // could rename body to content/text for clarity
      //   const { body: content } = req.body;

      //TODO: checks if body fields exists/type etc

      const post = await prisma.post.create({
        data: {
          body,
          //   body: content,
          userId: currentUser.id,
        },
      });

      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      // const page = req.query.page as string;

      //initialized only so that we can return something different based on req.query
      let posts;

      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: { userId: userId },
          //populate
          //include user and select all the fields we want
          //we cant unfortunately just remove fields we dont want like in mongoose select('-nameOfTheFieldToRemove')
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
            comments: true,
          },
          orderBy: { createdAt: "desc" },
        });
      } else {
        posts = await prisma.post.findMany({
          //include user and select all the fields we want
          //we cant unfortunately just remove fields we dont want like in mongoose select('-nameOfTheFieldToRemove')
          // where: {
          //   body: page && page !== "" && { contains: page },
          //   // body: limit && limit !== "" && { contains: limit },
          // },
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
            comments: true,
          },

          orderBy: { createdAt: "desc" },
        });
      }

      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
