import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  edit: boolean;
  preview: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
  post: any;
}

export default function Toolbox({
  edit,
  setEdit,
  preview,
  setPreview,
  post,
}: Props) {
  return (
    <>
      <Button variant="outline" onClick={() => setPreview(!preview)}>
        {preview ? "Hide Preview" : "Show Preview"}
      </Button>
      <Button variant="outline" onClick={() => setEdit(!edit)}>
        {preview ? "Hide Editor" : "Show Editor"}
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          setEdit(true);
          setPreview(true);
        }}
      >
        Show Both
      </Button>
      <Link href={`/${post?.username}/${post?.slug}`}>
        <Button variant="outline" className="btn-blue">
          Live view
        </Button>
      </Link>
    </>
  );
}
