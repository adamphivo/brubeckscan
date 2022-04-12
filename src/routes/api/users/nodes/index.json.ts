import prisma from "$lib/clients/prisma";

export async function patch({ request }) {
    const body = await request.json();
    
    const updatedNode = await prisma.node.update({
        where: {
            id: body.nodeId
        },
        data: {
            name: body.newName
        }
    });

    return {
        status: 200,
        body: updatedNode
    };
}