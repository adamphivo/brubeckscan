import prisma from "$lib/clients/prisma";

export async function getAllUsers() {
    const users = await prisma.user.findMany({
        include: {
            nodes: true,
        }
    });
    return users;
}