import bcrypt from "bcrypt";
import User from "../models/User.js";

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
      return res
        .status(409)
        .json({ success: false, messsage: "Người dùng đã tồn tại, chuyển qua đăng nhập" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const timestamp = await User.create({
      username,
      hashedPassword,
      email,
      displayName,
    });
    return res.status(201).json({
      success: true,
      infomantion: {
        username,
        hashedPassword,
        email,
        displayName,
      },
      createdAt: timestamp.createdAt,
      updatedAt: timestamp.updatedAt,
    });
  } catch (err) {
    console.error("Lỗi đăng kí tài khoản\n", err);
    return res.status(500).json({ success: false, message: "Đăng kí không thành công" });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      return res.status(404).json({ messsage: "Người dùng không tồn tại" });
    }

    const { hashedPassword } = userInfo;

    if (!(await bcrypt.compare(password, hashedPassword))) {
      return res.status(401).json({ message: "Mật khẩu chưa chính xác" });
    }
    return res.status(201).json({ message: `Người dùng ${email} đã đăng nhập thành công` });
  } catch (err) {
    console.error("Lỗi: ", err)
    return res.status(500).json({ message: "Lỗi hệ thống" })
  }
};
