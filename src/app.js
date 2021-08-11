import State from "./state";
import LocalStorage from "./localStorage";
import Calendar from "./calendar";
import Description from "./description";
import Form from "./form";
import ListOfBirthDays from "./listofbirthdays";
import Modal from "./modal";

class App {
  constructor() {
    const storage = new LocalStorage("state");
    const initialState = storage.getItem() || {};
    const state = new State(initialState);
    const modal = new Modal();
    const form = new Form(modal, this.getTodayDate(), state);
    const description = new Description(modal);
    const calendar = new Calendar(state.state, description);
    const listOfBirthDays = new ListOfBirthDays(state, form);
    state.addObserver(listOfBirthDays);
    state.addObserver(calendar);
    state.addObserver(storage);
    modal.addObserver(form);
    modal.addObserver(description);
    document.getElementById("addnew").addEventListener("click", form.showForm.bind(this));
  }

  getTodayDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };
}

export default App;
