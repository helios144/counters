import React from "react"
import Counter from "./Counter"
import { Grid } from "semantic-ui-react"

export default function CountersGrind({
    counters,
    columnsPerRow,
    deleteCounter,
    editLayoutMode,
    changePositionCallback,
}) {
    const avaliblePositions = (currentPosition) => {
        return counters.filter((counter) => counter.position !== currentPosition).map((counter) => counter.position)
    }

    const renderCountersWithRows = () => {
        let rows = []

        for (let i = 0; i < Math.ceil(counters.length / columnsPerRow); i++) {
            let columns = []

            for (let j = i * columnsPerRow; j < i * columnsPerRow + columnsPerRow; j++) {
                if (counters[j]) {
                    columns.push(
                        <Counter
                            id={counters[j].id}
                            label={counters[j].label}
                            position={counters[j].position}
                            keyBindCode={counters[j].keyBindCode}
                            editLayoutMode={editLayoutMode}
                            avaliblePositions={avaliblePositions(counters[j].position)}
                            changePositionCallback={changePositionCallback}
                            key={j}
                            deleteCounter={deleteCounter}
                        />
                    )
                }
            }

            rows.push(<Grid.Row key={i}>{columns}</Grid.Row>)
        }
        return rows
    }

    return (
        <Grid columns={columnsPerRow} divided stackable textAlign="center">
            {renderCountersWithRows()}
        </Grid>
    )
}
