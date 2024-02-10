import jwt from "jsonwebtoken";

export const createToken = (user) => {
    //Information to send inside the token
    const userWithoutPassword = {...newUser.toJSON()};
    delete userWithoutPassword.password;
  return jwt.sign(
    {
      user:userWithoutPassword
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
