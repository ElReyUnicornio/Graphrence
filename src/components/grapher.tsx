import { FC, useEffect, useState, CSSProperties } from "react";
import Graph from "graphology";
import { LayoutForceControl } from "@react-sigma/layout-force";
import {
  ControlsContainer,
  SigmaContainer,
  ZoomControl,
  useRegisterEvents,
  useSigma,
  useLoadGraph,
} from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

const LoadGraph = () => {
    const loadGraph = useLoadGraph();
  
    useEffect(() => {
      const graph = new Graph();
      graph.addNode("1", { label: "Node 1", x: 0, y: 0, size: 15, color: "red" });
      graph.addNode("2", { label: "Node 2", x: 1, y: 1, size: 15, color: "red" });
      graph.addNode("3", { label: "Node 3", x: 0, y: 0, size: 15, color: "red" });
      graph.addNode("4", { label: "Node 4", x: 1.5, y: 1, size: 15, color: "red" });
      graph.addNode("5", { label: "Node 5", x: 2, y: 0, size: 15, color: "red" });
      graph.addNode("6", { label: "Node 6", x: 1.5, y: 1, size: 15, color: "red" });

      graph.addEdge("1", "2", { size: 4, color: "#f3f4f6" });
      graph.addEdge("1", "3", { size: 4, color: "#f3f4f6" });
      graph.addEdge("1", "4", { size: 4, color: "#f3f4f6" });
      graph.addEdge("4", "3", { size: 4, color: "#f3f4f6" });
      graph.addEdge("5", "6", { size: 4, color: "#f3f4f6" });
      graph.addEdge("6", "2", { size: 4, color: "#f3f4f6" });
      graph.addEdge("6", "1", { size: 4, color: "#f3f4f6" });
      graph.addEdge("4", "2", { size: 4, color: "#f3f4f6" });
      graph.addEdge("5", "3", { size: 4, color: "#f3f4f6" });
      graph.addEdge("3", "4", { size: 4, color: "#f3f4f6" });
      loadGraph(graph);
    }, [loadGraph]);
  
    return null;
  };

const GraphEvents: React.FC = () => {
  const registerEvents = useRegisterEvents();
  const sigma = useSigma();
  const [draggedNode, setDraggedNode] = useState<string | null>(null);

  useEffect(() => {
    // Register the events
    registerEvents({
      downNode: (e) => {
        setDraggedNode(e.node);
        sigma.getGraph().setNodeAttribute(e.node, "highlighted", true);
      },
      // On mouse move, if the drag mode is enabled, we change the position of the draggedNode
      mousemovebody: (e) => {
        if (!draggedNode) return;
        // Get new position of node
        const pos = sigma.viewportToGraph(e);
        sigma.getGraph().setNodeAttribute(draggedNode, "x", pos.x);
        sigma.getGraph().setNodeAttribute(draggedNode, "y", pos.y);

        // Prevent sigma to move camera:
        e.preventSigmaDefault();
        e.original.preventDefault();
        e.original.stopPropagation();
      },
      // On mouse up, we reset the autoscale and the dragging mode
      mouseup: () => {
        if (draggedNode) {
          setDraggedNode(null);
          sigma.getGraph().removeNodeAttribute(draggedNode, "highlighted");
        }
      },
      // Disable the autoscale at the first down interaction
      mousedown: () => {
        if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
      },
      //Higjlight node on hover
      enterNode: (e) => {
        sigma.getGraph().forEachNode((node) => {
          sigma.getGraph().setNodeAttribute(node, "color", "#f3f4f6");
        });

        sigma.getGraph().setNodeAttribute(e.node, "color", "#1e40af");
        sigma.getGraph().setNodeAttribute(e.node, "size", 18);
        sigma.getGraph().setNodeAttribute(e.node, "highlighted", false);

        sigma.getGraph().forEachInNeighbor(e.node, (neighbor) => {
          sigma.getGraph().setNodeAttribute(neighbor, "color", "#60a5fa");
          sigma.getGraph().setNodeAttribute(neighbor, "size", 12);
        });

        sigma.getGraph().forEachOutNeighbor(e.node, (neighbor) => {
          sigma.getGraph().setNodeAttribute(neighbor, "color", "#60a5fa");
          sigma.getGraph().setNodeAttribute(neighbor, "size", 12);
        });

        sigma.getGraph().forEachInEdge(e.node, (edge) => {
          sigma.getGraph().setEdgeAttribute(edge, "color", "#60a5fa");
        });

        sigma.getGraph().forEachOutEdge(e.node, (edge) => {
          sigma.getGraph().setEdgeAttribute(edge, "color", "#60a5fa");
        });
        document.body.style.cursor = "pointer";
      },
      leaveNode: (e) => {
        sigma.getGraph().forEachNode((node) => {
          sigma.getGraph().setNodeAttribute(node, "color", "red");
        });

        sigma.getGraph().setNodeAttribute(e.node, "color", "red");
        sigma.getGraph().setNodeAttribute(e.node, "size", 15);

        sigma.getGraph().forEachInNeighbor(e.node, (neighbor) => {
          sigma.getGraph().setNodeAttribute(neighbor, "color", "red");
        });

        sigma.getGraph().forEachOutNeighbor(e.node, (neighbor) => {
          sigma.getGraph().setNodeAttribute(neighbor, "color", "red");
        });

        sigma.getGraph().forEachInEdge(e.node, (edge) => {
          sigma.getGraph().setEdgeAttribute(edge, "color", "#f3f4f6");
        });

        sigma.getGraph().forEachOutEdge(e.node, (edge) => {
          sigma.getGraph().setEdgeAttribute(edge, "color", "#f3f4f6");
        });
        document.body.style.cursor = "default";
      },
      // double click on node action
      doubleClickNode: (e) => {
        console.log("Node double clicked: ", e.node);
      }
    });
  }, [registerEvents, sigma, draggedNode]);

  return null;
};

const Grapher: FC<{ style: CSSProperties }> = ({ style }) => {
  return (
    <SigmaContainer style={style} settings={{ allowInvalidContainer: true }}>
      <LoadGraph />
      <GraphEvents />
      <ControlsContainer position={"bottom-right"}>
        <ZoomControl className="felx justify-center content-center" labels={{ zoomIn: "PLUS", zoomOut: "MINUS", reset: "RESET" }}>
            <svg className="w-5 h-5 m-auto text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414ZM2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm4 0a1 1 0 0 0 1 1h6a1 1 0 1 0 0-2H7a1 1 0 0 0-1 1Z" clip-rule="evenodd"/>
            </svg>
            <svg className="w-5 h-5 m-auto text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M7 10h6m4 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
            </svg>
            <svg className="w-5 h-5 m-auto text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"/>
            </svg>
        </ZoomControl>
        <LayoutForceControl style={{display: 'none'}} autoRunFor={0} settings={{settings: {gravity: 1, repulsion: 0.0001, attraction: 0.03, inertia: 0.6 }}} />
      </ControlsContainer>
    </SigmaContainer>
  );
};

export default Grapher;