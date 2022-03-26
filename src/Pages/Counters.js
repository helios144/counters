import React, {useState, useContext} from 'react'
import { Container, Button, Icon, Header, Divider } from 'semantic-ui-react'
import AddNewCounterModal from '../Components/AddNewCounterModal'
import CountersGrind from '../Components/CountersGrind'
import { CountersContext } from '../Contexts/CountersContext.'

export default function Counters({columnsPerRow, saveConfig}) {
    const [open, setOpen] = useState(false)
    const [editLayoutMode, setEditLayoutMode] = useState(false)
    const {counters, setCounters} = useContext(CountersContext)
    const handleChangePosition = (oldPosition, newPosition) => {
        let sortedCounters = counters.sort((a, b) => a.position > b.position ? 1 : -1)
        let positionedCounters = sortedCounters.map(counter => {
            if (counter.position === oldPosition) {
                return {...counter, position: newPosition}
            }

            return {...counter, position: counter.position > newPosition ? counter.position + 1 : counter.position}
        })

        sortedCounters = positionedCounters.sort((a, b) => a.position > b.position ? 1 : -1)
        setCounters(sortedCounters)
    }

    return (
        <Container>
            <Header as='h3' content='Counters' textAlign='center' />
            <Container textAlign='right'>
                <Button onClick={()=>{setEditLayoutMode(!editLayoutMode)}}>Edit layout&nbsp;&nbsp;<Icon name="grid layout"/></Button>
                <Button onClick={() => { setOpen(!open)}}>Add new&nbsp;&nbsp;<Icon name={"add"}/></Button>
                <Button onClick={saveConfig}>Save counters&nbsp;&nbsp;<Icon name={"save"}/></Button>
            </Container>
            <Container textAlign='center'>
                <Divider />
                <CountersGrind counters={counters} columnsPerRow={columnsPerRow} editLayoutMode={editLayoutMode} changePositionCallback={handleChangePosition}/>
            </Container>
            <AddNewCounterModal open={open} setOpen={setOpen} />
        </Container>
    )
}
