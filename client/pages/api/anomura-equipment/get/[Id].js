import { getAnomuraEquipmentById } from "repositories/anomura-equipment";

// view NFT part as equipment
const AnomuraEquipmentImageViewer = async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                let id = parseInt(req.query.Id);
                let equipment = await getAnomuraEquipmentById(id);

                if (!equipment) {
                    return res.status(200).json({
                        name: `Equipment ${id}`,
                        description: "Unminted equipment",
                    });
                }

                let attributes = [];
                attributes = [...attributes, {
                    trait_type: "Is Equipped",
                    value: equipment.isEquipped.toString(),
                }];

                if (equipment.isEquipped) {
                    attributes = [...attributes, {
                        trait_type: "Equip To Anomura",
                        value: equipment.equipToAnomura,
                    }];
                }

                res.status(200).json({
                    name: `Anomura Equipment ${equipment.equipmentId}`,
                    description: "Anomura Equipment NFT Viewer",
                    image: equipment.image,
                    attributes
                });

            } catch (err) {
                console.log(err);
                res.status(500).json({ message: err.message });
            }

            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
export default AnomuraEquipmentImageViewer