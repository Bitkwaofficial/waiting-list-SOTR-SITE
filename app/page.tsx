"use client";

import React from "react";
import Image from "next/image";
import WaitingListForm from "@/components/WaitingListForm";
import Card from "@/components/Card";
import { useTheme } from "@/components/ThemeProvider";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={
        isDark
          ? "min-h-screen bg-[#020617] text-white"
          : "min-h-screen bg-sand text-night"
      }
    >
      {/* Top Navigation */}
      <header
        className={
          isDark
            ? "border-b border-white/5 bg-[#020617]/80 backdrop-blur"
            : "border-b border-black/5 bg-white/80 backdrop-blur"
        }
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm md:py-4">
          <div className="flex items-center gap-2 font-display text-base font-semibold md:text-lg">
            <Image
              src="/logo.png"
              alt="SOTR-APP logo"
              width={28}
              height={28}
              className="h-7 w-7"
              priority
            />
            <span className="hidden sm:inline">SOTR-APP</span>
          </div>
          <div className="hidden items-center gap-8 text-xs text-warmgray md:flex md:text-sm">
            <a
              href="#how-it-works"
              className={isDark ? "hover:text-white" : "hover:text-night"}
            >
              How it Works
            </a>
            <a
              href="#features"
              className={isDark ? "hover:text-white" : "hover:text-night"}
            >
              Features
            </a>
            <a
              href="#accept-bitcoin"
              className={isDark ? "hover:text-white" : "hover:text-night"}
            >
              For Merchants
            </a>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className={
                isDark
                  ? "hidden rounded-full border border-white/10 px-3 py-2 text-[11px] font-semibold text-warmgray hover:border-white/30 hover:text-white md:inline-flex"
                  : "hidden rounded-full border border-black/10 px-3 py-2 text-[11px] font-semibold text-warmgray hover:border-black/40 hover:text-night md:inline-flex"
              }
            >
              {isDark ? "Light mode" : "Dark mode"}
            </button>
            <button
              className={
                isDark
                  ? "hidden rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-warmgray hover:border-white/30 hover:text-white md:inline-flex"
                  : "hidden rounded-full border border-black/10 px-4 py-2 text-xs font-semibold text-warmgray hover:border-black/40 hover:text-night md:inline-flex"
              }
            >
              Merchant Login
            </button>
            <a
              href="#accept-bitcoin"
              className="rounded-full bg-sahara px-4 py-2 text-xs font-semibold text-night shadow-[0_0_40px_rgba(252,211,77,0.5)] hover:bg-sunset"
            >
              Join Waiting List
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className={
          isDark
            ? "relative overflow-hidden bg-gradient-to-b from-[#020617] via-[#020617] to-black px-4 pb-16 pt-10 md:pb-24 md:pt-20"
            : "relative overflow-hidden bg-gradient-to-b from-sand via-white to-white px-4 pb-16 pt-10 md:pb-24 md:pt-20"
        }
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className={
              isDark
                ? "h-72 w-72 rounded-full bg-sahara/10 blur-3xl"
                : "h-72 w-72 rounded-full bg-amber-300/20 blur-3xl"
            }
          />
        </div>
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold text-amber-200 md:mb-6 md:px-4 md:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Lightning-fast Bitcoin payments across Africa</span>
          </div>
          <h1 className="mb-3 font-display text-3xl font-bold leading-tight md:mb-4 md:text-6xl">
            Pay with <span className="text-amber-300">Bitcoin</span>,<br />
            Settle in <span className="text-amber-400">Anything</span>
          </h1>
          <p className="mx-auto mb-6 max-w-2xl text-sm text-warmgray md:mb-8 md:text-base">
            SOTR routes your Bitcoin payments to merchants across Africa — they receive BTC,
            mobile money, or bank transfer. No custody. No friction. Just real-time settlement.
          </p>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3 md:mb-10 md:gap-4">
            <button className="w-full max-w-xs rounded-full bg-sahara px-6 py-3 text-sm font-semibold text-night shadow-[0_0_40px_rgba(252,211,77,0.6)] hover:bg-sunset md:w-auto">
              Start Paying
            </button>
            <button className="w-full max-w-xs rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:border-white/40 hover:bg-white/10 md:w-auto">
              Accept Payments
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-warmgray md:gap-8">
            <div className="text-center">
              <div
                className={
                  isDark
                    ? "text-lg font-semibold text-white"
                    : "text-lg font-semibold text-night"
                }
              >
                54+
              </div>
              <div>Countries</div>
            </div>
            <div className="text-center">
              <div
                className={
                  isDark
                    ? "text-lg font-semibold text-white"
                    : "text-lg font-semibold text-night"
                }
              >
                ⚡
              </div>
              <div>Instant</div>
            </div>
            <div className="text-center">
              <div
                className={
                  isDark
                    ? "text-lg font-semibold text-white"
                    : "text-lg font-semibold text-night"
                }
              >
                0%
              </div>
              <div>Custody</div>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Africa / Feature grid */}
      <section
        id="features"
        className={isDark ? "bg-[#020617] px-4 py-14" : "bg-sand px-4 py-14"}
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold">
              Built for <span className="text-amber-300">Africa</span>
            </h2>
            <p className="mt-3 text-sm text-warmgray md:text-base">
              Infrastructure that respects the continent&apos;s diversity — multiple currencies,
              providers, and settlement methods.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card
              className={
                isDark
                  ? "bg-[#111827] text-left shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
                  : "bg-white text-left shadow-sm border border-ubuntu/10"
              }
            >
              <h3
                className={
                  isDark
                    ? "mb-2 font-display text-lg font-semibold text-white"
                    : "mb-2 font-display text-lg font-semibold text-ubuntu"
                }
              >
                Lightning Payments
              </h3>
              <p className="text-sm text-warmgray">
                Pay via Lightning Network. No waiting, no high on-chain fees — just instant Bitcoin.
              </p>
            </Card>
            <Card
              className={
                isDark
                  ? "bg-[#111827] text-left shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
                  : "bg-white text-left shadow-sm border border-ubuntu/10"
              }
            >
              <h3
                className={
                  isDark
                    ? "mb-2 font-display text-lg font-semibold text-white"
                    : "mb-2 font-display text-lg font-semibold text-ubuntu"
                }
              >
                Smart Routing
              </h3>
              <p className="text-sm text-warmgray">
                Our rails find the best provider for each country and corridor, automatically.
              </p>
            </Card>
            <Card
              className={
                isDark
                  ? "bg-[#111827] text-left shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
                  : "bg-white text-left shadow-sm border border-ubuntu/10"
              }
            >
              <h3
                className={
                  isDark
                    ? "mb-2 font-display text-lg font-semibold text-white"
                    : "mb-2 font-display text-lg font-semibold text-ubuntu"
                }
              >
                Flexible Settlement
              </h3>
              <p className="text-sm text-warmgray">
                Merchants choose between BTC, mobile money, or bank transfer — per payment.
              </p>
            </Card>
            <Card
              className={
                isDark
                  ? "bg-[#111827] text-left shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
                  : "bg-white text-left shadow-sm border border-ubuntu/10"
              }
            >
              <h3
                className={
                  isDark
                    ? "mb-2 font-display text-lg font-semibold text-white"
                    : "mb-2 font-display text-lg font-semibold text-ubuntu"
                }
              >
                Merchant Discovery
              </h3>
              <p className="text-sm text-warmgray">
                Find Bitcoin-accepting merchants near you via our interactive map.
              </p>
            </Card>
            <Card
              className={
                isDark
                  ? "bg-[#111827] text-left shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
                  : "bg-white text-left shadow-sm border border-ubuntu/10"
              }
            >
              <h3
                className={
                  isDark
                    ? "mb-2 font-display text-lg font-semibold text-white"
                    : "mb-2 font-display text-lg font-semibold text-ubuntu"
                }
              >
                Non-Custodial
              </h3>
              <p className="text-sm text-warmgray">
                Bitcoin never leaves your wallet. Funds route directly to the receiving party.
              </p>
            </Card>
            <Card
              className={
                isDark
                  ? "bg-[#111827] text-left shadow-[0_18px_40px_rgba(0,0,0,0.5)]"
                  : "bg-white text-left shadow-sm border border-ubuntu/10"
              }
            >
              <h3
                className={
                  isDark
                    ? "mb-2 font-display text-lg font-semibold text-white"
                    : "mb-2 font-display text-lg font-semibold text-ubuntu"
                }
              >
                Mobile-First
              </h3>
              <p className="text-sm text-warmgray">
                Designed for low-bandwidth, mobile devices across African networks.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className={isDark ? "bg-[#020617] px-4 py-16" : "bg-sand px-4 py-16"}
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-center font-display text-3xl font-bold">
            How SOTR Works
          </h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-sahara text-night">
                1
              </div>
              <div>
                <h3 className="mb-1 font-display text-lg font-semibold">
                  Connect Wallet
                </h3>
                <p className="text-sm text-warmgray">
                  Link your Lightning or Bitcoin wallet. SOTR never takes custody of your keys.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-sahara text-night">
                2
              </div>
              <div>
                <h3 className="mb-1 font-display text-lg font-semibold">
                  Scan &amp; Pay
                </h3>
                <p className="text-sm text-warmgray">
                  Scan the merchant&apos;s QR code or select them from the in-app map.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-sahara text-night">
                3
              </div>
              <div>
                <h3 className="mb-1 font-display text-lg font-semibold">
                  Smart Route
                </h3>
                <p className="text-sm text-warmgray">
                  SOTR finds the best provider to route the payment instantly across rails.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-sahara text-night">
                4
              </div>
              <div>
                <h3 className="mb-1 font-display text-lg font-semibold">
                  Confirmed
                </h3>
                <p className="text-sm text-warmgray">
                  Merchant receives in their preferred currency. Both parties see final status.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accept Bitcoin / CTA band */}
      <section
        id="accept-bitcoin"
        className={isDark ? "bg-[#020617] px-4 pb-16 pt-10" : "bg-white px-4 pb-16 pt-10"}
      >
        <div className="mx-auto max-w-6xl">
          <div
            className={
              isDark
                ? "overflow-hidden rounded-2xl bg-gradient-to-r from-[#111827] to-[#020617] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.7)] md:p-10"
                : "overflow-hidden rounded-2xl bg-gradient-to-r from-sand to-white p-8 shadow-md md:p-10"
            }
          >
            <div className="grid gap-8 md:grid-cols-[2fr,1fr] md:items-center">
              <div>
                <h2 className="font-display text-2xl font-bold md:text-3xl">
                  Accept <span className="text-amber-300">Bitcoin</span> at your business
                </h2>
                <p className="mt-3 text-sm text-warmgray md:text-base">
                  Join hundreds of merchants across Africa. Get paid in Bitcoin, mobile money, or
                  bank transfer — your choice. Setup takes less than 2 minutes.
                </p>
                <div className="mt-6">
                  <button className="rounded-xl bg-sahara px-6 py-3 text-sm font-semibold text-night shadow-[0_0_40px_rgba(252,211,77,0.6)] hover:bg-sunset">
                    Merchant Dashboard (Coming Soon)
                  </button>
                </div>
              </div>
              <div className="grid gap-4 text-sm text-warmgray">
                <div
                  className={
                    isDark
                      ? "rounded-xl border border-white/5 bg-black/20 px-4 py-3"
                      : "rounded-xl border border-ubuntu/10 bg-sand px-4 py-3"
                  }
                >
                  <div
                    className={
                      isDark
                        ? "text-xs uppercase tracking-wide text-white/60"
                        : "text-xs uppercase tracking-wide text-ubuntu"
                    }
                  >
                    Join the waiting list
                  </div>
                  <p className="mt-2 text-xs">
                    Share your details and we&apos;ll notify you as soon as merchant tools go live.
                  </p>
                  <div className="mt-4">
                    <WaitingListForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={
          isDark
            ? "border-t border-white/10 bg-[#020617] px-4 py-6 text-center text-xs text-warmgray"
            : "border-t border-black/10 bg-white px-4 py-6 text-center text-xs text-warmgray"
        }
      >
        <p>
          © {new Date().getFullYear()} SOTR-APP — Sats On The Road. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

