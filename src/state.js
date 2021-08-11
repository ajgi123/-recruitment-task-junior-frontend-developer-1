class State {
  constructor(initialState) {
    this.state = initialState || {};
    this.observers = [];
  }

  addObserver = (observer) => {
    this.observers = [...this.observers, observer];
  };

  removeObserver = (observer) => {
    this.observers = this.observers.filter((item) => {
      return item !== observer;
    });
  };

  updateObservers = () => {
    this.observers.forEach((observer) => {
      observer.update(this.state);
    });
  };

  addItem = (item) => {
    const key = item.date.slice(5);
    if (this.state[key]) {
      this.state[key] = [...this.state[key], item];
    } else {
      this.state[key] = [item];
    }
    this.updateObservers();
  };

  getKeyAndIndexFromId = (id) => {
    const keyIndexArr = id.split(".");
    return { key: keyIndexArr[0], index: +keyIndexArr[1] };
  };

  getElementFromId = (id) => {
    const { key, index } = this.getKeyAndIndexFromId(id);
    return this.state[key][index];
  };

  removeItem = (id) => {
    const { key, index } = this.getKeyAndIndexFromId(id);
    if (this.state[key].length <= 1) {
      delete this.state[key];
    } else {
      this.state[key].splice(index, 1);
    }
    this.updateObservers();
  };

  updateItem = (id, item) => {
    const newItem = { ...this.getElementFromId(id), ...item };
    this.removeItem(id);
    this.addItem(newItem);
    this.updateObservers();
  };
}

export default State;
