import { prisma } from "./PrismaContext";


export const getEquipment = async (collectionAddress, equipmentId) => {
    return await prisma.equipment.findUnique({
        where: {
            collectionAddress_equipmentId: { collectionAddress, equipmentId },
        },
    });
};
