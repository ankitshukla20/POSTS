import { auth, storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ChangeEvent, useState } from "react";

export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState<null | string>(null);
  const [progress, setProgress] = useState(0);

  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      // Get the file
      const file = Array.from(files)[0];
      const extension = file.type.split("/")[1];

      // Makes reference to the storage bucket location
      const fileRef = ref(
        storage,
        `uploads/${auth.currentUser?.uid}/${Date.now()}.${extension}`
      );
      setUploading(true);

      // Start the upload
      const uploadTask = uploadBytesResumable(fileRef, file);

      // Listen to updates to upload task
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const pct = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(pct);
        },
        (error) => {
          console.log(error);
          setUploading(false);
        }
      );

      // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
      uploadTask
        .then(() => getDownloadURL(fileRef))
        .then((url) => {
          if (typeof url === "string") setDownloadURL(url);
          setUploading(false);
        });
    } else {
      console.log("No files were selected");
    }
  };

  return (
    <div className="mt-5 mb-5">
      {uploading && <p>{progress}%</p>}

      {!uploading && (
        <>
          <label className="w-40 text-md text-slate-950 dark:text-gray-300 cursor-pointer px-4 py-2 bg-white dark:bg-gray-950 border border-gray-400 dark:border-gray-800 rounded hover:bg-blue-50 dark:hover:bg-blue-950 flex items-center space-x-2">
            📷 Upload Img
            <input
              type="file"
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg"
              className="hidden" // Hide the file input
            />
          </label>
        </>
      )}

      {downloadURL && (
        <>
          <p className="mt-2 animate-pulse">
            Copy this whole & simply paste it in the editor:{" "}
          </p>
          <code className="break-words whitespace-normal font-light text-sm text-blue-800 dark:text-blue-300">{`![alt](${downloadURL})`}</code>
        </>
      )}
    </div>
  );
}
