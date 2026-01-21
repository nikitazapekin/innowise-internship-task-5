"use client";

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
import { useCartStore } from "@/store/cartStore";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    stock: number;
    thumbnail: string;
    brand: string;
  };
}

const Modal = ({ isOpen, onClose, product }: ModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const cartItems = useCartStore((state) => state.items);

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  const inCart = cartItems.find((item) => item.id === product.id);
  const availableStock = product.stock - (inCart?.quantity || 0);

  const handleQuantityChange = (value: string) => {
    const numValue = parseInt(value);

    if (!isNaN(numValue) && numValue > 0 && numValue <= availableStock) {
      setQuantity(numValue);
    }
  };

  const incrementQuantity = () => {
    if (quantity < availableStock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleConfirmAdd = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      discountedPrice,
      thumbnail: product.thumbnail,
      maxStock: product.stock,
      brand: product.brand,
    });
    onClose();
    setQuantity(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-20px)] max-w-[325px] sm:max-w-none bg-gray-100">
        <DialogHeader>
          <DialogTitle>Добавить в корзину</DialogTitle>
          <DialogDescription className="line-clamp-2">
            Выберите количество товара "{product.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="quantity">Количество</Label>
            <span className="text-sm text-muted-foreground">Доступно: {availableStock} шт.</span>
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
              id="quantity"
              min="1"
              max={availableStock}
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="w-20 text-center"
            />

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={incrementQuantity}
              disabled={quantity >= availableStock}
              className="h-10 w-10"
            >
              +
            </Button>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Цена за единицу:</span>
              <span className="font-bold">${discountedPrice.toFixed(2)}</span>
            </div>

            {product.discountPercentage > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Скидка:</span>
                <span className="text-sm text-green-600">
                  -{product.discountPercentage.toFixed(0)}%
                </span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-sm text-muted-foreground">Итого:</span>
              <span className="text-lg font-bold text-primary">
                ${(discountedPrice * quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleConfirmAdd}>Добавить в корзину</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
