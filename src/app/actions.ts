"use server";

import { cookies } from "next/headers";
import { CLASS_REGISTRY } from "@/data/registry";

export async function unlockClass(classId: string, passwordAttempt: string) {
  // Find the class in the registry
  const classMeta = CLASS_REGISTRY.find((c) => c.id === classId);
  
  if (!classMeta) {
    return { success: false, error: "Class not found." };
  }

  if (!classMeta.isLocked) {
    return { success: true };
  }

  // Check the password
  if (classMeta.password !== passwordAttempt) {
    return { success: false, error: "Incorrect password." };
  }

  // Password is correct, set a secure HTTP-only cookie
  const cookieStore = await cookies();
  cookieStore.set(`unlock_${classId}`, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    // Expire in 30 days
    maxAge: 60 * 60 * 24 * 30,
  });

  return { success: true };
}
