/**
 * This data is a sample from a real-world case of a patient pathway in the context of Acute Coronary Syndrome (ACS) diagnosis.
 * The pathway is a simplified version of the ACS diagnostic pathway, which is a complex process that involves multiple steps and actors.:
 * @module Extension
 */
import { Graph } from "./Graph.js";
export class Pathway extends Graph {
    get actors() {
        return this.nodes;
    }
    get paths() {
        return this.edges;
    }
    import = ({ metadata, actors: nodes, paths: edges, }) => this._import({ metadata, nodes, edges });
    export = () => ({
        metadata: this.metadata.toJSON(),
        actors: this.nodes.toJSON(),
        paths: this.edges.toJSON(),
    });
}
