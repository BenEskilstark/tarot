import { getState, dispatch, subscribe } from '../state/store.js';
import { oneOf } from '../utils/stochastic.js';

const suits = ["Wands", "Cups", "Swords", "Pentacles"];
const minors = [
    "Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
    "Page", "Queen", "Knight", "King",
];

let tarotCards = [
    "The Fool", "The Magician", "The High Priestess", "The Empress",
    "The Emperor", "The Hierophant", "The Lovers", "The Chariot",
    "Strength", "The Hermit", "The Wheel of Fortune", "Justice",
    "The Hanged Man", "Death", "Temperance", "The Devil", "The Tower",
    "The Star", "The Moon", "The Sun", "Judgement", "The World",
    ...minors.map(card => `${card} of ${suits[0]}`),
    ...minors.map(card => `${card} of ${suits[1]}`),
    ...minors.map(card => `${card} of ${suits[2]}`),
    ...minors.map(card => `${card} of ${suits[3]}`),
];

tarotCards = [
    ...tarotCards,
    ...tarotCards.map(t => t + " Reversed"),
];

const baseHTML = () => {
    return `
        <div>
            <div style="padding-bottom: 5px">Select a Card: 🃏</div>
            <button onclick="closest('card-picker').randomCard()">Random Card</button>
            <select name="deck" id="deck">
                ${tarotCards.map(t => `<option value="${t}">${t}</option>`)}
            </select>
            <br><br>
        </div>
    `;
}

export default class CardPicker extends HTMLElement {
    connectedCallback() {
        this.render();
        this.setSelector();
    }

    render() {
        this.innerHTML = baseHTML(getState());
    }

    setSelector() {
        const selHTML = document.getElementById("deck");
        if (!selHTML) return;
        selHTML.value = getState().cardName;
        selHTML.onchange = () => {
            dispatch({ cardName: selHTML.value });
        }
    }

    randomCard() {
        dispatch({ cardName: oneOf(tarotCards) });
        this.setSelector();
    }
}