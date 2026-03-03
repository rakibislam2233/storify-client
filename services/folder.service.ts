"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Folder } from "@/interface/file.interface";
import { api } from "./api";

export async function createFolder(data: {
  name: string;
  parentId?: string | null;
}) {
  try {
    const res = await api.post("/folders", data);
    return res;
  } catch (error: any) {
    console.error("Failed to create folder:", error.message);
    throw error;
  }
}

export async function getAllFolders(query?: Record<string, any>) {
  try {
    const queryString = query ? new URLSearchParams(query).toString() : "";
    const res = await api.get<Folder[]>(
      `/folders${queryString ? `?${queryString}` : ""}`,
    );
    return res;
  } catch (error: any) {
    console.error("Failed to fetch folders:", error.message);
    throw error;
  }
}

export async function getRootFolders() {
  try {
    const res = await api.get<Folder[]>("/folders/root");
    return res;
  } catch (error: any) {
    console.error("Failed to fetch root folders:", error.message);
    throw error;
  }
}

export async function getFolderById(id: string) {
  try {
    const res = await api.get<Folder>(`/folders/${id}`);
    return res;
  } catch (error: any) {
    console.error("Failed to fetch folder:", error.message);
    throw error;
  }
}

export async function updateFolder(
  id: string,
  data: { name?: string; parentId?: string | null },
) {
  try {
    const res = await api.patch(`/folders/${id}`, data);
    return res;
  } catch (error: any) {
    console.error("Failed to update folder:", error.message);
    throw error;
  }
}

export async function deleteFolder(id: string) {
  try {
    const res = await api.delete(`/folders/${id}`);
    return res;
  } catch (error: any) {
    console.error("Failed to delete folder:", error.message);
    throw error;
  }
}

export async function getChildFolders(parentId: string) {
  try {
    const res = await api.get<Folder[]>(`/folders/${parentId}/children`);
    return res;
  } catch (error: any) {
    console.error("Failed to fetch child folders:", error.message);
    throw error;
  }
}
