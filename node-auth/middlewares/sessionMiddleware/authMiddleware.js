
export const isAuthenticated = (req, res, next) => {
    try {
        if(req.session && req.session.userId){
            return next();
        } else{
            return res.status(401).json({
                success: false,
                message: "Unauthorized! please login first."
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}
