class Modal {
  constructor() {
    this.modal = document.getElementById("modal");
    modal.querySelector("button").addEventListener("click", this.closeModal);
    this.observers = [];
  }

  addObserver = (observer) => {
    this.observers = [...this.observers, observer];
  };

  closeModal = () => {
    this.modal.style.display = "none";
    this.observers.forEach((observer) => {
      observer.hide();
    });
  };

  openModal = () => {
    this.modal.style.display = "flex";
  };
}

export default Modal;