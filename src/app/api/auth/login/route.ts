import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export interface User {
  login: string;
  password: string;
}

export interface UserResponse {
  login: string;
}

export interface AuthResponse {
  message: string;
  user?: UserResponse;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { login, password } = body;

    const usersCookie = request.cookies.get("users")?.value;
    const users: User[] = usersCookie ? JSON.parse(usersCookie) : [];

    const user = users.find((user: User) => user.login === login);

    if (!user) {
      return NextResponse.json<AuthResponse>(
        {
          error: "Пользователь не найден",
          message: "Пользователь не найден  в базе данных",
        },
        { status: 401 }
      );
    }

    if (user.password !== password) {
      return NextResponse.json<AuthResponse>(
        {
          error: "Неверный пароль",
          message: "Проверьте корректность пароля",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json<AuthResponse>(
      {
        message: "Авторизация успешна",
        user: { login: user.login },
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "currentUser",
      value: user.login,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json<AuthResponse>(
      {
        error: "Ошибка при авторизации",
        message: "Проверьте логин или пароль",
      },
      { status: 500 }
    );
  }
}
