import User from "../../models/User.js";

class UserRepository {
  static async findById(id) {
    return await User.findById(id).select("-password");
  }

  static async findByIdWithDetails(id) {
    return await User.findById(id)
      .select("-password")
      .populate("stats.cpStats")
      .populate("stats.githubStats")
      .populate("stats.analytics");
  }

  static async updateProfile(id, updateData) {
    return await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");
  }

  static async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}

export default UserRepository;
