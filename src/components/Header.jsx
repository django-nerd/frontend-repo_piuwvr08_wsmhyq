import React from 'react'

function Header() {
  return (
    <header className="text-center mb-10">
      <div className="inline-flex items-center justify-center mb-6">
        <img
          src="/flame-icon.svg"
          alt="Lytikz"
          className="w-16 h-16 drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]"
        />
      </div>
      <h1 className="text-4xl font-bold text-white tracking-tight">Lytikz</h1>
      <p className="text-blue-200 mt-2">Capture events. Explore trends. Ask questions about your data.</p>
    </header>
  )
}

export default Header
