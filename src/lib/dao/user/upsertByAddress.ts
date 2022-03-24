import prisma from "$lib/clients/prisma";
import { generate } from "$lib/helpers/generate";

export async function upsertByAddress(address, update = null) {
    const user = await prisma.user.upsert({
        where: {
            address: address
        },
        update: update || {},
        create: {
            address: address,
            profile: {
                create: {
                    gradient: generate.randomRadient()
                }
            },
            nodes: {
                create: {
                    address: address
                }
            }
        },
        include: {
            profile: true,
            nodes: true,
            watchlistStats: {
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    });

    return user;
}