class Calendar {
  constructor(state, description) {
    this.now = new Date();
    this.day = this.now.getDate();
    this.month = this.now.getMonth();
    this.year = this.now.getFullYear();
    this.eventListeners = [];
    this.state = state;
    this.template = document.getElementById("calendar");
    this.elementTemplate = document.getElementById("calendar_element");
    this.description = description;
    this.calendarTitle = document.querySelector(".calendar__title");
    this.changeTitle();
    document
      .querySelector(".calendar__button-prev")
      .addEventListener("click", this.previousMonth);
    document
      .querySelector(".calendar__button-next")
      .addEventListener("click", this.nextMonth);
    this.table = document.querySelector("table");
    this.createCalendarTable();
  }

  createDateText = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[this.month] + " " + this.year;
  };

  previousMonth = (e) => {
    this.month--;
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    }
    this.createCalendarTable();
    this.changeTitle();
  };

  nextMonth = (e) => {
    this.month++;
    if (this.month > 11) {
      this.month = 0;
      this.year++;
    }
    this.createCalendarTable();
    this.changeTitle();
  };

  changeTitle = () => {
    this.calendarTitle.innerHTML = this.createDateText();
  };

  clickHandler = (id) => {
    console.log(id);
    this.description.showObject(this.state[id][0]);
  };

  removeEventListeners = () => {
    this.eventListeners.forEach((item) => {
      item.removeEventListeners("click", () => {
        this.clickHandler(id);
      });
    });
    this.eventListeners = [];
  };

  createCalendarTable() {
    this.removeEventListeners();
    this.table.innerHTML = "";

    let tr = document.createElement("tr");
    tr.classList.add("calendar-table-days");
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    days.forEach((day) => {
      const th = document.createElement("th");
      th.innerHTML = day;
      th.classList.add("calendar_day");
      tr.appendChild(th);
    });
    this.table.appendChild(tr);

    const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

    const tempDate = new Date(this.year, this.month, 1);
    let firstMonthDay = tempDate.getDay();

    if (firstMonthDay === 0) {
      firstMonthDay = 7;
    }

    const j = daysInMonth + firstMonthDay - 1;

    if (firstMonthDay - 1 !== 0) {
      tr = document.createElement("tr");
      tr.classList.add("calendar-table-days");
      this.table.appendChild(tr);
    }

    for (let i = 0; i < firstMonthDay - 1; i++) {
      const td = this.elementTemplate.content.cloneNode(true);
      td.querySelector("td").classList.add("calendar-table-days-empty");
      tr.appendChild(td);
    }

    for (let i = firstMonthDay - 1; i < j; i++) {
      if (i % 7 === 0) {
        tr = document.createElement("tr");
        tr.classList.add("calendar-table-days");
        this.table.appendChild(tr);
      }
      let month = `${this.month + 1}`;
      let day = `${i - firstMonthDay + 2}`;

      if (month < 10) {
        month = "0" + month;
      }

      if (day < 10) {
        day = "0" + day;
      }

      let id = `${month}-${day}`;

      let clone = this.elementTemplate.content.cloneNode(true);
      clone.querySelector("td").setAttribute("id", id);
      clone.querySelector(".calendar_element__day").innerHTML =
        i - firstMonthDay + 2;

      if (this.state && this.state[id]) {
        clone.querySelector(".calendar_element__name").innerHTML =
          this.state[id][0].name;
        clone.querySelector(".calendar_element__age").innerHTML = `age: ${
          this.year - this.state[id][0].date.split("-")[0]
        }`;
        clone.querySelector(".calendar_element__email").innerHTML =
          this.state[id][0].email;
        clone.querySelector("img").setAttribute("src", this.state[id][0].url);
        let td = clone.querySelector("td");
        td.addEventListener("click", () => {
          this.clickHandler(id);
        });
        this.eventListeners.push(td);
      }

      tr.appendChild(clone);
    }
    const lenght = tr.querySelectorAll("td").length;
    for (let i = 0; i < 7 - lenght; i++) {
      const td = this.elementTemplate.content.cloneNode(true);
      td.querySelector("td").classList.add("calendar-table-days-empty");
      tr.appendChild(td);
    }

    this.table.appendChild(tr);
  }

  update = (state) => {
    this.state = state;
    this.createCalendarTable();
  };
}

export default Calendar;
