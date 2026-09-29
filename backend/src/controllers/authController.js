import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { username, password, email, displayName } = req.body;
    if (!username || !password || !email || !displayName) {
      return res
        .status(400)
        .json({ success: false, message: "Thông tin người dùng không đầy đủ" });
    }
    const duplicate = await User.findOne({ email });
    if (duplicate) {
      return res.status(409).json({
        success: false,
        message: "Người dùng đã tồn tại, chuyển qua đăng nhập",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userInfo = await User.create({
      username,
      hashedPassword,
      email,
      displayName,
    });
    return res.status(201).json({
      success: true,
      infomantion: {
        username: userInfo.username,
        email: userInfo.email,
        displayName: userInfo.displayName,
      },
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt,
    });
  } catch (err) {
    console.error("Lỗi đăng kí tài khoản\n", err);
    return res
      .status(500)
      .json({ success: false, message: "Đăng kí không thành công" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      return res
        .status(404)
        .json({ success: false, message: "Người dùng không tồn tại" });
    }

    const { hashedPassword } = userInfo;

    if (!(await bcrypt.compare(password, hashedPassword))) {
      return res
        .status(401)
        .json({ success: false, message: "Mật khẩu chưa chính xác" });
    }

    const accessToken = jwt.sign(
      { userId: userInfo._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_TTL },
    );

    const refreshToken = jwt.sign(
      { userId: userInfo._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_TTL },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: process.env.REFRESH_TOKEN_TTL,
      secure: process.env.NODE_ENV ? "production" : "development",
      sameSite: "none", // backend và frontend khác nhau
    });

    return res.status(201).json({
      success: true,
      message: `Người dùng ${email} đã đăng nhập thành công`,
      accessToken,
    });
  } catch (err) {
    console.error("Lỗi khi đăng nhập\n: ", err);
    return res
      .status(500)
      .json({ success: false, message: "Đăng nhập không thành công" });
  }
};
export const signOut = (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      res.clearCookie("refreshToken");
    }
    return res.status(201).json({success: true, message: "User logged out successfully"})
  } catch (err) {
    console.error("Logout failed", err);
    return res.status(500).json({success: false, message: "An error occurred during logout"});
  }
};
