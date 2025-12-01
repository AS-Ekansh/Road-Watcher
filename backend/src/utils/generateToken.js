import jwt from 'jsonwebtoken'

// token 3 parts: header, payload data, signature

const generateToken = (userId) => {
    return jwt.sign(
        {  id: userId}, process.env.JWT_SECRET,
        {expiresIn: '7d'}
    )
}

const isProd = process.env.NODE_ENV === "production";
const cookieOptions = {
  httpOnly: true,
  secure: true,          
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/"
};


export {generateToken, cookieOptions}
