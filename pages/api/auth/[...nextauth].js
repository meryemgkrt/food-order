import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../util/mongo";
import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect";
import bcrypt from "bcryptjs";

// Database bağlantısını başlat
dbConnect();

export default NextAuth({
  // MongoDB Adapter (OAuth için)
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // Database bağlantısını kontrol et
          await dbConnect();

          const email = credentials.email;
          const password = credentials.password;

          // Email ve password kontrolü
          if (!email || !password) {
            throw new Error("Email and password are required!");
          }

          // Kullanıcıyı bul
          const user = await User.findOne({ email: email });

          if (!user) {
            throw new Error("You haven't registered yet!");
          }

          // Password kontrolü (sadece credentials ile giriş yapanlar için)
          if (!user.password) {
            throw new Error(
              "This account was created with Google. Please sign in with Google."
            );
          }

          const isPasswordMatch = await bcrypt.compare(password, user.password);

          if (!isPasswordMatch) {
            throw new Error("Incorrect password!");
          }

          // Başarılı login - user objesini döndür
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.fullName || user.name,
            image: user.image || null,
          };
        } catch (error) {
          console.error("❌ Authorization error:", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],

  // Sayfa yönlendirmeleri
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
    error: "/auth/error", // Error sayfası
  },

  // Session ayarları
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },

  // JWT ayarları
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },

  // Callback fonksiyonları
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // İlk login'de user bilgilerini token'a ekle
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }

      // Google OAuth için
      if (account?.provider === "google") {
        try {
          await dbConnect();

          // Google kullanıcısını database'de kontrol et/oluştur
          let existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Yeni Google kullanıcısı oluştur
            existingUser = await User.create({
              email: user.email,
              fullName: user.name,
              image: user.image,
              provider: "google",
              emailVerified: new Date(), // Google hesapları zaten doğrulanmış
              // password alanı yok - Google ile giriş yapanlar için
            });
            console.log(`✅ New Google user created: ${user.email}`);
          } else {
            // Mevcut kullanıcıyı güncelle (Google bilgileri ile)
            existingUser = await User.findOneAndUpdate(
              { email: user.email },
              {
                $set: {
                  image: user.image,
                  provider: "google",
                  emailVerified: new Date(),
                  // fullName'i sadece boşsa güncelle
                  ...((!existingUser.fullName ||
                    existingUser.fullName === "") && { fullName: user.name }),
                },
              },
              { new: true }
            );
            console.log(
              `✅ Existing user updated with Google info: ${user.email}`
            );
          }

          token.id = existingUser._id.toString();
          token.email = existingUser.email;
          token.name = existingUser.fullName;
          token.image = existingUser.image;
        } catch (error) {
          console.error("❌ JWT Google callback error:", error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      // Token'dan session'a bilgileri aktar
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.image;
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      // Login sonrası yönlendirme
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/profile`;
    },

    async signIn({ user, account, profile, email, credentials }) {
      // Google ile giriş kontrolü
      if (account.provider === "google") {
        try {
          await dbConnect();

          // Email doğrulama
          if (!profile.email_verified) {
            console.error("❌ Google email not verified");
            return false;
          }

          return true;
        } catch (error) {
          console.error("❌ Google sign in error:", error);
          return false;
        }
      }

      // Credentials ile giriş için
      if (account.provider === "credentials") {
        return true; // authorize fonksiyonunda zaten kontrol edildi
      }

      return true;
    },
  },

  // Debug için (production'da false yapın)
  debug: process.env.NODE_ENV === "development",

  // Secret key
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-here",

  // Events (isteğe bağlı)
  events: {
    async signIn({ user, account, profile }) {
      console.log(`✅ User signed in: ${user.email} via ${account.provider}`);
    },
    async signOut({ session }) {
      console.log(`👋 User signed out: ${session?.user?.email}`);
    },
    async createUser({ user }) {
      console.log(`🆕 New user created: ${user.email}`);
    },
    async linkAccount({ user, account, profile }) {
      console.log(`🔗 Account linked: ${user.email} with ${account.provider}`);
    },
  },
});

// Environment variables gerekli:
// GOOGLE_CLIENT_ID=your_google_client_id
// GOOGLE_CLIENT_SECRET=your_google_client_secret
// NEXTAUTH_SECRET=your_nextauth_secret
// NEXTAUTH_URL=http://localhost:3000 (development için)
