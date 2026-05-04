import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const WORD_JOINER = /\u2060/g;
const ENCODED_WORD_JOINER = /%E2%81%A0/gi;

export function proxy(request: NextRequest) {
  const normalizedPathname = request.nextUrl.pathname
    .replace(ENCODED_WORD_JOINER, "")
    .replace(WORD_JOINER, "");

  if (normalizedPathname !== request.nextUrl.pathname) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = normalizedPathname || "/";

    return NextResponse.redirect(redirectUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
