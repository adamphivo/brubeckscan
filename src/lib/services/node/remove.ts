import prisma from "$lib/clients/prisma";

export async function remove(id: number) {
    const deleted = await prisma.node.delete({
        where: {
            id: id
        }
    })

    if (deleted) {
        const list = await prisma.nodeList.findUnique({
            where: {
                id: deleted.nodeListId
            }
        })
        if (list) {
            return list;
        }
    }
}