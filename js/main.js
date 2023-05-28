const sticky=document.querySelector(".main-header"), 
themeChange=document.querySelector(".theme_button"), 
allHTML=document.querySelector('html'), 
newIconTheme=document.querySelector(".theme_button span"), 
newAddDate=document.querySelector(".data-add"),
closeButton=document.querySelector(".form-close-button"), 
forComment=document.querySelector(".form-comment"), 
forPrice=document.querySelector(".input-price"), 
forForm=document.getElementById("forma"), 
frm=document.querySelector(".form-container"), 
mod_alert=document.querySelector(".modal-alert"),
goUpButton=document.querySelector(".go-up-btn"),
l=document.querySelectorAll(".prod"),
radio1=document.querySelector(".radio1"),
radio2=document.querySelector(".radio2"),
radio3=document.querySelector(".radio3"),
radio4=document.querySelector(".radio4"),
elem=document.getElementsByClassName('data-add'),
buttonDis=document.getElementsByClassName('buy-btn');
let popup=document.getElementById("popup");



const weeks=["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля",
"Авгуса", "Сентября", "Октября", "Ноября", "Декабря"];
let day, month, year, newDate, startDate, numDay, daysCount, weekNum, ready, scrollPosition=0;
let dates=["02.03.2023", "29.03.2023", "03.04.2023", "03.04.2023", "04.04.2023",
"12.04.2023", "18.04.2023", "20.04.2023", "29.04.2023", "01.05.2023",
"03.05.2023", "03.05.2023", "03.05.2023", "03.05.2023", "03.05.2023"]
//прослеживание скроллла
window.addEventListener("scroll", function(){
	sticky.classList.toggle("sticky", window.scrollY > 1025);
})

window.addEventListener("scroll", trackScroll);
//отображение кнопки "наверх"
function trackScroll(){
	const scrolled=window.pageYOffset;
	if(scrolled>1100){
		goUpButton.classList.add("go-up-btn--show");
	}
	else{
		goUpButton.classList.remove("go-up-btn--show");
	}
}
//темная тема
themeChange.addEventListener('click', (event)=>{
	if(localStorage.getItem('theme')==='dark'){
		localStorage.removeItem('theme');
	}
	else{
		localStorage.setItem('theme', 'dark');
	}
	darkTheme();
});
function darkTheme(){
		if(localStorage.getItem('theme')==='dark'){
			allHTML.classList.add('dark');
			newIconTheme.textContent='dark_mode';
		}
		else{
			allHTML.classList.remove('dark');
			newIconTheme.textContent='wb_sunny';
		}
}
darkTheme();
//отключение скролла при открытии модального окна
function disabledScroll(){
	scrollPosition=window.scrollY;
	document.body.style.cssText= `
		overflow: hidden;
		position: fixed;
		top: -${scrollPosition}px;
		left: 0;
		height: 100vh;
		width: 100vw;
		padding-right: ${window.innerWidth-document.body.offsetWidth}px;
		`;
		document.documentElement.style.scrollBehavior='unset';
}
//возвращение скролла, также возвращение на место, где была нажата кнопка
function enableScroll(){
	document.body.style.cssText='';
	document.documentElement.style.scrollBehavior='';
	window.scroll({top:scrollPosition});
}
//форма для оформления покупки
function openForm(){
	disabledScroll();
	forForm.style.display="block";
	for(let j=0;j<buttonDis.length;j++){
		buttonDis[j].disabled=true;
	}
}
//закрытие формы
function closeForm(){
		forForm.style.display="none";
		frm.reset();
		enableScroll();
		for(let j=0;j<buttonDis.length;j++){
			buttonDis[j].disabled=false;
		}
}
//функции для модального окна о покупке
function openPopup(){
	popup.classList.add("open-popup");
}
function closePopup(){
	closeForm();
	popup.classList.remove("open-popup");
}
//вывод даты загрузки на сайт
function getDayInfo(date){
	day=Number(date.slice(0, 2));
	month=Number(date.slice(3,5));
	year=Number(date.slice(6,10));
	newDate=new Date(year, month-1, day);
	startDate=new Date(newDate.getFullYear(),month-1,1);
	numDay=getWeekDayNumber(newDate.toString().split(" ")[0]);
	weekNum=1 + Math.round(((newDate.getTime() - startDate.getTime()) / (24*60*60*1000) - 3 + (startDate.getDay() + 6) % 7) / 7);
	ready=weeks[numDay]+", "+weekNum+" неделя "+months[month-1]+" "+year+" года.";
}
 for(var i=0;i<elem.length;i++){
		getDayInfo(dates[i]);
		elem[i].innerHTML=ready;
 }
function getWeekDayNumber(weekDay)
{
	var days={
		Mon:0,
		Tue:1,
		Wed:2,
		Thu:3,
		Fri:4,
		Sat:5,
		Sun:6
	};
	return days[weekDay];
}
//функции для увеличивания и уменьшения числа товаров
function Increase(a, b){
	var input=b.previousElementSibling;
	var value=parseInt(input.value, 10);
	value=isNaN(value)?0:value;
	value++;
	input.value=value;
}
function Reduce(a, b){
	var input=b.nextElementSibling;
	var value=parseInt(input.value, 10);
	if(value>1){
		value=isNaN(value)?0:value;
		value--;
		input.value=value;
		}
}

