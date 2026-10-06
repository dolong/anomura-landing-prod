import authMiddleware from "middlewares/authMiddleware";
import { getEquipment } from "@repositories/equipment";
import { equipmentImageBuilder } from "@utils/equipmentImageBuilder";
import { prisma } from "@repositories/PrismaContext";
import { EquipmentType, EquipmentRarity } from '@prisma/client'

const EquipmentUpdateHandler = async (req, res) => {
    if (req.method !== "POST") {
        res.status(400).json({ isError: true, });
        return;
    }
    try {
        const {
            collectionAddress, equipmentName, equipmentType, equipmentRarity,
        } = req.body;

        const equipmentId = parseInt(req.query.equipmentId);
        console.log(`Building an equipment with id ${equipmentId}`);
        const existingEquipment = await getEquipment(collectionAddress, equipmentId);

        let equipmentTypeMap = getEquipmentType(parseInt(equipmentType));
        let equipmentRarityMap = getEquipmentRarity(parseInt(equipmentRarity));

        let equipmentImage = await equipmentImageBuilder({
            equipmentId,
            collectionAddress,
            equipmentName,
            equipmentType: equipmentTypeMap,
            equipmentRarity: equipmentRarityMap,
        })

        await prisma.equipment.update({
            where: {
                collectionAddress_equipmentId: { collectionAddress, equipmentId }
            },
            data: {
                equipmentName,
                equipmentType: equipmentTypeMap,
                equipmentRarity: equipmentRarityMap,
                image: equipmentImage,
                isReveal: true
            },
        });

        res.status(200).json({ message: "ok" })
    }
    catch (err) {
        console.log(err)
        res.status(200).json({ message: err.message, isError: true });
    }
}

export default authMiddleware(EquipmentUpdateHandler)

const getEquipmentType = (type) => {
    switch (type) {
        case 0:
            return EquipmentType.BODY;
        case 1:
            return EquipmentType.CLAWS;
        case 2:
            return EquipmentType.LEGS;
        case 3:
            return EquipmentType.SHELL;
        case 4:
            return EquipmentType.HEADPIECES;
        case 5:
            return EquipmentType.HABITAT;
        default:
            console.log(type);
            throw new Error(`invalid equipment type map`);
    }
};
const getEquipmentRarity = (rarity) => {
    switch (rarity) {
        case 0:
            return EquipmentRarity.NORMAL;
        case 1:
            return EquipmentRarity.MAGIC;
        case 2:
            return EquipmentRarity.RARE;
        case 3:
            return EquipmentRarity.LEGENDARY;
        default:
            throw new Error(`invalid equipment rarity map`);
    }
};