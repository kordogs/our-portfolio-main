import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { supabase } from "../supabase/createClient";

export default function Modal({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // Store the file object
  const [imageToUpload, setImageToUpload] = useState(null);

  // Handle file input change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file) as any);
      setImageToUpload(file as any);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: bucketData, error: bucketError } = await supabase.storage
        .from("projects")
        .upload(
          "public/" + title + new Date().getTime() + ".jpg",
          imageToUpload as any,
          {
            cacheControl: "3600",
            upsert: false,
          }
        );

      if (bucketError) throw bucketError;

      const { data, error } = await supabase
        .from("projects")
        .insert({
          title,
          description,
          image_url: bucketData?.path,
        })
        .select("*");

      if (error) throw error;

      console.log(data);
      onSuccess();
      const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
      modal?.close();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    setTitle("");
    setDescription("");
    setImage(null);
  };

  return (
    <>
      <div
        className="card skeleton rounded-lg bg-gray-800 bg-opacity-50 w-full pt-2 flex items-center justify-center cursor-pointer min-h-56"
        onClick={() => {
          const modal = document.getElementById(
            "my_modal_1"
          ) as HTMLDialogElement;
          modal?.showModal();
        }}
      >
        <Plus className="w-10 h-10" color="gray" />
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="flex flex-col gap-2">
            {/* Image Preview */}
            {image && (
              <div className="mb-4">
                <Image
                  src={image}
                  alt="Image Preview"
                  className="w-full h-auto object-cover rounded-lg"
                  width={300}
                  height={300}
                />
              </div>
            )}

            <label className="input input-bordered flex items-center gap-2">
              Title
              <input
                type="text"
                className="grow"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // Handle title input
              />
            </label>

            <textarea
              className="textarea textarea-bordered max-h-30"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Handle description input
            ></textarea>

            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={handleImageChange} // Handle file input
            />
          </div>

          <div className="modal-action">
            <div className="flex gap-2">
              <button
                type="submit"
                className="btn bg-blue-500 text-white"
                onClick={handleSubmit}
                disabled={loading}
              >
                Submit
                {loading && (
                  <span className="loading loading-spinner text-white"></span>
                )}
              </button>
              <button
                className="btn"
                onClick={() => {
                  const modal = document.getElementById(
                    "my_modal_1"
                  ) as HTMLDialogElement;
                  modal?.close();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
