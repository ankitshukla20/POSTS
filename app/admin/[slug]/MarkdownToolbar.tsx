import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { LuHeading1 } from "react-icons/lu";
import { LuHeading2 } from "react-icons/lu";
import { LuHeading3 } from "react-icons/lu";
import { BsTypeBold } from "react-icons/bs";
import { RiItalic } from "react-icons/ri";
import { GrBlockQuote } from "react-icons/gr";
import { RiListOrdered2 } from "react-icons/ri";
import { RiListUnordered } from "react-icons/ri";
import { RiCodeSSlashFill } from "react-icons/ri";
import { MdOutlineHorizontalRule } from "react-icons/md";
import { MdOutlineLink } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";
import { MdKeyboardReturn } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  markdownText: string;
  setMarkdownText: React.Dispatch<React.SetStateAction<string>>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

interface Selection {
  start: number;
  end: number;
}

export default function MarkdownToolbar({
  markdownText,
  setMarkdownText,
  textareaRef,
}: Props) {
  const [selection, setSelection] = useState<Selection>();

  useEffect(() => {
    if (!selection) return; // prevent running on start

    const { start, end } = selection;

    textareaRef.current?.focus();
    textareaRef.current?.setSelectionRange(start, end);
  }, [selection]);

  const handleHeading1 = () => {
    setMarkdownText(`${markdownText}\n# Heading 1\n`);

    const start = markdownText.length + 3;
    const end = start + "Heading 1".length;

    setSelection({ start, end });
  };

  const handleHeading2 = () => {
    setMarkdownText(`${markdownText}\n## Heading 2\n`);

    const start = markdownText.length + 4;
    const end = start + "Heading 2".length;

    setSelection({ start, end });
  };

  const handleHeading3 = () => {
    setMarkdownText(`${markdownText}\n### Heading 3\n`);

    const start = markdownText.length + 5;
    const end = start + "Heading 3".length;

    setSelection({ start, end });
  };

  const handleBold = () => {
    setMarkdownText(`${markdownText}**bold text** `);

    const start = markdownText.length + 2;
    const end = start + `bold text`.length;

    setSelection({ start, end });
  };

  const handleItalic = () => {
    setMarkdownText(`${markdownText}*italic text* `);

    const start = markdownText.length + 1;
    const end = start + `italic text`.length;
    setSelection({ start, end });
  };

  const handleQuote = () => {
    setMarkdownText(`${markdownText}\n> blockquote\n\n`);

    const start = markdownText.length + 3;
    const end = start + "blockquote".length;

    setSelection({ start, end });
  };

  const handleOrderedList = () => {
    setMarkdownText(
      `${markdownText}\n1. First item\n2. Second item\n3. Third item\n\n`
    );

    const start = markdownText.length + 4;
    const end = start + "First item".length;

    setSelection({ start, end });
  };

  const handleUnorderedList = () => {
    setMarkdownText(
      `${markdownText}\n- First item\n- Second item\n- Third item\n\n`
    );

    const start = markdownText.length + 3;
    const end = start + "First item".length;

    setSelection({ start, end });
  };

  const handleCodeBlock = () => {
    setMarkdownText(`${markdownText}\n~~~ \nCode\n~~~ \n`);

    const start = markdownText.length + 6;
    const end = start + `Code`.length;

    setSelection({ start, end });
  };

  const handleHorizontalRule = () => {
    setMarkdownText(`${markdownText}\n---\n`);

    const start = markdownText.length + 5;
    const end = start;

    setSelection({ start, end });
  };

  const handleLink = () => {
    setMarkdownText(`${markdownText}\n[title](https://www.example.com)\n`);

    const start = markdownText.length + 9;
    const end = start + `https://www.example.com`.length;

    setSelection({ start, end });
  };

  const handleImage = () => {
    setMarkdownText(
      `${markdownText}\n![alt text](https://example/image1234.jpg)\n`
    );

    const start = markdownText.length + 13;
    const end = start + `https://example/image1234.jpg`.length;

    setSelection({ start, end });
  };

  const handleNextLine = () => {
    setMarkdownText(`${markdownText}  \n`);

    const start = markdownText.length + 3;
    const end = start;

    setSelection({ start, end });
  };

  const Buttons = [
    {
      onClick: handleHeading2,
      element: <LuHeading2 />,
      tooltip: <p>Heading 2</p>,
    },
    {
      onClick: handleHeading3,
      element: <LuHeading3 />,
      tooltip: <p>Heading </p>,
    },
    { onClick: handleBold, element: <BsTypeBold />, tooltip: <p>Bold</p> },
    { onClick: handleItalic, element: <RiItalic />, tooltip: <p>Italic</p> },
    { onClick: handleQuote, element: <GrBlockQuote />, tooltip: <p>Quote</p> },
    {
      onClick: handleOrderedList,
      element: <RiListOrdered2 />,
      tooltip: <p>Ordered list</p>,
    },
    {
      onClick: handleUnorderedList,
      element: <RiListUnordered />,
      tooltip: <p>List</p>,
    },
    {
      onClick: handleCodeBlock,
      element: <RiCodeSSlashFill />,
      tooltip: <p>Code block</p>,
    },
    {
      onClick: handleHorizontalRule,
      element: <MdOutlineHorizontalRule />,
      tooltip: <p>Horizontal rule</p>,
    },
    { onClick: handleImage, element: <BsCardImage />, tooltip: <p>Image</p> },
    { onClick: handleLink, element: <MdOutlineLink />, tooltip: <p>Link</p> },
  ];

  return (
    <div className="flex">
      <div className="rounded-md flex flex-wrap gap-1 bg-slate-200 dark:bg-slate-800">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleHeading1}
                className="rounded-e-none hover:bg-slate-400 hover:text-slate-100 dark:hover:bg-slate-600"
              >
                <LuHeading1 />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Heading 1</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {Buttons.map((b, i) => (
          <TooltipProvider key={i}>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={b.onClick}
                  className="rounded-none hover:bg-slate-400 hover:text-slate-100 dark:hover:bg-slate-600"
                >
                  {b.element}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{b.tooltip}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextLine}
                className="rounded-s-none hover:bg-slate-400 hover:text-slate-100 dark:hover:bg-slate-600"
              >
                <MdKeyboardReturn />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Next line</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
