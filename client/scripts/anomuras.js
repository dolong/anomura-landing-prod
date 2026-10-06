import { prisma } from "./PrismaContext";
const { backgrounds, bodies, claws, legs, shells, headpieces } = require("./crabData");

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function main() {

    for (let i = 1; i <= 1000; i++) {
        const background = backgrounds[randomIntFromInterval(0, backgrounds.length - 1)];
        const body = bodies[randomIntFromInterval(0, bodies.length - 1)];
        const claw = claws[randomIntFromInterval(0, claws.length - 1)];
        const leg = legs[randomIntFromInterval(0, legs.length - 1)];
        const shell = shells[randomIntFromInterval(0, shells.length - 1)];
        const headpiece = headpieces[randomIntFromInterval(0, headpieces.length - 1)];

        const anomura = await prisma.anomuras.upsert({
            where: { id: -1 },
            update: {},
            create: {
                owner: "",
                crabId: i,
                background,
                body,
                claws: claw,
                legs: leg,
                shell: shell,
                headpieces: headpiece,
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
