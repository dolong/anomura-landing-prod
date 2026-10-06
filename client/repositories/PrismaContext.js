
// import * as Prisma from "@qhuynhvhslab/anomura-prisma-package";
// export const { prisma, equipmentType } = await Prisma.createContext();
// if (process.env.NODE_ENV !== "production") global.prisma = prisma;


import { PrismaClient, EquipmentType, EquipmentRarity } from '@prisma/client'

export const prisma =
    global.prisma ||
    new PrismaClient({})

if (process.env.NODE_ENV !== 'production') global.prisma = prisma