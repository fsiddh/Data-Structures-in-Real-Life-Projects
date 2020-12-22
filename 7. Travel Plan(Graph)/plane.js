let plane = 0;
let p1=-1, p2=-1;
for(let pos in data['edges']){
    let edge = data['edges'][pos];
    if(edge['type']===1){
        let to = edge['to']-1;
        let from = edge['from']-1;
        let wght = parseInt(edge['label']);
        if(dist1[to][0]+wght+dist2[from][0] < mn_dist){
            plane = wght;
            p1 = to;
            p2 = from;
            mn_dist = dist1[to][0]+wght+dist2[from][0];
        }
        if(dist2[to][0]+wght+dist1[from][0] < mn_dist){
            plane = wght;
            p2 = to;
            p1 = from;
            mn_dist = dist2[to][0]+wght+dist1[from][0];
        }
    }
}