
import { getState, dispatch, subscribe } from '../state/store.js';

const baseHTML = ({ cardName, question, reading }) => {
    const divination = reading == "" ? `<span></span>` :
        `<div style="padding:20px; text-align: center; font-size: large"
        >${reading}</div>`;
    return `
        <div style="padding: 5px">
                <textarea id="questionTextArea" name="question" rows="4"
                    style="width:100%;font-size:20px"
                    placeholder="Enter your question... 🔮"
                >${question}</textarea>
                <br><br>
                <card-picker></card-picker>
                <div style="display: flex; justify-content: center">
                    <button style="font-size: 20px; width: 50%"
                        onclick="closest('tarot-interpreter').interpret()"
                    >Interpret</button>
                </div>
            ${divination}
        </div>
    `;
}

export default class TarotInterpreter extends HTMLElement {

    connectedCallback() {
        dispatch({ question: "", cardName: "", reading: "" });
        this.render();
    }

    render() {
        this.innerHTML = baseHTML(getState());
    }

    inputQuestion() {
        dispatch({ question });
    }

    interpret() {
        const { cardName } = getState();
        const textarea = this.querySelector('#questionTextarea');
        const question = textarea.value;

        let loadingEmojis = ["🌑"," 🌒", " 🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
        let loadingIndex = 0;
        let loadInterval = setInterval(() => {
          dispatch({reading: loadingEmojis[loadingIndex]});
          loadingIndex = (loadingIndex + 1) % loadingEmojis.length;
          this.render();
        }, 200);

        // Send the POST request with fetch API or your preferred method
        fetch("/tarot/reading", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question, cardName })
        }).then(res => {
            if (!res.ok) throw new Error('Network response was not ok.');
            return res.json();
        }).then(({ reading }) => {
            dispatch({ reading, question });
            clearInterval(loadInterval);
            this.render(); // Re-render to show the reading result
        }).catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }
}
