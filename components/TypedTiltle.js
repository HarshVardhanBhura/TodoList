"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function TypedTitle() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["FocusFlow", "Plan Smart", "Complete Fast", "Stay Organized ✅"],
      typeSpeed: 70,
      backSpeed: 40,
      loop: true,
      smartBackspace: true,
      backDelay: 1500,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <h1 className="text-2xl md:text-4xl font-extrabold text-white">
      <span ref={typedRef} />
    </h1>
  );
}
