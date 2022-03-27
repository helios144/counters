import { createContext } from "react"

export const CountersContext = createContext({
    counters: [],
    setCounters: () => {},
})
