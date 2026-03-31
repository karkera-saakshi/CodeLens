import { verifyToken } from "../utils/tokenHelper.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Access denied. No token provided.");
    }

    const token = authHeader.split(" ")[1];
    
    if (!token) {
      throw new ApiError(401, "Access denied. Invalid token format.");
    }

    const decoded = verifyToken(token);
    
    const userId = decoded.userId || decoded.id || decoded._id;
    
    if (!userId) {
      throw new ApiError(401, "Invalid token payload.");
    }
    
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      throw new ApiError(401, "User not found.");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }
    
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token."
    });
  }
};

export default authMiddleware;
