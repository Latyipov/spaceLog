"use client";

type TagListProps = {
  tagList: string[];
};

export function TagList({ tagList }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-1">
      {tagList?.map((tag) => (
        <span
          key={tag}
          className="bg-blue-600 text-xs px-2 py-0.5 rounded-full"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
