import { prisma } from "./PrismaContext";

export const getAnomuraEquipmentById = async (equipmentId) => {
    return await prisma.anomuraEquipment.findUnique({
        where: {
            equipmentId: parseInt(equipmentId),
        },
    });
};

export const getAnomuraPartImageByName = async (equipmentName) => {
    return await prisma.anomuraPartImage.findUnique({
        where: {
            name: equipmentName,
        },
    });
};

export const getAllAnomuraPartImages = async () => {
    return await prisma.anomuraPartImage.findMany();
};

export const equipEquipmentToAnomura = async (equipmentId, anomuraId, blockNumber) => {
    return await prisma.anomuraEquipment.update({
        where: {
            equipmentId: parseInt(equipmentId)
        },
        data: {
            isEquipped: true,
            anomura: {
                connect: {
                    crabId: parseInt(anomuraId)
                }
            },
            lastUpdatedAtBlock: blockNumber
        }
    })
}

export const unEquipFromAnomura = async (equipmentId, anomuraId, blockNumber) => {
    return await prisma.anomuraEquipment.update({
        where: {
            equipmentId: parseInt(equipmentId)
        },
        data: {
            isEquipped: false,
            lastUpdatedAtBlock: blockNumber,
            anomura: {
                disconnect: true
            }
        }
    })
}


export const updateAnomuraEquipmentImageById = async ({ equipmentId, image }) => {

    return await prisma.anomuraEquipment.update(
        {
            where: {
                equipmentId
            },
            data: {
                image
            },
        });
};

