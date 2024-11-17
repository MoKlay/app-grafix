import { useEffect, useRef, useState } from 'react'



export function dfs(graph, startNode, node = [], nodes = []) {

  nodes.push(startNode)

  Object.keys(graph).length > 0 && Object.entries(graph[startNode]).forEach(([key, el]) => {
    if (node.slice(-1)[0] !== startNode) node.push(startNode)
    if (el === 1 && !nodes.includes(key)) {
      dfs(graph, key, node, nodes);
    }
  });

  if (node.slice(-1)[0] !== startNode) node.push(startNode)

  return node
};

// Функция для обхода графа в ширину (BFS)
const bfs = (graph, startNode) => {
  const queue = [startNode]; // Очередь для обработки узлов
  const visitedNodes = new Set(); // Множество посещённых узлов
  const way = {}

  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (!visitedNodes.has(currentNode)) {
      visitedNodes.add(currentNode);
      const slash = []
      // Добавляем не посещённых соседей в очередь
      Object.entries(graph[currentNode]).forEach(([key, el]) => {
        if (el === 1 && !visitedNodes.has(key)) {
          queue.push(key)
          slash.push(key)
        }
      });
      way[currentNode] = slash
    }
  }

  return way; // Возвращаем массив посещённых узлов
};



export function useDepthTraversal(adjacencies) {
  const [start, setStart] = useState(null)
  const [node, setNode] = useState(null)



  useEffect(() => {
    if (start) {
      console.log(bfs(adjacencies, start));
      
      setNode(dfs(adjacencies, start))
      // bfs(adjacencies, start)
      setStart(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, adjacencies])

  return [node, (key) => { setStart(key) }]


}
