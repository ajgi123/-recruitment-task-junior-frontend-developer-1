class Description {
  constructor(modal) {
    this.div = document.getElementById("description");
    this.title = document.querySelector(".description__title");
    this.image = document.querySelector(".description__image");
    this.text = document.querySelector(".description__text");
    this.modal = modal;
  }

  showObject = (object) => {
    this.title.innerHTML = object.title;
    this.image.setAttribute("src", object.hdurl);
    this.text.innerHTML = object.explanation;
    this.div.style.display = "flex";
    this.modal.openModal();
  };

  hide = () => {
    this.div.style.display = "none";
  };
}

export default Description;
