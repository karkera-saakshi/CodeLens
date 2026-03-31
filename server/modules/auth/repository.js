import User from "../../models/User.js";
import Otp from "../../models/Otp.js";

class AuthRepository {
  static async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  static async findUserByEmail(email) {
    return await User.findOne({ email }).select("+password");
  }

  static async findUserByEmailWithoutPassword(email) {
    return await User.findOne({ email });
  }

  static async findUserById(id) {
    return await User.findById(id);
  }

  static async updateUserVerification(email) {
    return await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );
  }

  static async updateUserPassword(email, hashedPassword) {
    return await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );
  }

  static async createOtp({ email, otp, purpose }) {
    // Delete any existing OTPs for same email+purpose
    await Otp.deleteMany({ email, purpose });
    
    const otpRecord = new Otp({ email, otp, purpose });
    return await otpRecord.save();
  }

  static async findOtp(email, purpose) {
    return await Otp.findOne({ email, purpose }).sort({ createdAt: -1 });
  }

  static async deleteOtp(email, purpose) {
    return await Otp.deleteMany({ email, purpose });
  }
}

export default AuthRepository;
