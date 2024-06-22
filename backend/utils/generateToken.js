import jwt from "jsonwebtoken";

const generateTolkenAndSetCookie = async (userId, res) => {
  const token = await jwt.sign({ userId }, process.env.SECRET, {
    expiresIn: "15d",
  });
  res.cookie('jwt',token,{
    maxAge:15 * 24 * 60* 60* 1000, // in milliseconds
    httpOnly:true, // prevent xss attacks cross-site scripting attacks 
    sameSite:"strict", //CSRF attacks cross -site request forgery attacks
    secure:process.env.NODE_ENV === "development"
  })
};

export default generateTolkenAndSetCookie;