import React, { useState } from 'react'
import Button, { ICONS, ListButton } from './elements/Button'


export function useCreateEventState() {
  const [toolType, setToolType] = useState(EVENT.CURSOR);
  const [isVector, setIsVector] = useState(false);

  function update(value) {
    switch (typeof value) {
      case 'string': Object.values(EVENT).includes(value) && setToolType(value); break
      case 'boolean': setIsVector(value); break
      default: console.debug('Ввод неверен'); break
    }
  }

  return [{ toolType, isVector }, update]
}

export const EVENT = {
  CURSOR: 'cursor',
  ADD_TOP: 'addTop',
  ADD_CONNECTION: 'addConn',
  DELETE_TOP: 'deleteTop',
  DEPTH_TRAVERSAL: 'DEPTH_TRAVERSAL',
  WIDTH_TRAVERSAL: 'WIDTH_TRAVERSAL',
}

export default function ToolBar({ event, setEvent }) {
  if (!event || !setEvent) return null

  return (
    <div className='ToolBar'>
      <Button className={[{ active: event.toolType === EVENT.CURSOR }]} icon={ICONS.cursor} onClick={() => setEvent(EVENT.CURSOR)} />

      <Button className={[{ active: event.toolType === EVENT.ADD_TOP }]} icon={ICONS.add} onClick={() => setEvent(EVENT.ADD_TOP)} />

      <Button className={[{ active_vector: event.isVector }, { not_active_vector: !event.isVector }]} icon={ICONS.vector} onClick={() => setEvent(!event.isVector)}></Button>
    </div>
  )
}
