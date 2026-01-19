// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";

// export async function POST(req) {
//   console.log("client tokennnnnnnnnnnnnn ")
//   const { email, password } = await req.json();

//   const token = jwt.sign({ email }, "92077e393546d4310a2af55592879820c7af16b4153f484f70e41fbdd127239b", { expiresIn: "24h" });
//   console.log("client tokennnnnnnnnnnnnn ",token)

//   const res = NextResponse.json({ success: true });
//   res.cookies.set("authToken", token, {
//     httpOnly: true,
//     // secure: process.env.NODE_ENV === "production",
//     secure: true,
//     path: "/",
//     maxAge: 86400, // 24 hour
//   });

//   return res;
// }

// app/api/login/route.ts
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export const runtime = "nodejs"; // ensure Node runtime
export const dynamic = "force-dynamic"; // avoid caching

const BACKEND_URL = "https://api.travelogy.co/";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      "92077e393546d4310a2af55592879820c7af16b4153f484f70e41fbdd127239b"
    ).toString();

    console.log("encryptedPassword ==> ",encryptedPassword)

    // 1) Call your custom backend
    const upstream = await fetch(`${BACKEND_URL}/travelogy/flight/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // If the backend needs cookies itself, add credentials: "include"
      body: JSON.stringify({ email: email, password: encryptedPassword }),
    });

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok || !data?.token) {
      const msg = data?.message || "Invalid credentials";
      return NextResponse.json(
        { success: false, message: msg },
        { status: upstream.status || 401 }
      );
    }

    // 2) Set the JWT in an HTTP-only cookie
    const res = NextResponse.json({ success: true, token: data.token });
    res.cookies.set("authToken", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true on HTTPS
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24h
    });
    return res;
  } catch (err) {
    console.error("Login route error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
