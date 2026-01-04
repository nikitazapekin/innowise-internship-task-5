"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as z from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registerSchema = z
  .object({
    login: z
      .string()
      .min(3, "Логин должен содержать минимум 3 символа")
      .max(20, "Логин должен содержать максимум 20 символов")
      .regex(/^[a-zA-Z0-9_]+$/, "Логин может содержать только буквы, цифры и подчеркивание"),
    password: z
      .string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .max(30, "Пароль должен содержать максимум 30 символов"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      login: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setRegisterError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        reset();

        setTimeout(() => {
          router.push("/auth");
        }, 2000);
      } else {
        setRegisterError(result.error || "Ошибка регистрации");
      }
    } catch {
      setRegisterError("Ошибка соединения с сервером");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Регистрация</CardTitle>
          <CardDescription>Создайте новый аккаунт</CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted && (
            <Alert className="mb-6">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                Регистрация успешно завершена! Перенаправление на страницу входа...
              </AlertDescription>
            </Alert>
          )}

          {registerError && (
            <Alert className="mb-6" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{registerError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login">Логин</Label>
              <Input
                id="login"
                placeholder="Введите логин"
                {...register("login")}
                className={errors.login ? "border-red-500" : ""}
              />
              {errors.login && (
                <div className="flex items-center gap-1 text-sm p-2 rounded-md bg-red-50 border border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-red-600 font-medium">{errors.login.message}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                {...register("password")}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <div className="flex items-center gap-1 text-sm p-2 rounded-md bg-red-50 border border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-red-600 font-medium">{errors.password.message}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Повторите пароль"
                {...register("confirmPassword")}
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && (
                <div className="flex items-center gap-1 text-sm p-2 rounded-md bg-red-50 border border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-red-600 font-medium">{errors.confirmPassword.message}</span>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Обработка
                </>
              ) : (
                "Зарегистрироваться"
              )}
            </Button>
            <div className="text-center mt-4">
              <Link
                href="/auth"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Войти в аккаунт
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
