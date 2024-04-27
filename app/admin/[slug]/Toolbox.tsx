import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  preview: boolean;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
  post: any;
}

export default function Toolbox({ preview, setPreview, post }: Props) {
  return (
    <>
      <Button onClick={() => setPreview(!preview)}>
        {preview ? "Edit" : "Preview"}
      </Button>
      <Link href={`/${post.username}/${post.slug}`}>
        <Button className="btn-blue">Live view</Button>
      </Link>
    </>
  );
}
