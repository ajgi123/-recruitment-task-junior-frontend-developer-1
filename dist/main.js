(()=>{"use strict";const e=class{constructor(){this.modal=document.getElementById("modal"),modal.querySelector("button").addEventListener("click",this.closeModal),this.observers=[]}addObserver=e=>{this.observers=[...this.observers,e]};closeModal=()=>{this.modal.style.display="none",this.observers.forEach((e=>{e.hide()}))};openModal=()=>{this.modal.style.display="flex"}};new class{constructor(){const t=new class{constructor(e){this.title=e}update=e=>{localStorage.setItem(this.title,JSON.stringify(e))};getItem=()=>JSON.parse(localStorage.getItem(this.title))}("state"),s=t.getItem()||{},a=new class{constructor(e){this.state=e||{},this.observers=[]}addObserver=e=>{this.observers=[...this.observers,e]};removeObserver=e=>{this.observers=this.observers.filter((t=>t!==e))};updateObservers=()=>{this.observers.forEach((e=>{e.update(this.state)}))};addItem=e=>{const t=e.date.slice(5);this.state[t]?this.state[t]=[...this.state[t],e]:this.state[t]=[e],this.updateObservers()};getKeyAndIndexFromId=e=>{const t=e.split(".");return{key:t[0],index:+t[1]}};getElementFromId=e=>{const{key:t,index:s}=this.getKeyAndIndexFromId(e);return this.state[t][s]};removeItem=e=>{const{key:t,index:s}=this.getKeyAndIndexFromId(e);this.state[t].length<=1?delete this.state[t]:this.state[t].splice(s,1),this.updateObservers()};updateItem=(e,t)=>{const s={...this.getElementFromId(e),...t};this.removeItem(e),this.addItem(s),this.updateObservers()}}(s),i=new e,r=new class{constructor(e,t,s){this.form=document.getElementById("form"),this.state=s,this.index=!1,this.modal=e,this.date=document.getElementById("date"),this.date.setAttribute("max",t),this.form.addEventListener("submit",this.submitHandler)}fetchData=async e=>{try{const t=await fetch(`https://api.nasa.gov/planetary/apod?date=${e}&api_key=qA2AfhD777YC902ujb9PDdj7Udf1Nb8zQOB4EApm`);return await t.json()}catch(e){throw new Error(e)}};setInputsValues(e){Object.keys(e).forEach((t=>{let s=document.getElementById(t);if(s){if("photo"===t)return void s.removeAttribute("required");s.value=e[t]}console.log(t,document.getElementById(t))}))}hide=()=>{this.date.setAttribute("required",""),this.form.style.display="none"};showForm=()=>{this.form.style.display="flex",this.modal.openModal()};setIndex(e){this.index=e}submitHandler=e=>{e.preventDefault();const t=e.target.querySelectorAll("input");let s={};const a=this.date.value.split("-"),i=`2020-${a[1]}-${a[2]}`;this.fetchData(i).then((e=>{const{explanation:t,hdurl:a,url:i,title:r}=e;s={...s,explanation:t,hdurl:a,url:i,title:r}})).catch((e=>(alert("Something went wrong! Please try again later. More info in console."),console.log(e),e))).then((e=>{e||(t.forEach((e=>{s="photo"===e.id&&e.files[0]?{...s,[e.id]:URL.createObjectURL(e.files[0])}:{...s,[e.id]:e.value},e.value=""})),this.index?(this.state.updateItem(this.index,s),this.index=!1):this.state.addItem(s),this.modal.closeModal())}))}}(i,this.getTodayDate(),a),n=new class{constructor(e){this.div=document.getElementById("description"),this.title=document.querySelector(".description__title"),this.image=document.querySelector(".description__image"),this.text=document.querySelector(".description__text"),this.modal=e}showObject=e=>{this.title.innerHTML=e.title,this.image.setAttribute("src",e.hdurl),this.text.innerHTML=e.explanation,this.div.style.display="flex",this.modal.openModal()};hide=()=>{this.div.style.display="none"}}(i),l=new class{constructor(e,t){this.now=new Date,this.day=this.now.getDate(),this.month=this.now.getMonth(),this.year=this.now.getFullYear(),this.state=e,this.template=document.getElementById("calendar"),this.elementTemplate=document.getElementById("calendar_element"),this.description=t,this.calendarTitle=document.querySelector(".calendar__title"),this.changeTitle(),document.querySelector(".calendar__button-prev").addEventListener("click",this.previousMonth),document.querySelector(".calendar__button-next").addEventListener("click",this.nextMonth),this.table=document.querySelector("table"),this.createCalendarTable()}createDateText=()=>["January","February","March","April","May","June","July","August","September","October","November","December"][this.month]+" "+this.year;previousMonth=e=>{this.month--,this.month<0&&(this.month=11,this.year--),this.createCalendarTable(),this.changeTitle()};nextMonth=e=>{this.month++,this.month>11&&(this.month=0,this.year++),this.createCalendarTable(),this.changeTitle()};changeTitle=()=>{this.calendarTitle.innerHTML=this.createDateText()};clickHandler=e=>{console.log(e),this.description.showObject(this.state[e][0])};createCalendarTable(){this.table.innerHTML="";let e=document.createElement("tr");e.classList.add("calendar-table-days"),["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach((t=>{const s=document.createElement("th");s.innerHTML=t,s.classList.add("calendar_day"),e.appendChild(s)})),this.table.appendChild(e);const t=new Date(this.year,this.month+1,0).getDate();let s=new Date(this.year,this.month,1).getDay();0===s&&(s=7);const a=t+s-1;s-1!=0&&(e=document.createElement("tr"),e.classList.add("calendar-table-days"),this.table.appendChild(e));for(let t=0;t<s-1;t++){const t=this.elementTemplate.content.cloneNode(!0);t.querySelector("td").classList.add("calendar-table-days-empty"),e.appendChild(t)}for(let t=s-1;t<a;t++){t%7==0&&(e=document.createElement("tr"),e.classList.add("calendar-table-days"),this.table.appendChild(e));let a=`${this.month+1}`,i=""+(t-s+2);a<10&&(a="0"+a),i<10&&(i="0"+i);let r=`${a}-${i}`,n=this.elementTemplate.content.cloneNode(!0);n.querySelector("td").setAttribute("id",r),n.querySelector(".calendar_element__day").innerHTML=t-s+2,this.state&&this.state[r]&&(console.log(r),n.querySelector(".calendar_element__name").innerHTML=this.state[r][0].name,n.querySelector(".calendar_element__age").innerHTML="age: "+(this.year-this.state[r][0].date.split("-")[0]),n.querySelector(".calendar_element__email").innerHTML=this.state[r][0].email,n.querySelector("img").setAttribute("src",this.state[r][0].url),n.querySelector("td").addEventListener("click",(()=>{this.clickHandler(r)}))),e.appendChild(n)}const i=e.querySelectorAll("td").length;for(let t=0;t<7-i;t++){const t=this.elementTemplate.content.cloneNode(!0);t.querySelector("td").classList.add("calendar-table-days-empty"),e.appendChild(t)}this.table.appendChild(e)}update=e=>{this.state=e,this.createCalendarTable()}}(a.state,n),o=new class{constructor(e,t){this.elementTemplate=document.getElementById("birtdaylist__element"),this.root=document.getElementById("birthdaylist"),this.state=e,this.form=t,root.addEventListener("click",this.clickHandler),this.update(e.state)}clickHandler=e=>{console.log(e.target.id);const[t,s]=e.target.id.split("_");if("remove"===t&&this.state.removeItem(s),"edit"===t){const e=this.state.getElementFromId(s);this.form.setIndex(s),this.form.showForm(),this.form.setInputsValues(e)}};update(e){this.root.innerHTML="",Object.keys(e).forEach((t=>{for(let s=0;s<e[t].length;s++){const a=this.elementTemplate.content.cloneNode(!0);a.querySelector(".birthdaylist__edit").setAttribute("id",`edit_${t}.${s}`),a.querySelector(".birthdaylist__remove").setAttribute("id",`remove_${t}.${s}`),a.querySelector(".birthdaylist__name").innerHTML=e[t][s].name,a.querySelector(".birthdaylist__date").innerHTML=e[t][s].date,a.querySelector("img").setAttribute("src",e[t][s].photo),a.querySelector(".birthdaylist__email").innerHTML=e[t][s].email,this.root.appendChild(a)}}))}}(a,r);a.addObserver(o),a.addObserver(l),a.addObserver(t),i.addObserver(r),i.addObserver(n),document.getElementById("addnew").addEventListener("click",r.showForm.bind(this))}getTodayDate=()=>{let e=new Date,t=e.getDate(),s=e.getMonth()+1;const a=e.getFullYear();return t<10&&(t="0"+t),s<10&&(s="0"+s),e=a+"-"+s+"-"+t,e}}})();