import ProductCard from "../ProductCard";
import UserCard from "../UserCard";

import type { Product, User } from "./types";

import { cardsConstants } from "@/app/constants";

interface CardsProps {
  cards: Product[] | User[];
  type: "products" | "users";
  title?: string;
}

const Cards = ({ cards, type, title }: CardsProps) => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            {title ||
              (type === cardsConstants.type
                ? cardsConstants.productsList
                : cardsConstants.usersList)}
          </h1>

          {cards.length == 0 ? (
            <p className="text-muted-foreground mt-20  flex items-center justify-center text-red-600">
              Ошибка получения{" "}
              {type === cardsConstants.type ? cardsConstants.products : cardsConstants.users}
            </p>
          ) : (
            <p className="text-muted-foreground mt-2">
              Найдено {cards.length}{" "}
              {type === cardsConstants.type ? cardsConstants.products : cardsConstants.users}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card) => {
            if (type === cardsConstants.type) {
              const product = card as Product;

              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  discountPercentage={product.discountPercentage}
                  rating={product.rating}
                  stock={product.stock}
                  brand={product.brand}
                  category={product.category}
                  thumbnail={product.thumbnail}
                />
              );
            } else {
              const user = card as User;

              return (
                <UserCard
                  key={user.id}
                  id={user.id}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  age={user.age}
                  gender={user.gender}
                  email={user.email}
                  phone={user.phone}
                  username={user.username}
                  image={user.image}
                  birthDate={user.birthDate}
                  address={user.address}
                  company={user.company}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Cards;
