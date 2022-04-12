import prisma from "$lib/clients/prisma";

export async function count() {
  const count = await prisma.user.count();
  return count;
}
