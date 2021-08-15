class ListOfBirthDays {
  constructor(state, form) {
    this.elementTemplate = document.getElementById("birtdaylist__element");
    this.root = document.getElementById("birthdaylist");
    this.state = state;
    this.form = form;
    root.addEventListener("click", this.clickHandler);
    this.update(state.state);
  }

  clickHandler = (event) => {
    console.log(event.target.id);
    const [method, id] = event.target.id.split("_");
    if (method === "remove") {
      this.state.removeItem(id);
    }

    if (method === "edit") {
      const inputValues = this.state.getElementFromId(id);
      this.form.setIndex(id);
      this.form.showForm();
      this.form.setInputsValues(inputValues);
    }
  };

  update(state) {
    this.root.innerHTML = "";
    const stateKeys = Object.keys(state);
    stateKeys.forEach((key) => {
      for (let i = 0; i < state[key].length; i++) {
        const clone = this.elementTemplate.content.cloneNode(true);
        clone
          .querySelector(".birthdaylist__edit")
          .setAttribute("id", `edit_${key}.${i}`);
        clone
          .querySelector(".birthdaylist__remove")
          .setAttribute("id", `remove_${key}.${i}`);
        const objectKeys = Object.keys(state[key][i]);
        objectKeys.forEach((objkey) => {
          const htmlObj = clone.querySelector(`.birthdaylist__${objkey}`);
          if (!htmlObj) return;

          if (objkey === "photo") {
            htmlObj.setAttribute("src", state[key][i].photo);
            return;
          }
          htmlObj.innerHTML = state[key][i][objkey];
        });
        this.root.appendChild(clone);
      }
    });
  }
}

export default ListOfBirthDays;
