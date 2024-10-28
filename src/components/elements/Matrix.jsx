import React, { useEffect, useState } from 'react'

function useGenerateMatrix(obj, event) {
  const [adjacencies, setAdjacencies] = useState([])
  const [incidents, setIncidents] = useState([])

  useEffect(() => {
    const mass = obj.tops.mass.map(el1 => {
      return obj.tops.mass.map(el2 => {
        return obj.connections.mass.
      })
    })
    setAdjacencies(mass)
    

  }, [obj, event])

}


export default function Matrix({
  event, obj
}) {



  return (
    <div>Matrix</div>
  )
}
