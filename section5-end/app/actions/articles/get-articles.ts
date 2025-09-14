"use server";

import prisma from "@/lib/prisma";

export async function getArticles() {
  try {
    const userId = "temp-user-123";

    const articles = prisma.article.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return articles;
  } catch (err) {
    console.error(err);
  }
}
