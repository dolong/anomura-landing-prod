import { prisma } from "repositories/PrismaContext";

export default async function crabsQuery(req, res) {
    const { method } = req;

    switch (method) {
        case "GET":
            try {
                const currentPage = req.query.page;

                let allCrabs = await prisma.anomuras.findMany({
                    skip: currentPage * 9,
                    take: 9,
                    orderBy: [
                        {
                            crabId: "asc",
                        },
                    ],
                });

                res.status(200).json(allCrabs);
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
