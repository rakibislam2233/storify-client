"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileItem } from "@/interface/file.interface";
import { revalidatePath } from "next/cache";
import { api } from "./api";

export async function uploadFile(formData: FormData) {
  try {
    const res = await api.post("/files", formData);
    revalidatePath("/dashboard/user/my-folders", "layout");
    return res;
  } catch (error: any) {
    console.error("Failed to upload file:", error.message);
    throw error;
  }
}

export async function uploadMultipleFiles(formData: FormData) {
  try {
    const res = await api.post("/files/multiple", formData);
    return res;
  } catch (error: any) {
    console.error("Failed to upload files:", error.message);
    throw error;
  }
}

export async function getAllFiles(query?: Record<string, any>) {
  try {
    const queryString = query ? new URLSearchParams(query).toString() : "";
    const res = await api.get<FileItem[]>(
      `/files${queryString ? `?${queryString}` : ""}`,
    );
    return res;
  } catch (error: any) {
    console.error("Failed to fetch files:", error.message);
    throw error;
  }
}

export async function getFileById(id: string) {
  try {
    const res = await api.get<FileItem>(`/files/${id}`);
    return res;
  } catch (error: any) {
    console.error("Failed to fetch file:", error.message);
    throw error;
  }
}

export async function getFilesByFolderId(
  folderId: string,
  query?: Record<string, any>,
) {
  try {
    const queryString = query ? new URLSearchParams(query).toString() : "";
    const res = await api.get<FileItem[]>(
      `/files/${folderId}/files${queryString ? `?${queryString}` : ""}`,
    );
    return res;
  } catch (error: any) {
    console.error("Failed to fetch files by folder:", error.message);
    throw error;
  }
}

export async function updateFile(
  id: string,
  data: { name?: string; originalName?: string; folderId?: string },
) {
  try {
    const res = await api.patch(`/files/${id}`, data);
    revalidatePath("/dashboard/user/my-folders", "layout");
    return res;
  } catch (error: any) {
    console.error("Failed to update file:", error.message);
    throw error;
  }
}

export async function deleteFile(id: string) {
  try {
    const res = await api.delete(`/files/${id}`);
    revalidatePath("/dashboard/user/my-folders", "layout");
    return res;
  } catch (error: any) {
    console.error("Failed to delete file:", error.message);
    throw error;
  }
}
