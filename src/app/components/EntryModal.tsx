"use client";

import {
  Transition,
  Dialog,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { MediaThumb } from "@components/MediaThumb";
import { TagList } from "@components/TagList";
import type { Entry } from "@schemas";
import toast from "react-hot-toast";
import { trpcApi } from "@/utils/trpc";
import { Loading } from "@components/Loading/Loading";

interface EntryModalProps {
  data: Entry | null;
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "edit" | null;
  update: () => void;
}

export function EntryModal({
  data,
  isOpen,
  onClose,
  mode,
  update,
}: EntryModalProps) {
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const entryId = data?.id;
  const { data: entryData } = trpcApi.entry.getEntryById.useQuery(
    { id: entryId! },
    { enabled: !!entryId && mode === "edit" }
  );
  const { mutate: updateEntry } = trpcApi.entry.updateEntry.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      toast.success("✅ Changes saved");
      update();
      onClose();
      setComment("");
      setTags("");
    },
    onError: (error) => {
      setLoading(false);
      console.log(error.data);
      if (error.data?.code === "CONFLICT") {
        toast.error(error.message);
      } else {
        toast.error(error.message || "Something went wrong");
      }
    },
  });

  const handleSave = () => {
    if (data) {
      const parsedTags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");

      updateEntry({
        type: data.type,
        id: data.id,
        tags: parsedTags,
        comment: comment,
      });
    }
  };

  useEffect(() => {
    if (isOpen && mode === "edit" && entryData) {
      setComment(entryData.comment ?? "");
      setTags((entryData.tags ?? []).join(", "));
    }
    if (isOpen && mode === "view") {
      setComment("");
      setTags("");
    }
  }, [isOpen, mode, entryData?.id]);

  if (!data || !mode) return null;
  if (loading) return <Loading />;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto p-4">
          <div className="min-h-full flex flex-col items-center justify-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-200"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <DialogPanel className="relative bg-gray-900 text-white max-w-2xl w-full rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <button
                  onClick={onClose}
                  style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
                  className="absolute top-3 right-3 text-white text-xl hover:text-blue-500 drop-shadow-2xl"
                >
                  ✖
                </button>

                <div className="px-6 py-5 space-y-2">
                  {mode === "edit" && (
                    <>
                      <h4 className="text-sm font-semibold text-gray-400 mb-1">
                        🏷️ Tags:
                      </h4>
                      <input
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Tags (comma-separated)"
                        className="w-full p-3 bg-gray-800 rounded-lg text-white"
                      />
                      <h4 className="text-sm font-semibold text-gray-400 mb-1">
                        💬 Comment:
                      </h4>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Your comment..."
                        className="w-full p-3 bg-gray-800 rounded-lg text-white resize-none h-28"
                      />
                      <div className="pt-4">
                        <button
                          onClick={handleSave}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold"
                        >
                          💾 Save
                        </button>
                      </div>
                    </>
                  )}
                  {mode === "view" && (
                    <>
                      <h4 className="text-sm font-semibold text-gray-400 mb-1">
                        🏷️ Tags:
                      </h4>
                      <TagList tagList={data.tags ?? []} />
                      <h4 className="text-sm font-semibold text-gray-400 mb-1">
                        💬 Comment:
                      </h4>
                      <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                        {data.comment}
                      </p>
                    </>
                  )}
                </div>

                <MediaThumb
                  media_type={data.media_type}
                  url={data.url ?? ""}
                  title={data.title}
                />
                <div className="px-6 py-5 space-y-2">
                  <DialogTitle className="text-2xl font-bold mb-1">
                    {data.title}
                  </DialogTitle>
                  <p className="text-sm text-gray-400">{data.date}</p>
                  <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {data.explanation}
                  </p>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
