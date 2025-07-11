import React from "react";

function Footer() {
  return (
    <footer className="relative bottom-5 w-full text-center text-sm text-white/50 ">
      <p className="mb-1">
        © 2025 <span className="font-bold text-white">DoneDesk.nxt</span> — Crafted for focus, flow, and finesse.
      </p>

      <p>
        Designed & Developed by{" "}
        <a
          href="https://github.com/lucid-val"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
        >
          Agnik Chakraborty
        </a>
      </p>
    </footer>
  );
}

export default Footer;
