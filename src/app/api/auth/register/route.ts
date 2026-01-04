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

    const existingUser = users.find((user: User) => user.login === login);

    if (existingUser) {
      return NextResponse.json<AuthResponse>(
        {
          error: "Пользователь с таким логином уже существует",
          message: "Придумайте новый логин",
        },
        { status: 400 }
      );
    }

    const newUser: User = {
      login,
      password,
    };

    users.push(newUser);

    const response = NextResponse.json<AuthResponse>(
      { message: "Регистрация успешна" },
      { status: 201 }
    );

    response.cookies.set({
      name: "users",
      value: JSON.stringify(users),
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);

    return NextResponse.json<AuthResponse>(
      {
        error: "Ошибка при регистрации",
        message: "Что-то пошло не так...",
      },
      { status: 500 }
    );
  }
}
