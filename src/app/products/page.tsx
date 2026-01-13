import Cards from "../_components/Cards";

interface Product {
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
  images: string[];
}
const handleFetchProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");

    if (!response.ok) {
      throw new Error("Ошибка загрузки данных");
    }

    const data = await response.json();

    return data;
  } catch {
    return [];
  }
};
const Products = async () => {
  const data = await handleFetchProducts();
  const products: Product[] = data.products || [];

  return <Cards cards={products} type={"products"} />;
};

export default Products;
