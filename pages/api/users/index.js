import User from "@/models/User";
import dbConnect from "@/util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Kullanıcıları alırken hata oluştu" });
    }
  }

  if (method === "POST") {
    try {
      const newUser = await User.create(req.body);
      return res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Kullanıcı oluşturulamadı", error: err });
    }
  }

  // GET veya POST dışında gelen istekleri engelle
  return res.status(405).json({ message: "Method Not Allowed" });
};

export default handler;
