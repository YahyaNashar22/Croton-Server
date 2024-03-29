import jwt from "jsonwebtoken";

export const createToken = (user) => {
  return jwt.sign(
    {
      id:user._id,
      fullname:user.fullname,
      email:user.email,
      password:user.hash,
      phoneNumber:user.phoneNumber,
      age:user.age,
      gender:user.gender,
      height:user.height,
      weight:user.weight,
      role:user.role,
      profilePic:user.profilePic,
      photoURL:user.photoURL,
      favPlans:user.favPlans,
      favBooks:user.favBooks,
      favRecipes:user.favRecipes,
      exerciseHistory:user.exerciseHistory,
      slug:user.slug
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
