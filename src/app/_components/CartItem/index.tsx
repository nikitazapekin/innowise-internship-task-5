import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CartItem } from "@/store/cartStore";
import { useCartStore } from "@/store/cartStore";

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard = ({ item }: CartItemCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editQuantity, setEditQuantity] = useState(item.quantity);
  const updateItem = useCartStore((state) => state.updateItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleQuantityChange = (value: string) => {
    const numValue = parseInt(value);

    if (!isNaN(numValue) && numValue > 0 && numValue <= item.maxStock) {
      setEditQuantity(numValue);
    }
  };

  const incrementQuantity = () => {
    if (editQuantity < item.maxStock) {
      setEditQuantity(editQuantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (editQuantity > 1) {
      setEditQuantity(editQuantity - 1);
    }
  };

  const handleSaveEdit = () => {
    updateItem(item.id, editQuantity);
    setIsEditDialogOpen(false);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  const totalPrice = item.discountedPrice * item.quantity;

  return (
    <>
      <Card className="h-full">
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
          <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <span className="text-sm">{item.brand}</span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Цена за шт.:</span>
              <span className="font-bold">${item.discountedPrice.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Количество:</span>
              <span className="font-bold">{item.quantity} шт.</span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-sm text-muted-foreground">Итого:</span>
              <span className="text-lg font-bold text-primary">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => setIsEditDialogOpen(true)}>
            <Edit2 className="h-4 w-4 mr-2" />
            Изменить
          </Button>

          <Button variant="destructive" size="icon" onClick={handleRemove}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Изменить количество</DialogTitle>
            <DialogDescription>Товар: {item.title}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="edit-quantity">Количество</Label>
              <span className="text-sm text-muted-foreground">Максимум: {item.maxStock} шт.</span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                disabled={editQuantity <= 1}
              >
                -
              </Button>

              <Input
                id="edit-quantity"
                type="number"
                min="1"
                max={item.maxStock}
                value={editQuantity}
                onChange={(e) => handleQuantityChange(e.target.value)}
                className="text-center"
              />

              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                disabled={editQuantity >= item.maxStock}
              >
                +
              </Button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <span className="text-sm text-muted-foreground">Новая цена:</span>
              <span className="text-lg font-bold">
                ${(item.discountedPrice * editQuantity).toFixed(2)}
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSaveEdit}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CartItemCard;
