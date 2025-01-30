const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "";
const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "access denied" });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({
            error: "invalid token"
        })
    }
};
 const authorizeAdmin = (req , res , next) => {
    if(req.user.role !== 'admin'){
        return res.status(403).json({error :"admin access denied"});
    }
    next();
 };

 module.exports ={ authenticateUser , authorizeAdmin};
 