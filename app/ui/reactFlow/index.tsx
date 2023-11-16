"use client"

import {Background, Controls, ReactFlow, useNodesState, useEdgesState, addEdge,} from "reactflow";
import 'reactflow/dist/style.css';
import './overview.css';
import {useCallback} from "react";

`example
<RF 
    nodes='[
        { "id": "1", "position": { "x": 150, "y": 0 }, "data": { "label": "1" }, "type": "input" },
        { "id": "2", "position": { "x": 0, "y": 100 }, "data": { "label": "2" }, "type": "output" },
        { "id": "3", "position": { "x": 300, "y": 100 }, "data": { "label": "3" }, "className": "red circle" },
        { "id": "4", "position": { "x": 150, "y": 200 }, "data": { "label": "4" } }
    ]' 
    edges='[
        {"source": "1", "target": "2", "animated": true},
        {"source": "1", "target": "3"},
        {"source": "3", "target": "4"}
    ]'
    height={500}
    width={100%}
    align='center'
/>
`

type props = {
  label?: string,
  height?: string,
  width?: string,
  nodes?: string,
  edges?: string,
  align?: string,
}

const Test = ({width="640px", height="500px", nodes="", edges="", align="center"}: props) => {
  let result = (
    <div style={{width: '100%', height: `200px`}}>Ошибка!</div>
  );

  try {
    const parsed_nodes = nodes && JSON.parse(nodes.replace(/[\r\n]+/g, '\n').replaceAll('\\', '').replaceAll('\'', ''));
    const parsed_edges = edges && JSON.parse(edges.replace(/[\r\n]+/g, '\n').replaceAll('\\', '').replaceAll('\'', ''));

    // const [_nodes, setNodes, onNodesChange] = useNodesState(parsed_nodes);
    // const [_edges, setEdges, onEdgesChange] = useEdgesState(parsed_edges);
    //
    // const onConnect = useCallback(
    //   (params) => setEdges((eds) => addEdge(params, eds)),
    //   [setEdges],
    // );

    result = (
      <div style={{maxWidth: width, height: height}} className={`reactFlowWrapper ${align}`}>
        <ReactFlow
          nodes={parsed_nodes}
          edges={parsed_edges}
          // onNodesChange={onNodesChange}
          // onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
        >
          <Controls />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
    )
  } catch (e) {
    // console.log(e)
  }

  return result
}

export {Test}