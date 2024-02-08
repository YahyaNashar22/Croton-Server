import jwt from "jsonwebtoken";

export const createToken = (user) => {
    //Information to send inside the token
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      role: user.role,
      Picture: user.picture,
      photourl: user.photourl,
    },
    process.env.SECRET_TOKEN
  );
};
export const verifyToken = (token) => {
    //Data decoded from the token
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
