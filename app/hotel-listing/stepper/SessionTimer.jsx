// SessionTimerWithModal.jsx
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/navigation";

export default function SessionTimerWithModal({
  startTime,
  active = true,
  tickMs = 250,
  showBar = true,
  title = "CONFIRM TO PROCEED",
  body = "Your Session has been expired.",
  backText = "BACK TO HOTEL LIST",
  continueText = "CONTINUE",
  onBack, // optional; defaults to router.back()
  onContinue, // optional; defaults to closing modal
}) {
  const router = useRouter();
  const [remaining, setRemaining] = useState(null);
  const [open, setOpen] = useState(false);
  const intervalRef = useRef(null);

  const deadline = useMemo(() => {
    if (!active) return null;
    if (typeof startTime !== "number" || Number.isNaN(startTime)) return null;
    
    // Treat startTime as "seconds from now"
    const seconds = Math.max(0, Math.floor(startTime));
    return Date.now() + seconds * 1000;
  }, [startTime, active]);

  const clearTick = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const expireNow = () => {
    setRemaining(0);
    setOpen(true);
  };

  useEffect(() => {
    clearTick();

    if (!active) {
      setOpen(false);
      setRemaining(null);
      return;
    }
    if (typeof startTime !== "number" || Number.isNaN(startTime)) {
      setRemaining(null);
      return;
    }
    if (startTime <= 0) {
      setRemaining(0);
      queueMicrotask(expireNow);
      return;
    }

    const tick = () => {
      const msLeft = Math.max(0, (deadline ?? Date.now()) - Date.now());
      const secsLeft = Math.floor(msLeft / 1000);
      setRemaining(secsLeft);
      if (secsLeft <= 0) {
        clearTick();
        expireNow();
      }
    };

    tick();
    intervalRef.current = window.setInterval(tick, tickMs);
    return clearTick;
  }, [deadline, startTime, tickMs, active]);

  if (!active || remaining === null) return null;

  const mm = Math.floor(remaining / 60);
  const ss = String(remaining % 60).padStart(2, "0");

  const handleBack = () => {
    if (typeof onBack === "function") return onBack();
    try {
      router.back();
    } catch {
      window.history.back();
    }
  };

  // const handleContinue = () => {
  //   if (typeof onContinue === "function") return onContinue();
  //   setOpen(false);
  // };

  return (
    <>
      {showBar && (
        <div className="session shadow sm:rounded-sm text-md sticky bottom-0 z-[9998] p-2 text-center">
          <div
            className="sm:rounded-sm text-md p-2 text-center"
            aria-live="polite"
          >
            {remaining > 0 ? (
              <p>
                The session will expire in: {mm}:{ss} minutes
              </p>
            ) : (
              <p>Session expired</p>
            )}
          </div>
        </div>
      )}

      {open && (
        <div
          className="modal-overlay fixed inset-0 z-[9999] flex items-center justify-center"
          aria-live="assertive"
        >
          <div className="absolute inset-0 bg-black/50 z-0" />
          <div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-[92%] max-w-xl rounded-md bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b">
              <h2 className="text-center text-orange-500 font-semibold text-lg sm:text-xl tracking-wide">
                {title}
              </h2>
            </div>
            <div className="px-6 py-6">
              <p className="text-center text-gray-700">{body}</p>
            </div>
            <div className="px-6 pb-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="rounded-none back-to-btn"
              >
                {backText}
              </button>
              {/* <button
                type="button"
                onClick={
                  typeof onContinue === "function"
                    ? onContinue
                    : () => setOpen(false)
                }
                className="rounded-none book-now-btn"
              >
                {continueText}
              </button> */}
              {/* remove continue button after testing */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

SessionTimerWithModal.propTypes = {
  startTime: PropTypes.number,
  active: PropTypes.bool,
  tickMs: PropTypes.number,
  showBar: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.string,
  backText: PropTypes.string,
  continueText: PropTypes.string,
  onBack: PropTypes.func,
  onContinue: PropTypes.func,
};
