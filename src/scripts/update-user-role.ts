import { prisma } from "../lib/prisma";

async function updateUserRole(email: string) {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: "ADMIN" },
    });
    console.log(`Updated user ${email} to admin role`);
    console.log(user);
  } catch (error) {
    console.error("Error updating user role:", error);
  }
}

// Replace with your email
updateUserRole("admin@example.com"); 