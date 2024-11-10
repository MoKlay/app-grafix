import React, { useEffect, useState } from 'react'

export function useGenerateMatrix(obj, event) {
  const [Matrix, updateMatrix] = useState({
    adjacencies: {},
    incidents: {}
  })

  useEffect(() => {
    const matrix = {
      adjacencies: {},
      incidents: {}
    }
    obj.tops.mass.forEach(el1 => {
      matrix.adjacencies[el1] = {}
      

      obj.tops.mass.forEach(el2 => {
        const flagIsVector = obj.connections.mass.filter(el => el[0] === el1 && el[1] === el2).length !== 0
        const flag = !event.isVector && obj.connections.mass.filter(el => el[1] === el1 && el[0] === el2).length !== 0

        matrix.adjacencies[el1][el2] = (flag || flagIsVector) ? 1 : 0
      })
    })

    obj.connections.mass.forEach((el1, i) => {
      matrix.incidents['e' + (i + 1)] = {}

      obj.tops.mass.forEach(el2 => {
        if (!event.isVector) matrix.incidents['e' + (i + 1)][el2] = el1.includes(el2) ? 1 : 0
          else {
            if (el1[0] === el2) matrix.incidents['e' + (i + 1)][el2] = "+1"
            else if (el1[1] === el2) matrix.incidents['e' + (i + 1)][el2] = "-1"
            else matrix.incidents['e' + (i + 1)][el2] = 0
          }
      })

    })
    updateMatrix(matrix)

  }, [obj.connections, obj.tops, event.isVector])

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
        {Object.entries(obj.adjacencies).map(([key, el], i) => (
          <div key={i} >{
            Object.entries(el).map(([key_p, p], j) => (
              <span data-i={key} data-j={key_p} key={j}>
                <p style={{
                  backgroundColor: p === 0 ? "red" : "green",
                }}>{p}</p>
              </span>
            ))
          }</div>
        ))}
      </div>
      <div className='matrix matrix-incidents' key={'matrix-incidents'}>
        {Object.entries(obj.incidents).map(([key, el], i) => (
          <div key={i}>{
            Object.entries(el).map(([key_p, p], j) => (
              <span key={j} data-i={key} data-j={key_p}>
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
