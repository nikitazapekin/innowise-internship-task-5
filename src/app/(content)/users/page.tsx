import Cards from "../../_components/Cards";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  image: string;
  birthDate: string;
  address: {
    address: string;
    city: string;
    state: string;
  };
  company: {
    name: string;
    title: string;
  };
}
const handleFetchUsers = async () => {
  try {
    const response = await fetch("https://dummyjson.com/users");

    if (!response.ok) {
      throw new Error("Ошибка загрузки данных");
    }

    const data = await response.json();

    return data;
  } catch {
    return [];
  }
};

const UsersPage = async () => {
  const data = await handleFetchUsers();
  const users: User[] = data.users || [];

  return <Cards cards={users} type="users" title="Список пользователей" />;
};

export default UsersPage;
