import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import Image from "next/image";

import EditModal from "../EditModal";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CartItem as CartItemType } from "@/store/cartStore";
import { useCartStore } from "@/store/cartStore";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleRemove = () => {
    removeItem(item.id);
  };

  const totalPrice = item.discountedPrice * item.quantity;

  return (
    <>
      <Card className="h-full flex flex-col">
        <div className="relative h-40 w-full overflow-hidden bg-gray-100">
          <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <span className="text-sm">{item.brand}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Цена за шт.:</span>
              <span className="font-bold">${item.discountedPrice.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Количество:</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">{item.quantity} шт.</span>
                <span className="text-xs text-muted-foreground">(макс: {item.maxStock} шт.)</span>
              </div>
            </div>

            <div className="pt-3 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Сумма:</span>
                <span className="text-lg font-bold text-primary">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-4 mt-auto">
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1" onClick={() => setIsEditModalOpen(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Изменить
            </Button>

            <Button variant="destructive" size="icon" onClick={handleRemove}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      <EditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} item={item} />
    </>
  );
};

export default CartItem;
