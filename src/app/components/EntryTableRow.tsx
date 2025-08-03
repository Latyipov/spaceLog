"use client";

import type { Entry } from "@schemas";
import { MediaThumb } from "@components/MediaThumb";
import { TagList } from "@components/TagList";

type EntryTableRowProps = {
  entry: Entry;
  entryActions: {
    onView: () => void;
    onEdit: () => void;
    onDelete: () => void;
  };
};

export function EntryTableRow({ entry, entryActions }: EntryTableRowProps) {
  const { onView, onEdit, onDelete } = entryActions;
  return (
    <tr
      onClick={onView}
      className="hover:bg-gray-800/50 transition cursor-pointer"
    >
      <td className="px-4 py-4">
        <div className="flex items-center gap-4">
          <div className="w-26 h-18 relative flex-shrink-0 rounded overflow-hidden">
            <MediaThumb
              media_type={entry.media_type}
              url={entry.url ?? ""}
              title={entry.title}
            />
          </div>
          <div>
            <h3 className="font-semibold text-white leading-snug">
              {entry.title}
            </h3>
            <p className="text-xs text-gray-400 mt-1">{entry.date}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 max-w-sm text-gray-300">
        <div className="line-clamp-2">{entry.comment}</div>
      </td>
      <td className="px-4 py-4">
        <TagList tagList={entry.tags ?? []} />
      </td>

      <td
        className="px-6 py-4 text-right cursor-default "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={onEdit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-2 rounded transition cursor-pointer whitespace-nowrap"
          >
            ✏️ Edit
          </button>
          <button
            onClick={onDelete}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-1.5 px-2 rounded transition cursor-pointer whitespace-nowrap"
          >
            ❌ Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
