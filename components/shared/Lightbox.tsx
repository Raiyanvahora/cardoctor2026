"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/lib/gallery";

interface LightboxProps {
  images: GalleryImage[];
  /** Index of the open image, or null when the lightbox is closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

/**
 * Accessible image lightbox.
 *
 * Escape closes, Left/Right arrows navigate, Tab is trapped inside the dialog,
 * focus returns to the thumbnail that opened it, and background scrolling is
 * locked while it is open.
 */
export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const isOpen = index !== null;

  const goToPrevious = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const goToNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    // Focus the close button so Escape and Tab behave predictably.
    const closeButton =
      dialogRef.current?.querySelector<HTMLElement>("[data-lightbox-close]");
    closeButton?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      } else if (event.key === "Tab") {
        const items = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled])",
        );
        if (!items || items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose, goToPrevious, goToNext]);

  const image = index === null ? null : images[index];

  return (
    <AnimatePresence>
      {image && index !== null ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${index + 1} of ${images.length}: ${image.caption}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-ink/96 backdrop-blur-md"
        >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-dim">
          {index + 1} / {images.length}
        </p>
        <button
          type="button"
          data-lightbox-close
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-brand hover:text-fg"
        >
          <X aria-hidden className="h-5 w-5" />
          <span className="sr-only">Close image viewer</span>
        </button>
      </div>

      {/* Image */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-8">
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 640px) 70vw, 92vw"
          className="max-h-full w-auto max-w-full rounded-xl object-contain"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={goToPrevious}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-brand hover:text-fg"
        >
          <ChevronLeft aria-hidden className="h-5 w-5" />
          <span className="sr-only">Previous image</span>
        </button>

        <p className="min-w-0 flex-1 truncate text-center text-sm text-muted">
          {image.caption}
        </p>

        <button
          type="button"
          onClick={goToNext}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-brand hover:text-fg"
        >
          <ChevronRight aria-hidden className="h-5 w-5" />
          <span className="sr-only">Next image</span>
        </button>
      </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
