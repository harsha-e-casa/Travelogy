// app/api/barcode/pdf417/route.js
export const runtime = "nodejs";

import bwipjs from "bwip-js";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const data = searchParams.get("data");
  if (!data) {
    return NextResponse.json({ error: "Missing ?data=" }, { status: 400 });
  }

  try {
    const png = await bwipjs.toBuffer({
      bcid: "pdf417",
      text: data,
      scale: 3,
      height: 10,
      includetext: true,
      textxalign: "center",
    });

    return new NextResponse(png, {
      status: 200,
      headers: { "Content-Type": "image/png", "Cache-Control": "no-store" },
    });
  } catch (err) {
    const msg = err?.issues
      ? JSON.stringify(err.issues)
      : err?.message || "Failed";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
