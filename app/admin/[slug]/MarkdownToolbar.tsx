import { useEffect, useState } from "react";

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

  return (
    <div className="flex gap-4">
      <button onClick={handleHeading1}>H1</button>
      <button onClick={handleHeading2}>H2</button>
      <button onClick={handleHeading3}>H3</button>
      <button onClick={handleBold}>Bold</button>
      <button onClick={handleItalic}>Italic</button>
      <button onClick={handleQuote}>Quote</button>
      <button onClick={handleOrderedList}>Ordered List</button>
      <button onClick={handleUnorderedList}>Unordered List</button>
      <button onClick={handleCodeBlock}>Code Block</button>
      <button onClick={handleHorizontalRule}>Horizontal Rule</button>
      <button onClick={handleLink}>Link</button>
      <button onClick={handleImage}>Image</button>
      <button onClick={handleNextLine}>Next Line</button>
    </div>
  );
}
