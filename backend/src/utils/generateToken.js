import jwt from 'jsonwebtoken'

// token 3 parts: header, payload data, signature

const generateToken = (userId) => {
    return jwt.sign(
        {  id: userId}, process.env.JWT_SECRET,
        {expiresIn: '7d'}
    )
}

// const cookieOptions = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "none",
//   maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
// };
const cookieOptions = {
  httpOnly: true,
  secure: false,        // ❗ Must be false for localhost
  sameSite: "lax",      // ❗ Must NOT be "none" on localhost
  maxAge: 7 * 24 * 60 * 60 * 1000
};


export {generateToken, cookieOptions}