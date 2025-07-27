"use client";

import {
  Transition,
  Dialog,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import type { ApodData } from "@schemas";
import { useSession } from "next-auth/react";

interface ApodModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ApodData | null;
  onAddToLog: () => void;
}

export function ApodModal({
  isOpen,
  onClose,
  data,
  onAddToLog,
}: ApodModalProps) {
  const { status } = useSession();
  if (!data) return null;

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
                  {data.media_type === "image" ? (
                    <div className="w-full">
                      <Image
                        src={data.url}
                        alt={data.title}
                        width={800}
                        height={600}
                        className="object-cover rounded shadow"
                      />
                    </div>
                  ) : (
                    <iframe
                      src={data.url}
                      title={data.title}
                      allowFullScreen
                      className="w-full aspect-video rounded object-cover"
                    />
                  )}
                  <button
                    onClick={onClose}
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
                    className="absolute top-3 right-3 text-white text-xl hover:text-blue-500 drop-shadow-2xl"
                  >
                    ✖
                  </button>
                </div>
                <div className="p-5">
                  <DialogTitle className="text-2xl font-bold mb-1">
                    {data.title}
                  </DialogTitle>
                  <p className="text-sm text-gray-400 mb-2">{data.date}</p>
                  <p className="text-gray-200 whitespace-pre-wrap">
                    {data.explanation}
                  </p>
                  {status === "authenticated" && (
                    <button
                      onClick={onAddToLog}
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition block mx-auto cursor-pointer"
                    >
                      Add to your log
                    </button>
                  )}
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
