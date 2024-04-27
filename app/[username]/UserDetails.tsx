import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { User } from "@/lib/models";
import { DocumentData } from "firebase/firestore";

interface UserDocument extends User, DocumentData {}

interface Props {
  user: UserDocument | null;
}

export default function UserDetails({ user }: Props) {
  const userPhoto = user?.photoUrl || "/avatar.svg";

  return (
    <div>
      <CardContainer className="mt-10 mb-5">
        {}
        <BackgroundGradient className="">
          <CardBody className="flex items-center justify-around gap-10 py-6 px-8 bg-slate-100 shadow-lg dark:bg-slate-900 rounded-lg">
            <CardItem>
              <Avatar className="h-28 w-28">
                <AvatarImage src={`${userPhoto}`} />
                <AvatarFallback>{user?.displayName.charAt(0)}</AvatarFallback>
              </Avatar>
            </CardItem>

            <div>
              <CardItem>
                <h1 className="text-3xl font-black mb-2 text-wrap">
                  {user?.displayName || "Anonymous User"}
                </h1>
              </CardItem>
              <CardItem>
                <p>
                  <strong>Username: </strong>
                  <em>@{user?.username}</em>
                </p>
              </CardItem>
            </div>
          </CardBody>
        </BackgroundGradient>
      </CardContainer>
    </div>
  );
}
