import { PuzzleIcon } from 'lucide-react';
export default function EmptyState({ title, body, children }) {
  return (
    <div className="mx-auto grid max-w-md place-items-center gap-3 rounded-3xl border-2 border-dashed border-ink/20 px-6 py-14 text-center">
      <PuzzleIcon size={40} className="text-grape" />
      <h3 className="font-display text-2xl font-bold">{title}</h3>
      <p className="text-ink/70">{body}</p>
      <div className="mt-2 flex flex-wrap justify-center gap-3">{children}</div>
    </div>
  );
}
