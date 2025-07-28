"use client";

import {
  Transition,
  Dialog,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import Image from "next/image";
import type { ApodData } from "@schemas";
import { trpcApi } from "@/utils/trpc";
import { Loading } from "@components/Loading/Loading";
import toast from "react-hot-toast";

interface ApodModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ApodData | null;
  type: string;
}

export function AddToLogModal({ isOpen, onClose, data, type }: ApodModalProps) {
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { mutate: createEntry } = trpcApi.entry.createEntry.useMutation({
    onMutate: () => {
      setLoading(true);
      setError("");
    },
    onSuccess: () => {
      setLoading(false);
      toast.success("✅ Saved in log!");
      onClose();
      setComment("");
      setTags("");
    },
    onError: (error) => {
      setLoading(false);
      console.log(error.data);
      if (error.data?.code === "CONFLICT") {
        setError(error.message);
      } else {
        setError(error.message || "Something went wrong");
      }
    },
  });

  if (!data) return null;

  const handleSave = () => {
    createEntry({
      ...data,
      comment: comment,
      tags: tags.split(","),
      type: type,
    });
  };
  const handleCancel = () => {
    const confirmed = window.confirm("Are you sure that you want close?");
    if (confirmed) {
      onClose();
    } else {
      return undefined;
    }
  };

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
              <DialogPanel className="bg-gray-900 text-white max-w-xl w-full rounded-xl shadow-lg overflow-hidden transition-all">
                <div className="relative">
                  <DialogTitle className="text-xl font-semibold text-center p-1">
                    ✍️ Add to Log
                  </DialogTitle>
                  <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-white text-xl hover:text-blue-500"
                  >
                    ✖
                  </button>
                </div>
                <div className="p-6 space-y-4 ">
                  {loading ? (
                    <Loading />
                  ) : (
                    <>
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
                      {error && (
                        <div className="text-red-400 text-sm font-medium">
                          {error}
                        </div>
                      )}
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
                    </>
                  )}
                </div>
                <div className="relative">
                  {data.media_type === "image" ? (
                    <Image
                      src={data.url}
                      alt={data.title}
                      width={800}
                      height={600}
                      className="object-cover w-full h-auto"
                    />
                  ) : (
                    <iframe
                      src={data.url}
                      title={data.title}
                      allowFullScreen
                      className="w-full aspect-video rounded object-cover"
                    />
                  )}
                </div>

                <div className="p-5">
                  <DialogTitle className="text-2xl font-bold mb-1">
                    {data.title}
                  </DialogTitle>
                  <p className="text-sm text-gray-400 mb-2">{data.date}</p>
                  <p className="text-gray-200 whitespace-pre-wrap">
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
