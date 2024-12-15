var WEEK_DATE_COUNT = 7;

/**
 * 格式化日期时间
 * 将给定的日期对象转换为指定格式的字符串
 * @param {Date} date - 日期对象，用于获取年月日信息
 * @returns {string} - 格式化后的日期字符串，格式为YYYY-MM-DD
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1); 
  const day = String(date.getDate());
  return `${year}-${month}-${day}`;
}

/**
 * 获取指定年份和月份的天数
 * 
 * @param {number} year - 指定的年份，例如2023
 * @param {number} month - 指定的月份，月份是从0开始的，所以1月是0，12月是11
 * @returns {number} 返回指定月份的天数
 */
function getDateOfMonth(year, month) {
  var dateInstance = new Date(year, month, 0);
  var dateCount = dateInstance.getDate();
  return dateCount;
}
/**
 * 获取指定年份和月份的第一天是星期几
 * 返回值为0至6的整数，分别代表星期日到星期六
 * 
 * @param {number} year - 指定的年份，例如2023
 * @param {number} month - 指定的月份，1至12代表一月到十二月
 * @returns {number} - 0为星期日，1为星期一
 */
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
    }
    if (!USE_DATES.includes(currentValue)) {
      calendarDateElement.classList.add('disabled');
    }else{
      calendarDateElement.classList.add('calendar-date_base_canClick')
    }
    fragment.appendChild(calendarDateElement);
  }
  return fragment;
}

// 修改日历的年份跟月份
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
