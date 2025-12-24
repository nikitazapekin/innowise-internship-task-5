"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import * as z from "zod";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth-store";

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const storedLogin = useAuthStore((state) => state.login);

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: RegisterFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setCredentials(data.login, data.password);

    setIsSubmitted(true);
    reset();

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Регистрация</CardTitle>
          <CardDescription>Создайте новый аккаунт</CardDescription>
        </CardHeader>
        <CardContent>
          {storedLogin && (
            <Alert className="mb-6">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                В системе сохранен логин: <strong>{storedLogin}</strong>
              </AlertDescription>
            </Alert>
          )}

          {isSubmitted && (
            <Alert className="mb-6">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>Регистрация успешно завершена! Данные сохранены.</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login">Логин</Label>
              <Input
                id="login"
                placeholder="Введите логин"
                {...register("login")}
                className={errors.login ? "border-destructive" : ""}
              />
              {errors.login && (
                <div className="flex items-center gap-1 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.login.message}</span>
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
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <div className="flex items-center gap-1 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.password.message}</span>
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
                className={errors.confirmPassword ? "border-destructive" : ""}
              />
              {errors.confirmPassword && (
                <div className="flex items-center gap-1 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.confirmPassword.message}</span>
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
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            После регистрации данные будут сохранены в локальном хранилище
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
