function createGraph(V, E){
    let adjacency_list = [];

    for (let i=0; i<=V; i++){
        adjacency_list.push([]);
    }

    for (let i=0; i<E.length; i++){
        adjacency_list[ E[i][0] ].push( [E[i][1], E[i][2]] );
        adjacency_list[ E[i][1] ].push( [E[i][0], E[i][2]] );
    }

    return adjacency_list;
}

const V = 5;
const E = [ [1,2,3], [1,4,2], [3,5,1], [3,4,3] ];

let graph = createGraph(V, E);

console.log(graph.length);
console.log(graph);