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
import { useTranslation } from "@/hooks/use-translation";
import type { Row } from "./reservation-table";
import { useUpload } from "@/hooks/use-upload";

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
  const { t } = useTranslation();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { multiple } = useUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    await uploadFiles(Array.from(files));
  };

  const uploadFiles = async (files: File[]) => {
    const validFiles = files.filter((file) => {
      // 백엔드 스펙상 다양한 형식 허용. 이 컴포넌트는 이미지용이므로 이미지만 필터링
      if (!file.type.startsWith("image/")) {
        toast.error(
          t.admin.toast.notImageFile.replace("{{filename}}", file.name),
        );
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setIsUploading(true);
    try {
      const uploaded = await multiple.mutateAsync(validFiles);
      const urls = uploaded.map((u) => u.url).filter(Boolean);
      if (urls.length > 0) {
        setVehicleImageUrls([...vehicleImageUrls, ...urls]);
        toast.success(
          t.admin.toast.uploadSuccess.replace("{{count}}", String(urls.length)),
        );
      }
    } catch {
      toast.error(t.admin.toast.uploadError);
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
          <DialogTitle>{t.admin.approve.title}</DialogTitle>
          <DialogDescription>{t.admin.approve.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 관리자 메모 */}
          <div className="space-y-2">
            <Label>{t.admin.approve.adminMemo}</Label>
            <Textarea
              value={approveMemo}
              onChange={(e) => setApproveMemo(e.target.value)}
              placeholder={t.admin.approve.adminMemoPlaceholder}
            />
          </div>

          {/* 드라이버 정보 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {t.admin.approve.driverInfo}
            </h3>

            <div className="space-y-2">
              <Label htmlFor="driver-name">
                {t.admin.approve.driverName}{" "}
                <span className="text-red-500">{t.admin.approve.required}</span>
              </Label>
              <Input
                id="driver-name"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                placeholder={t.admin.approve.driverNamePlaceholder}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="driver-phone">
                {t.admin.approve.driverPhone}{" "}
                <span className="text-red-500">{t.admin.approve.required}</span>
              </Label>
              <Input
                id="driver-phone"
                value={driverPhone}
                onChange={(e) => setDriverPhone(e.target.value)}
                placeholder={t.admin.approve.driverPhonePlaceholder}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicle-number">
                {t.admin.approve.vehicleNumber}{" "}
                <span className="text-red-500">{t.admin.approve.required}</span>
              </Label>
              <Input
                id="vehicle-number"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder={t.admin.approve.vehicleNumberPlaceholder}
              />
            </div>

            <div className="space-y-2">
              <Label>{t.admin.approve.vehicleImage}</Label>
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
                    {t.admin.approve.dragOrClick}
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
                        {t.admin.approve.uploading}
                      </>
                    ) : (
                      t.admin.button.fileSelect
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
              <h3 className="text-lg font-semibold">
                {t.admin.approve.breweryInfo}
              </h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addBrewery}
              >
                <Plus className="mr-1 h-4 w-4" />
                {t.admin.approve.addBrewery}
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
                        {t.admin.approve.breweryOrder.replace(
                          "{{number}}",
                          String(index + 1),
                        )}
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
                        placeholder={t.admin.approve.breweryNamePlaceholder}
                      />
                      <Input
                        value={brewery.address}
                        onChange={(e) =>
                          updateBrewery(index, "address", e.target.value)
                        }
                        placeholder={t.admin.approve.breweryAddressPlaceholder}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-sm text-gray-500">
                {t.admin.approve.noBreweries}
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
            {t.admin.button.cancel}
          </Button>
          <Button
            className="flex-1"
            onClick={onApprove}
            disabled={isPending || isUploading}
          >
            {isPending ? t.admin.button.processing : t.admin.button.approve}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
