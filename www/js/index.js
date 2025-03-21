
import { getState, dispatch } from './state/store.js';
import TarotInterpreter from './UI/TarotInterpreter.js';
import CardPicker from './UI/CardPicker.js';

customElements.define('tarot-interpreter', TarotInterpreter);
customElements.define('card-picker', CardPicker);

window.getState = getState;
window.dispatch = dispatch;