import { Award, Package, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";

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

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
}

const ProductCard = ({
  title,
  description,
  price,
  discountPercentage,
  rating,
  stock,
  brand,
  category,
  thumbnail,
}: ProductCardProps) => {
  const discountedPrice = price * (1 - discountPercentage / 100);
  const isLowStock = stock < 10;
  const isOutOfStock = stock === 0;

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            -{discountPercentage.toFixed(0)}%
          </Badge>
        )}

        <Badge variant="secondary" className="absolute top-2 right-2">
          {category}
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Award className="h-3 w-3" />
              <span className="text-sm">{brand}</span>
            </CardDescription>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Package className="h-3 w-3 mr-1" />
            <span className={isLowStock ? "text-amber-600 font-medium" : ""}>
              {isOutOfStock ? "Нет в наличии" : `${stock} шт.`}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{description}</p>

        <div className="flex items-center justify-between mt-auto">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">${discountedPrice.toFixed(2)}</span>
              {discountPercentage > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  ${price.toFixed(2)}
                </span>
              )}
            </div>
            <div className="text-xs text-green-600 font-medium">
              Экономия: ${(price - discountedPrice).toFixed(2)}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button className="w-full" disabled={isOutOfStock} size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isOutOfStock ? "Нет в наличии" : "В корзину"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
