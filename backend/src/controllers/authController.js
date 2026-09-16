import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const signup = async (req, res) => {
  try {
    const { username, password, email, displayName } = req.body;
    if (!username || !password || !email || !displayName) {
      return res.status(400).json({ message: "Thông tin người dùng không đầy đủ" });
    }
    const duplicate = await User.findOne({ email });
    if (duplicate) {
      return res.status(409).json({ messsage: "Người dùng đã tồn tại, chuyển qua đăng nhập" })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      username,
      hashedPassword,
      email,
      displayName,
    })
    return res.status(201).json({ message: `Người dùng ${username} đã đăng ký tài khoản thành công` });
  } catch (err) {
    console.error("Lỗi khi đăng kí tài khoản", err);
    return res.status(500).json({ message: "Lỗi hệ thống" })
  }
}

export const signin = (req, res) => {

}
