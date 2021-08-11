class LocalStorage {
    constructor(title) {
        this.title = title;
    }

    update = (object) => {
        localStorage.setItem(this.title, JSON.stringify(object));
    }

    getItem = () => {
        return JSON.parse(localStorage.getItem(this.title));
    }
}

export default LocalStorage;