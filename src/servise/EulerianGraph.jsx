import React, { useEffect } from "react";
import { dfs } from "./DepthTraversal";

export default function Eulerian(graf) {
  const [EulerianGraph, setEulerianGraph] = React.useState(false)

  useEffect(() => {
    console.clear()
    if (graf.tops.length === 0) 
      return setEulerianGraph(false)
    else console.debug('Вершины имеются')
    
    const odd = Object.values(graf.degree).filter(el => el % 2 === 1).length
     
    if (odd > 2 || odd === 1){
      console.debug('Нечетных степеней')
      return setEulerianGraph(false)
    } else if ( odd === 2) {
      console.debug('Найден эйлеров путь, так как нечетных степеней в графе две')
    }
    
    else console.debug('Степени вершин все четные')

  
    let visited = []
  
    graf.tops.mass.forEach(el => {
      const way = dfs(graf.adjacencies, el)
      way.length > 1 && way.forEach(el => {
        !visited.includes(el) && visited.push(el)
      })
    })
    console.debug(visited)
    if (visited.length !== graf.tops.length) {
      console.debug('Обход по всем вершинам не прошлась по всем вершинам')
      return setEulerianGraph(false)
    }
  
    return setEulerianGraph(true)
  }, [graf.adjacencies])

  return EulerianGraph
}