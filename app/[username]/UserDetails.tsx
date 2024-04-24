import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/lib/models";
import { DocumentData } from "firebase/firestore";

interface UserDocument extends User, DocumentData {}

interface Props {
  user: UserDocument | null;
}

export default function UserDetails({ user }: Props) {
  return (
    <div className="flex gap-10 justify-center items-center mt-10 mb-14">
      <Avatar className="h-25 w-25">
        <AvatarImage src={`${user?.photoUrl}`} />
        <AvatarFallback>{user?.displayName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-3xl font-black mb-2">
          {user?.displayName || "Anonymous User"}
        </h1>
        <p>
          <strong>Username: </strong>
          <em>@{user?.username}</em>
        </p>
      </div>
    </div>
  );
}
