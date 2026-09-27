import User from "../../models/User.js";

export const deleteUser = async (req, res) => {
  const { email, username } = req.body;
  const response = await User.deleteOne({ email, username });
  if (!response) {
    return res.status(404).json({ success: false, information: { email, username }, message: "Tài khoản không tồn tại" });
  }
  return res.status(200).json({ success: true, informantion: { email, username }, message: "Đã được xóa" })
}
