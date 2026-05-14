"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Wine, Globe, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { LUXURY_EASE } from "@/lib/motion";

export interface TastingNoteFormValues {
  wine_name: string;
  vintage: string;
  region: string;
  rating: number;
  nose: string;
  palate: string;
  finish: string;
  notes: string;
  is_public: boolean;
}

interface TastingNoteFormProps {
  initialValues?: Partial<TastingNoteFormValues>;
  onSubmit: (values: TastingNoteFormValues) => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

const EMPTY: TastingNoteFormValues = {
  wine_name: "",
  vintage: "",
  region: "",
  rating: 0,
  nose: "",
  palate: "",
  finish: "",
  notes: "",
  is_public: true,
};

function RatingPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="group rounded-full p-1 transition-colors hover:bg-gold/10"
          aria-label={`Rate ${n} out of 5`}
        >
          <Wine
            className={cn(
              "h-5 w-5 transition-colors",
              n <= value
                ? "fill-gold/80 text-gold"
                : "text-ivory/20 group-hover:text-ivory/40",
            )}
          />
        </button>
      ))}
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-gold/15 bg-ivory/5 px-4 py-2.5 text-sm text-ivory placeholder:text-ivory/30 outline-none transition-colors focus:border-gold/40 focus:bg-ivory/[0.07]";

export function TastingNoteForm({
  initialValues,
  onSubmit,
  onCancel,
  isLoading = false,
}: TastingNoteFormProps) {
  const [form, setForm] = useState<TastingNoteFormValues>({
    ...EMPTY,
    ...initialValues,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set<K extends keyof TastingNoteFormValues>(
    key: K,
    val: TastingNoteFormValues[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!form.wine_name.trim()) next.wine_name = "Wine name is required";
    if (form.rating < 1 || form.rating > 5)
      next.rating = "Rating must be 1–5";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(form);
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: LUXURY_EASE }}
      onSubmit={handleSubmit}
      className="glass rounded-md p-6 md:p-8"
    >
      <h3 className="mb-6 font-display text-2xl text-ivory">
        {initialValues?.wine_name ? "Edit" : "New"}{" "}
        <span className="italic text-gold-soft">Tasting Note</span>
      </h3>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Wine Name */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold/60">
            Wine Name *
          </label>
          <input
            type="text"
            value={form.wine_name}
            onChange={(e) => set("wine_name", e.target.value)}
            placeholder="e.g. Domaine Leroy Musigny Grand Cru"
            className={cn(inputClass, errors.wine_name && "border-red-400/60")}
          />
          {errors.wine_name && (
            <p className="mt-1 text-xs text-red-400">{errors.wine_name}</p>
          )}
        </div>

        {/* Vintage */}
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold/60">
            Vintage
          </label>
          <input
            type="text"
            value={form.vintage}
            onChange={(e) => set("vintage", e.target.value)}
            placeholder="e.g. 2019"
            className={inputClass}
          />
        </div>

        {/* Region */}
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold/60">
            Region
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ivory/25" />
            <input
              type="text"
              value={form.region}
              onChange={(e) => set("region", e.target.value)}
              placeholder="e.g. Burgundy, France"
              className={cn(inputClass, "pl-9")}
            />
          </div>
        </div>

        {/* Rating */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold/60">
            Rating *
          </label>
          <RatingPicker
            value={form.rating}
            onChange={(v) => set("rating", v)}
          />
          {errors.rating && (
            <p className="mt-1 text-xs text-red-400">{errors.rating}</p>
          )}
        </div>

        {/* Nose */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold/60">
            Nose
          </label>
          <input
            type="text"
            value={form.nose}
            onChange={(e) => set("nose", e.target.value)}
            placeholder="Aromas and scents…"
            className={inputClass}
          />
        </div>

        {/* Palate */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold/60">
            Palate
          </label>
          <input
            type="text"
            value={form.palate}
            onChange={(e) => set("palate", e.target.value)}
            placeholder="Flavors and texture…"
            className={inputClass}
          />
        </div>

        {/* Finish */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold/60">
            Finish
          </label>
          <input
            type="text"
            value={form.finish}
            onChange={(e) => set("finish", e.target.value)}
            placeholder="Aftertaste and length…"
            className={inputClass}
          />
        </div>

        {/* Notes */}
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs uppercase tracking-wider text-gold/60">
            Personal Notes
          </label>
          <textarea
            rows={3}
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Your thoughts on this wine…"
            className={cn(inputClass, "resize-none")}
          />
        </div>

        {/* Public Toggle */}
        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-center gap-3">
            <div className="relative">
              <input
                type="checkbox"
                checked={form.is_public}
                onChange={(e) => set("is_public", e.target.checked)}
                className="peer sr-only"
              />
              <div className="h-5 w-9 rounded-full bg-ivory/10 transition-colors peer-checked:bg-gold/40" />
              <div className="absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-ivory/60 transition-transform peer-checked:translate-x-4 peer-checked:bg-gold" />
            </div>
            <span className="text-sm text-ivory/60">
              Share with the community
            </span>
          </label>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-medium text-espresso transition-all duration-500 hover:shadow-[0_0_40px_color-mix(in_oklab,var(--gold)_35%,transparent)] disabled:opacity-50"
        >
          {isLoading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-espresso/30 border-t-espresso" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {initialValues?.wine_name ? "Update Note" : "Publish Note"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-gold/30 px-6 py-3 text-sm text-gold transition hover:bg-gold/10"
          >
            Cancel
          </button>
        )}
      </div>
    </motion.form>
  );
}
