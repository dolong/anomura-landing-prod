import { getAnomuraById } from "repositories/crabs";

const getAnomuraByIdHandler = async (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                let id = parseInt(req.query.id);
                let data = await getAnomuraById(id);

                if (data) {
                    res.status(200).json(data);
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
            res.setHeader("Allow", ["GET", "PUT"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
export default getAnomuraByIdHandler