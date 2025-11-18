import Header from './components/Header'
import EventIngestor from './components/EventIngestor'
import EventList from './components/EventList'
import Ask from './components/Ask'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]"></div>
      <div className="relative max-w-5xl mx-auto px-6 py-12">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EventIngestor />
          <Ask />
        </div>
        <div className="mt-6">
          <EventList />
        </div>
        <div className="text-center mt-10 text-blue-300/70 text-sm">
          Tip: The app uses your backend URL from an environment variable. Events are stored in a database so you can explore them later.
        </div>
      </div>
    </div>
  )
}

export default App
