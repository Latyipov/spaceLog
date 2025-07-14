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

interface ApodModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ApodData | null;
}

export function ApodModal({ isOpen, onClose, data }: ApodModalProps) {
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

        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-200"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <DialogPanel className="bg-gray-900 text-white max-w-xl w-full rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                {data.media_type === "image" ? (
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={data.url}
                      alt={data.title}
                      fill
                      className="object-cover rounded shadow h-48 w-full object-cover"
                    />
                  </div>
                ) : (
                  <iframe
                    src={data.url}
                    title={data.title}
                    allowFullScreen
                    className="w-full aspect-video rounded h-48 w-full object-cover"
                  />
                )}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-white text-xl hover:text-red-500"
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
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
