import Footer from "../../../models/Footer";
import dbConnect from "../../../util/dbConnect"; // 3 seviye üst!

const handler = async (req, res) => {
  console.log("API çağrıldı - Method:", req.method);

  await dbConnect();
  console.log("DB bağlantısı kuruldu");

  const { method } = req;

  if (method === "GET") {
    try {
      console.log("Footer.find() çağrılıyor...");
      const footer = await Footer.find();
      console.log("Bulunan footer sayısı:", footer.length);
      console.log("Footer verisi:", footer);
      res.status(200).json(footer);
    } catch (err) {
      console.error("GET Error:", err);
      res.status(500).json({ error: "Failed to fetch footer" });
    }
  }

  if (method === "POST") {
    try {
      console.log("POST Body:", req.body);
      const newFooter = await Footer.create(req.body);
      console.log("Oluşturulan footer:", newFooter);
      res.status(201).json(newFooter);
    } catch (err) {
      console.error("POST Error:", err);
      res.status(400).json({ error: err.message });
    }
  }
};

export default handler;
