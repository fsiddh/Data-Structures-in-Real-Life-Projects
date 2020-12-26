/**
 * Created by aarnavjindal on 07/04/20.
 */

export { ChatHandler, chat_names}

const chat_names = ["Prateek Bhaiya", "Arnav Bhaiya", "Munna Bhaiya", "Aarnav Jindal", "Shriya Chhabra", "Akul Jindal", "Abhinav Duggal"];
const chat_names_length = chat_names.length;
const chat_msg = ["Why didn't he come and talk to me himse...",
    "Perfect, I am really glad to hear that!...",
    "This is what I understand you're telling me..",
    "I’m sorry, I don’t have the info on that.."];
const chat_msg_length = chat_msg.length;
const chat_img_length = 7;

class ChatHandler{

    constructor(chat_template, chat_list){
        this.hashmap = new Map();
        this.linked_list = null;
        this.chat_template = chat_template;
        this.chat_list = chat_list;
        let clock = new Date();
        this.hours = clock.getHours();
        this.mins = clock.getMinutes();
    }

    getTime(){
        // Time Stamp creation for messages
        this.mins += 1;
        if(this.mins === 60){
            this.hours += 1;
            this.mins = 0;
        }

        if(this.hours === 24){
            this.hours = 0;
        }

        return ("0" + this.hours).slice(-2)+":"+("0" + this.mins).slice(-2);
    }

    createNode(id){
        // Creating node element
        let node = {};
        // Pointers to prev and next
        node['next'] = null;
        node['prev'] = null;
        // Create a copy of chat template
        let chat_item = this.chat_template.cloneNode(true);
        // Setting name, message, image to template item
        chat_item.querySelector('#Name').innerText = chat_names[id%chat_names_length];
        chat_item.querySelector('#Message').innerText = chat_msg[id%chat_msg_length];
        console.log("./images/avatar" + eval(1+(id%chat_img_length)) + ".png");
        chat_item.querySelector('#Image').src = "./images/avatar" + eval(1+(id%chat_img_length)) + ".png";
        node['chat_item'] = chat_item;
        return node;
    }

    newMsg(id){
        let node = null;
        if((id in this.hashmap ) === false){
            // If node not in linked list
            node = this.createNode(id);
            this.hashmap[id] = node;
        } else{
            // If node in linked list
            node = this.getNodeFromList(id);
        }

        if(this.linked_list === null){
            // Setting head of empty list
            this.linked_list = node;
        } else{
            // Adding node to head of linked list
            node['next'] = this.linked_list;
            if(this.linked_list!==null)
                this.linked_list['prev'] = node;
            this.linked_list = node;
        }
        this.updateList();
    }

    deleteMsg(id){
        let node = this.getNodeFromList(id);
        // No use of node since it has been deleted
        delete this.hashmap[id];
        // Clear entry from hashmap
        this.updateList();
    }

    getNodeFromList(id){
        let node = this.hashmap[id];
        let prevNode = node['prev'];
        let nextNode = node['next'];

        // Update prev and next node pointers
        if(prevNode!==null)
            prevNode['next'] = nextNode;
        if(nextNode!==null)
            nextNode['prev'] = prevNode;

        // Update head of the linked list
        if(node===this.linked_list){
            this.linked_list = nextNode;
        }
        node['next'] = null;
        node['prev'] = null;
        return node;
    }

    updateList(){
        // Update the contents of the chat list
        let innerHTML = '';
        let head = this.linked_list;
        while(head!==null){
            let element = head['chat_item'];
            if(head===this.linked_list){
                element.className = "ks-item ks-active";
                element.querySelector('#Time').innerText = this.getTime();
            } else{
                element.className = "ks-item";
            }
            innerHTML += element.outerHTML;
            head = head['next'];
        }
        this.chat_list.innerHTML = innerHTML;
    }

}