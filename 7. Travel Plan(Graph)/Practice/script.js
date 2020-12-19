onload = function () {

    // create a network
    const container = document.getElementById('container');
    const genNew = document.getElementById('generate-graph');

    // initialise graph options
    const options = {
        edges: {
            labelHighlightBold: true,
            font: {
                size: 20
            }
        },
        nodes: {
            font: '12px arial darkred',
            scaling: {
                label: true
            },
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf015',
                size: 40,
                color: '#991133',
            }
        }
    };

    // initialize your network!
    const network = new vis.Network(container);
    network.setOptions(options);

    function createData(){
        const cities = ['Delhi', 'Mumbai', 'Gujarat', 'Goa', 'Kanpur', 'Jammu', 'Hyderabad', 'Bangalore', 'Gangtok', 'Meghalaya'];

        // Initialising number of nodes in graoh dynamically
        const V = Math.floor(Math.random() * cities.length) + 3;

        // Preparing node data for Vis.js
        let vertices = [];
        for(let i=0;i<V;i++){
            vertices.push({id:i, label: cities[i-1]});
        }

        // Preparing edges for Vis.js
        let edges = [];
        for(let i=1;i<V;i++){
            // Picking a neighbour from 0 to i-1 to make edge to
            let neigh = Math.floor(Math.random()*i);

            // Adding the edge between node and neighbour
            edges.push({from: i, to: neigh, color: 'orange',label: String(Math.floor(Math.random()*70)+30)});
        }

        //Preparing data object for Vis.js
        const data = {
            nodes: vertices,
            edges: edges
        };
        return data;
    }

    genNew.onclick = function () {
        // Creating and setting data to network
        let data = createData();
        network.setData(data);
    };

    genNew.click();
};