/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Выход из системы
 *     description: Очищает refresh токен и завершает сессию пользователя
 *     operationId: logoutUser
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Успешный выход
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Внутренняя ошибка сервера
 */

import { IApiResponse } from "@/shared/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    //Создаём ответ об успешном выходе
    const response = NextResponse.json<IApiResponse<{ message: string }>>(
      {
        success: true,
        data: {
          message: "Successfully logged out",
        },
      },
      { status: 200 },
    );
    // Очищаем refresh токен в cookie (устанавливаем пустое значение с истёкшим сроком)
    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0, // Мгновенное истечение
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json<IApiResponse<never>>(
      {
        success: false,
        error: {
          status: 500,
          message: "Internal server error",
        },
      },
      { status: 500 },
    );
  }
}
