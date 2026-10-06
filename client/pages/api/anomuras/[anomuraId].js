import { getAnomuraById } from "repositories/crabs";

/* Api to return an anomura without animation_url */
const crabImageViewerHandler = async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                let id = parseInt(req.query.anomuraId);
                let crab = await getAnomuraById(id);

                if (crab) {
                    res.setHeader('Cache-Control', 'max-age=0, s-maxage=60, stale-while-revalidate');
                    res.status(200).json({
                        name: crab.name,
                        description: crab.description,
                        image: crab.image,
                        attributes: [
                            {
                                trait_type: "Background",
                                value: crab.background,
                            },
                            {
                                trait_type: "Body",
                                value: crab.body,
                            },
                            {
                                trait_type: "Claws",
                                value: crab.claws,
                            },
                            {
                                trait_type: "Legs",
                                value: crab.legs,
                            },
                            {
                                trait_type: "Shell",
                                value: crab.shell,
                            },
                            {
                                trait_type: "HeadPieces",
                                value: crab.headpieces,
                            },
                        ],
                    });
                } else {
                    res.status(200).json({
                        name: `Crab ${id}`,
                        description: "Unminted Anomura",
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
export default crabImageViewerHandler