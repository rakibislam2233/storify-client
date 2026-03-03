"use server";
import {
  deleteUserById,
  getAdminDashboardStats,
  getAllUsers,
  updateUserById,
} from "@/services/user.service";
import { revalidatePath } from "next/cache";

// Admin Dashboard Stats Action
export async function getAdminDashboardStatsAction() {
  try {
    const stats = await getAdminDashboardStats();
    return { success: true, data: stats };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// User Management Actions
export async function getAllUsersAction(prevState: any, formData: FormData) {
  try {
    const search = formData.get("search") as string;
    const page = parseInt(formData.get("page") as string) || 1;
    const limit = parseInt(formData.get("limit") as string) || 10;

    const users = await getAllUsers(search, page, limit);
    return { success: true, data: users };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateUserStatusAction(userId: string, status: string) {
  try {
    await updateUserById(userId, { status });
    revalidatePath("/dashboard/admin/users");
    return { success: true, message: "User status updated successfully" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteUserAction(userId: string) {
  try {
    await deleteUserById(userId);
    revalidatePath("/dashboard/admin/users");
    return { success: true, message: "User deleted successfully" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
