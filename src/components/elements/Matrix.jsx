import React, { useEffect, useState } from 'react'

export function useGenerateMatrix(obj, event) {
  const [Matrix, updateMatrix] = useState({
    adjacencies: [],
    incidents: []
  })

  useEffect(() => {
    updateMatrix({
      adjacencies: obj.tops.mass.map(el1 => {
        return obj.tops.mass.map(el2 => {
          const flagIsVector = !event.isVector && obj.connections.mass.filter(el => el[0] === el1 && el[1] === el2).length !== 0
          const flag = obj.connections.mass.filter(el => el[1] === el1 && el[0] === el2).length !== 0
          return (flag || flagIsVector) ? 1 : 0
        })
      }),
      incidents: obj.connections.mass.map(el1 => {
        return obj.tops.mass.map(el2 => {
          if (!event.isVector) return el1.includes(el2) ? 1 : 0
          else {
            if (el1[0] === el2) return "+1"
            else if (el1[1] === el2) return "-1"
            else return 0
          }
        })
      })
    })

  }, [obj.connections, obj.tops , event.isVector])

  return Matrix

}


export default function Matrix({ obj }) {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: 'space-around',
      alignItems: 'center',
    }}>
      <div className='matrix matrix-adjacencies' key={'matrix-adjacencies'}>
        {obj.adjacencies.map((el, i) => (
          <div key={i} >{
            el.map((p, j) => (
              <span data-i={i + 1} data-j={j + 1} key={j}>
                <p style={{
                  backgroundColor: p === 0 ? "red" : "green",
                }}>{p}</p>
              </span>
            ))
          }</div>
        ))}
      </div>
      <div className='matrix matrix-incidents' key={'matrix-incidents'}>
        {obj.incidents.map((el, i) => (
          <div key={i}>{
            el.map((p, j) => (
              <span key={j} data-i={'e' + (i + 1)} data-j={j + 1}>
                <p style={{
                  backgroundColor: p === 0 ? "red" : "green"
                }}>{p}</p>
              </span>
            ))
          }</div>
        ))}
      </div>

    </div>
  )
}
