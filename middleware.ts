import { NextResponse } from "next/server";

export default function middleware(req: Request, res: Response) {
  if (req.url.includes("api")) {
    console.log("\u001b[1;33m", "Middleware!", "\x1b[0m");

    console.log("\x1b[33m", req.url, "\x1b[0m");

    const origin = req.headers.get("origin");
    console.log("\x1b[32m", "origin,", origin, "\x1b[0m");

    return NextResponse.next();
  }
}
// export const config = {
//   matcher: "/events/api/:path*",
// };
