import { middleware as paraglide } from "@/lib/i18n";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const response = paraglide(request);

	return response;
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};