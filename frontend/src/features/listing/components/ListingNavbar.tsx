'use client';

import { Globe, Menu, Search } from 'lucide-react';

interface ListingNavbarProps {
  title: string;
}

export const ListingNavbar = ({ title }: ListingNavbarProps) => {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <button
          type="button"
          className="flex items-center gap-2 text-rose-500 transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          aria-label="Airbnb home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm">
            <span className="text-lg font-black leading-none">A</span>
          </span>
          <span className="hidden text-[28px] font-semibold tracking-tight sm:inline-block">airbnb</span>
        </button>

        <button
          type="button"
          className="hidden items-center overflow-hidden rounded-full border border-neutral-200 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.08)] transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 md:flex"
          aria-label="Search homes"
        >
          <span className="flex items-center gap-3 px-5 py-3 text-sm font-semibold text-neutral-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-base">🏠</span>
            Anywhere
          </span>
          <span className="h-6 w-px bg-neutral-200" aria-hidden="true" />
          <span className="px-5 py-3 text-sm font-semibold text-neutral-900">Anytime</span>
          <span className="h-6 w-px bg-neutral-200" aria-hidden="true" />
          <span className="px-5 py-3 text-sm font-medium text-neutral-400">Add guests</span>
          <span className="m-2 flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white">
            <Search className="h-4 w-4" aria-hidden="true" />
          </span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100 lg:inline-flex"
            aria-label="Become a host"
          >
            Become a host
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
            aria-label="Language and region"
          >
            <Globe className="h-5 w-5 text-neutral-800" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="flex h-11 items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-neutral-800" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};
