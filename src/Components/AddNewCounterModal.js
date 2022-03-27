import React, { useContext, useState } from "react"
import { Modal, Button, Icon, Input, Dropdown, Form } from "semantic-ui-react"
import { CountersContext } from "../Contexts/CountersContext"
import { v4 as uuidv4 } from "uuid"

let defaultFormFields = {
    id: {
        value: "",
    },
    label: {
        value: "",
        errors: [],
    },
    keyBindCode: {
        value: "",
        errors: [],
    },
    position: {
        value: null,
        errors: [],
    },
}

export default function AddNewCounterModal({ open, setOpen }) {
    const { counters, setCounters } = useContext(CountersContext)
    const [formFields, setFormFields] = useState(defaultFormFields)
    const [waitinForKeybind, setWaitinForKeybind] = useState(false)

    const avaliblePositionsDropdownOptions = () => {
        let currentPositions = counters.map((counter, i) => ({
            key: i,
            value: counter.position.toString(),
            text: counter.position.toString(),
        }))

        currentPositions.push({
            key: currentPositions.length,
            value: currentPositions.length + 1,
            text: currentPositions.length + 1,
        })
        return currentPositions
    }

    const clearForm = () => {
        setFormFields(defaultFormFields)
    }

    const addNewCounter = () => {
        let repositionedCounters = counters.map((counter) => {
            return {
                ...counter,
                position: counter.position >= formFields.position.value ? counter.position + 1 : counter.position,
            }
        })

        let sortedCounters = [
            ...repositionedCounters,
            {
                id: uuidv4(),
                label: formFields.label.value,
                keyBindCode: formFields.keyBindCode.value,
                position: formFields.position.value,
            },
        ].sort((a, b) => (a.position > b.position ? 1 : -1))
        setCounters(sortedCounters)
        setOpen(false)
        clearForm()
    }

    const handleKeyPressed = (event) => {
        let existingKeybind = counters.find((counter) => counter.keyBindCode === event.code)
        if (existingKeybind) {
            return
        }
        setFormFields((prevValues) => ({
            ...prevValues,
            keyBindCode: { ...prevValues.keyBindCode, value: event.code },
        }))
        formFields.keyBindCode.value = event.code
        setWaitinForKeybind(false)
        document.removeEventListener("keydown", handleKeyPressed)
    }

    const handleSetKeybind = () => {
        setWaitinForKeybind(true)
        document.addEventListener("keydown", handleKeyPressed)
    }

    return (
        <Modal closeIcon size="small" open={open} onClose={() => setOpen(false)}>
            <Modal.Header>Add new counter</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Field>
                        <label>New counter label</label>
                        <Input
                            value={formFields.label.value}
                            placeholder="New label"
                            onChange={(e) => {
                                setFormFields((prev) => ({
                                    ...prev,
                                    label: { ...prev.label, value: e.target.value },
                                }))
                            }}
                        ></Input>
                    </Form.Field>
                    <Form.Field>
                        <label>Counter keybind</label>
                        <Input
                            disabled
                            action={{
                                color: waitinForKeybind ? "green" : null,
                                content: waitinForKeybind ? "press key to bind" : "click here to bind",
                                icon: "keyboard outline",
                                onClick: handleSetKeybind,
                            }}
                            value={formFields.keyBindCode.value}
                            placeholder="Keybind code"
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Counter position</label>
                        <Dropdown
                            onChange={(e, data) => {
                                setFormFields((prev) => ({
                                    ...prev,
                                    position: { ...prev.position, value: parseInt(data.value) },
                                }))
                            }}
                            placeholder="Select position"
                            options={avaliblePositionsDropdownOptions()}
                            defaultValue={counters.length + 1}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    positive
                    onClick={() => {
                        addNewCounter()
                    }}
                >
                    Add new&nbsp;&nbsp;
                    <Icon name={"add"} />
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
