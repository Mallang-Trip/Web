import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_SERVER_URL || "";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message: "파일이 제공되지 않았습니다.",
        },
        { status: 400 },
      );
    }

    // 백엔드로 파일 전달
    const backendFormData = new FormData();
    backendFormData.append("file", file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: "POST",
      body: backendFormData,
    });

    if (!response.ok) {
      throw new Error("백엔드 업로드 실패");
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      data: result.data || { url: result.url },
    });
  } catch (error) {
    console.error("이미지 업로드 오류:", error);
    return NextResponse.json(
      {
        success: false,
        message: "이미지 업로드 중 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
