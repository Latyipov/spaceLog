"use client";
import { useState, useCallback } from "react";
import type { Entry } from "@schemas";
import { Loading } from "@components/Loading/Loading";
import { trpcApi } from "@/utils/trpc";
import { EntryModal } from "@components/EntryModal";
import { EntryTableRow } from "@components/EntryTableRow";
import toast from "react-hot-toast";

export function EntryTable() {
  const {
    data: allEntries,
    isLoading,
    error: queryError,
    refetch,
  } = trpcApi.entry.getAllEntries.useQuery();

  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setIsModalMode] = useState<"view" | "edit" | null>(null);

  const { mutate: deleteEntry } = trpcApi.entry.deleteEntry.useMutation({
    onSuccess: () => {
      toast.success("✅ Entry deleted");
      refetch();
    },
    onError: (error) => {
      toast.error("Something wrong");
      console.log(error.message);
      // setMessage({ text: error.message, type: "error" });
    },
  });

  const handleModalOpen = useCallback((entry: Entry, mode: "view" | "edit") => {
    setSelectedEntry(entry);
    setIsModalMode(mode);
    setIsModalOpen(true);
  }, []);
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEntry(null);
    setIsModalMode(null);
  };
  const handleEntryDelete = useCallback((id: string) => {
    const confirmed = window.confirm(
      "Are you sure that you want delete this entry?"
    );
    if (confirmed) {
      deleteEntry({ id });
    } else {
      return undefined;
    }
  }, []);

  if (isLoading) return <Loading />;
  if (queryError) return <p className="text-red-600">{queryError.message}</p>;

  return (
    <section className="overflow-x-auto rounded-xl border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700 text-sm text-left text-white">
        <thead className="bg-gray-800 text-gray-300">
          <tr>
            <th className="px-4 py-2">Note</th>
            <th className="px-4 py-2">Comment</th>
            <th className="px-4 py-2">Tags</th>
            <th className="px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700 bg-gray-900">
          {allEntries?.map((entry) => (
            <EntryTableRow
              key={entry.id}
              entry={entry}
              entryActions={{
                onView: () => handleModalOpen(entry, "view"),
                onEdit: () => handleModalOpen(entry, "edit"),
                onDelete: () => handleEntryDelete(entry.id),
              }}
            />
          ))}
        </tbody>
      </table>
      <EntryModal
        data={selectedEntry}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        mode={modalMode}
        update={refetch}
      />
    </section>
  );
}
