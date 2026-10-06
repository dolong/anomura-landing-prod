// done
exports.backgrounds = [
    "Crystal Cave Rainbow",
    "Crystal Cave",

    "Emerald Forest",
    "Garden of Eden",
    "Golden Glade",

    "Bioluminescent Abyss",
    "Beach",
    "Magical Deep Sea",
    "Natural Sea",

    "Blazing Furnace",
    "Science Lab",
    "Starship Throne",
    "Steam Apparatus",

    "Happy Snowfield",
    "Midnight Mountain",
    "Cosmic Star",
    "Sunset Cliffs",

    "African Savannah",
    "Space Nebula",
    "Plains of Vietnam",
    "ZED Run",

    "Adventure Space",
    "Asteroids Space",
    "Pong Space",
];
// done
exports.bodies = [
    "Premier Body",
    "Unhinged Body",
    "Mesmerizing Body",
    "Rave Body",

    "Combustion Body",
    "Radiating Eye",
    "Charring Body",
    "Inferno Body",

    "Siberian Body",
    "Glacial Body",
    "Antarctic Body",
    "Amethyst Body",

    "Beast",
    "Panga Panga",
    "Ceylon Ebony",
    "Katalox",

    "Diamond",
    "Golden",

    "Adventure Body",
    "Asteroids Body",
    "Pong Body"
];
// done
exports.claws = [
    "Natural Claw",
    "Coral Claw",
    "Titian Claw",

    "Pliers",
    "Scissorhands",
    "Laser Gun",

    "Snow Claw",
    "Sky Claw",
    "Icicle Claw",

    "Pincers",
    "Carnivora Claw",
    "Hammer Logs",

    "Adventure Claw",
    "Asteroids Lasergun",
    "Pong Claw"
];
//done
exports.legs = [
    "Argent Leg",
    "Sunlit Leg",
    "Auroral Leg",

    "Steel Leg",
    "Tungsten Leg",
    "Titanium Leg",

    "Crystal Leg",
    "Empyrean Leg",
    "Azure Leg",

    "Bamboo Leg",
    "Walmara Leg",
    "Pintobortri Leg",

    "Adventure Leg",
    "Asteroids Leg",
    "Pong Leg",
];
//done
exports.shells = [
    "Auger Shell",
    "Seasnail Shell",
    "Miter Shell",

    "Alembic",
    "Chimney",
    "Starship",

    "Ice Cube",
    "Ice Shell",
    "Frosty",

    "Mora",
    "Carnivora",
    "Pure Runes",

    "Architect",
    "Bee Hive",
    "Coral",
    "Crystal",
    "Diamond",
    "Ethereum",
    "Golden Skull",

    "Japan Temple",
    "Planter",
    "Snail",
    "Tentacles",
    "Tesla Coil",
    "Cherry Blossom",
    "Maple Green",
    "Volcano",
    "Holy Temple",

    "Adventure Shell",
    "Asteroids Shell",
    "Pong Shell",

    "Gates of Hell",
    "ZED Skull"

];
exports.headpieces = [
    "Sapphire",
    "Emerald",
    "Kunzite",

    "Rhodonite",
    "Aventurine",
    "Peridot",

    "Moldavite",
    "Jasper",
    "Alexandrite",

    "Copper Fire",
    "Chemical Fire",
    "Carmine Fire",

    "Morning Sun Starfish",
    "Granulated Starfish",
    "Royal Starfish",

    "Adventure Key",

    "Charon",
    "Deimos",
    "Ganymede",
    "Sol",
    "Sirius",
    "Lyra",
    "Aconite Skull",
    "Titan Arum Skull",
    "Nerium Oleander Skull"

];
exports.getBackground = (backgroundSrc) => {
    for (let i = 0; i < this.backgrounds.length; i++) {
        if (backgroundSrc.includes(this.backgrounds[i])) {
            return this.backgrounds[i];
        }
    }
    console.error(`Background ${backgroundSrc} cannot be found.`);
};
exports.getShell = (src) => {
    for (let i = 0; i < this.shells.length; i++) {
        if (src.includes(this.shells[i])) {
            return this.shells[i];
        }
    }
    console.error(`Shell ${src} cannot be found. Or image path for src is invalid`);
};
exports.getClaws = (src) => {
    for (let i = 0; i < this.claws.length; i++) {
        if (src.includes(this.claws[i])) {
            return this.claws[i];
        }
    }
    console.error(`Claws ${src} cannot be found. Or image path for src is invalid`);
};
exports.getLegs = (src) => {
    for (let i = 0; i < this.legs.length; i++) {
        if (src.includes(this.legs[i])) {
            return this.legs[i];
        }
    }
    console.error(`Legs ${src} cannot be found. Or image path for src is invalid`);
};
exports.getBody = (src) => {
    for (let i = 0; i < this.bodies.length; i++) {
        if (src.includes(this.bodies[i])) {
            return this.bodies[i];
        }
    }
    console.error(`Body ${src} cannot be found. Or image path for src is invalid`);
};
exports.getHeadPieces = (src) => {
    if (src == "" || src == null || src == "None") {
        return "";
    }
    for (let i = 0; i < this.headpieces.length; i++) {
        if (src.includes(this.headpieces[i])) {
            return this.headpieces[i];
        }
    }

    //console.error(`HeadPieces ${src} cannot be found. Or image path for src is invalid`);
};

