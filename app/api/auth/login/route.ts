/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Вход пользователя
 *     description: Аутентифицирует пользователя и возвращает токены доступа/обновления
 *     operationId: loginUser
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Успешный вход
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
 *                     user:
 *                       type: object
 *                     accessToken:
 *                       type: string
 *       400:
 *         description: Не указаны email или пароль
 *       401:
 *         description: Неверный email или пароль
 *       500:
 *         description: Внутренняя ошибка сервера
 */

import User, { toUserResponse } from "@/entities/user/model/user.model";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt.config";
import { dbConnect } from "@/lib/mongodb";
import { IApiResponse } from "@/shared/types/api.types";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  const loginSchema = z.object({
    email: z.string().email({ message: "Некорректный формат email" }),
    password: z.string().min(1, "Пароль обязателен"),
  });

  try {
    await dbConnect();

    const body = await request.json();
    const validationResult = loginSchema.safeParse(body);

    if (!validationResult.success) {
      const errors = validationResult.error.issues.map((err) => err.message);
      return NextResponse.json<IApiResponse<never>>(
        {
          success: false,
          error: {
            status: 400,
            message: errors.join(", "),
          },
        },
        { status: 400 },
      );
    }

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json<IApiResponse<never>>(
        {
          success: false,
          error: {
            status: 400,
            message: "Email and password are required",
          },
        },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json<IApiResponse<never>>(
        {
          success: false,
          error: {
            status: 401,
            message: "Invalid email or password",
          },
        },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json<IApiResponse<never>>(
        {
          success: false,
          error: {
            status: 401,
            message: "Invalid email or password",
          },
        },
        { status: 401 },
      );
    }
    const userResponse = toUserResponse(user);

    const payload = { userId: user._id.toString(), email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    const response = NextResponse.json<
      IApiResponse<{ user: typeof userResponse; accessToken: string }>
    >(
      {
        success: true,
        data: {
          user: userResponse,
          accessToken,
        },
      },
      { status: 200 },
    );

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 дней
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json<IApiResponse<never>>(
      {
        success: false,
        error: {
          status: 500,
          message: "Internal server error. Please try again later.",
        },
      },
      { status: 500 },
    );
  }
}
