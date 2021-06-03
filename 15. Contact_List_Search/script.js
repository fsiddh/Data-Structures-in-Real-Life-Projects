
import {Trie} from './Trie.js';

onload = function () {

    const templates = document.getElementsByTagName('template')[0];
    const contact_item = templates.content.querySelector("div");
    const add = document.getElementById("add");
    const contact_info = document.getElementById("contact_input");
    const del = document.getElementById("del");
    const delete_info = document.getElementById("delete_input");
    const info = document.getElementById("info");
    const contact_list = new Trie();

    add.onclick = function () {
        let details = contact_info.value;
        details = details.split(',');
        if(details.length!==2){
            alert("Incorrectly formatted input");
            return;
        }
        details[0] = details[0].trim();
        details[1] = details[1].trim();
        if(details[1].length!==6){
            alert("Incorrectly formatted input");
            return;
        }
        contact_list.add(details[1], details[0]);
        info.innerHTML += details + " added to contact list<br>";
        contact_info.value = "";
    };

    del.onclick = function () {
        let details = delete_info.value.trim();
        if(details.length!==6){
            alert("Incorrectly formatted input");
            return;
        }
        contact_list.del(details);
        info.innerHTML += details + " deleted from contact list<br>";
        delete_info.value = "";
    };

    let autocomplete = (inp) => {

        /*the autocomplete function takes two arguments,
         the text field element and an array of possible autocompleted values:*/

        let currentFocus;
        inp.input = ""; // creating input on inp

        /*execute a function when someone writes in the text field:*/
        inp.addEventListener("input", function (e) {
            let a, //OUTER html: variable for listed content with html-content
                val = this.value;

            /*close any already open lists of autocompleted values*/
            closeAllLists();

            if( val.length>=7 )
                return;

            currentFocus = -1;

            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");

            a.setAttribute("id", this.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items list-group text-left");

            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);

            let arr = [];
            if(val.length === this.input.length){
                arr = contact_list.findNext(-2);
            } else if(val.length < this.input.length){
                this.input = val;
                arr = contact_list.findNext(-1);
            } else{
                this.input = val;
                arr = contact_list.findNext(this.input[this.input.length-1]);
            }

            /*for each item in the array...*/
            for (let i = 0; i < Math.min(arr.length,6) ; i++) {
                let item = contact_item.cloneNode(true);
                // Setting name, message, image to template item
                item.querySelector('#Name').innerText = arr[i].name;
                item.querySelector('#Number').innerHTML = "<strong>" + arr[i].number.substr(0, val.length) +
                                                            "</strong>" + arr[i].number.substr(val.length);
                item.number = arr[i].number;

                /*execute a function when someone clicks on the item value (DIV element):*/
                item.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = "";
                    /*close the list of autocompleted values,
                     (or any other open lists of autocompleted values:*/
                    closeAllLists();
                    alert("Calling "+item.number);
                });
                a.appendChild(item);
            }
        });

        /*execute a function presses a key on the keyboard:*/
        inp.addEventListener("keydown", function (e) {
            let x = document.getElementById(this.id + "autocomplete-list");
            if (x) x = x.getElementsByTagName("div");
            if (e.keyCode === 40) {
                /*If the arrow DOWN key is pressed,
                 increase the currentFocus variable:*/
                currentFocus++;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode === 38) {
                //up
                /*If the arrow UP key is pressed,
                 decrease the currentFocus variable:*/
                currentFocus--;
                /*and and make the current item more visible:*/
                addActive(x);
            } else if (e.keyCode === 13) {
                /*If the ENTER key is pressed, prevent the form from being submitted,*/
                e.preventDefault();
                if (currentFocus > -1) {
                    /*and simulate a click on the "active" item:*/
                    if (x) x[currentFocus*2].click();
                }
            }
        });

        let addActive = (x) => {
            /*a function to classify an item as "active":*/
            if (!x) return false;
            /*start by removing the "active" class on all items:*/
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = x.length - 1;
            /*add class "autocomplete-active":*/
            x[currentFocus*2].classList.add("active");
        };

        let removeActive = (x) => {
            /*a function to remove the "active" class from all autocomplete items:*/
            for (let i = 0; i < x.length; i++) {
                x[i].classList.remove("active");
            }
        };

        let closeAllLists = (elmnt) => {
            /*close all autocomplete lists in the document,
             except the one passed as an argument:*/
            const x = document.getElementsByClassName("autocomplete-items");
            for (let i = 0; i < x.length; i++) {
                if (elmnt !== x[i] && elmnt !== inp) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        };

        /*execute a function when someone clicks in the document:*/
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });

    };

    /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
    autocomplete(document.getElementById("myInput"));
};