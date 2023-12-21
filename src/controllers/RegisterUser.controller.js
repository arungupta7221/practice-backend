import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/users.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const RegisterUser = async (req, res) => {
  const { username, email, fullName, password } = req.body;

  if (
    ![fullName, email, username, password].every(
      (field) => field && field.trim() !== ""
    )
  ) {
    throw new ApiError(400, "All fields are required !!!");
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;

  let coverImagePath;

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImagePath = req.files?.coverImage[0]?.path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar File is required !!!");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const coverImage = await uploadOnCloudinary(coverImagePath);

  if (!avatar) {
    throw new ApiError(400, "Avatar File is required !!!");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  console.log("created user", createdUser);
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdUser, "User Registered Successfully !!!")
    );
};

export { RegisterUser };
