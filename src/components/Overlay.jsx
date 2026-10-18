import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Overlay({ open, onClose, label, children, top = false, max = 'max-w-lg' }) {
  useEffect(() => {
    if (!open) return undefined;
    const h = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <motion.div className={`fixed inset-0 z-[60] flex justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm ${top ? 'items-start pt-[10vh]' : 'items-end sm:items-center'}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
          <motion.div role="dialog" aria-modal="true" aria-label={label} className={`w-full ${max} overflow-hidden rounded-3xl border border-white/10 bg-[#141230]/95 text-ink shadow-2xl backdrop-blur-xl`}
            initial={{ y: 40, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
