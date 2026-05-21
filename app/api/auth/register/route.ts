import { dbConnect } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User, { toUserResponse } from "@/entities/user/model/user.model";
import { IApiResponse } from "@/shared/types/api.types";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt.config";

const hashingRoundsCount = 10;


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account and returns access/refresh tokens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               city:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Validation error or user already exists
 *       500:
 *         description: Internal server error
 */
export async function POST(request: NextRequest) {
  try {
    // Подключаемся к MongoDB
    await dbConnect();

    // Получаем данные из тела запроса
    const body = await request.json();
    const { email, password, firstName, lastName, city } = body;

    if (!email || !password || !firstName) {
      return NextResponse.json<IApiResponse<never>>(
        {
          success: false,
          error: {
            status: 400,
            message: "Email, password and name are required.",
          },
        },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json<IApiResponse<never>>(
        {
          success: false,
          error: {
            status: 400,
            message: "User with this email already exists.",
          },
        },
        { status: 400 },
      );
    }
    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, hashingRoundsCount);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName: lastName || "",
      city: city || "",
      avatar: "",
      rating: 0,
    });
    // Преобразуем в формат для фронта
    const userResponse = toUserResponse(newUser);

    // Создаём JWT токены
    const payload = { userId: newUser._id.toString(), email: newUser.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    //Формируем ответ с accessToken и cookie
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
      { status: 201 },
    );

    //Устанавливаем refresh token в httpOnly cookie
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 дней в секундах
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
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
