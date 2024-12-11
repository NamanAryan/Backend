import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler (async (req, res) => {
    console.log("Register endpoint hit");
    console.log("Request Body:", req.body);

    res.status(200).json({
        message: "ok",
    });
});

export { registerUser, };
