import { getEquipment } from "@repositories/equipment";
import { ethers } from "ethers"

const collectionAddress = process.env.NEXT_PUBLIC_EQUIPMENT_ADDRESS
    ? ethers.utils.getAddress(process.env.NEXT_PUBLIC_EQUIPMENT_ADDRESS)
    : null
const equipmentQueryHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        let equipmentId = parseInt(req.query.equipmentId);
        let equipment = await getEquipment(collectionAddress, equipmentId);

        if (equipment) {
          if (equipment.isReveal) {
            res.setHeader('Cache-Control', 'max-age=0, s-maxage=300, stale-while-revalidate');
            res.status(200).json({
              name: equipment.equipmentName,
              description: "Bindable Equipment From The DeepSea",
              animation_url: `${process.env.NEXT_PUBLIC_WEBSITE_HOST}/imageviewer/equipment/${equipmentId}`,
              image: equipment.image,
              attributes: [
                {
                  trait_type: "Equipment Type",
                  value: equipment.equipmentType,
                },
                {
                  trait_type: "Equipment Rarity",
                  value: equipment.equipmentRarity,
                },
              ],
            });
          } else {
            res.status(200).json({
              name: "Mystery Rune of The DeepSea",
              image: "https://res.cloudinary.com/deepsea/image/upload/v1670088118/Anomura-Web-Assets/Rune-Stone_cfnm3u.gif",
              attributes: [
                {
                  trait_type: "Equipment Type",
                  value: "Unknown",
                },
                {
                  trait_type: "Equipment Rarity",
                  value: "Unknown",
                },
              ],
            });
          }

        } else {
          res.status(200).json({
            name: `Equipment ${equipemntId}`,
            description: "Equipment Not Existed",
          });
        }
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
export default equipmentQueryHandler