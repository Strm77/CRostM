import { createContext, useCallback, useContext, useState } from 'react'

const PartnersContext = createContext(null)

export function PartnersProvider({ children }) {
  const [partners, setPartners] = useState([])

  const addPartner = useCallback((name, isPublic) => {
    setPartners((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name, isPublic, createdAt: new Date().toISOString(), contacts: [] },
    ])
  }, [])

  const updatePartner = useCallback((id, patch) => {
    setPartners((prev) => prev.map((partner) => (partner.id === id ? { ...partner, ...patch } : partner)))
  }, [])

  const deletePartner = useCallback((id) => {
    setPartners((prev) => prev.filter((partner) => partner.id !== id))
  }, [])

  const addContact = useCallback((partnerId, contact) => {
    setPartners((prev) =>
      prev.map((partner) =>
        partner.id === partnerId
          ? { ...partner, contacts: [...partner.contacts, { id: crypto.randomUUID(), ...contact }] }
          : partner,
      ),
    )
  }, [])

  const updateContact = useCallback((partnerId, contactId, patch) => {
    setPartners((prev) =>
      prev.map((partner) =>
        partner.id === partnerId
          ? { ...partner, contacts: partner.contacts.map((contact) => (contact.id === contactId ? { ...contact, ...patch } : contact)) }
          : partner,
      ),
    )
  }, [])

  const deleteContact = useCallback((partnerId, contactId) => {
    setPartners((prev) =>
      prev.map((partner) =>
        partner.id === partnerId
          ? { ...partner, contacts: partner.contacts.filter((contact) => contact.id !== contactId) }
          : partner,
      ),
    )
  }, [])

  const getPartner = useCallback((id) => partners.find((partner) => partner.id === id), [partners])

  return (
    <PartnersContext.Provider
      value={{
        partners,
        addPartner,
        updatePartner,
        deletePartner,
        addContact,
        updateContact,
        deleteContact,
        getPartner,
      }}
    >
      {children}
    </PartnersContext.Provider>
  )
}

export function usePartners() {
  const context = useContext(PartnersContext)
  if (!context) {
    throw new Error('usePartners deve ser usado dentro de PartnersProvider')
  }
  return context
}
