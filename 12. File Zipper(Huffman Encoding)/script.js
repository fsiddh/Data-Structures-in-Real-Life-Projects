import { HuffmanCoder } from './huffman.js';


onload = function () {
    // Get reference to elements
    const treearea = document.getElementById('treearea');//space for tree
    const encode = document.getElementById('encode');//encode button
    const decode = document.getElementById('decode');//decode button
    const temptext = document.getElementById('temptext');//space for text
    const upload = document.getElementById('uploadedFile');//uploaded file

    const coder = new HuffmanCoder();

    upload.addEventListener('change',()=>{ alert("File uploaded") });//when file is uploaded will display an alert

    encode.onclick = function () {//on clicking encode button this function is triggered

        const uploadedFile = upload.files[0];//because we are uploading 1 file we need that first file uploaded by upload.files function
        if(uploadedFile===undefined){//if nothing is there in uploadedFile ->result = undefined
            alert("No file uploaded !");
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent){//will see text file now
            const text = fileLoadedEvent.target.result;//will get all the written text in file 
            if(text.length===0){//file is blank
                alert("Text can not be empty ! Upload another file !");
                return;
            }
            let [encoded, tree_structure, info] = coder.encode(text);//trigger encode function in huffman.js and will recieve the returned values from function(encoded text,tree structure,compression ratio)
            downloadFile(uploadedFile.name.split('.')[0] +'_encoded.txt', encoded);//triggers function downloadFile
            treearea.innerText = tree_structure;//in left space for tree -> display a tree and ..
            treearea.style.marginTop = '2000px';                                               //..
            temptext.innerText = info;                                                           //compression ratio
        };
        fileReader.readAsText(uploadedFile, "UTF-8");
    };

    decode.onclick = function () {//on clicking decode button this function triggers

        const uploadedFile = upload.files[0];//because we are uploading 1 file we need that first file uploaded by upload.files function
        if(uploadedFile===undefined){//if nothing is there in uploadedFile ->result = undefined
            alert("No file uploaded !");
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = function(fileLoadedEvent){//will see text file now
            const text = fileLoadedEvent.target.result;//will get all the written text in file 
            if(text.length===0){//file is blank
                alert("Text can not be empty ! Upload another file !");
                return;
            }
            let [decoded, tree_structure, info] = coder.decode(text);//trigger decode function in huffman.js and will recieve the returned values from function(decoded text,tree structure,compression ratio)
            downloadFile(uploadedFile.name.split('.')[0] +'_decoded.txt', decoded);//triggers function downloadFile
            treearea.innerText = tree_structure;//in left space for tree -> display a tree and ..
            treearea.style.marginTop = '2000px';
            temptext.innerText = info;                                                          //compression ratio
        };
        fileReader.readAsText(uploadedFile, "UTF-8");
    };

};

function downloadFile(fileName, data){//file name ->firstletter+_encoded.txt    //data is encoded text recieved from encode function
    let a = document.createElement('a');
    a.href = "data:application/octet-stream,"+encodeURIComponent(data);
    a.download = fileName;
    a.click();
}