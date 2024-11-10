import React from 'react'
import Button from './Button'

export default function ContextMenu({
  x, y,
  items = [],
  value,
  obj = {
    degree: 0,
  }
}) {

  return (
    <div className='context-menu' style={{
      left: `${x}px`,
      top: `${y}px`,
    }}>
      <p>{value}</p>
      <div className='info'>
        <p>Степень: {obj.degree}</p>
      </div>
      {
        items.map(item => item && (
          <Button key={item.label} onClick={!item.items ? item.onClick : undefined} icon={item.icon} customClass>
            {item.label}
            {item.items && <div className='list'>
              {
                item.items.map(item => (
                  <Button key={item.label} onClick={item.onClick} icon={item.icon} customClass>
                    {item.label}
                  </Button>
                ))

              }
            </div>}
          </Button>
        ))
      }
    </div>
  )
}
