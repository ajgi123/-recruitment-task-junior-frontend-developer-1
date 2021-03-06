class Form {
  constructor(modal, maxDate, state) {
    this.form = document.getElementById("form");
    this.state = state;
    this.index = false;
    this.modal = modal;
    this.date = document.getElementById("date");
    this.photo = document.getElementById("photo");
    this.button = document.querySelector(".form__button");
    this.date.setAttribute("max", maxDate);
    this.form.addEventListener("submit", this.submitHandler);
  }

  fetchData = async (date) => {
    try {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?date=${date}&api_key=qA2AfhD777YC902ujb9PDdj7Udf1Nb8zQOB4EApm`
      );
      if (!res.ok) {
        throw new Error(`Http error: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  };

  setInputsValues(values) {
    const keys = Object.keys(values);
    keys.forEach((key) => {
      let input = document.getElementById(key);
      if (input) {
        if (key === "photo") {
          input.removeAttribute("required");
          return;
        }
        input.value = values[key];
      }
      console.log(key, document.getElementById(key));
    });
  }

  hide = () => {
    this.photo.setAttribute("required", "");
    this.form.style.display = "none";
  };

  showForm = () => {
    this.form.style.display = "flex";
    this.modal.openModal();
  };

  setIndex(index) {
    this.index = index;
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.button.innerHTML = "Loading...";
    this.button.disabled = true;
    const inputs = event.target.querySelectorAll("input");
    let formValues = {};
    const splitDate = this.date.value.split("-");
    const date = `2020-${splitDate[1]}-${splitDate[2]}`;
    this.fetchData(date)
      .then((data) => {
        const { explanation, hdurl, url, title } = data;
        formValues = { ...formValues, explanation, hdurl, url, title };
      })
      .catch((err) => {
        alert(
          "Something went wrong! Please try again later. More info in console."
        );
        console.log(err);
        return err;
      })
      .then((err) => {
        if (err) return;
        inputs.forEach((input) => {
          if (input.id === "photo" && !input.files[0]) return;
          if (input.id === "photo") {
            formValues = {
              ...formValues,
              [input.id]: URL.createObjectURL(input.files[0]),
            };
          } else {
            formValues = { ...formValues, [input.id]: input.value };
          }
          input.value = "";
        });
        if (this.index) {
          this.state.updateItem(this.index, formValues);
          this.index = false;
        } else {
          this.state.addItem(formValues);
        }
        this.modal.closeModal();
      })
      .finally(() => {
        this.button.innerHTML = "Submit";
        this.button.disabled = false;
      });
  };
}
export default Form;
