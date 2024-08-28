import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const formData = await request.formData();
  const body = Object.fromEntries(formData);
  const { name } = body;
  return NextResponse.json({ name });
}
