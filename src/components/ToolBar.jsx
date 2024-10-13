import React, { useState } from 'react'
import Button, { ICONS, ListButton } from './elements/Button'


export const EVENT = {
  CURSOR: 'cursor',
  ADD_TOP: 'addTop',
  ADD_CONNECTION: 'addConn',
  DELETE_TOP: 'deleteTop',
}

export default function ToolBar({event ,setEvent}) {
  const [isVector, setIsVector] = useState(null)
  if (!event || !setEvent) return null
  return (
    <>
    {/* <Input /> */}
    <div className='ToolBar'>
      <Button className={[{active: event === EVENT.CURSOR}]} icon={ICONS.cursor} onClick={() => setEvent(EVENT.CURSOR)}/>
      <ListButton icon={ICONS.add}>
        <Button className={[{active: event === EVENT.ADD_TOP}]} icon={ICONS.add} onClick={() => setEvent(EVENT.ADD_TOP)}>Добавление вершин</Button>
        <Button className={[{active: event === EVENT.ADD_CONNECTION}]} icon={ICONS.add} onClick={() => setEvent(EVENT.ADD_CONNECTION)}>{isVector ? 'Добавление дуг' : 'Добавление ребер'}</Button>
        <Button className={[{active: event === EVENT.DELETE_TOP}]} icon={ICONS.add} onClick={() => setEvent(EVENT.DELETE_TOP)}>Удалить вершины</Button>
      </ListButton>
      <Button className={[{active_vector: isVector}, {not_active_vector: !isVector && isVector != null}]} icon={ICONS.vector} onClick={() => {
        setIsVector(prev => {
          setEvent(!prev)
          return !prev
        })
      }}></Button>
    </div>
    </>
  )
}
