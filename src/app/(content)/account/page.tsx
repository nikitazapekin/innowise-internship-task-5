"use client";

import { useEffect, useState } from "react";
import { Loader2, Search, ShoppingCart, Trash2 } from "lucide-react";

import BuyModal from "@/app/_components/BuyModal";
import CartItem from "@/app/_components/CartItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cartStore";

const Page = () => {
  const { items, clearCart, getTotalPrice, getItemCount } = useCartStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOpenBuyModal, setIsOpenBuyModal] = useState(false);
  const handleOpenBuyModal = () => {
    setIsOpenBuyModal((prev) => !prev);
  };

  useEffect(() => {
    const unsubscribe = useCartStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    if (!useCartStore.persist.hasHydrated()) {
      setIsHydrated(true);
    } else {
      const timeout = setTimeout(() => {
        setIsHydrated(true);
      }, 500);

      return () => clearTimeout(timeout);
    }

    return unsubscribe;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setFilteredItems(items);
    } else {
      const query = debouncedQuery.toLowerCase();
      const filtered = items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) || item.brand.toLowerCase().includes(query)
      );

      setFilteredItems(filtered);
    }
  }, [debouncedQuery, items]);

  const handleClearCart = () => {
    clearCart();
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Загрузка корзины...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Card className="text-center py-12">
            <CardContent className="space-y-4">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground" />
              <h2 className="text-2xl font-bold">Корзина пуста</h2>
              <p className="text-muted-foreground">
                Добавьте товары из каталога, чтобы они появились здесь
              </p>
              <Button className="mt-4" asChild>
                <a href="/products">Перейти в каталог</a>
              </Button>
            </CardContent>
          </Card>
        </div>
        <BuyModal isOpen={isOpenBuyModal} onClose={handleOpenBuyModal} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">Корзина</h1>
              <p className="text-muted-foreground mt-2">
                {getItemCount()} товаров на сумму ${getTotalPrice().toFixed(2)}
              </p>
            </div>

            <Button variant="destructive" onClick={handleClearCart} className="md:self-start">
              <Trash2 className="h-4 w-4 mr-2" />
              Очистить корзину
            </Button>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Поиск товаров в корзине..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <Badge
                variant="secondary"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {filteredItems.length} найдено
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && searchQuery && (
          <Card className="mb-8">
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">По запросу "{searchQuery}" ничего не найдено</p>
              <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                Очистить поиск
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Итог заказа</CardTitle>
            <CardDescription>Общая информация о вашей корзине</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Количество товаров:</span>
              <span className="font-bold">{getItemCount()} шт.</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Товаров в корзине:</span>
              <span className="font-bold">{items.length} позиций</span>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Итого к оплате:</span>
                <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button className="w-full" size="lg" onClick={handleOpenBuyModal}>
              Купить
            </Button>
          </CardFooter>
        </Card>
      </div>

      <BuyModal isOpen={isOpenBuyModal} onClose={handleOpenBuyModal} />

      <Button className="w-full mt-14 bg-red-200" size="lg" onClick={handleOpenBuyModal}>
        Выйти из аккаунта
      </Button>
    </div>
  );
};

export default Page;
