import prisma from "$lib/clients/prisma";
import { create } from "./create";

export async function getOrCreate(address: any) {
    // Check if user exists
    const exist = await prisma.user.findUnique({
        where: {
            address: address
        },
        include: {
            profile: true,
            nodes: {
                orderBy: {
                    createdAt: "asc"
                }
            },
        }
    });

    if (exist) return exist;

    // If not create
    if (!exist) {
        const user = await create(address);
        return user;
    }
}