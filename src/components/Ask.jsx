import React, { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Ask() {
  const [q, setQ] = useState('events by event')
  const [answer, setAnswer] = useState(null)
  const [loading, setLoading] = useState(false)

  const ask = async () => {
    setLoading(true)
    setAnswer(null)
    try {
      const res = await fetch(`${API_BASE}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q })
      })
      const data = await res.json()
      setAnswer(data)
    } catch (e) {
      setAnswer({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <input value={q} onChange={e=>setQ(e.target.value)} className="flex-1 px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder="Ask a question..." />
        <button onClick={ask} className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white">Ask</button>
      </div>
      {loading && <p className="text-blue-200">Thinking...</p>}
      {answer && (
        <div className="text-blue-200 text-sm space-y-2">
          {answer.answer && <p className="font-medium">{answer.answer}</p>}
          {answer.count !== undefined && <p>Total: {answer.count}</p>}
          {answer.items && Array.isArray(answer.items) && (
            <div className="max-h-72 overflow-auto pr-2">
              {answer.items.map((it, idx) => (
                <div key={idx} className="p-2 rounded bg-slate-900/50 border border-slate-700 mb-1">
                  <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(it, null, 2)}</pre>
                </div>
              ))}
            </div>
          )}
          {answer.error && <p className="text-red-300">{answer.error}</p>}
        </div>
      )}
    </div>
  )
}

export default Ask
