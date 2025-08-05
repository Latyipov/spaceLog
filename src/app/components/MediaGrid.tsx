"use client";
import { useState, useCallback } from "react";
import type { ApodData } from "@schemas";
import { Loading } from "@components/Loading/Loading";
import { APODModal } from "@/app/components/APODModal";
import { MediaThumb } from "@components/MediaThumb";

type MediaGridPropsType = {
  dataCollection: ApodData[] | null;
  loading: boolean;
  error: string | null;
  type: string;
};

export function MediaGrid({
  dataCollection,
  loading,
  error,
  type,
}: MediaGridPropsType) {
  const [selectedCard, setSelectedCard] = useState<ApodData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpenModal = useCallback((data: ApodData) => {
    setSelectedCard(data);
    setIsModalOpen(true);
  }, []);
  const onCloseModal = () => {
    setIsModalOpen(false);
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
            <div className="relative aspect-[4/3]">
              <MediaThumb
                media_type={dailyData.media_type}
                url={dailyData.url ?? ""}
                title={dailyData.title}
              />
            </div>
            <div className="p-3">
              <h3 className="text-xl font-semibold text-white">
                {dailyData.title}
              </h3>
            </div>
          </div>
        ))}

      {selectedCard && (
        <APODModal
          data={selectedCard}
          isOpen={isModalOpen}
          onClose={onCloseModal}
          type={type}
        />
      )}
    </section>
  );
}
