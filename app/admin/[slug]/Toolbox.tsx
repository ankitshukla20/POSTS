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
    <div className="flex justify-between">
      <div className="flex">
        <div className="bg-slate-100 dark:bg-slate-800 rounded flex flex-col sm:flex-row gap-2">
          <Button
            className="rounded-e-none hover:scale-110 duration-150 hover:duration-150"
            variant="ghost"
            onClick={() => setEdit(!edit)}
          >
            {edit ? "Hide Editor" : "Show Editor"}
          </Button>
          <Button
            className="rounded-none hover:scale-110 duration-150 hover:duration-150"
            variant="ghost"
            onClick={() => setPreview(!preview)}
          >
            {preview ? "Hide Preview" : "Show Preview"}
          </Button>
          <Button
            className="rounded-s-none hover:scale-110 duration-150 hover:duration-150"
            variant="ghost"
            onClick={() => {
              setEdit(true);
              setPreview(true);
            }}
          >
            Show Both
          </Button>
        </div>
      </div>

      <Link href={`/${post?.username}/${post?.slug}`}>
        <Button
          className="bg-slate-100 dark:bg-slate-800 rounded hover:scale-110 duration-150 hover:duration-150"
          variant="ghost"
        >
          Live view
        </Button>
      </Link>
    </div>
  );
}
