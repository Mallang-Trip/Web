"use client";

import { useState, useRef, DragEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X, Plus, Upload, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Row } from "./reservation-table";

interface Brewery {
  breweryName: string;
  address: string;
}

interface ApproveDialogProps {
  approveTarget: Row | null;
  onClose: () => void;
  approveMemo: string;
  setApproveMemo: (value: string) => void;
  driverName: string;
  setDriverName: (value: string) => void;
  driverPhone: string;
  setDriverPhone: (value: string) => void;
  vehicleNumber: string;
  setVehicleNumber: (value: string) => void;
  vehicleImageUrls: string[];
  setVehicleImageUrls: (urls: string[]) => void;
  breweries: Brewery[];
  setBreweries: (breweries: Brewery[]) => void;
  onApprove: () => void;
  isPending: boolean;
}

export default function ApproveDialog({
  approveTarget,
  onClose,
  approveMemo,
  setApproveMemo,
  driverName,
  setDriverName,
  driverPhone,
  setDriverPhone,
  vehicleNumber,
  setVehicleNumber,
  vehicleImageUrls,
  setVehicleImageUrls,
  breweries,
  setBreweries,
  onApprove,
  isPending,
}: ApproveDialogProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // 임시 v1 api 사용
      const response = await fetch(
        "https://mallangtrip-server.com/api/upload/signup",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("이미지 업로드 실패");
      }

      const imageUrl = await response.text();
      return imageUrl;
    } catch (error) {
      console.error("이미지 업로드 에러:", error);
      return null;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    await uploadFiles(Array.from(files));
  };

  const uploadFiles = async (files: File[]) => {
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name}은(는) 이미지 파일이 아닙니다.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setIsUploading(true);
    try {
      const uploadPromises = validFiles.map((file) => uploadImage(file));
      const results = await Promise.all(uploadPromises);
      const successUrls = results.filter((url): url is string => url !== null);

      if (successUrls.length > 0) {
        setVehicleImageUrls([...vehicleImageUrls, ...successUrls]);
        toast.success(`${successUrls.length}개의 이미지가 업로드되었습니다.`);
      }

      const failedCount = validFiles.length - successUrls.length;
      if (failedCount > 0) {
        toast.error(`${failedCount}개의 이미지 업로드에 실패했습니다.`);
      }
    } catch {
      toast.error("이미지 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    await uploadFiles(files);
  };

  const removeImage = (index: number) => {
    setVehicleImageUrls(vehicleImageUrls.filter((_, i) => i !== index));
  };

  const addBrewery = () => {
    setBreweries([...breweries, { breweryName: "", address: "" }]);
  };

  const removeBrewery = (index: number) => {
    setBreweries(breweries.filter((_, i) => i !== index));
  };

  const updateBrewery = (
    index: number,
    field: keyof Brewery,
    value: string,
  ) => {
    const updated = [...breweries];
    updated[index][field] = value;
    setBreweries(updated);
  };

  return (
    <Dialog open={!!approveTarget} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-none bg-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>예약 승인</DialogTitle>
          <DialogDescription>
            드라이버 정보와 양조장 정보를 입력해주세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 관리자 메모 */}
          <div className="space-y-2">
            <Label>관리자 메모 (선택)</Label>
            <Textarea
              value={approveMemo}
              onChange={(e) => setApproveMemo(e.target.value)}
              placeholder="관리자 메모를 입력하세요"
            />
          </div>

          {/* 드라이버 정보 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">드라이버 정보</h3>

            <div className="space-y-2">
              <Label htmlFor="driver-name">
                드라이버 이름 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="driver-name"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                placeholder="드라이버 이름을 입력하세요"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="driver-phone">
                드라이버 전화번호 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="driver-phone"
                value={driverPhone}
                onChange={(e) => setDriverPhone(e.target.value)}
                placeholder="+821012345678 형식으로 입력하세요"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicle-number">
                차량 번호 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="vehicle-number"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="12가3456"
              />
            </div>

            <div className="space-y-2">
              <Label>차량 이미지 (선택)</Label>
              <div
                className={`relative rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 bg-gray-50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="space-y-2">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    이미지를 드래그하거나 클릭하여 업로드
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        업로드 중...
                      </>
                    ) : (
                      "파일 선택"
                    )}
                  </Button>
                </div>
              </div>

              {vehicleImageUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {vehicleImageUrls.map((url, index) => (
                    <div key={index} className="group relative h-24">
                      <Image
                        src={url}
                        alt={`차량 이미지 ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 33vw, 200px"
                        className="rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 z-10 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 양조장 리스트 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">양조장 방문 정보</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addBrewery}
              >
                <Plus className="mr-1 h-4 w-4" />
                양조장 추가
              </Button>
            </div>

            {breweries.length > 0 ? (
              <div className="space-y-3">
                {breweries.map((brewery, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        {index + 1}번째 양조장
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBrewery(index)}
                        className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <Input
                        value={brewery.breweryName}
                        onChange={(e) =>
                          updateBrewery(index, "breweryName", e.target.value)
                        }
                        placeholder="양조장 이름"
                      />
                      <Input
                        value={brewery.address}
                        onChange={(e) =>
                          updateBrewery(index, "address", e.target.value)
                        }
                        placeholder="양조장 주소"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-gray-500">
                양조장 정보가 없습니다. 추가 버튼을 클릭하여 양조장을
                추가하세요.
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="flex w-full flex-shrink-0 gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
            disabled={isPending}
          >
            취소
          </Button>
          <Button
            className="flex-1"
            onClick={onApprove}
            disabled={isPending || isUploading}
          >
            {isPending ? "처리 중..." : "승인"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
