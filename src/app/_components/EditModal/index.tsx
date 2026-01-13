import { useState } from "react";

import { Button } from "@/components/ui/button";
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

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: CartItem;
}

const EditModal = ({ isOpen, onClose, item }: EditModalProps) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const updateItem = useCartStore((state) => state.updateItem);

  const handleQuantityChange = (value: string) => {
    const numValue = parseInt(value);

    if (!isNaN(numValue) && numValue > 0 && numValue <= item.maxStock) {
      setQuantity(numValue);
    }
  };

  const incrementQuantity = () => {
    if (quantity < item.maxStock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSave = () => {
    updateItem(item.id, quantity);
    onClose();
  };

  const totalPrice = item.discountedPrice * quantity;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-100">
        <DialogHeader>
          <DialogTitle>Изменить количество</DialogTitle>
          <DialogDescription className="line-clamp-2">Товар: {item.title}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="edit-quantity">Количество</Label>
            <span className="text-sm text-muted-foreground">Максимум: {item.maxStock} шт.</span>
          </div>

          <div className="flex items-center gap-3 justify-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="h-10 w-10"
            >
              -
            </Button>

            <Input
              id="edit-quantity"
              min="1"
              max={item.maxStock}
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="w-20 text-center"
            />

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={incrementQuantity}
              disabled={quantity >= item.maxStock}
              className="h-10 w-10"
            >
              +
            </Button>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Цена за единицу:</span>
              <span className="font-bold">${item.discountedPrice.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Старая сумма:</span>
              <span className="text-sm text-muted-foreground line-through">
                ${(item.discountedPrice * item.quantity).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-sm text-muted-foreground">Новая сумма:</span>
              <span className="text-lg font-bold text-primary">${totalPrice.toFixed(2)}</span>
            </div>

            {quantity !== item.quantity && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Изменение:</span>
                <span
                  className={`text-sm font-medium ${
                    quantity > item.quantity ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {quantity > item.quantity ? "+" : ""}
                  {quantity - item.quantity} шт.
                </span>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSave}>Сохранить изменения</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
