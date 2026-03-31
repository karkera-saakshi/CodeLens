import bcrypt from "bcryptjs";
import ApiError from "../../utils/ApiError.js";
import AuthRepository from "./repository.js";
import { generateAccessToken } from "../../utils/tokenHelper.js";
import { generateOTP } from "../../utils/otpHelper.js";
import { sendVerificationOTP, sendPasswordResetOTP } from "../../utils/emailService.js";

class AuthService {
  static async register({ name, email, password }) {
    // Check if user already exists
    const existingUser = await AuthRepository.findUserByEmailWithoutPassword(email);
    if (existingUser) {
      throw new ApiError(409, "User already exists with this email");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await AuthRepository.createUser({
      name,
      email,
      password: hashedPassword,
      isVerified: false
    });

    // Generate OTP
    const plainOtp = generateOTP();
    const hashedOtp = await bcrypt.hash(plainOtp, 4);

    // Store hashed OTP
    await AuthRepository.createOtp({
      email,
      otp: hashedOtp,
      purpose: "signup"
    });

    // Send verification email with plain OTP
    await sendVerificationOTP(email, plainOtp);

    return {
      message: "Registration successful. Please check your email for OTP verification.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
      }
    };
  }

  static async verifyOtp({ email, otp }) {
    // Find OTP record
    const otpRecord = await AuthRepository.findOtp(email, "signup");
    if (!otpRecord) {
      throw new ApiError(400, "OTP expired or not found");
    }

    // Compare OTP
    const isValidOtp = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValidOtp) {
      throw new ApiError(400, "Invalid OTP");
    }

    // Mark user as verified
    await AuthRepository.updateUserVerification(email);

    // Delete OTP record
    await AuthRepository.deleteOtp(email, "signup");

    // Get user and generate token
    const user = await AuthRepository.findUserByEmailWithoutPassword(email);
    const token = generateAccessToken({
      userId: user._id,
      email: user.email,
      role: user.role
    });

    return {
      message: "Email verified successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: true
      }
    };
  }

  static async login({ email, password }) {
    // Find user with password
    const user = await AuthRepository.findUserByEmail(email);
    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new ApiError(401, "Invalid credentials");
    }

    // Check if verified
    if (!user.isVerified) {
      throw new ApiError(403, "Please verify your email first");
    }

    // Generate token
    const token = generateAccessToken({
      userId: user._id,
      email: user.email,
      role: user.role
    });

    // Update last active
    user.activity.lastActive = new Date();
    await user.save();

    return {
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        profile: user.profile,
        handles: user.handles
      }
    };
  }

  static async forgotPassword({ email }) {
    // Find user
    const user = await AuthRepository.findUserByEmailWithoutPassword(email);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Generate OTP
    const plainOtp = generateOTP();
    const hashedOtp = await bcrypt.hash(plainOtp, 4);

    // Store hashed OTP
    await AuthRepository.createOtp({
      email,
      otp: hashedOtp,
      purpose: "forgot-password"
    });

    // Send password reset email
    await sendPasswordResetOTP(email, plainOtp);

    return {
      message: "Password reset OTP sent to your email"
    };
  }

  static async resetPassword({ email, otp, newPassword }) {
    // Find OTP record
    const otpRecord = await AuthRepository.findOtp(email, "forgot-password");
    if (!otpRecord) {
      throw new ApiError(400, "Invalid or expired OTP");
    }

    // Verify OTP
    const isValidOtp = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValidOtp) {
      throw new ApiError(400, "Invalid or expired OTP");
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password
    await AuthRepository.updateUserPassword(email, hashedPassword);

    // Delete OTP record
    await AuthRepository.deleteOtp(email, "forgot-password");

    return {
      message: "Password reset successful"
    };
  }

  static async resendOtp({ email, purpose }) {
    // Find user
    const user = await AuthRepository.findUserByEmailWithoutPassword(email);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Check if already verified for signup
    if (purpose === "signup" && user.isVerified) {
      throw new ApiError(400, "Already verified");
    }

    // Delete existing OTPs
    await AuthRepository.deleteOtp(email, purpose);

    // Generate new OTP
    const plainOtp = generateOTP();
    const hashedOtp = await bcrypt.hash(plainOtp, 4);

    // Store hashed OTP
    await AuthRepository.createOtp({
      email,
      otp: hashedOtp,
      purpose
    });

    // Send appropriate email
    if (purpose === "signup") {
      await sendVerificationOTP(email, plainOtp);
    } else {
      await sendPasswordResetOTP(email, plainOtp);
    }

    return {
      message: "OTP resent successfully"
    };
  }
}

export default AuthService;
