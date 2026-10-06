const { CrabImagesBuilder } = require("../utils/crabImagesBuilder2");
const { PrismaClient, EquipmentType } = require('@prisma/client')

async function main() {


    let crabImage = await CrabImagesBuilder({
        crabId: 1,
        background: "Cosmic Star",
        body: "Unhinged Body",
        legs: "Titanium Leg",
        claws: "Sky Claw of World Roots",
        shell: "Coral",
        headpieces: "Carmine Fire",
    });


}


main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // await prisma.$disconnect();
    });
