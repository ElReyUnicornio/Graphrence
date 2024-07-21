import { useLoadGraph } from "@react-sigma/core";
import { useEffect } from "react";
import Graph from "graphology";
import { useAppSelector } from "@/hooks";

const GraphLoader = () => {
    const loadGraph = useLoadGraph();
    const { articles } = useAppSelector((state) => state.articles);

    useEffect(() => {
        if (articles.length == 0 || !loadGraph) return;
        const graph = new Graph();

        articles.forEach((article) => {
            graph.addNode(article.uid, { label: article.name, x: Math.random(), y: Math.random(), size: 15, color: "red" });
        });

        articles.forEach((article) => {
            article.relations.forEach((relation) => {
                graph.addEdge(article.uid, relation, { color: "#f3f4f6", size: 4 });
            });
        });
        loadGraph(graph);
    }, [articles, loadGraph]);

    return null;
};

export default GraphLoader;