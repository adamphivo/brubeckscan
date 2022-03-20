import prisma from "$lib/clients/prisma";

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateRandomGradient() {
    const backgroundColor = `linear-gradient(90deg, ${getRandomColor()} 0%, ${getRandomColor()} 50%, ${getRandomColor()} 100%)`;
    return backgroundColor;
}

export async function patch({ params, request }) {
    const gradient = generateRandomGradient();
    let update = null;

    if (request.body) {
        const data = await request.json();
        if (data) {
            update = data;
        }
    }

    if (params.id) {
        try {
            const user = await prisma.user.upsert({
                where: {
                    address: params.id
                },
                update: update || {},
                create: {
                    address: params.id,
                    profile: {
                        create: {
                            gradient: gradient
                        }
                    },
                    nodelists: {
                        create: {
                            name: `${params.id} List`,
                            color: gradient,
                            nodes: {
                                create: {
                                    name: `${params.id} Name`,
                                    address: params.id
                                }
                            }
                        }
                    }
                },
                include: {
                    profile: true,
                    nodelists: {
                        include: {
                            nodes: true
                        }
                    }
                }
            })

            return {
                status: 200,
                body: {
                    data: {
                        user: user
                    }
                }
            }
        } catch (e) {
            return {
                status: e.status || 500,
                body: {
                    message: e.message
                }
            }
        }
    }
}