// import NextAuth from "next-auth";
// import { connectToDB } from "./lib/utils";
// import bcrypt from "bcrypt";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { authConfig } from "./authconfig";
// import { User } from "./lib/models";

// const login = async (credentials) => {
//   try {
//     connectToDB();
//     const user = await User.findOne({ username: credentials.username });
//     console.log("Credentials:", credentials.username);
//     console.log("User:", user);

//     if (!user || !user.isAdmin)
//       throw new Error("Wrong credentials! for username");

//     const isPasswordCorrect = await bcrypt.compare(
//       credentials.password,
//       user.password
//     );

//     if (!isPasswordCorrect) throw new Error("Wrong credentials! for password");

//     return Promise.resolve(user);
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to login!");
//   }
// };

// export const { signIn, signOut, auth } = NextAuth({
//   ...authConfig,
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         try {
//           const user = await login(credentials);
//           return Promise.resolve(user);
//         } catch (err) {
//           return Promise.resolve(null); // Değişiklik burada
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.username = user.username;
//         token.img = user.img;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.username = token.username;
//         session.user.img = token.img;
//       }
//       return session;
//     },
//   },
// });
