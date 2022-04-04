import prisma from "$lib/clients/prisma";
import StreamService from "$lib/services/stream";
import { generate } from "$lib/helpers/generate";

export async function create(address: any) {
    const user = await prisma.user.create({
        data: {
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
            nodes: {
                orderBy: {
                    createdAt: "asc"
                }
            },
            watchlistStats: {
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    });

    await StreamService.feedStream.publish("userCreated", "User created 👋");

    return user;
}