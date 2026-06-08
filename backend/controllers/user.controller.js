import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateAccessAndRefreshToken = async(userId) => {
    try {
        const user = await User.findById(userId);
    
        const refreshToken = await user.generateRefreshToken();
        const accessToken = await user.generateAccessToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
    
        return {accessToken,refreshToken};
    } catch (error) {
        console.error("TOKEN ERROR:", error);
        throw new ApiError(500, error.message);
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { username, fullname, email, password } = req.body;

    if ([username, fullname, email, password].some(field => !field?.trim())) {
        throw new ApiError(400, "all fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "user with email or username already exists");
    }

    const user = await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password // DON'T lowercase passwords
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                createdUser,
                "user created successfully"
            )
        );
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!email && !username) {
        throw new ApiError(400, "username or email required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError(404, "user not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "invalid password");
    }

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshToken(user._id);

    const options = {
        httpOnly: true,
        secure: false, // true in production
        sameSite: "lax"
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user,
                    accessToken,
                    refreshToken
                },
                "user logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async(req,res) => {
    await User.findByIdAndUpdate(req.user._id,{
        $set: {
            refreshToken: undefined
        }
    },
    {
        new:true
    },
)
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    };

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"user logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorised request");
    }

    const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
        throw new ApiError(401, "invalid refresh token");
    }

    if (incomingRefreshToken !== user.refreshToken) {
        throw new ApiError(
            401,
            "refresh token is expired or used"
        );
    }

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshToken(user._id);

    const options = {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken
                },
                "access token refreshed"
            )
        );
});

export { registerUser,loginUser,logoutUser,refreshAccessToken };