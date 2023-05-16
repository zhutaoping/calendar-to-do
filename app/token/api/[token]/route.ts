import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  req: Request,
  { params: { token } }: { params: { token: string } },
  res: Response
) {
  const targetToken = await prisma.token.findUnique({
    where: { token },
  });
  // console.log("🚀 ~ targetToken:", targetToken);

  if (!targetToken) {
    return new NextResponse(null);
  }
  return NextResponse.json(targetToken);
}
