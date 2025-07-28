"use client";
import { useState } from "react";
import type { ApodData } from "@schemas";
import { Loading } from "@components/Loading/Loading";
import { ApodModal } from "@components/ApodModal";
import { AddToLogModal } from "@components/AddToLogModal";
import Image from "next/image";

type ApodDataViewPropsType = {
  dataCollection: ApodData[] | null;
  loading: boolean;
  error: string | null;
  type: string;
};

export function DataView({
  dataCollection,
  loading,
  error,
  type,
}: ApodDataViewPropsType) {
  const [selectedCard, setSelectedCard] = useState<ApodData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const onOpenModal = (data: ApodData) => {
    setSelectedCard(data);
    setIsModalOpen(true);
  };
  const onCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };
  const onAddToLog = () => {
    setIsModalOpen(false);
    setIsAddModalOpen(true);
  };
  const onCloseAddModal = () => {
    setIsAddModalOpen(false);
    setSelectedCard(null);
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <section
      className={`grid 
      gap-6 p-4 justify-items-center`}
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
    >
      {dataCollection &&
        dataCollection.map((dailyData) => (
          <div
            key={dailyData.date}
            onClick={() => onOpenModal(dailyData)}
            className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:scale-[1.02] transition transform cursor-pointer w-full max-w-[600px] min-w-[300px]"
          >
            {dailyData.media_type === "image" ? (
              <div className="relative aspect-[4/3]">
                <Image
                  src={dailyData.url}
                  alt={dailyData.title}
                  fill
                  className="object-cover rounded shadow h-48 w-full object-cover"
                />
              </div>
            ) : (
              <iframe
                src={dailyData.url}
                title={dailyData.title}
                allowFullScreen
                className="w-full aspect-video rounded h-48 w-full object-cover"
              />
            )}
            <div className="p-3">
              <h3 className="text-xl font-semibold text-white">
                {dailyData.title}
              </h3>
            </div>
          </div>
        ))}
      <ApodModal
        data={selectedCard}
        isOpen={isModalOpen}
        onClose={onCloseModal}
        onAddToLog={onAddToLog}
      />
      <AddToLogModal
        data={selectedCard}
        isOpen={isAddModalOpen}
        onClose={onCloseAddModal}
        type={type}
      />
    </section>
  );
}
