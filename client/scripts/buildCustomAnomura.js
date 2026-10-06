const { CustomAnomuraImage } = require("../utils/customAnomuraImage");
const { PrismaClient, EquipmentType } = require('@prisma/client')

const customAnomuras = [
    {

        crabId: 1,
        background: 'earth_emeraldforest',
        legs: 'baseleg_2',
        shell: 'tentacles',
        claws: 'baseclaw_2',
        body: 'basebody_2',
    },
    {

        crabId: 2,
        background: 'ocean_abysbioluminescence',
        legs: 'metalleg_2',
        shell: 'bee hive',
        claws: 'metalclaw_lasergun',
        body: 'extras_diamond',
    },
    {

        crabId: 3,
        background: 'earth_goldenGlade',
        legs: 'baseleg_3',
        shell: 'ethereum',
        claws: 'snowclaw_1',
        body: 'snowbody_4',
    },
    {

        crabId: 4,
        background: 'earth_crystalcaverainbow',
        legs: 'baseleg_1',
        shell: 'ice cube',
        claws: 'metalclaw_lasergun',
        body: 'snowbody_1',
    },
    {

        crabId: 5,
        background: 'earth_goldenGlade',
        legs: 'baseleg_1',
        shell: 'tree green',
        claws: 'woodclaw_hammerlogs',
        body: 'woodbody_1',
    },
    {
        crabId: 6,
        background: 'sky_star',
        legs: 'woodleg_3',
        shell: 'iceshell',
        claws: 'metalclaw_scissor',
        body: 'metalbody_fire3',
    },
    {

        crabId: 7,
        background: 'sky_star',
        legs: 'woodleg_1',
        shell: 'architect',
        claws: 'metalclaw_scissor',
        body: 'woodbody_beastman',
    },
    {
        crabId: 8,
        background: 'sky_star',
        legs: 'snowleg_3',
        shell: 'metal_alembic',
        claws: 'woodclaw_spikeytendrils',
        body: 'snowbody_3',
    },
    {
        crabId: 9,
        background: 'sky_star',
        legs: 'metalleg_3',
        shell: 'architect',
        claws: 'snowclaw_skyclaw',
        body: 'snowbody_starbody',
    },
    {
        crabId: 10,
        background: 'sky_star',
        legs: 'baseleg_2',
        shell: 'planter',
        claws: 'metalclaw_pliers',
        body: 'metalbody_laser eye',
    },


    {
        crabId: 11,
        background: 'sky_star',
        legs: 'woodleg_3',
        shell: 'baseshell_3',
        claws: 'baseclaw_1',
        body: 'woodbody_1',
    },
    {
        crabId: 12,
        background: 'sky_star',
        legs: 'woodleg_1',
        shell: 'bee hive',
        claws: 'baseclaw_2',
        body: 'metalbody_laser eye',
    },
    {
        crabId: 13,
        background: 'sky_star',
        legs: 'snowleg_1',
        shell: 'volcano',
        claws: 'baseclaw_3',
        body: 'snowbody_3',
    },
    {
        crabId: 14,
        background: 'sky_star',
        legs: 'baseleg_3',
        shell: 'Holy Temple',
        claws: 'metalclaw_pliers',
        body: 'woodbody_1',
    },
    {
        crabId: 15,
        background: 'sky_star',
        legs: 'metalleg_2',
        shell: 'Starship',
        claws: 'metalclaw_lasergun',
        body: 'woodbody_2',
    },
    {
        crabId: 16,
        background: 'sky_star',
        legs: 'snowleg_2',
        shell: 'wood_carnivora',
        claws: 'metalclaw_pliers',
        body: 'woodbody_3',
    },
    {
        crabId: 17,
        background: 'sky_star',
        legs: 'baseleg_2',
        shell: 'snowman',
        claws: 'metalclaw_scissor',
        body: 'basebody_2',
    },
    {
        crabId: 18,
        background: 'sky_star',
        legs: 'metalleg_1',
        shell: 'planter',
        claws: 'snowclaw_1',
        body: 'basebody_1',
    },
    {
        crabId: 19,
        background: 'sky_star',
        legs: 'baseleg_2',
        shell: 'ethereum',
        claws: 'woodclaw_spikeytendrils',
        body: 'basebody_3',
    },
    {
        crabId: 20,
        background: 'sky_star',
        legs: 'woodleg_3',
        shell: 'woodshell_runestone',
        claws: 'woodclaw_pincers',
        body: 'snowbody_3',
    },
]

async function main() {
    // let prisma = new PrismaClient({})
    // let allCrabs = await prisma.anomuras.findMany({
    //     where: {
    //         crabId: {
    //             lt: 100
    //         }
    //     },
    //     orderBy: [
    //         {
    //             crabId: "asc",
    //         },
    //     ],
    // });

    // console.log(allCrabs[3])

    // let i = 3
    // let crabId = allCrabs[i].crabId;
    // let background = allCrabs[i].background;
    // let body = allCrabs[i].body;
    // let legs = allCrabs[i].legs;
    // let claws = allCrabs[i].claws;
    // let shell = allCrabs[i].shell;
    // let headpieces = allCrabs[i].headpieces !== " " ? allCrabs[i].headpieces : " ";

    // console.log(body)

    // let crabImage = await CustomAnomuraImage({
    //     crabId: i,
    //     background,
    //     body,
    //     legs,
    //     claws,
    //     shell,
    //     headpieces,
    // });

    for (let i = 10; i <= customAnomuras.length - 1; i++) {

        let crabId = customAnomuras[i].crabId;
        // console.log(crabId)
        let background = customAnomuras[i].background;
        let body = customAnomuras[i].body;
        let legs = customAnomuras[i].legs;
        let claws = customAnomuras[i].claws;
        let shell = customAnomuras[i].shell;
        let headpieces = customAnomuras[i].headpieces !== " " ? customAnomuras[i].headpieces : " ";

        let crabImage = await CustomAnomuraImage({
            crabId: i,
            background,
            body,
            legs,
            claws,
            shell,
            headpieces,
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
