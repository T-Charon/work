// 初始化
var date = new Date();
var month = date.getMonth() + 1;
var year = date.getFullYear();
createCalendar(year, month);

document.body.addEventListener("click", function (e) {
  if (e.target.className === "calendar_bar_check_pre") {
    month -= 1;
    if (month === 0) {
      month = 12;
      year--;
    }
  }
  if (e.target.className === "calendar_bar_check_next") {
    month += 1;
    if (month === 13) {
      month = 1;
      year++;
    }
  }

  createCalendar(year, month);

  if(e.target.className === "calendar-date_base calendar-date_base_canClick"){
    console.log(e)
    window.location.href= `./work${e.target.calendarInfo}/index.html`
  }
});




