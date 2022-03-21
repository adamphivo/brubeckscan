import prisma from "$lib/clients/prisma";
import { generate } from "$lib/helpers/generate";

const UserDAO = () => { };

UserDAO.upsertByAddress = async (address, update = null) => {
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
            nodes: true
        }
    })

    return user;
}

export default UserDAO;