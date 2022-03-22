import prisma from "$lib/clients/prisma";

const WatchlistService = () => { };

WatchlistService.updateWatchlist = async function (userAddress: string, nodeAddress: string, action: string) {
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
                profile: true
            }
        })

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
                profile: true
            }
        });

        return updatedUser;
    }
}

export default WatchlistService;