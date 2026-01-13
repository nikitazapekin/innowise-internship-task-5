"use client";

import { useEffect, useState } from "react";
import { Search, ShoppingCart, Trash2 } from "lucide-react";

import CartItemCard from "@/app/_components/CartItem";
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
            </CardContent>
          </Card>
        </div>
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
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>

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
            <Button className="w-full" size="lg">
              Перейти к оформлению
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
