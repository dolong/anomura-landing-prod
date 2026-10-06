import { getAnomuraById } from "repositories/crabs";


const crabImageViewerHandler = async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                let id = parseInt(req.query.crabId);
                let crab = await getAnomuraById(id);

                if (crab) {
                    res.setHeader('Cache-Control', 'max-age=0, s-maxage=600, stale-while-revalidate');
                    res.status(200).json({
                        name: crab.name,
                        description: crab.description,
                        animation_url: `${process.env.NEXT_PUBLIC_WEBSITE_HOST}/imageviewer/${crab.crabId}`,
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
                        description: "Unminted crab",
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