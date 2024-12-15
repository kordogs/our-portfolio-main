import { Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/createClient";

export default function ModalUpdate({
  id,
  onSuccess,
}: {
  id?: number;
  onSuccess: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imageToUpload, setImageToUpload] = useState<File | null>(null);

  // Fetch existing data if an id is provided
  useEffect(() => {
    if (id) {
      (async () => {
        const { data, error } = await supabase
          .from("projects")
          .select("title, description, image_url")
          .eq("id", id)
          .single();

        if (data) {
          setTitle(data.title);
          setDescription(data.description);
          setImage(data.image_url);
        }
        if (error) console.error("Error fetching data:", error);
      })();
    }
  }, [id]);

  // Handle file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageToUpload(file);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = image;

      // Upload the image if a new one is selected
      if (imageToUpload) {
        const { data: bucketData, error: bucketError } = await supabase.storage
          .from("projects")
          .upload(`public/${title}-${Date.now()}.jpg`, imageToUpload, {
            cacheControl: "3600",
            upsert: false,
          });

        if (bucketError) throw bucketError;
        imageUrl = bucketData?.path;
      }

      if (id) {
        // Update an existing record
        const { error } = await supabase
          .from("projects")
          .update({
            title,
            description,
            image_url: imageUrl,
          })
          .eq("id", id);

        if (error) throw error;
      } else {
        // Insert a new record
        const { error } = await supabase.from("projects").insert({
          title,
          description,
          image_url: imageUrl,
        });

        if (error) throw error;
      }

      onSuccess();
      const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
      modal?.close();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <div className="flex flex-col gap-2">
            {/* Image Preview */}
            {/* {image && (
              <div className="mb-4">
                <Image
                  src={
                    `https://qrtvihjmkmdegmrfsofm.supabase.co/storage/v1/object/public/projects/` +
                    image
                  }
                  alt="Image Preview"
                  className="w-full h-auto object-cover rounded-lg"
                  width={300}
                  height={300}
                />
              </div>
            )} */}

            <h1 className="text-2xl font-bold mb-2 text-center">Update</h1>

            <label className="input input-bordered flex items-center gap-2">
              Title
              <input
                type="text"
                className="grow"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <textarea
              className="textarea textarea-bordered max-h-30"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={handleImageChange}
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
                {id ? "Update" : "Submit"}
                {loading && (
                  <span className="loading loading-spinner text-white"></span>
                )}
              </button>
              <button
                className="btn"
                onClick={() => {
                  const modal = document.getElementById(
                    "my_modal_2"
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
