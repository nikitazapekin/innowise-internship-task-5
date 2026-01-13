"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const WelcomeBlock = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/auth");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Добро пожаловать в Next.js приложение
          </CardTitle>
          <CardDescription className="text-lg pt-2">
            Современное веб-приложение с современными технологиями
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-center text-muted-foreground">
            <p>
              Это демонстрационное приложение построено на Next.js 14 с использованием App Router,
              TypeScript и современных инструментов разработки.
            </p>
            <p className="text-sm">
              Нажмите кнопку ниже, чтобы продолжить к странице аутентификации
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button
              size="lg"
              className="w-full h-12 text-base font-medium cursor-pointer"
              onClick={handleContinue}
            >
              Продолжить
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeBlock;
