'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useCart } from './CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function CartPanel() {
  const { items, isOpen, toggleOpen } = useCart();
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    setPortalRoot(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!portalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={toggleOpen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.aside
            className="
              fixed top-0 right-0
              w-full md:w-2/5 h-full
              bg-white shadow-xl flex flex-col z-50
            "
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="flex justify-between items-center h-12 border-b border-gray-300 px-4">
              <h2 className="text-lg font-semibold">Mon panier</h2>
              <button
                onClick={toggleOpen}
                aria-label="Fermer"
                className="text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 space-y-4">
              {items.map((p, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="relative w-20 aspect-[4/6]">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{p.title}</p>
                    <p className="text-xs text-gray-600">Taille : {p.size}</p>
                    <p className="text-xs text-gray-600">
                      Quantité : {p.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-semibold">{p.price}</div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-300">
              <button
                className="w-full py-3 bg-black text-white uppercase font-semibold rounded"
              >
                Valider ma commande — 1148,00€
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    portalRoot
  );
}
