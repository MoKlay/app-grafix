import React from 'react'
import Button, { ICONS } from './Button'

export default function PanelInfo({ custom = false, obj, event, children }) {
  const [open, setOpen] = React.useState(false)



  return (
    <div
      className='PanelInfo'
      style={{
        transform: !open ? 'translateX(-100%)' : 'none',
      }}
    >
      {!custom ? (
        <>
          <div className='PanelInfo__btn'>
          <Button icon={ICONS.arrow} className={[{ open }]} onClick={() => setOpen(!open)}></Button>
        </div>
        <div className='PanelInfo__content'>
          <div className="grid_content">
            <p>Вершины: </p> <p>{`{ ${obj.tops.text} }`}</p>
            <p>{event.isVector ? 'Дуги:' : 'Ребра:'}</p> <p>{`{ ${obj.connections.text} }`}</p>
          </div>
        </div>
        </>
      ) : children}
    </div>
  )
}
