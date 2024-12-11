import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/apiResponse.js"

const registerUser = asyncHandler (async (req, res) => {
    const {fullName, email, username, password} =   req.body;
    if(fullName === ""){
        throw new ApiError(400, "Please enter your Fullname")
    }
    if(email === ""){
        throw new ApiError(400, "Please enter your email")
    }
    if(username === ""){
        throw new ApiError(400, "Please enter your username")
    }
    if(password === ""){
        throw new ApiError(400, "Please enter your password")
    }
    
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })
    
    if(existedUser){
        throw new ApiError(409, "User with same email/password already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400, "Avatar is required");
    }

    const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )


});

export { registerUser, };
