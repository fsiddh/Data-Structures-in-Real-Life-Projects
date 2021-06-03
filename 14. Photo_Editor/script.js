onload = function () {
    const editor = document.getElementById("editor");
    const context = editor.getContext("2d");
    const toolbar = document.getElementById("toolbar");

    const tools = {
        "upload" : function () {
            const upload = document.createElement('input');
            upload.type = "file";
            upload.click();
            upload.onchange = function() {
                const img = new Image();
                /*2*/img.onload = () => {
                    editor.width = img.width;
                    editor.height = img.height;
                    context.drawImage(img, 0,0);
                };
                img.onerror = () => {
                    console.error("The provided file couldn't be loaded as an Image media");
                };

                /*1*/img.src = URL.createObjectURL(this.files[0]); //Iimg jo load hgi uske lie img.src chahie ,then onload
            };
        },
        "save" : function(){
            const image = editor.toDataURL(); // return image url in canvas 
            const link = document.createElement('a'); // link
            link.download = 'image.png'; // will be download as this name
            link.href = image; // url of image
            link.click();  //downloads
        },
        "flipHor" : function(){
            let cols = editor.width; // Width is number of columns
            let rows = editor.height; // Height is number of rows
            let image = getRGBArray(rows, cols); // array ->[[[r,g,b,d]]] of each cell

            /*_____ 
            |_ _ _| swap about this middle line
            |_____|
            */
            for(let i=0;i<Math.floor(rows/2);i++){
                for(let j=0;j<cols;j++){
                    let tmp = image[i][j];
                    image[i][j] = image[rows-1-i][j];
                    image[rows-1-i][j] = tmp;
                }
            }
            setImageData(image, rows, cols);
        },
        "flipVert" : function(){
            let cols = editor.width; // Width is number of columns
            let rows = editor.height; // Height is number of rows
            let image = getRGBArray(rows, cols);

            for(let i=0;i<rows;i++){
                for(let j=0;j<Math.floor(cols/2);j++){
                    let tmp = image[i][j];
                    image[i][j] = image[i][cols-1-j];
                    image[i][cols-1-j] = tmp;
                }
            }
            setImageData(image, rows, cols);
        },
        "rotateL" : function () {
            let cols = editor.width; // Width is number of columns
            let rows = editor.height; // Height is number of rows
            let image = getRGBArray(rows, cols);

            let limage = [];
            for(let i=cols-1;i>=0;i--){
                let row = [];
                for(let j=0;j<rows;j++){
                    row.push(image[j][i]);
                }
                limage.push(row);
            }
            setImageData(limage, cols, rows);
        },
        "rotateR" : function () {
            let cols = editor.width; // Width is number of columns
            let rows = editor.height; // Height is number of rows
            let image = getRGBArray(rows, cols);

            let rimage = [];
            for(let i=0;i<cols;i++){
                let row = [];
                for(let j=rows-1;j>=0;j--){
                    row.push(image[j][i]);
                }
                rimage.push(row);
            }
            setImageData(rimage, cols, rows);
        },
        // technique -> SAMPLING
        // IF YOU GO FROM SMALL TO BIG , YOU LOSE DATA -> "PIXELATION"
        "resize" : function(){
            let cols = editor.width; // Width is number of columns
            let rows = editor.height; // Height is number of rows
            let image = getRGBArray(rows, cols);
            if (editor.toDataURL() == "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEYklEQVR4Xu3UAQkAAAwCwdm/9HI83BLIOdw5AgQIRAQWySkmAQIEzmB5AgIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlACBB1YxAJfjJb2jAAAAAElFTkSuQmCC") {
                alert('please upload image');
                return;
            }

            let inp = prompt('Current Width : '+cols + '\n' + 'Current Height : '+rows + '\n' + 'Give the new width and height in a space separated manner'+ '\n' +'Please refrain from giving dimension greater than ratio 3').split(' ');
            if(inp.length!==2){ 
                alert('Incorrect dimensions in input');
                return;
            }
            let ncols = parseInt(inp[0]); //width
            let nrows = parseInt(inp[1]); //height
            if(isNaN(ncols) || isNaN(nrows)){ // if not a no.
                alert('Input is not a proper number');
                return;
            }

            let hratio = rows/nrows;
            let wratio = cols/ncols;

            // sampling -> adding pixels [i*hratio][j*wratio]
            let nimage = [];
            for(let i=0;i<nrows;i++){
                let row = [];
                for(let j=0;j<ncols;j++){
                    row.push(image[Math.floor(i*hratio)][Math.floor(j*wratio)]);
                }
                nimage.push(row);
            }
            setImageData(nimage, nrows, ncols);
        },

        //turns grey
        "greyscale" : function(){
            let cols = editor.width; // Width is number of columns
            let rows = editor.height; // Height is number of rows
            let image = getRGBArray(rows, cols);

            for(let i=0;i<rows;i++){
                for(let j=0;j<cols;j++){
                    let pixel = image[i][j];
                    let shade = Math.floor(0.3*pixel[0]+0.59*pixel[1]+0.11*pixel[2]); // R*0.3 -> greyish component
                    image[i][j][0] = image[i][j][1] = image[i][j][2] = shade; // r,g,b -> shade grey
                }
            }
            setImageData(image, rows, cols);
        }
    };

    // all the buttons,eg save calls functions once clicked button
    for(let button of toolbar.children){
        if(button.nodeName==="BUTTON") { // nodeName returns tagname in capitals
            button.onclick = function (event) {
                event.preventDefault(); //prevent default use
                tools[this.id].call(this); //tools[save].call(save btn ka reference) -> .call(this)=calls a function with a given this value and arguments
            }
        }
    }

    // AUXILARY FUNCTIONS - WE CAN DIRECTLY WORK WITH "DATA ARRAY" ,THIS FUNCTION ARE FOR VISUALISATION
    // gets pixel data and paints that data on canvas
    function setImageData(data, rows, cols) {
        const Image = Array.from({ length: rows*cols*4 }); // length = h*w*4 -> no. of rows = h,nocol=w,each cell has R,G,B,alpha value =*4
        for(let i = 0;i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                for (let k = 0; k < 4; k++) {
                    Image[(i * cols + j) * 4 + k] = data[i][j][k]; // canvas needs 1d array so 
                    // image[0]=r value of 0,0 pixel
                    // image -> [r,g,b,a,r,g,b,a....]
                }
            }
        }                                     //w    h
        const idata = context.createImageData(cols, rows);// Creates a new, blank ImageData object with the specified dimensions
        idata.data.set(Image); // .data -> Is a Uint8ClampedArray representing a one-dimensional array containing the data in the RGBA order
        editor.width = cols; //editor = canvas
        editor.height = rows; 
        context.putImageData(idata, 0, 0); // paints idata onto the canvas.
    }
    // get rgba data array from each cell
    function getRGBArray(rows, cols) {
        let data = context.getImageData(0, 0, cols, rows).data; // provide image data of specified portion of the canvas. 
        const RGBImage = [];
        for(let i=0;i<rows;i++){
            let row = [];
            for(let j=0;j<cols;j++){
                let pixel = [];
                for(let k=0;k<4;k++){
                    pixel.push( data[ ( i*cols + j ) * 4 + k ] );
                }
                row.push(pixel);
            }
            RGBImage.push(row);
        }
        return RGBImage;
    }
};