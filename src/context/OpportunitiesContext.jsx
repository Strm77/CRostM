import { createContext, useCallback, useContext, useState } from 'react'

const OpportunitiesContext = createContext(null)

export function OpportunitiesProvider({ children }) {
  const [opportunities, setOpportunities] = useState([])

  const addOpportunity = useCallback((clientName, opportunityName) => {
    setOpportunities((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        number: `OP-${String(prev.length + 1).padStart(4, '0')}`,
        clientName,
        opportunityName,
        createdAt: new Date().toISOString(),
      },
    ])
  }, [])

  const getOpportunity = useCallback((id) => opportunities.find((opp) => opp.id === id), [opportunities])

  return (
    <OpportunitiesContext.Provider value={{ opportunities, addOpportunity, getOpportunity }}>
      {children}
    </OpportunitiesContext.Provider>
  )
}

export function useOpportunities() {
  const context = useContext(OpportunitiesContext)
  if (!context) {
    throw new Error('useOpportunities deve ser usado dentro de OpportunitiesProvider')
  }
  return context
}
