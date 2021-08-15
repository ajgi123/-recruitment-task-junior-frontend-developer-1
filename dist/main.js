(()=>{"use strict";const e=class{constructor(){this.modal=document.getElementById("modal"),modal.querySelector("button").addEventListener("click",this.closeModal),this.observers=[]}addObserver=e=>{this.observers=[...this.observers,e]};closeModal=()=>{this.modal.style.display="none",this.observers.forEach((e=>{e.hide()}))};openModal=()=>{this.modal.style.display="flex"}};new class{constructor(){const t=new class{constructor(e){this.title=e}update=e=>{localStorage.setItem(this.title,JSON.stringify(e))};getItem=()=>JSON.parse(localStorage.getItem(this.title))}("state"),s=t.getItem()||{},i=new class{constructor(e){this.state=e||{},this.observers=[]}addObserver=e=>{this.observers=[...this.observers,e]};removeObserver=e=>{this.observers=this.observers.filter((t=>t!==e))};updateObservers=()=>{this.observers.forEach((e=>{e.update(this.state)}))};addItem=e=>{const t=e.date.slice(5);this.state[t]?this.state[t]=[...this.state[t],e]:this.state[t]=[e],this.updateObservers()};getKeyAndIndexFromId=e=>{const t=e.split(".");return{key:t[0],index:+t[1]}};getElementFromId=e=>{const{key:t,index:s}=this.getKeyAndIndexFromId(e);return this.state[t][s]};removeItem=(e,t=!1)=>{const{key:s,index:i}=this.getKeyAndIndexFromId(e);this.state[s].length<=1?delete this.state[s]:this.state[s].splice(i,1),t||this.updateObservers()};updateItem=(e,t)=>{const s={...this.getElementFromId(e),...t};this.removeItem(e,!0),this.addItem(s)}}(s),n=new e,a=new class{constructor(e,t,s){this.form=document.getElementById("form"),this.state=s,this.index=!1,this.modal=e,this.date=document.getElementById("date"),this.photo=document.getElementById("photo"),this.button=document.querySelector(".form__button"),this.date.setAttribute("max",t),this.form.addEventListener("submit",this.submitHandler)}fetchData=async e=>{try{const t=await fetch(`https://api.nasa.gov/planetary/apod?date=${e}&api_key=qA2AfhD777YC902ujb9PDdj7Udf1Nb8zQOB4EApm`);if(!t.ok)throw new Error(`Http error: ${t.status}`);return await t.json()}catch(e){throw new Error(e)}};setInputsValues(e){Object.keys(e).forEach((t=>{let s=document.getElementById(t);if(s){if("photo"===t)return void s.removeAttribute("required");s.value=e[t]}console.log(t,document.getElementById(t))}))}hide=()=>{this.photo.setAttribute("required",""),this.form.style.display="none"};showForm=()=>{this.form.style.display="flex",this.modal.openModal()};setIndex(e){this.index=e}submitHandler=e=>{e.preventDefault(),this.button.innerHTML="Loading...",this.button.disabled=!0;const t=e.target.querySelectorAll("input");let s={};const i=this.date.value.split("-"),n=`2020-${i[1]}-${i[2]}`;this.fetchData(n).then((e=>{const{explanation:t,hdurl:i,url:n,title:a}=e;s={...s,explanation:t,hdurl:i,url:n,title:a}})).catch((e=>(alert("Something went wrong! Please try again later. More info in console."),console.log(e),e))).then((e=>{e||(t.forEach((e=>{("photo"!==e.id||e.files[0])&&(s="photo"===e.id?{...s,[e.id]:URL.createObjectURL(e.files[0])}:{...s,[e.id]:e.value},e.value="")})),this.index?(this.state.updateItem(this.index,s),this.index=!1):this.state.addItem(s),this.modal.closeModal())})).finally((()=>{this.button.innerHTML="Submit",this.button.disabled=!1}))}}(n,this.getTodayDate(),i),r=new class{constructor(e){this.div=document.getElementById("description"),this.title=document.querySelector(".description__title"),this.image=document.querySelector(".description__image"),this.text=document.querySelector(".description__text"),this.modal=e}showObject=e=>{this.title.innerHTML=e.title,this.image.setAttribute("src",e.hdurl),this.text.innerHTML=e.explanation,this.div.style.display="flex",this.modal.openModal()};hide=()=>{this.div.style.display="none"}}(n),o=new class{constructor(e,t){this.now=new Date,this.day=this.now.getDate(),this.month=this.now.getMonth(),this.year=this.now.getFullYear(),this.eventListeners=[],this.state=e,this.template=document.getElementById("calendar"),this.elementTemplate=document.getElementById("calendar_element"),this.description=t,this.calendarTitle=document.querySelector(".calendar__title"),this.changeTitle(),document.querySelector(".calendar__button-prev").addEventListener("click",this.previousMonth),document.querySelector(".calendar__button-next").addEventListener("click",this.nextMonth),this.table=document.querySelector("table"),this.createCalendarTable()}createDateText=()=>["January","February","March","April","May","June","July","August","September","October","November","December"][this.month]+" "+this.year;previousMonth=e=>{this.month--,this.month<0&&(this.month=11,this.year--),this.createCalendarTable(),this.changeTitle()};nextMonth=e=>{this.month++,this.month>11&&(this.month=0,this.year++),this.createCalendarTable(),this.changeTitle()};changeTitle=()=>{this.calendarTitle.innerHTML=this.createDateText()};clickHandler=e=>{console.log(e),this.description.showObject(this.state[e][0])};removeEventListeners=()=>{this.eventListeners.forEach((e=>{e.removeEventListener("click",(()=>{this.clickHandler(id)}))})),this.eventListeners=[]};createCalendarTable(){this.removeEventListeners(),this.table.innerHTML="";let e=document.createElement("tr");e.classList.add("calendar-table-days"),["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach((t=>{const s=document.createElement("th");s.innerHTML=t,s.classList.add("calendar_day"),e.appendChild(s)})),this.table.appendChild(e);const t=new Date(this.year,this.month+1,0).getDate();let s=new Date(this.year,this.month,1).getDay();0===s&&(s=7);const i=t+s-1;s-1!=0&&(e=document.createElement("tr"),e.classList.add("calendar-table-days"),this.table.appendChild(e));for(let t=0;t<s-1;t++){const t=this.elementTemplate.content.cloneNode(!0);t.querySelector("td").classList.add("calendar-table-days-empty"),e.appendChild(t)}for(let t=s-1;t<i;t++){t%7==0&&(e=document.createElement("tr"),e.classList.add("calendar-table-days"),this.table.appendChild(e));let i=`${this.month+1}`,n=""+(t-s+2);i<10&&(i="0"+i),n<10&&(n="0"+n);let a=`${i}-${n}`,r=this.elementTemplate.content.cloneNode(!0);if(r.querySelector("td").setAttribute("id",a),r.querySelector(".calendar_element__day").innerHTML=t-s+2,this.state&&this.state[a]){r.querySelector(".calendar_element__name").innerHTML=this.state[a][0].name,r.querySelector(".calendar_element__age").innerHTML="age: "+(this.year-this.state[a][0].date.split("-")[0]),r.querySelector(".calendar_element__email").innerHTML=this.state[a][0].email,r.querySelector("img").setAttribute("src",this.state[a][0].url);let e=r.querySelector("td");e.addEventListener("click",(()=>{this.clickHandler(a)})),this.eventListeners.push(e)}e.appendChild(r)}const n=e.querySelectorAll("td").length;for(let t=0;t<7-n;t++){const t=this.elementTemplate.content.cloneNode(!0);t.querySelector("td").classList.add("calendar-table-days-empty"),e.appendChild(t)}this.table.appendChild(e)}update=e=>{this.state=e,this.createCalendarTable()}}(i.state,r),l=new class{constructor(e,t){this.elementTemplate=document.getElementById("birtdaylist__element"),this.root=document.getElementById("birthdaylist"),this.state=e,this.form=t,root.addEventListener("click",this.clickHandler),this.update(e.state)}clickHandler=e=>{console.log(e.target.id);const[t,s]=e.target.id.split("_");if("remove"===t&&this.state.removeItem(s),"edit"===t){const e=this.state.getElementFromId(s);this.form.setIndex(s),this.form.showForm(),this.form.setInputsValues(e)}};update(e){this.root.innerHTML="",Object.keys(e).forEach((t=>{for(let s=0;s<e[t].length;s++){const i=this.elementTemplate.content.cloneNode(!0);i.querySelector(".birthdaylist__edit").setAttribute("id",`edit_${t}.${s}`),i.querySelector(".birthdaylist__remove").setAttribute("id",`remove_${t}.${s}`),Object.keys(e[t][s]).forEach((n=>{const a=i.querySelector(`.birthdaylist__${n}`);a&&("photo"!==n?a.innerHTML=e[t][s][n]:a.setAttribute("src",e[t][s].photo))})),this.root.appendChild(i)}}))}}(i,a);i.addObserver(l),i.addObserver(o),i.addObserver(t),n.addObserver(a),n.addObserver(r),document.getElementById("addnew").addEventListener("click",a.showForm.bind(this))}getTodayDate=()=>{let e=new Date,t=e.getDate(),s=e.getMonth()+1;const i=e.getFullYear();return t<10&&(t="0"+t),s<10&&(s="0"+s),e=i+"-"+s+"-"+t,e}}})();