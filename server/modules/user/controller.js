import UserService from "./service.js";
import ApiResponse from "../../utils/ApiResponse.js";

class UserController {
  static async getProfile(req, res, next) {
    try {
      const userId = req.user._id;
      const profile = await UserService.getProfile(userId);
      return res.status(200).json(
        ApiResponse.success("Profile retrieved successfully", profile)
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const userId = req.user._id;
      const updateData = req.body;
      const updatedProfile = await UserService.updateProfile(userId, updateData);
      return res.status(200).json(
        ApiResponse.success("Profile updated successfully", updatedProfile)
      );
    } catch (error) {
      next(error);
    }
  }

  static async deleteAccount(req, res, next) {
    try {
      const userId = req.user._id;
      await UserService.deleteAccount(userId);
      return res.status(200).json(
        ApiResponse.success("Account deleted successfully")
      );
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
