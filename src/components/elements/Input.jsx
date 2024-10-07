import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { EVENT } from '../ToolBar'
import Button from './Button'
import { TopObject } from './Top'

export default function Input({ event, onClick, onSubmit, isEdit = false, obj = TopObject }) {


  const [value, setValue] = useState('')
  const [valbtn, setValbtn] = useState('')

  useEffect(() => setValue(obj.text), [obj])

  useEffect(() => {
    switch (event) {
      case EVENT.ADD_TOP:
        setValbtn('Описать вершины графа выражением')
        break
      case EVENT.ADD_CONNECTION:
        setValbtn('Описать связи графа выражением')
        break
      default:
        setTimeout(() => onClick(false), 300)
        break
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event])

  function handleSubmit(e) {
    e.preventDefault()
    if (/^((\d)+(,\d+)*)?$/.test(value) && event === EVENT.ADD_TOP) {
      const listtops = String(value).replaceAll(' ', '').split(',')

      let newObj = TopObject
      listtops.forEach(el => {
        newObj.object = {
          [el]: {
            x: Math.random() * 500 - 250 + window.innerWidth / 2,
            y: Math.random() * 500 - 250 + window.innerHeight / 2,
            color: '#' + Math.floor(Math.random() * 16777215).toString(16),
          }, ...obj.object
        }
      })
      onSubmit(newObj)
    }
    else if (/^(\(\d+,\d+\)(,\(\d+,\d+\))*)?$/.test(value) && event === EVENT.ADD_CONNECTION) {
      onSubmit(value)
      onClick(false)
    }
    else alert('Неверный формат')

  }









  return (
    <div className={classNames('input_info', { open: event === EVENT.ADD_TOP || event === EVENT.ADD_CONNECTION })} onClick={() => { }}>
      <Button onClick={() => {
        onClick(false)
        document.getElementById('input').focus()
      }}>{valbtn}</Button>
      <form className={classNames('form', { open: !isEdit })} onSubmit={handleSubmit}>
        <input id='input' type="text" onChange={(e) => setValue(e.target.value)} value={value} />
      </form>
    </div>
  )
}
