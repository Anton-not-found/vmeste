/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Обновление access токена
 *     description: Получает новый access токен по refresh токену из cookie
 *     operationId: refreshToken
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Новый access токен сгенерирован
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *       401:
 *         description: Отсутствует или невалидный refresh токен
 *       500:
 *         description: Внутренняя ошибка сервера
 */

import User, { IUserResponse, toUserResponse } from "@/entities/user/model/user.model";
import { generateAccessToken, verifyRefreshToken } from "@/lib/jwt.config";
import { dbConnect } from "@/lib/mongodb";
import { IApiResponse } from "@/shared/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    //Получаем refreshToken из cookie
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json<IApiResponse<never>>(
        {
          success: false,
          error: {
            status: 401,
            message: "Refresh token not found",
          },
        },
        { status: 401 },
      );
    }

    //Проверяем валидность refreshToken
    const payload = verifyRefreshToken(refreshToken);

    if (!payload) {
      return NextResponse.json<IApiResponse<never>>(
        {
          success: false,
          error: {
            status: 401,
            message: "Invalid or expired refresh token",
          },
        },
        { status: 401 },
      );
    }

    //Подключаемся к БД и проверяем, что пользователь всё ещё существует
    await dbConnect();
    const user = await User.findById(payload.userId);

    if (!user) {
      return NextResponse.json<IApiResponse<never>>(
        {
          success: false,
          error: {
            status: 401,
            message: "User not found",
          },
        },
        { status: 401 },
      );
    }

    //  Генерируем новый accessToken
    const newPayload = { userId: user._id.toString(), email: user.email };
    const newAccessToken = generateAccessToken(newPayload);
     const userResponse = toUserResponse(user);

    return NextResponse.json<IApiResponse<{ accessToken: string, user: IUserResponse }>>(
      {
        success: true,
        data: {
          accessToken: newAccessToken,
          user: userResponse, 
          
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Refresh token error:", error);
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
