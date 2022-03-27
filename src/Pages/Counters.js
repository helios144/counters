import React, { useState, useContext } from "react"
import { Container, Button, Icon, Header, Divider, Input } from "semantic-ui-react"
import AddNewCounterModal from "../Components/AddNewCounterModal"
import CountersGrind from "../Components/CountersGrind"
import { CountersContext } from "../Contexts/CountersContext"

export default function Counters({ columnsPerRow, setColumnsPerRow, saveConfig }) {
    const [open, setOpen] = useState(false)
    const [editLayoutMode, setEditLayoutMode] = useState(false)
    const { counters, setCounters } = useContext(CountersContext)
    const [importedCountersString, setImportedCountersString] = useState("")
    const [actionsOpen, setActionsOpen] = useState(false)

    const handleChangePosition = (id, newPosition) => {
        let targetCounter = counters.find((counter) => counter.id === id)
        let repositionedCounters = counters.map((counter) => {
            if (counter.id === id) {
                return { ...counter, position: newPosition }
            }

            let elPos = counter.position

            if (newPosition > targetCounter.position) {
                if (counter.position > targetCounter.position && counter.position <= newPosition) {
                    elPos--
                }
            } else {
                if (counter.position >= newPosition && counter.position <= targetCounter.position) {
                    elPos++
                }
            }

            return { ...counter, position: elPos }
        })

        setCounters(repositionedCounters.sort((a, b) => (a.position > b.position ? 1 : -1)))
    }

    const handleExport = () => {
        navigator.clipboard.writeText(JSON.stringify({ columnsPerRow, counters: counters }))
    }

    const handleImport = () => {
        let importedCounters = JSON.parse(importedCountersString)
        if (importedCounters && importedCounters.columnsPerRow && importedCounters.counters) {
            setColumnsPerRow(importedCounters.columnsPerRow)
            setCounters(importedCounters.counters)
        }
    }

    const handleDelete = (id) => {
        let targetCounter = counters.find((counter) => counter.id === id)
        let filteredCounters = counters.filter((counter) => counter.id !== id)
        let repositionedCounters = filteredCounters.map((counter) => ({
            ...counter,
            position: counter.position > targetCounter.position ? counter.position - 1 : counter.position,
        }))
        setCounters(repositionedCounters)
    }

    return (
        <Container>
            <Header as="h3" content="Counters" textAlign="center" />
            <Container textAlign="right">
                <div style={{ display: actionsOpen ? "inline-block" : "none" }}>
                    <Button onClick={handleExport}>
                        Export&nbsp;
                        <Icon name="clipboard outline" />
                    </Button>
                    <Input
                        action={{
                            content: "Import",
                            icon: "download",
                            onClick: handleImport,
                        }}
                        value={importedCountersString}
                        onChange={(e) => setImportedCountersString(e.target.value)}
                        placeholder="Exported counters json string"
                    />
                    <Button
                        onClick={() => {
                            setEditLayoutMode(!editLayoutMode)
                        }}
                    >
                        Edit layout&nbsp;&nbsp;
                        <Icon name="grid layout" />
                    </Button>
                    <Button
                        onClick={() => {
                            setOpen(!open)
                        }}
                    >
                        Add new&nbsp;&nbsp;
                        <Icon name={"add"} />
                    </Button>
                    <Button onClick={saveConfig}>
                        Save counters&nbsp;&nbsp;
                        <Icon name={"save"} />
                    </Button>
                </div>
                <Button
                    onClick={() => {
                        setActionsOpen(!actionsOpen)
                    }}
                >
                    Actions&nbsp;
                    <Icon name={actionsOpen ? "chevron right" : "chevron left"} />
                </Button>
            </Container>
            <Container textAlign="center">
                <Divider />
                <CountersGrind
                    counters={counters}
                    columnsPerRow={columnsPerRow}
                    deleteCounter={handleDelete}
                    editLayoutMode={editLayoutMode}
                    changePositionCallback={handleChangePosition}
                />
            </Container>
            <AddNewCounterModal open={open} setOpen={setOpen} />
        </Container>
    )
}
