import React from 'react'
import Button, { ICONS } from './Button'

export default function PanelInfo({tops, connections}) {
  const [open, setOpen] = React.useState(false)
  return (
    <div
    className='PanelInfo'
    style={{
      transform: !open ? 'translateX(-100%)': 'none',
    }}
    >
      <div className='PanelInfo__btn'>
        <Button icon={ICONS.arrow} className={[{open}]} onClick={() => setOpen(!open)}></Button>
      </div>
      <div className='PanelInfo__content'>
        <p>Вершины: </p> <p>{`{${tops.text}}`}</p>
      </div>
    </div>
  )
}
