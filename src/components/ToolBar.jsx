import React, { useState } from 'react'
import Button, { ICONS, ListButton } from './elements/Button'


export function useCreateEventState() {
  const [toolType, setToolType] = useState(EVENT.CURSOR);
  const [isVector, setIsVector] = useState(false);

  function update(value) {
    switch (typeof value) {
      case 'string': Object.values(EVENT).includes(value) && setToolType(value); break
      case 'boolean': setIsVector(value); break
      default: console.debug('Ввод неверен');
    }
  }

  return [{toolType, isVector}, update]
}

export const EVENT = {
  CURSOR: 'cursor',
  ADD_TOP: 'addTop',
  ADD_CONNECTION: 'addConn',
  DELETE_TOP: 'deleteTop',
}

export default function ToolBar({event ,setEvent}) {
  if (!event || !setEvent) return null

  return (
    <div className='ToolBar'>
      <Button className={[{active: event.toolType === EVENT.CURSOR}]} icon={ICONS.cursor} onClick={() => setEvent(EVENT.CURSOR)}/>
      <ListButton icon={ICONS.add}>
        <Button className={[{active: event.toolType === EVENT.ADD_TOP}]} icon={ICONS.add} onClick={() => setEvent(EVENT.ADD_TOP)}>Добавление вершин</Button>
        <Button className={[{active: event.toolType === EVENT.ADD_CONNECTION}]} icon={ICONS.add} onClick={() => setEvent(EVENT.ADD_CONNECTION)}>{event.isVector ? 'Добавление дуг' : 'Добавление ребер'}</Button>
        <Button className={[{active: event.toolType === EVENT.DELETE_TOP}]} icon={ICONS.add} onClick={() => setEvent(EVENT.DELETE_TOP)}>Удалить вершины</Button>
      </ListButton>
      <Button className={[{active_vector: event.isVector}, {not_active_vector: !event.isVector}]} icon={ICONS.vector} onClick={() => setEvent(!event.isVector)}></Button>
    </div>
  )
}
