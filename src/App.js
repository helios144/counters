import React, { useState, useMemo, useEffect, useCallback } from "react"
import "./App.css"
import { ThemeContext } from "./Contexts/ThemeContext"
import Counters from "./Pages/Counters"
import { Container } from "semantic-ui-react"
import ToggleThemeButton from "./Components/ToggleThemeButton"
import { CountersContext } from "./Contexts/CountersContext"
import { v4 as uuidv4 } from "uuid"

function App() {
    const [config, setConfig] = useState({
        isDarkMode: false,
        columnsPerRow: 3,
        counters: [{ id: uuidv4(), label: "Counter 1", keyBindCode: "Digit1", position: 1 }],
    })
    const [columnsPerRow, setColumnsPerRow] = useState(config.columnsPerRow)
    const [isDarkMode, setIsDarkMode] = useState(config.isDarkMode)
    const [counters, setCounters] = useState(config.counters)
    const themeContextValue = useMemo(() => ({ isDarkMode, setIsDarkMode }), [isDarkMode, setIsDarkMode])
    const countersContextValue = useMemo(() => ({ counters, setCounters }), [counters, setCounters])

    const saveConfig = useCallback(() => {
        localStorage.setItem("config", JSON.stringify({ ...config, counters: counters, columnsPerRow: columnsPerRow }))
    }, [config, counters, columnsPerRow])

    useEffect(() => {
        let savedConfig = JSON.parse(localStorage.getItem("config"))

        if (savedConfig) {
            setConfig(savedConfig)
            setIsDarkMode(savedConfig.isDarkMode)
            setColumnsPerRow(savedConfig.columnsPerRow)
            setCounters(savedConfig.counters)
        }
    }, [setConfig])

    useEffect(() => {
        let savedConfig = JSON.parse(localStorage.getItem("config"))

        if (!savedConfig) {
            saveConfig()
        }
    }, [saveConfig])

    const saveTheme = (isDarkMode) => {
        let savedConfig = localStorage.getItem("config")

        if (savedConfig) {
            localStorage.setItem("config", JSON.stringify({ ...JSON.parse(savedConfig), isDarkMode: isDarkMode }))
            return
        }

        localStorage.setItem("config", JSON.stringify({ ...config, isDarkMode: isDarkMode }))
    }

    return (
        <div className="App">
            <ThemeContext.Provider value={themeContextValue}>
                <CountersContext.Provider value={countersContextValue}>
                    <Container>
                        {false ? <ToggleThemeButton saveTheme={saveTheme} /> : null}
                        <Counters
                            columnsPerRow={columnsPerRow}
                            setColumnsPerRow={setColumnsPerRow}
                            saveConfig={saveConfig}
                        />
                    </Container>
                </CountersContext.Provider>
            </ThemeContext.Provider>
        </div>
    )
}

export default App
