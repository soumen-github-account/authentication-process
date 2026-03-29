import jwt from "jsonwebtoken"

export const protect = async(req, res, next) => {
    let token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({
            success: false,
            message: "No token"
        });
    }
    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token expired"
        });
    }
}

