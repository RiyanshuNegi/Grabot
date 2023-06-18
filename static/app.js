class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            cancelButton: document.querySelector('.chatbox__cancel'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            speechButton: document.querySelector('.mic_btn'),
            
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {cancelButton,  openButton,  chatBox, sendButton, speechButton } = this.args;

        console.log("got yuy")
        openButton.addEventListener('click', () => this.toggleState(chatBox))
        cancelButton.addEventListener('click', () => this.toggleState(chatBox))
        sendButton.addEventListener('click', () => this.onSendButton(chatBox))
        
        speechButton.addEventListener('click', () => this.speechs(chatBox))
        
        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }
    // speech recognition 
    
    speechs(chatbox) {
        const ani = document.getElementById("animation");
        ani.classList.add("animation-outer")
        ani.classList.remove("anim")
        
        
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        const recognition = new SpeechRecognition();
        
        recognition.onresult = function (event) {
            var text = event.results[0][0].transcript;
            text = text.slice(0, text.length - 1);
            console.log(text);
            document.getElementById('inp').value = text;
            ani.classList.add("anim")
            ani.classList.remove("animation-outer")
            
        }

        recognition.start();

        
    }

    toggleState(chatbox) {
        this.state = !this.state;
        const chbutton = document.querySelector(".chatnow") 
        // show or hides the box
        if (this.state) {
                chatbox.classList.add('chatbox--active')
                chatbox.classList.add('cdf')
                chbutton.classList.add("chatnow__mt")
            } else {
                chatbox.classList.remove('chatbox--active')
                chbutton.classList.remove("chatnow__mt")
                }
            }
    read(text) {
            var speech = new SpeechSynthesisUtterance();
            speech.voice = window.speechSynthesis.getVoices()[4];
            speech.text = text;
            window.speechSynthesis.speak(speech);
        }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        // http://127.0.0.1:5000/predict
        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(r => r.json())
            .then(r => {
                let msg2 = { name: "grabot", message: r.answer };
                this.messages.push(msg2);
                this.updateChatText(chatbox)
                textField.value = ''
                // var spk = r.answer;
                // console.log(r.answer)
                this.read(r.answer);

            }).catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatbox)
                textField.value = ''
            });
    }
    
   
   

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function (item, index) {
            if (item.name === "grabot") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
                
            }
            else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();



