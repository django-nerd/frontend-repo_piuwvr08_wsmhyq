import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function EventList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/events?limit=50`)
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">Recent events</h3>
        <button onClick={load} className="px-3 py-1.5 rounded bg-slate-700 hover:bg-slate-600 text-white text-sm">Refresh</button>
      </div>
      {loading ? (
        <p className="text-blue-200">Loading...</p>
      ) : (
        <div className="space-y-2 max-h-72 overflow-auto pr-2">
          {items.length === 0 && <p className="text-blue-200">No events yet.</p>}
          {items.map((it) => (
            <div key={it.id} className="p-3 rounded bg-slate-900/50 border border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-blue-200 font-medium">{it.event}</span>
                <span className="text-xs text-blue-300/70">{it.timestamp?.slice(0,19).replace('T',' ')}</span>
              </div>
              <div className="text-xs text-blue-300/80">user: {it.user_id || 'anon'}</div>
              {it.properties && Object.keys(it.properties).length>0 && (
                <pre className="text-xs text-blue-300/80 mt-1 whitespace-pre-wrap">{JSON.stringify(it.properties, null, 2)}</pre>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EventList