const prefixAttrs = [
    "Briny", "Tempestuous", "Limpid", "Pacific", "Atlantic", "Abysmal", "Profound",
    "Misty", "Solar", "Empyrean", "Sideral", "Astral", "Ethereal", "Crystal",
    "Quantum", "Empiric", "Alchemic", "Crash Test", "Nuclear", "Syntethic", "Tempered",
    "Fossil", "Craggy", "Gemmed", "Verdant", "Lymphatic", "Gnarled", "Lithic",
];
const suffixAttrs = [
    "of the Coast", "of Maelstrom", "of Depths", "of Eternity", "of Peace", "of Equilibrium",
    "of the Universe", "of the Galaxy", "of Absolute Zero", "of Constellations", "of the Moon", "of Lightspeed",
    "of Evidence", "of Relativity", "of Evolution", "of Consumption", "of Progress", "of Damascus",
    "of Gaia", "of The Wild", "of Overgrowth", "of Rebirth", "of World Roots", "of Stability",
];
const legendAttrs = [
    "The Leviathan", "Will of Oceanus", "Suijin's Touch", "Tiamat Kiss", "Poseidon Vow", "Long bao",
    "Uranus Wish", "Aim of Indra", "Cry of Yuki Onna", "Sirius", "Vega", "Altair",
    "Ephestos Skill", "Gift of Prometheus", "Pandora's", "Wit of Lu Dongbin", "Thoth's Trick", "Cyclopes Plan",
    "Root of Dimu", "Bhumi's Throne", "Rive of Daphne", "The Minotaur", "Call of Cernunnos", "Graze of Terra",
];

const bgPrefixAttrs = ["Bountiful", "Isolated", "Mechanical", "Reborn"];
/** rarity enum **/
const Legendary = Symbol("Legendary");
const Rare = Symbol("Rare");
const Magic = Symbol("Magic");
const Normal = Symbol("Normal");
const Nothing = Symbol("Nothing");

exports.Legendary = Legendary;
exports.Rare = Rare;
exports.Magic = Magic;
exports.Normal = Normal;
exports.Nothing = Nothing;

const CLAWS = Symbol("CLAWS");
const BODY = Symbol("BODY");
const SHELL = Symbol("SHELL");
const LEGS = Symbol("LEGS");
const HEADPIECES = Symbol("HEADPIECES");
const BACKGROUND = Symbol("BACKGROUND");

exports.CLAWS = CLAWS;
exports.BODY = BODY;
exports.SHELL = SHELL;
exports.LEGS = LEGS;
exports.HEADPIECES = HEADPIECES;
exports.BACKGROUND = BACKGROUND;

exports.getLegendName = (originalName, type) => {
    let legendPart = legendAttrs.filter(word => originalName.includes(word))

    switch (type) {
        case SHELL:
            return `"${legendPart}" ${this.getShell(originalName)}`
        case HEADPIECES:
            return `"${legendPart}" ${this.getHeadPieces(originalName)}`
        case BODY:
            return `"${legendPart}" ${this.getBody(originalName)}`
        case CLAWS:
            return `"${legendPart}" ${this.getClaws(originalName)}`
        case LEGS:
            return `"${legendPart}" ${this.getLegs(originalName)}`
        default:
            return originalName
    }
}

exports.getBackgroundRarity = (name) => {

    if (name.trim() == "" || name === undefined) return Nothing;
    let containLegendAttr = bgPrefixAttrs.some((el) => name.includes(el));
    if (containLegendAttr) {
        return Rare;
    }
    return Normal;
};
exports.getRarity = (name) => {
    console.log("Name ", name)
    if (name == null || name?.trim() == "" || name === undefined || name == "None") return Nothing;
    let containLegendAttr = legendAttrs.some((el) => name.includes(el));
    if (containLegendAttr) {
        console.log("contain legend")
        return Legendary;
    }

    let containRareAttr =
        prefixAttrs.some((el) => name.includes(el)) &&
        suffixAttrs.some((el) => name.includes(el));
    if (containRareAttr) {
        return Rare;
    }

    let containMagicAttr =
        prefixAttrs.some((el) => name.includes(el)) ||
        suffixAttrs.some((el) => name.includes(el));
    if (containMagicAttr) {
        return Magic;
    }

    return Normal;
};