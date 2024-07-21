import { FC, useEffect, useState, CSSProperties } from "react";
import { LayoutForceControl } from "@react-sigma/layout-force";
import { useAppSelector } from "@/hooks";
import { setDocumentModalOpen, setSelectedDocument } from "@/storage/AppSlice";
import {
  ControlsContainer,
  SigmaContainer,
  ZoomControl,
  useRegisterEvents,
  useSigma,
} from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useAppDispatch } from "@/hooks";
import GraphLoader from "@components/GraphLoader"

const GraphEvents: React.FC = () => {
  const registerEvents = useRegisterEvents();
  const sigma = useSigma();
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const { currentNode } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!sigma || currentNode === null) return;

    if (!currentNode) unhighlightNodes();
    else highlightNodes(currentNode);
  }, [currentNode]);

  const handleOpenFile = (uid: number) => {
    dispatch(setDocumentModalOpen(true));
    dispatch(setSelectedDocument(uid));
  }

  const unhighlightNodes = () => {
    sigma.getGraph().forEachNode((node) => {
      sigma.getGraph().setNodeAttribute(node, "color", "red");
      sigma.getGraph().setNodeAttribute(node, "size", 15);
    });

    sigma.getGraph().forEachEdge((edge) => {
      sigma.getGraph().setEdgeAttribute(edge, "color", "#f3f4f6");
    });
    return true;
  }

  const highlightNodes = (source: unknown) => {
    sigma.getGraph().forEachNode((node) => {
      sigma.getGraph().setNodeAttribute(node, "color", "#f3f4f6");
    });

    sigma.getGraph().setNodeAttribute(source, "color", "#1e40af");
    sigma.getGraph().setNodeAttribute(source, "size", 18);
    sigma.getGraph().setNodeAttribute(source, "highlighted", false);

    sigma.getGraph().forEachInNeighbor(source, (neighbor) => {
      sigma.getGraph().setNodeAttribute(neighbor, "color", "#60a5fa");
      sigma.getGraph().setNodeAttribute(neighbor, "size", 12);
    });

    sigma.getGraph().forEachOutNeighbor(source, (neighbor) => {
      sigma.getGraph().setNodeAttribute(neighbor, "color", "#60a5fa");
      sigma.getGraph().setNodeAttribute(neighbor, "size", 12);
    });

    sigma.getGraph().forEachInEdge(source, (edge) => {
      sigma.getGraph().setEdgeAttribute(edge, "color", "#60a5fa");
    });

    sigma.getGraph().forEachOutEdge(source, (edge) => {
      sigma.getGraph().setEdgeAttribute(edge, "color", "#60a5fa");
    });
    return true;
  }

  useEffect(() => {
    // Register the events
    registerEvents({
      downNode: (e) => {
        setDraggedNode(e.node);
        highlightNodes(e.node);
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
          unhighlightNodes();
          sigma.getGraph().removeNodeAttribute(draggedNode, "highlighted");
        }
      },
      // Disable the autoscale at the first down interaction
      mousedown: () => {
        if (!sigma.getCustomBBox()) sigma.setCustomBBox(sigma.getBBox());
      },
      //Higjlight node on hover
      enterNode: (e) => {
        if (draggedNode) return;
        highlightNodes(e.node);
        document.body.style.cursor = "pointer";
      },
      leaveNode: () => {
        if (draggedNode) return;
        unhighlightNodes();
        document.body.style.cursor = "default";
      },
      // double click on node action
      doubleClickNode: (e) => {
        handleOpenFile(Number(e.node));
      },
      doubleClick: (event) => event.preventSigmaDefault(),
    });
  }, [registerEvents, sigma, draggedNode]);

  return null;
};

const Grapher: FC<{ style: CSSProperties }> = ({ style }) => {
  return (
    <SigmaContainer style={style} settings={{ allowInvalidContainer: true }}>
      <GraphLoader />
      <GraphEvents />
      <ControlsContainer position={"bottom-right"}>
        <ZoomControl className="felx justify-center content-center" labels={{ zoomIn: "PLUS", zoomOut: "MINUS", reset: "RESET" }}>
            <svg className="w-5 h-5 m-auto text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414ZM2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm4 0a1 1 0 0 0 1 1h6a1 1 0 1 0 0-2H7a1 1 0 0 0-1 1Z" clipRule="evenodd"/>
            </svg>
            <svg className="w-5 h-5 m-auto text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M7 10h6m4 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
            </svg>
            <svg className="w-5 h-5 m-auto text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"/>
            </svg>
        </ZoomControl>
        <LayoutForceControl style={{display: 'none'}} autoRunFor={0} settings={{settings: {gravity: 1, repulsion: 0.001, attraction: 0.2, inertia: 0.6 }}} />
      </ControlsContainer>
    </SigmaContainer>
  );
};

export default Grapher;