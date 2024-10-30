import React from 'react'
import Button, { ICONS } from './Button'
import classNames from 'classnames'

export default function PanelInfo({ custom = false, className, pos = 'left', obj, event, children }) {
  const [open, setOpen] = React.useState(false)



  return (
    <div
      className={classNames('Panel' ,{PanelInfo: !custom}, custom && className)}
      style={{
        left: pos === 'right' && 0 ,
        right: pos === 'left' && 0 ,
        transform: !open ? (pos === 'right' && 'translateX(-100%)') || (pos === 'left' && 'translateX(100%)') : 'none',
 
      }}
    >
      <div className='PanelInfo__btn' style={{
        left: pos === 'left' ? 0 : 'auto',

        right: pos === 'right' ? 0 : 'auto',

        transform: (pos === 'right' && 'translateX(calc(100% + 20px))') || (pos === 'left' && 'translateX(calc(-100% - 20px))'),


      }}>
        <Button icon={pos === 'left' ? ICONS.arrowLeft : ICONS.arrowRight} className={[{ openLeft: pos === 'left' && open, openRight: pos === 'right' && open }]} onClick={() => setOpen(!open)}></Button>
      </div>
      <div className='PanelInfo__content'>
        {!custom ? (
          <div className="grid_content">
            <p>Вершины: </p> <p>{`{ ${obj.tops.text} }`}</p>
            <p>{event.isVector ? 'Дуги:' : 'Ребра:'}</p> <p>{`{ ${obj.connections.text} }`}</p>
          </div>
        ) : children}
      </div>
    </div >
  )
}
