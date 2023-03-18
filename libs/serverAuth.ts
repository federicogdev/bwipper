import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prisma from "@/libs/prismadb";

const serverAuth = async (req: NextApiRequest) => {
  //gets the session from next auth
  const session = await getSession({ req });

  //check if user is logged in
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }
  //finds the user in the db
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  //check if theres a  user in the db with the email from session
  if (!currentUser) {
    throw new Error("User not found");
  }

  return { currentUser };
};

export default serverAuth;
