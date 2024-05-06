/*const jwt = require("jsonwebtoken");

module.exports = (_req, _res, _next) => {

    try { 
        const token = _req.headers["authorization"].split("")[1];
        jwt.verify(token,process.env.JWT_SECRET,(error, decoded) => {
            if (error) {
                return _res.status(401).send({
                    success: false,
                    message: "Auth failed",
                });
            } else {
                _req.body.userId = decoded.id;
                _next();
            }
        });
    } catch (error) {
        return _res.status(401).send({
            success: false,
            message: "Auth failed",
        });
        
    }
};*/