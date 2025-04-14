import User from "@/models/User";
import dbConnect from "@/util/dbConnect";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
  await dbConnect();

  const {
    method,
    query: { id },
  } = req;

  // GET metodu - Kullanıcı bilgilerini getir
  if (method === "GET") {
    try {
      const user = await User.findById(id);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Kullanıcı bulunamadı" });
      }

      // Şifreyi yanıtta gösterme
      const userObject = user.toObject();
      delete userObject.password;

      // Frontend'in beklediği tutarlı yanıt yapısı
      return res.status(200).json({
        success: true,
        user: userObject,
      });
    } catch (err) {
      console.error("GET isteği hatası:", err);
      return res.status(500).json({
        success: false,
        message: "Kullanıcı bilgisi alınırken hata oluştu",
      });
    }
  }

  // PUT metodu - Kullanıcı bilgilerini güncelle
  if (method === "PUT") {
    try {
      // Sadece izin verilen alanları güncelle
      const allowedUpdates = [
        "password",
        "fullName",
        "email",
        "phone",
        "address",
        "job",
        "bio",
      ];

      const updateData = {};

      // İzin verilen alanları kontrol ederek güncelleme verisini hazırla
      Object.keys(req.body).forEach((key) => {
        if (allowedUpdates.includes(key)) {
          // Eğer değer undefined veya null ise, boş string olarak kaydet
          // Bu, frontend'deki boş alanların korunmasını sağlar
          updateData[key] =
            req.body[key] === null || req.body[key] === undefined
              ? ""
              : req.body[key];
        }
      });

      // Şifre güncellemesi varsa hash'le
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
        delete updateData.confirmPassword;
      }

      // Kullanıcıyı bul ve güncelle, yeni veriyi döndür
      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true, // Güncellenmiş veriyi döndür
        runValidators: true, // Mongoose validasyonlarını çalıştır
      });

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "Kullanıcı bulunamadı",
        });
      }

      // Şifreyi yanıtta gösterme
      const userResponse = updatedUser.toObject();
      delete userResponse.password;

      // Frontend'in beklediği tutarlı yanıt yapısı
      return res.status(200).json({
        success: true,
        message: "Kullanıcı başarıyla güncellendi",
        user: userResponse,
      });
    } catch (error) {
      console.error("PUT isteği hatası:", error);
      return res.status(500).json({
        success: false,
        message: "Kullanıcı güncellenirken hata oluştu",
      });
    }
  }

  // Desteklenmeyen metotlar için yanıt
  return res.status(405).json({
    success: false,
    message: "Method Not Allowed",
  });
};

export default handler;
