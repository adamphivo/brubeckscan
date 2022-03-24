import prisma from "$lib/clients/prisma";

export async function updateWatchlist (userAddress: string, nodeAddress: string, action: string){
    if(action === "watch"){
        const updatedUser = await prisma.user.update({
            where: {
                address: userAddress
            },
            data: {
                nodes: {
                    create: {
                        address: nodeAddress
                    }
                }
            },
            include: {
                nodes: true,
                profile: true,
                watchlistStats: true,
            }
        });

        return updatedUser;
    } else {
        const updatedUser = await prisma.user.update({
            where: {
                address: userAddress
            },
            data: {
                nodes: {
                    deleteMany: {
                        address: nodeAddress
                    }
                }
            },
            include: {
                nodes: true,
                profile: true,
                watchlistStats: true
            }
        });

        return updatedUser;
    }
}