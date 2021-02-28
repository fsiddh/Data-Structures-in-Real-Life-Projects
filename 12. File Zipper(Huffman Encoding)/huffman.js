import { BinaryHeap } from './heap.js';

export { HuffmanCoder }   //will be recieved by script.js

class HuffmanCoder{

    stringify(node){//para -> root node
        if(typeof(node[1])==="string"){
            return '\''+node[1];       //leaf node ->adding additional '\' to detect char in string form
        }

        return '0' + this.stringify(node[1][0]) + '1' + this.stringify(node[1][1]); // inorder traversal
    }

    display(node, modify, index=1){
        if(modify){
            node = ['',node];
            if(node[1].length===1)
                node[1] = node[1][0];
        }

        if(typeof(node[1])==="string"){
            return String(index) + " = " + node[1];
        }

        let left = this.display(node[1][0], modify, index*2);
        let right = this.display(node[1][1], modify, index*2+1);
        let res = String(index*2)+" <= "+index+" => "+String(index*2+1);
        return res + '\n' + left + '\n' + right;
    }

    destringify(data){//creating tree again from string tree structure
        let node = [];
        if(data[this.ind]==='\''){
            this.ind++;
            node.push(data[this.ind]);
            this.ind++;
            return node;
        }

        this.ind++;
        let left = this.destringify(data);
        node.push(left);
        this.ind++;
        let right = this.destringify(data);
        node.push(right);

        return node;
    }

    getMappings(node, path){//para->root node,empty string
        //node[0] -> freq
        //leaf node[1] = char else node[1] = array of children
        //node[1][0] -> left child
        //node[1][1] -> right child

        if(typeof(node[1])==="string"){//leaf node detection(will be be a char(a|b|c|d etc) js identifies char as type string)
            this.mappings[node[1]] = path; //saves path at index of ascii value of requested char in array MAPPINGS
            return;
        }

        //DFS
        this.getMappings(node[1][0], path+"0");//left child path+0
        this.getMappings(node[1][1], path+"1");//right child path+1
    }

    encode(data){//function to encode //will return values to script.js
                //'data'is from script.js(uploaded text file is 'data')
        this.heap = new BinaryHeap();//generate heap

        //STEP 1 -> CREATE FREQUENCY MAP
        const mp = new Map();//generate map named mp
        for(let i=0;i<data.length;i++){//for every char i in text file
            if(data[i] in mp){                    //create
                mp[data[i]] = mp[data[i]] + 1;    //frequency
            } else{                               //map 
                mp[data[i]] = 1;                  //for every char in text file
            }
        }

        //STEP 2 -> MAKE MIN HEAP
        for(const key in mp){
            this.heap.insert([-mp[key], key]);//putting negative values to convert max heap to min heap
        }                                     //value 10 2       if values are neg -10,-2
                                            //max heap-> 10 ,2  //min heap->-2,-10
        
        //STEP 3 -> TILL ONE NODE REMAINS 
        // DO -> 1.EXTRACT TOP TWO MIN NODES
        //       2.CREATE A NODE WITH LEFT AND RIGHT CHILD AS EXTRACTED NODE
                //ITS FREQ = SUM OF FREQ OF BOTH EXTRACTED NODES
        //       3.INSERT NEW NODE IN HEAP
        while(this.heap.size() > 1){//till one node remains 
            const node1 = this.heap.extractMax(); //extraction top two values
            const node2 = this.heap.extractMax();
                            //freq              //char children
            const node = [node1[0]+node2[0],[node1,node2]];
            this.heap.insert(node); //insert new node
        }
        const huffman_encoder = this.heap.extractMax(); //extract the last remaining root node

        this.mappings = {};//contains encoded value for each char
        this.getMappings(huffman_encoder, "");//function call

        let binary_string = "";
        for(let i=0;i<data.length;i++) {
            binary_string = binary_string + this.mappings[data[i]];//forming encoded text for every char in text from mappings array(contains encoded value for each char)
        }
        
        //counting rem -> needed additional bits to make binary string multiple of 8
        let rem = (8 - binary_string.length%8)%8; //we need to convert binary string to ascii codes to save in text -> every 8 bit code = 1 ascii char ->hence we need bits to be multiple of 8 so as to convert all bits to ascii char 
        //**LATER WE NEED TO REMOVE THSI ADDITIONAL BITS WHILE DECODING**
        let padding = "";
        for(let i=0;i<rem;i++)
            padding = padding + "0"; //adding additional 0s
        binary_string = binary_string + padding; 

        let result = "";
        //CONVERTING INTO ASCII CODE TO CHAR VALUES
        for(let i=0;i<binary_string.length;i+=8){
            let num = 0;
            for(let j=0;j<8;j++){
                num = num*2 + (binary_string[i+j]-"0");  //binary to decimal ascii codes (0-256)
            }
            result = result + String.fromCharCode(num);//char value from ascii code(num)
        }
                                
                        //function call for tree structure in string form
        let final_res = this.stringify(huffman_encoder) + '\n' + rem + '\n' + result;
        let info = "Compression Ratio : " + data.length/final_res.length;
        info = "Compression complete and file sent for download" + '\n' + info;
                //encoded tree in string+rem+encoded text,tree structure(b<=1=>a),comp ratio
        return [final_res, this.display(huffman_encoder, false), info];
        //values returned to script.js
    }

    decode(data){
        data = data.split('\n');//getting 3 elements of final_res(tree in string,additional bits,encoded text)
        if(data.length===4){
            // if there was a newline char in text
            data[0] = data[0] + '\n' + data[1];
            data[1] = data[2];
            data[2] = data[3];
            data.pop();
        }

        this.ind = 0;
        const huffman_decoder = this.destringify(data[0]);//get tree back
        const text = data[2];//encoded text

        let binary_string = "";

        //converting encoded text(via ascii code) back to binary code
        for(let i=0;i<text.length;i++){
            let num = text[i].charCodeAt(0);//ascii code
            let bin = "";
            for(let j=0;j<8;j++){
                bin = num%2 + bin;
                num = Math.floor(num/2);//binary values
            }
            binary_string = binary_string + bin;
        }

        binary_string = binary_string.substring(0,binary_string.length-data[1]);//remove additional added bits in encode function(rem/data[1])

        console.log(binary_string.length);

        let res = "";
        let node = huffman_decoder;//tree root node

        //TRAVERSAL TREE -> GO LEFT IF 0 | GO RIGHT FOR 1 -> LEAF NODE = CHAR
        for(let i=0;i<binary_string.length;i++){
            if(binary_string[i]==='0'){
                node = node[0];
            } else{
                node = node[1];
            }

            if(typeof(node[0])==="string"){//leaf node detection
                res += node[0];           //forming original text
                node = huffman_decoder;   //get back to root node traverse again
            }
        }
        let info = "Decompression complete and file sent for download";
        return [res, this.display(huffman_decoder, true), info];
    }
}