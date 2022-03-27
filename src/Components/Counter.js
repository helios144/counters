import React, { useState, useEffect, useCallback, useContext } from "react"
import { Button, Container, GridColumn } from "semantic-ui-react"
import { Grid, Label, Segment, Icon, Dropdown, Menu } from "semantic-ui-react"
import { ThemeContext } from "../Contexts/ThemeContext"

export default function Counter({
    id,
    label,
    position,
    keyBindCode,
    editLayoutMode,
    avaliblePositions,
    changePositionCallback,
    deleteCounter,
}) {
    const { isDarkMode } = useContext(ThemeContext)
    const [count, setCount] = useState(0)

    const incrementCounter = () => {
        setCount((prevCount) => prevCount + 1)
    }

    const decrementCounter = () => {
        setCount((prevCount) => prevCount - 1)
    }

    const resetCounter = () => {
        setCount(0)
    }

    const handleKeyPressed = useCallback(
        (event) => {
            if (!event.repeat && event.code === keyBindCode) {
                incrementCounter()
            }
        },
        [keyBindCode]
    )

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPressed)

        return function cleanup() {
            document.removeEventListener("keydown", handleKeyPressed)
        }
    }, [handleKeyPressed])

    return (
        <Grid.Column>
            <Segment padded>
                <Label attached="top">{label}</Label>
                {editLayoutMode ? (
                    <div>
                        <Menu compact>
                            <Dropdown
                                simple
                                item
                                className="no-result icon"
                                icon="sort numeric down"
                                options={avaliblePositions.map((pos, i) => ({
                                    key: i,
                                    text: pos,
                                    value: pos,
                                }))}
                                onChange={(e, data) => {
                                    changePositionCallback(id, parseInt(data.value))
                                }}
                                value={position}
                            />
                        </Menu>
                        <Button icon size="mini" color="red" onClick={() => deleteCounter(id)}>
                            <Icon name="delete" />
                        </Button>
                    </div>
                ) : null}
                <Segment textAlign="center">{count}</Segment>
                <Grid stackable>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Button onClick={incrementCounter} icon>
                                <Icon name={"add"} />({keyBindCode})
                            </Button>
                            <Button onClick={decrementCounter} icon>
                                <Icon name={"minus"} />
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Button onClick={resetCounter} icon>
                                <Icon name="repeat"></Icon>
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Grid.Column>
    )
}
