interface Props {
  username: string;
  isValid: boolean;
  isLoading: boolean;
}

export default function UsernameMessage({
  username,
  isValid,
  isLoading,
}: Props) {
  if (isLoading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-green-600">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-red-600">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
