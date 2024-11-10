import { useEffect, useState } from 'react'


const dfs = (graph, startNode, visitedNodes = new Set()) => {
  // Добавляем текущий узел в посещённые
  visitedNodes.add(startNode);
  console.log(Array.from(visitedNodes));
  
  
  // Для каждого соседнего узла...
  Object.entries(graph[startNode]).forEach(([key, el]) => {
    if (el === 1 && !visitedNodes.has(key)) {
      // Если узел ещё не был посещён, продолжаем DFS от него
      dfs(graph, key, visitedNodes);
      
    }
  });

  return Array.from(visitedNodes); // Возвращаем массив посещённых узлов
};

// Функция для обхода графа в ширину (BFS)
const bfs = (graph, startNode) => {
  const queue = [startNode]; // Очередь для обработки узлов
  const visitedNodes = new Set(); // Множество посещённых узлов

  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (!visitedNodes.has(currentNode)) {
      visitedNodes.add(currentNode);
      console.log(Array.from(visitedNodes));
      // Добавляем не посещённых соседей в очередь
      Object.entries(graph[currentNode]).forEach(([key, el]) => {
        if (el === 1 && !visitedNodes.has(key)) {
          queue.push(key);
        }
      });
    }
  }

  return Array.from(visitedNodes); // Возвращаем массив посещённых узлов
};



export function useDepthTraversal(adjacencies) {
  const [start, setStart] = useState(null)


  useEffect(() => {
    if (start) {
      dfs(adjacencies, start)

      bfs(adjacencies, start)
    }
    setStart(null)
  }, [start, adjacencies])

  return (key) => { setStart(key) }


}
