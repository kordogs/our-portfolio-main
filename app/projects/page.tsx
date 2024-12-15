"use client";

import { useCallback, useEffect, useState } from "react";
import Card from "../components/Card";
import { supabase } from "../supabase/createClient";
import Modal from "../components/Modal";
import ModalUpdate from "../components/ModalUpdate";

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

export default function Page() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [idToUpdate, setIdToUpdate] = useState<number | undefined>(undefined);
  const listProjects = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("projects").select("*");

      if (error) throw error;

      console.log(data);
      setProjects(data as any);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProject = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("projects")
          .delete()
          .eq("id", id);

        if (error) throw error;

        console.log(data);
        listProjects();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [listProjects]
  );

  useEffect(() => {
    listProjects();
  }, [listProjects]);

  function handleOnUpdate(id: number) {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    modal.showModal();
    setIdToUpdate(id);
  }

  return (
    <div className="h-screen">
      <div className="px-24 grid gap-2 lg:grid-cols-4 grid-cols-2">
        {loading ? <div className="skeleton h-full w-full min-h-48"></div> : ""}
        {projects?.map((project, index) => (
          <Card
            key={index}
            title={project?.title}
            description={project?.description}
            image={
              `https://qrtvihjmkmdegmrfsofm.supabase.co/storage/v1/object/public/projects/` +
              project?.image_url
            }
            onDelete={() => deleteProject(project?.id)}
            onUpdate={() => handleOnUpdate(project?.id)}
          />
        ))}
        <Modal onSuccess={listProjects} />
        <ModalUpdate id={idToUpdate} onSuccess={listProjects} />
      </div>
    </div>
  );
}
