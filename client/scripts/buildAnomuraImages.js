const { CrabImagesBuilder } = require("../utils/crabImagesBuilder2");
const { PrismaClient, EquipmentType } = require('@prisma/client')

async function main() {
    let prisma = new PrismaClient({})
    let allCrabs = await prisma.anomuras.findMany({
        where: {
            crabId: {
                lt: 100
            }
        },
        orderBy: [
            {
                crabId: "asc",
            },
        ],
    });

    for (let i = 0; i <= allCrabs.length - 1; i++) {
        let crabId = allCrabs[i].crabId;
        let background = allCrabs[i].background;
        let body = allCrabs[i].body;
        let legs = allCrabs[i].legs;
        let claws = allCrabs[i].claws;
        let shell = allCrabs[i].shell;
        let headpieces = allCrabs[i].headpieces !== " " ? allCrabs[i].headpieces : " ";

        let crabImage = await CrabImagesBuilder({
            crabId,
            background,
            body,
            legs,
            claws,
            shell,
            headpieces,
        });

        const updatedCrab = await prisma.anomuras.update({
            where: {
                id: crabId,
            },
            data: {
                image: crabImage,
            },
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
