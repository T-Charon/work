var WEEK_DATE_COUNT = 7;
// 定义可用的日期数组
const USE_DATES = ['2024-12-5', '2024-12-6', '2024-12-7','2024-12-9', '2024-12-10'];

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1); 
  const day = String(date.getDate());
  return `${year}-${month}-${day}`;
}

function getDateOfMonth(year, month) {
  var dateInstance = new Date(year, month, 0);
  var dateCount = dateInstance.getDate();
  return dateCount;
}
//上个月需要多少天
function getDateOfMonthFirstDate(year, month) {
  var dateInstance = new Date(year, month - 1, 1);
  var day = dateInstance.getDay();
  return day;
}

//创建日期单元格文档片段的方法
function createDateCellFragment(start, end, year, month) {
  var fragment = document.createDocumentFragment(); //创建文档碎片
  for (var i = start; i <= end; i++) {
    var calendarDateElement = document.createElement("div");
    calendarDateElement.classList.add("calendar-date_base"); //给创建的日期单元格增加单独的样式
    calendarDateElement.innerText = i;
    calendarDateElement.calendarInfo = `${year}-${month + 1}-${i}`

    var currentValue = calendarDateElement.calendarInfo;
    if(currentValue === formatDate(date)){
      calendarDateElement.classList.add('calendar-date_base_now_date_style');
    }else if (!USE_DATES.includes(currentValue)) {
      calendarDateElement.classList.add('disabled');
    }else{
      calendarDateElement.classList.add('calendar-date_base_canClick')
    }
    fragment.appendChild(calendarDateElement);

  }
  return fragment;
}

function changeYearAndMonth(newYear, newMonth, bodyEle) {
  var value = document.querySelector(".calendar_bar_date");
  value.innerText = `${newYear}年${newMonth}月`;
  bodyEle.style.setProperty("--month", `"${newMonth}"`);
}

function createCalendar(year, month) {
  // 一次性插入的节点流
  var mainFragment = document.createDocumentFragment();
  var mainBody = document.querySelector(".calendar_body");
  // 修改显示的年月日
  changeYearAndMonth(year, month, mainBody);

  //当前月份天数
  var currentMonthDateCount = getDateOfMonth(year, month);
  //上一月份天数
  var prevMonthDateCount = getDateOfMonth(year, month - 1);

  //上个月需要补多少天
  var dayOfCurrentMonthFirstDate = getDateOfMonthFirstDate(year, month);
  var prevMonthDatePadding = dayOfCurrentMonthFirstDate;

  //下个月需要补多少天
  var nextMonthDatePadding =
    WEEK_DATE_COUNT -
    ((prevMonthDatePadding + currentMonthDateCount) % WEEK_DATE_COUNT);
  if (nextMonthDatePadding === 7) {
    nextMonthDatePadding = 0;
  }
  //创建1号前，需要补的日期单元格
  var prevMonthDatePaddingFragment = createDateCellFragment(
    prevMonthDateCount - prevMonthDatePadding + 1,
    prevMonthDateCount,
    year,
    month - 1
  );
  //创建当前月份需要补的日期单元格
  var currentMonthDateFragment = createDateCellFragment(
    1,
    currentMonthDateCount,
    year,
    month - 1
  );
  //创建下个月需要补的日期单元格
  var nextMonthDatePaddingFragment = createDateCellFragment(
    1,
    nextMonthDatePadding,
    year,
    month
  );

  mainFragment.appendChild(prevMonthDatePaddingFragment);
  mainFragment.appendChild(currentMonthDateFragment);
  mainFragment.appendChild(nextMonthDatePaddingFragment);
  mainBody.innerHTML = "";
  mainBody.appendChild(mainFragment);
}
