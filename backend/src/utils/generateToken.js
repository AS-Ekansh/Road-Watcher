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
  secure: isProd,           // true on Render (HTTPS), false on localhost
  sameSite: isProd ? "none" : "lax",  // must be "none" on Vercel → Render
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/"
};


export {generateToken, cookieOptions}