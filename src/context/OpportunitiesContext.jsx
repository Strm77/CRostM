import { createContext, useCallback, useContext, useRef, useState } from 'react'

const OpportunitiesContext = createContext(null)

export const STAGES = ['Prospecção', 'Qualificação', 'Proposta', 'Negociação', 'Fechamento']

function createTimelineEvent(label) {
  return { id: crypto.randomUUID(), label, date: new Date().toISOString() }
}

export function OpportunitiesProvider({ children }) {
  const [opportunities, setOpportunities] = useState([])
  const nextNumberRef = useRef(1)

  const addOpportunity = useCallback((clientName, opportunityName) => {
    const number = `OP-${String(nextNumberRef.current).padStart(4, '0')}`
    nextNumberRef.current += 1
    setOpportunities((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        number,
        clientName,
        opportunityName,
        createdAt: new Date().toISOString(),
        stage: STAGES[0],
        financials: { estimatedValue: null, closedValue: null, probability: null },
        timelineEvents: [createTimelineEvent('Oportunidade criada')],
        actions: [],
        todos: [],
        notes: '',
      },
    ])
  }, [])

  const updateNotes = useCallback((id, notes) => {
    setOpportunities((prev) => prev.map((opp) => (opp.id === id ? { ...opp, notes } : opp)))
  }, [])

  const updateOpportunity = useCallback((id, patch) => {
    setOpportunities((prev) => prev.map((opp) => (opp.id === id ? { ...opp, ...patch } : opp)))
  }, [])

  const updateFinancials = useCallback((id, financials) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === id ? { ...opp, financials: { ...opp.financials, ...financials } } : opp)),
    )
  }, [])

  const setStage = useCallback((id, stage) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === id
          ? {
              ...opp,
              stage,
              timelineEvents: [...opp.timelineEvents, createTimelineEvent(`Avançou para: ${stage}`)],
            }
          : opp,
      ),
    )
  }, [])

  const addTimelineEvent = useCallback((id, { label, date }) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === id
          ? { ...opp, timelineEvents: [...opp.timelineEvents, { id: crypto.randomUUID(), label, date }] }
          : opp,
      ),
    )
  }, [])

  const updateTimelineEvent = useCallback((id, eventId, patch) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === id
          ? {
              ...opp,
              timelineEvents: opp.timelineEvents.map((event) =>
                event.id === eventId ? { ...event, ...patch } : event,
              ),
            }
          : opp,
      ),
    )
  }, [])

  const deleteTimelineEvent = useCallback((id, eventId) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === id
          ? { ...opp, timelineEvents: opp.timelineEvents.filter((event) => event.id !== eventId) }
          : opp,
      ),
    )
  }, [])

  const addAction = useCallback((id, { label, date, note }) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === id ? { ...opp, actions: [...opp.actions, { id: crypto.randomUUID(), label, date, note }] } : opp,
      ),
    )
  }, [])

  const updateAction = useCallback((id, actionId, patch) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === id
          ? { ...opp, actions: opp.actions.map((action) => (action.id === actionId ? { ...action, ...patch } : action)) }
          : opp,
      ),
    )
  }, [])

  const deleteAction = useCallback((id, actionId) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === id ? { ...opp, actions: opp.actions.filter((action) => action.id !== actionId) } : opp,
      ),
    )
  }, [])

  const addTodo = useCallback((id, text) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === id ? { ...opp, todos: [...opp.todos, { id: crypto.randomUUID(), text }] } : opp)),
    )
  }, [])

  const updateTodo = useCallback((id, todoId, patch) => {
    setOpportunities((prev) =>
      prev.map((opp) =>
        opp.id === id
          ? { ...opp, todos: opp.todos.map((todo) => (todo.id === todoId ? { ...todo, ...patch } : todo)) }
          : opp,
      ),
    )
  }, [])

  const deleteTodo = useCallback((id, todoId) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === id ? { ...opp, todos: opp.todos.filter((todo) => todo.id !== todoId) } : opp)),
    )
  }, [])

  const completeTodo = useCallback((id, todoId) => {
    setOpportunities((prev) =>
      prev.map((opp) => {
        if (opp.id !== id) return opp
        const todo = opp.todos.find((item) => item.id === todoId)
        if (!todo) return opp
        return {
          ...opp,
          todos: opp.todos.filter((item) => item.id !== todoId),
          actions: [...opp.actions, { id: crypto.randomUUID(), label: todo.text, date: new Date().toISOString(), note: '' }],
        }
      }),
    )
  }, [])

  const deleteOpportunity = useCallback((id) => {
    setOpportunities((prev) => prev.filter((opp) => opp.id !== id))
  }, [])

  const getOpportunity = useCallback((id) => opportunities.find((opp) => opp.id === id), [opportunities])

  return (
    <OpportunitiesContext.Provider
      value={{
        opportunities,
        addOpportunity,
        updateOpportunity,
        updateFinancials,
        updateNotes,
        setStage,
        addTimelineEvent,
        updateTimelineEvent,
        deleteTimelineEvent,
        addAction,
        updateAction,
        deleteAction,
        addTodo,
        updateTodo,
        deleteTodo,
        completeTodo,
        deleteOpportunity,
        getOpportunity,
      }}
    >
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
