"use client";

import { useMutation } from "@tanstack/react-query";
import { UploadsAPI, type UploadedFile, ApiError } from "@/utils/api";

export type UploadResult = UploadedFile;

export function useUpload() {
  const single = useMutation<UploadResult, ApiError, File>({
    mutationKey: ["upload", "single"],
    mutationFn: (file: File) => UploadsAPI.upload(file),
  });

  const multiple = useMutation<UploadResult[], ApiError, File[]>({
    mutationKey: ["upload", "multiple"],
    mutationFn: async (files: File[]) => {
      const results = await Promise.all(files.map((f) => UploadsAPI.upload(f)));
      return results;
    },
  });

  return { single, multiple };
}
