import { prisma } from "./PrismaContext";


export const getAnomuraById = async (crabId) => {
    return await prisma.anomuras.findUnique({
        where: {
            crabId: parseInt(crabId),
        },
        // include: {
        //     anomuraEquipments: true
        // }
    });
};

export const getAllCrabs = async () => {
    return await prisma.anomuras.findMany({

        include: {
            anomuraEquipments: true
        }
    });
};

/* WARNING to be used only on getStaticPaths and getStaticProps */
export const getFirst1000Anomuras = async () => {
    return await prisma.anomuras.findMany({
        take: 1000
    });
};

export const updateAnomuraImageById = async (crabData) => {
    const { crabId, image, body, legs, claws, shell, headpieces, background } = crabData;

    return await prisma.anomuras.update({
        where: {
            id: crabId,
        },
        data: {
            image,
        },
    });
};

export const createAnomura = async (crabData) => {
    const { crabId, background, body, legs, claws, shell, image, headpieces, name, description } = crabData;

    return await prisma.anomuras.create({
        data: {
            crabId,
            owner: "",
            background,
            legs,
            shell,
            claws,
            body,
            image,
            headpieces,
            name,
            description
        },
    });
};
