const authMiddleware = (handler) => {
    return async (req, res) => {
        const secret = req.headers.authorization.split(" ")[1];

        if (!secret || secret !== process.env.WEBSITE_SECRET) {
            return res.status(200).json({
                message: "Non authenticated api request",
                isError: true,
            });
        }
        return handler(req, res);
    };
};
export default authMiddleware;
