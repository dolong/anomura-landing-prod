const realm = [
    "Sky",
    "Earth",
    "Science",
    "Ocean",
]
const adjective = [
    "strong",
    "wise",
    "imaginative",
    "romantic",
    "open-minded",
    "adaptable",
    "humble",
    "tenatious",
    "capricious",
    "determined",
    "steadfast",
    "earnest",
]
const assignRoles = [
    "Barbarian",
    "Monk",
    "Merchant",
    "Hermit",
    "Bard",
    "Alchemist",
    "Rebel",
    "Rogue",
    "Mechanic",
    "Knight",
    "Sage",
    "Dragon",
]
const traits = [
    "honest and creative",
    "stubborn and hardworking",
    "extroverted and clever",
    "protective and loyal",
    "charismatic and artistic",
    "industrious and devoted",
    "friendly and harmonious",
    "brave and determined",
    "compassionate and dynamic",
    "ambitious and obedient",
    "self-reliant and cerebral",
    "gracious and idealistic",
]
const elements = [
    "fire",
    "earth",
    "air",
    "water",
    "fire",
    "earth",
    "air",
    "water",
    "fire",
    "earth",
    "air",
    "water",
]
const verb = [
    "light",
    "build",
    "create",
    "invent",
    "collect",
    "steal",
    "destroy",
    "battle",
    "fight",
    "decimate",
    "augment",
    "develop",
    "refine",
    "purify",
    "pollute",
    "ruin",
    "repair",
    "annihilate",
    "heal",
]
const noun1 = [
    "weapons",
    "claws",
    "swords",
    "shields",
    "whips",
    "seashells",
    "knives",
    "lasers",
    "munitiions",
    "friendships",
    "battles",
    "books",
    "potions",
    "souls",
    "creatures",
    "civilizations",
    "broken trinkets",
    "rebellions",
    "sickness",
]
const noun2 = [
    "magic",
    "machines",
    "knowledge",
    "dust",
    "steel",
    "ice",
    "metal",
    "wood",
    "peace",
    "books",
    "water",
    "power",
    "bubbles",
    "science",
]
const verb_ing = [
    "causing",
    "inciting",
    "preventing",
    "burning",
    "decimating",
    "creating",
    "consoling",
    "building",
    "developing",
    "imagining",
    "illuminating",
    "providing",
    "hiding",
    "balancing",
]
const noun3 = [
    "mischief",
    "chaos",
    "peace",
    "violence",
    "darkness",
    "light",
    "drama",
    "turmoil",
    "damage",
    "strife",
    "harmony",
    "naughtiness",
    "happiness",
    "elation",
    "pleasure",
    "mirth",
    "exuberance",
    "cheer",
    "prosperity",
    "joy",
    "merriment",
]
const noun4 = [
    "fun",
    "laughs",
    "tears",
    "clout",
    "glory",
    "chaos",
    "adventure",
    "battle",
    "wisdom",
    "grandeur",
    "praise",
    "honour",
    "anarchy",
    "balance",
    "erudition",
    "pansophy",
    "parity",

]
const emotion1 = [
    "love",
    "hate",
    "loathe",
    "delight",
    "disgust",
    "fear",
    "help",
    "bore",
    "bless",
    "heal",
    "befriend",
    "punish",
    "reject",
    "upset",
    "relax",
    "invigorate",
    "crush",
    "cherish",
    "discourage",
    "distress",
]
const emotion2 = [
    "chagrin",
    "hatred",
    "admiration",
    "pain",
    "love",
    "delight",
    "disgust",
    "boredom",
    "ecstacy",
    "loathing",
    "fury",
    "dismay",
    "arousal",
    "elation",
    "caution",
    "healing",
]
const bark = [
    "Burn it all to the ground!",
    "No One Can Tell You How to Live!",
    "Ready for Adventure!",
    "Do What You Want!",
    "You belong to no one!",
    "Grace the Realms with Love!",
    "Let Light Guide Your Way!",
    "Join Forces and Attack!",
    "Expand Your Knowledge!",
    "Embrace the Chaos!",
    "Right Wrongs and Triumph!",
    "Educate the Naysayers!",
    "Choose the Path of Righteousness!",
    "All Hail the One True Crab King!",
    "Victory Shall Be Yours!",
    "Embrace Peace and Harmony!",
    "For Freedom!",
    "Go Home and Sleep!",
    "Read Books and Strategize!",
    "Snuggle Under a Blanket and Sleep!",
    "Be One With The Universe!",
    "Go Forth And Conquer!",
    "Through all Time And Relative Dimension In Space!",
    "Nom nom nom nom!",
    "Dance and sing under the Sea!",
    "Indulge and eat all the things!",
]

exports.getAnomuraDescription = () => {

    let rand = Math.round(Math.random());

    let realmPart = realm[Math.floor(Math.random() * realm.length)]
    let adjectivePart = adjective[Math.floor(Math.random() * adjective.length)]
    let assignRolesPart = assignRoles[Math.floor(Math.random() * assignRoles.length)]
    let traitsPart = traits[Math.floor(Math.random() * traits.length)]

    let elementsPart = elements[Math.floor(Math.random() * elements.length)]
    let verbPart = verb[Math.floor(Math.random() * verb.length)]
    let noun1Part = noun1[Math.floor(Math.random() * noun1.length)]
    let noun2Part = noun2[Math.floor(Math.random() * noun2.length)]
    let verb_ingPart = verb_ing[Math.floor(Math.random() * verb_ing.length)]

    let noun3Part = noun3[Math.floor(Math.random() * noun3.length)]
    let noun4Part = noun4[Math.floor(Math.random() * noun4.length)]
    let emotion1Part = emotion1[Math.floor(Math.random() * emotion1.length)]
    let emotion2Part = emotion2[Math.floor(Math.random() * emotion2.length)]
    let barkPart = bark[Math.floor(Math.random() * bark.length)]

    if (rand === 0) {
        return `Hailing from the ${realmPart} Realm, you are a ${adjectivePart} ${assignRolesPart} that is ${traitsPart}.\n\nRuled by ${elementsPart}, you ${verbPart} your ${noun1Part} with ${noun2Part}.\n\nYou're always ${verb_ingPart} ${noun3Part} and ${noun4Part} to those that you ${emotion1Part}.\n\n${barkPart}`
    }
    else {
        return `${("aeiouAEIOU").indexOf(assignRolesPart[0]) !== -1 ? "An" : "A"} ${assignRolesPart} ruled by ${elementsPart}, you come from the ${realmPart} Realm.\n\nKnown as ${traitsPart}, you're also ${adjectivePart}, much to the ${emotion2Part} of others.\n\nAlways ${verb_ingPart} ${noun1Part} for ${noun2Part}, you are truly one of a kind.\n\n${barkPart}`
    }

};