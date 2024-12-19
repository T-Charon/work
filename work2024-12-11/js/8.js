(function (window, document) {
  var date = new Date();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var rootCalendar = document.querySelector(".calendar");

  var PREV_TYPE = "PREV";
  var CURRENT_TYPE = "CURRENT";
  var NEXT_TYPE = "NEXT";
  var CURRENT_TYPE = "CURRENT_TYPE";
  var WEEK_DATE_COUNT = 7;
  var visibe = false;
  var selected = null;

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
  function createDateCellFragment(start, end, type, year, month) {
    var fragment = document.createDocumentFragment(); //创建文档碎片
    for (var i = start; i <= end; i++) {
      var calendarDateElement = document.createElement("div");
      calendarDateElement.classList.add("calendar-date_base"); //给创建的日期单元格增加单独的样式
      calendarDateElement.innerText = i;

      //分情况给上月当月下月的日期单独添加样式
      switch (type) {
        case PREV_TYPE:
          calendarDateElement.classList.add("calendar-date_disable");
          break;
        case NEXT_TYPE:
          calendarDateElement.classList.add("calendar-date_disable");
          break;
        case CURRENT_TYPE:
          calendarDateElement.calendarInfo = {
            calendarYear: year,
            calendarMonth: month + 1,
            day: i,
          };
          highlightDay(calendarDateElement);
          break;
        default:
          break;
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

  function highlightDay(ele) {
    var currDate = new Date();
    if (
      ele.calendarInfo.calendarYear === currDate.getFullYear() &&
      ele.calendarInfo.calendarMonth === currDate.getMonth() + 1 &&
      ele.calendarInfo.day === date.getDate()
    ) {
      ele.classList.add("calendar-date_base_now_date_style");
    }
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
      PREV_TYPE,
      year,
      month - 1
    );
    //创建当前月份需要补的日期单元格
    var currentMonthDateFragment = createDateCellFragment(
      1,
      currentMonthDateCount,
      CURRENT_TYPE,
      year,
      month - 1
    );
    //创建下个月需要补的日期单元格
    var nextMonthDatePaddingFragment = createDateCellFragment(
      1,
      nextMonthDatePadding,
      NEXT_TYPE,
      year,
      month
    );

    mainFragment.appendChild(prevMonthDatePaddingFragment);
    mainFragment.appendChild(currentMonthDateFragment);
    mainFragment.appendChild(nextMonthDatePaddingFragment);
    mainBody.innerHTML = "";
    mainBody.appendChild(mainFragment);
  }

  // 点击事件
  function bindEvent() {
    document.querySelector(".calendar").addEventListener("click", function (e) {
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
      if (e.target.className === "calendar-date_base") {
        typeof selected === "function" && selected(e.target.calendarInfo);
      }
      createCalendar(year, month);
    });
  }

  function open() {
    rootCalendar.style.display = "block";
    visibe = true;
  }
  function disable() {
    rootCalendar.style.display = "none";
    visibe = false;
  }

  bindEvent();

  window.calendar = {
    init: function (parma) {
      (selected = parma.choose), createCalendar(year, month);
    },
    hide: disable,
    show: open,
    getVisibe: function () {
      return visibe;
    },
  };
})(window, document);
