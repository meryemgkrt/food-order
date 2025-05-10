import cookie from "cookie";

const handler = (req, res) => {
  const { method } = req;

  // Desteklenmeyen HTTP metodları için kontrol
  if (method !== "POST" && method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // POST isteği - Admin girişi
    if (method === "POST") {
      const { username, password } = req.body;

      // Eksik veri kontrolü
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }

      // Kimlik doğrulama
      if (
        username === process.env.ADMIN_NAME &&
        password === process.env.ADMIN_PASSWORD
      ) {
        // Başarılı giriş - token ayarla
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", process.env.ADMIN_TOKEN, {
            maxAge: 60 * 60, // 1 saat
            sameSite: "strict",
            path: "/",
            httpOnly: true, // Ek güvenlik - JavaScript erişimini engeller
            secure: process.env.NODE_ENV === "production", // Sadece HTTPS üzerinde gönder (prod)
          })
        );

        return res.status(200).json({
          success: true,
          message: "Login successful",
        });
      } else {
        // Başarısız giriş
        return res.status(401).json({
          success: false,
          message: "Invalid username or password",
        });
      }
    }

    // PUT isteği - Admin çıkışı
    if (method === "PUT") {
      // Token'ı geçersiz kılma (çıkış yapma)
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
          maxAge: -1, // Hemen sona erdir
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
      );

      return res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    }
  } catch (error) {
    // Herhangi bir hata durumunda
    console.error("Admin handler error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default handler;
