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
    const keys = Object.keys(state);
    keys.forEach((key) => {
      for (let i = 0; i < state[key].length; i++) {
        const clone = this.elementTemplate.content.cloneNode(true);
        clone
          .querySelector(".birthdaylist__edit")
          .setAttribute("id", `edit_${key}.${i}`);
        clone
          .querySelector(".birthdaylist__remove")
          .setAttribute("id", `remove_${key}.${i}`);
        clone.querySelector(".birthdaylist__name").innerHTML =
          state[key][i].name;
        clone.querySelector(".birthdaylist__date").innerHTML =
          state[key][i].date;
        clone.querySelector("img").setAttribute("src", state[key][i].photo);
        clone.querySelector(".birthdaylist__email").innerHTML =
          state[key][i].email;
        this.root.appendChild(clone);
      }
    });
  }
}

export default ListOfBirthDays;
