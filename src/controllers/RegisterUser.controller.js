import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "ok",
  });
});

export { registerUser };

// export const RegisterUser = async(req,res) =>{
//    try {
//       const {username,email,fullName,password} = req.body
//       if(!username || !email){
//         console.log('all fields are require !!!')
//       }
//     const existingUser = User.findOne({email})

//     if(existingUser){
//         console.log('User already Exists !!!')
//     }

//    } catch (error) {

//    }
// }
