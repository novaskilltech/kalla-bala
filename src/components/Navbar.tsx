'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/lib/i18n';
import { ThemeToggle } from './ThemeToggle';
import { LangToggle } from './LangToggle';
import { 
  BookOpen, 
  Menu, 
  X, 
  Layers, 
  HelpCircle, 
  Award, 
  Scroll, 
  BookMarked,
  Printer,
  Sparkles,
  TrendingUp,
  AlertCircle,
  GraduationCap
} from 'lucide-react';

export function Navbar() {
  const { t, lang, dir } = useI18n();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('navHome'), icon: BookOpen },
    { href: '/kalla', label: t('navKalla'), icon: Sparkles },
    { href: '/bala', label: t('navBala'), icon: Sparkles },
    { href: '/positions', label: t('navPositions'), icon: Layers },
    { href: '/quiz', label: t('navQuiz'), icon: HelpCircle },
    { href: '/memorize', label: t('navMemorize'), icon: BookMarked },
    { href: '/cards', label: t('navCards'), icon: Printer },
    { href: '/author', label: t('navAuthor'), icon: GraduationCap },
    { href: '/progress', label: t('navProgress'), icon: TrendingUp },
    { href: '/disagreements', label: t('navDisagreements'), icon: AlertCircle },
    { href: '/glossary', label: t('navGlossary'), icon: BookOpen },
    { href: '/manzuma', label: t('navManzuma'), icon: Scroll },
    { href: '/sources', label: t('navSources'), icon: Award },
  ];

  const primaryLinks = navLinks.slice(0, 7);
  const secondaryLinks = navLinks.slice(7);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/85 dark:bg-slate-900/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                ك
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {t('siteTitle')}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {t('siteSubtitle')}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {primaryLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-70" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Dropdown / Extra link: more */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-2.5 py-2 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                <span>{lang === 'ar' ? 'المزيد ▾' : 'Plus ▾'}</span>
              </button>
              <div className="absolute right-0 ltr:right-auto ltr:left-0 top-full mt-1 w-48 py-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 hidden group-hover:block transition-all">
                {secondaryLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-700"
                    >
                      <Icon className="w-4 h-4 opacity-70" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Action buttons (Theme, Lang, Mobile menu) */}
          <div className="flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 opacity-70" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
