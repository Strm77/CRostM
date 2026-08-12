import { createContext, useCallback, useContext, useState } from 'react'

const ClientsContext = createContext(null)

export function ClientsProvider({ children }) {
  const [clients, setClients] = useState([])

  const addClient = useCallback((name, isPublic) => {
    setClients((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, isPublic, createdAt: new Date().toISOString(), contacts: [] },
    ])
  }, [])

  const updateClient = useCallback((id, patch) => {
    setClients((prev) => prev.map((client) => (client.id === id ? { ...client, ...patch } : client)))
  }, [])

  const deleteClient = useCallback((id) => {
    setClients((prev) => prev.filter((client) => client.id !== id))
  }, [])

  const addContact = useCallback((clientId, contact) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === clientId
          ? { ...client, contacts: [...client.contacts, { id: crypto.randomUUID(), ...contact }] }
          : client,
      ),
    )
  }, [])

  const updateContact = useCallback((clientId, contactId, patch) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === clientId
          ? { ...client, contacts: client.contacts.map((contact) => (contact.id === contactId ? { ...contact, ...patch } : contact)) }
          : client,
      ),
    )
  }, [])

  const deleteContact = useCallback((clientId, contactId) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === clientId
          ? { ...client, contacts: client.contacts.filter((contact) => contact.id !== contactId) }
          : client,
      ),
    )
  }, [])

  const getClient = useCallback((id) => clients.find((client) => client.id === id), [clients])

  return (
    <ClientsContext.Provider
      value={{
        clients,
        addClient,
        updateClient,
        deleteClient,
        addContact,
        updateContact,
        deleteContact,
        getClient,
      }}
    >
      {children}
    </ClientsContext.Provider>
  )
}

export function useClients() {
  const context = useContext(ClientsContext)
  if (!context) {
    throw new Error('useClients deve ser usado dentro de ClientsProvider')
  }
  return context
}
