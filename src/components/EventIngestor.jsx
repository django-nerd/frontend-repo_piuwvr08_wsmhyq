import React, { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function EventIngestor() {
  const [eventName, setEventName] = useState('signup')
  const [userId, setUserId] = useState('user_123')
  const [propsText, setPropsText] = useState('{"plan":"pro"}')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const sendEvent = async () => {
    setLoading(true)
    setMessage('')
    try {
      const properties = propsText ? JSON.parse(propsText) : {}
      const res = await fetch(`${API_BASE}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: eventName, user_id: userId, properties })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to ingest event')
      setMessage(`Event stored with id ${data.id}`)
    } catch (e) {
      setMessage(`Error: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-5">
      <h3 className="text-white font-semibold mb-3">Ingest an event</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <input value={eventName} onChange={e=>setEventName(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder="event name" />
        <input value={userId} onChange={e=>setUserId(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder="user id" />
        <input value={propsText} onChange={e=>setPropsText(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-900/60 text-white border border-slate-700" placeholder='{"key":"value"}' />
      </div>
      <button onClick={sendEvent} disabled={loading} className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50">{loading? 'Sending...' : 'Send event'}</button>
      {message && <p className="text-blue-200 mt-3 text-sm">{message}</p>}
    </div>
  )
}

export default EventIngestor
