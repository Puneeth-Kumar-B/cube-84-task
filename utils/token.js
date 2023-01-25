const jwt=require('jsonwebtoken');
const secretKey=process.env.JWT_SECRET_KEY;

const generateToken=(data) => {
    return jwt.sign(
        {
            time: Date(),
            ...data
        },
        secretKey,
        {
            expiresIn: "1d",
        });
}

const verifyToken=(token) => {
    try {
        let verifiedData=jwt.verify(token, secretKey);
        return verifiedData;
    } catch(error) {
        return false;
    }
}

module.exports={
    generateToken,
    verifyToken
};