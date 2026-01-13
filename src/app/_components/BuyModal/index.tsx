"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCartStore } from "@/store/cartStore";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BuyModal = ({ isOpen, onClose }: ModalProps) => {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (isOpen) {
      clearCart();
    }
  }, [isOpen, clearCart]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-20px)] max-w-[325px] sm:max-w-none bg-gray-100">
        <DialogHeader>
          <DialogTitle>Успешная покупка!</DialogTitle>
          <DialogDescription className="line-clamp-2">Ваш товар уже в пути!</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose}>Закрыть</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuyModal;
