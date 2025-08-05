"use client";

import {
  Transition,
  Dialog,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState, useRef, Fragment } from "react";
import type { ApodData } from "@schemas";
import { trpcApi } from "@/utils/trpc";
import { Loading } from "@components/Loading/Loading";
import { MediaThumb } from "@components/MediaThumb";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

interface APODModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ApodData;
  type: string;
}

export function APODModal({ isOpen, onClose, data, type }: APODModalProps) {
  const { status } = useSession();
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const { mutate: createEntry } = trpcApi.entry.createEntry.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success("✅ Saved in log!");
      onClose();
      setComment("");
      setTags("");
    },
    onError: (error) => {
      setIsLoading(false);
      console.log(error.data);
      if (error.data?.code === "CONFLICT") {
        toast.error(error.message);
      } else {
        toast.error(error.message || "Something went wrong");
      }
    },
  });
  const handleScrollToTop = () => {
    setIsCreateMode(true);
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };
  const handleSave = () => {
    const parsedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");
    createEntry({
      date: data.date,
      title: data.title,
      explanation: data.explanation,
      media_type: data.media_type,
      url: data.url ?? null,
      hdurl: data.hdurl,
      comment: comment,
      tags: parsedTags,
      type: type,
    });
  };
  const handleCancel = () => {
    const confirmed = window.confirm("Are you sure that you want close?");
    if (confirmed) {
      onClose();
      setIsCreateMode(false);
    } else {
      return undefined;
    }
  };

  if (!data) return null;
  // if (isLoading) return <Loading />;

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
          <div className="fixed inset-0 bg-black/70" />
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
              <DialogPanel className="relative bg-gray-900 text-white max-w-xl w-full rounded-xl shadow-lg overflow-hidden transition-all">
                {isLoading ? (
                  <div className="h-screen flex items-center justify-center text-white">
                    <Loading />
                  </div>
                ) : (
                  <>
                    <div ref={topRef} />
                    {isCreateMode && (
                      <DialogTitle className="text-xl font-semibold text-center p-1">
                        ✍️ Add to Log
                      </DialogTitle>
                    )}

                    {isCreateMode && (
                      <div className="p-5">
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Your comment..."
                          className="w-full p-3 bg-gray-800 rounded-lg text-white resize-none h-28"
                        />
                        <input
                          value={tags}
                          onChange={(e) => setTags(e.target.value)}
                          placeholder="Tags (comma-separated)"
                          className="w-full p-3 bg-gray-800 rounded-lg text-white"
                        />
                        <div className="flex justify-between gap-2 pt-2">
                          <button
                            onClick={handleCancel}
                            className="w-1/2 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl"
                          >
                            ← Cancel
                          </button>
                          <button
                            onClick={handleSave}
                            className="w-1/2 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold"
                          >
                            💾 Save
                          </button>
                        </div>
                      </div>
                    )}

                    <MediaThumb
                      media_type={data.media_type}
                      url={data.url ?? ""}
                      title={data.title}
                    />
                    <button
                      onClick={onClose}
                      style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
                      className="absolute top-3 right-3 text-white text-xl hover:text-blue-500 drop-shadow-2xl z-10"
                    >
                      ✖
                    </button>

                    <div className="p-5">
                      <DialogTitle className="text-2xl font-bold mb-1">
                        {data.title}
                      </DialogTitle>
                      <p className="text-sm text-gray-400 mb-2">{data.date}</p>
                      <p className="text-gray-200 whitespace-pre-wrap">
                        {data.explanation}
                      </p>
                      {status === "authenticated" && !isCreateMode && (
                        <button
                          onClick={handleScrollToTop}
                          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition block mx-auto cursor-pointer"
                        >
                          Add to your log
                        </button>
                      )}
                    </div>
                  </>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
