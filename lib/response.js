import { NextResponse } from "next/server";

export function ok(result, init) {
  return NextResponse.json(
    {
      status: 200,
      success: true,
      creator: "RAFZ API",
      result
    },
    { status: 200, ...init }
  );
}

export function fail(message, code, extra) {
  const status = code || 500;
  return NextResponse.json(
    {
      status,
      success: false,
      creator: "RAFZ API",
      message: message || "Internal server error",
      ...(extra || {})
    },
    { status }
  );
}

export function badRequest(message) {
  return fail(message || "Missing required parameter", 400);
}

export function getParam(request, name) {
  const { searchParams } = new URL(request.url);
  const value = searchParams.get(name);
  return value && value.trim().length > 0 ? value.trim() : null;
}
