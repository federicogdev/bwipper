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

      //initialized only so that we can return something different based on req.query
      let posts;

      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: { userId: userId },
          //populate
          include: { user: true, comments: true },
          orderBy: { createdAt: "desc" },
        });
      } else {
        posts = await prisma.post.findMany({
          include: { user: true, comments: true },
          orderBy: { createdAt: "desc" },
        });
      }

      return res.status(200).json(posts);
    }

    // return res.status(200).json("Hello");
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
