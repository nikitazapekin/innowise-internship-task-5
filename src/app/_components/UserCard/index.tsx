import { Briefcase, Calendar, Mail, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface UserCardProps {
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

const UserCard = ({
  firstName,
  lastName,
  age,
  gender,
  email,
  phone,
  username,
  image,
  birthDate,
  address,
  company,
}: UserCardProps) => {
  const getGenderColor = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "male":
        return "bg-blue-500";

      case "female":
        return "bg-pink-500";

      default:
        return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("ru-RU");
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="absolute inset-0 flex items-center justify-center">
          {image ? (
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={image}
                alt={`${firstName} ${lastName}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
              <User className="h-16 w-16 text-gray-500" />
            </div>
          )}
        </div>

        <Badge className={`absolute top-4 right-4 ${getGenderColor(gender)} text-white`}>
          {gender === "male" ? "♂" : "♀"} {gender}
        </Badge>

        <Badge variant="secondary" className="absolute top-4 left-4">
          {age} лет
        </Badge>
      </div>

      <CardHeader className="pb-2">
        <div className="text-center">
          <CardTitle className="text-xl">
            {firstName} {lastName}
          </CardTitle>
          <CardDescription className="flex items-center justify-center gap-1 mt-1">
            <span className="text-sm">@{username}</span>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a
              href={`mailto:${email}`}
              className="text-blue-600 hover:underline truncate"
              title={email}
            >
              {email}
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{phone}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate" title={`${address.address}, ${address.city}`}>
              {address.city}, {address.state}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span className="truncate" title={`${company.title} в ${company.name}`}>
              {company.title}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Родился: {formatDate(birthDate)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
