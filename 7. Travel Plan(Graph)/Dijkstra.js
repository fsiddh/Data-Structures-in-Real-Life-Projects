function createGraph(V,E){
    // V - Number of vertices in graph
    // E - Number of edges in graph (u,v,w)
    let adj_list = []; // Adjacency list
    for(let i = 0 ; i < V ; i++){
        adj_list.push([]);
    }
    for(let i = 0 ; i < E.length ; i++){
        adj_list[E[i][0]].push([E[i][1],E[i][2]]);
        adj_list[E[i][1]].push([E[i][0],E[i][2]]);
    }
    return adj_list;
}

function djikstra(graph, V, src) {
    let vis = Array(V).fill(0);
    let dist = [];
    for(let i=0;i<V;i++)
        dist.push([10000,-1]);
    dist[src][0] = 0;

    for(let i=0;i<V-1;i++){
        let mn = -1;
        for(let j=0;j<V;j++){
            if(vis[j]===0){
                if(mn===-1 || dist[j][0]<dist[mn][0])
                    mn = j;
            }
        }

        vis[mn] = 1;
        for(let j=0;j<graph[mn].length;j++){
            let edge = graph[mn][j];
            if(vis[edge[0]]===0 && dist[edge[0]][0]>dist[mn][0]+edge[1]){
                dist[edge[0]][0] = dist[mn][0]+edge[1];
                dist[edge[0]][1] = mn;
            }
        }
    }

    return dist;
}

let src = 0;
let V = 9;
let E = [[0,1,4], [0,7,8], [1,7,11], [1,2,8], [7,8,7], [6,7,1], [2,8,2],
    [6,8,6], [5,6,2], [2,5,4], [2,3,7], [3,5,14], [3,4,9], [4,5,10]];

let graph = createGraph(V,E);
let distances = djikstra(graph,V,0);
console.log(distances);