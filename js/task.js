var currentDate = new Date();

class TheTask {
  constructor(id, name, startDate, endDate, isComplete=false, completeDate = new Date()) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.endDate = endDate;
    this.progress = (currentDate.valueOf() - startDate.valueOf()) /
    (endDate.valueOf() - startDate.valueOf());
    ((this.progress > 1) ? this.progress = 1 : this.progress);
    ((this.progress < 0) ? this.progress = 0 : this.progress);
    this.isComplete = isComplete;
    this.completeDate = completeDate;
  }

  getProgress() {
    this.progress = (currentDate.valueOf() - this.startDate.valueOf()) /
    (this.endDate.valueOf() - this.startDate.valueOf());
    ((this.progress > 1) ? this.progress = 1 : this.progress);
    ((this.progress < 0) ? this.progress = 0 : this.progress);
  }

}

function readDate(date, showSeconds = false) {
  let year = date.getFullYear();
  let month = monthName(date.getMonth() + 1);
  let day = date.getDate();
  let hour = addZeroes(date.getHours());
  let minute = addZeroes(date.getMinutes());
  let second = addZeroes(date.getSeconds());
  return day + " " + month + " " + year + ", " + hour + ":" + minute + (showSeconds ? ":"+second : "");
}

function setTheDate(year, month, day, hour, minute, second) {
  this.setFullYear(year);
  this.setMonth(month);
  this.setDate(day);
  this.setHours(hour, minute, second);
}

function makeTheadName(name, className) {
  let thisHeadColumn = document.createElement('div');
  thisHeadColumn.className = className;
  thisHeadColumn.innerHTML = "<b>"+name+"</b>";
  if (className != "t1") {
    let thisSortButton = makeSortButton();
    thisSortButton.id = className + "sort";
    if (className == "t2") {
      thisSortButton.setAttribute("onclick","sortTasks(1);");
      thisSortButton.setAttribute("title","Отсортировать по дате начала выполнения");
    }
    if (className == "t3") {
      thisSortButton.setAttribute("onclick","sortTasks(2);");
      thisSortButton.setAttribute("title","Отсортировать по алфавиту по названию задания");
    }
    if (className == "t4") {
      thisSortButton.setAttribute("onclick","sortTasks(3);");
      thisSortButton.setAttribute("title","Отсортировать по дедлайну или дате выполнения задания");
    }
    if (className == "t5") {
      thisSortButton.setAttribute("onclick","sortTasks(4);");
      thisSortButton.setAttribute("title","Отсортировать по проценту оставшегося времени");
    }
    thisHeadColumn.appendChild(thisSortButton);
  }

  return thisHeadColumn;
}

function makeTd(value, className) {
  let thisTD = document.createElement('div');
  thisTD.className = "td";
  thisTD.className = className;
  thisTD.innerHTML = value;
  thisTD.align = "center";
  return thisTD;
}

function makeProgressBar(val) {
  let thisBar = document.createElement('div');
  thisBar.className = "progressBar";
  thisBar.style.width = (val*100) + "%";
  return thisBar;
}

function makeTr(task) {
  let thisTR = document.createElement('div');
  thisTR.className = "full_tr";
  let thisTR2 = document.createElement('div');
  thisTR2.className = "tr";
  thisTR2.appendChild(makeTd(task.id, "t1"));
  thisTR2.appendChild(makeTd(readDate(task.startDate), "t2"));
  thisTR2.appendChild(makeTd(task.name, "t3"));
  thisTR2.appendChild(makeTd(readDate(task.endDate), "t4"));
  let miniMenu = makeTd("", "t5");
  let theMenu = document.createElement('div');
  theMenu.className = "menu";

  let upButton = document.createElement('button');
  upButton.innerHTML = "↑";
  upButton.className = "upButton";
  upButton.setAttribute("onclick","upTask(" + task.id + ")");
  upButton.setAttribute("title","Переместить задание вверх");

  let downButton = document.createElement('button');
  downButton.innerHTML = "↓";
  downButton.className = "downButton";
  downButton.setAttribute("onclick","downTask(" + task.id + ")");
  downButton.setAttribute("title","Переместить задание вниз");

  let compButton = document.createElement('button');
  compButton.innerHTML = "✔";
  compButton.className = "compButton";
  compButton.setAttribute("onclick","compTask(" + task.id + ")");
  compButton.setAttribute("title","Выполнить задание/Отметить невыполненным");

  let editButton = document.createElement('button');
  editButton.innerHTML = "EDIT";
  editButton.className = "editButton";
  editButton.setAttribute("onclick","openUpdateTask(" + task.id + ")");
  editButton.setAttribute("title","Изменить задание");

  let deleteButton = document.createElement('button');
  deleteButton.innerHTML = "✖";
  deleteButton.className = "deleteButton";
  deleteButton.setAttribute("onclick","deleteTask(" + task.id + ")");
  deleteButton.setAttribute("title","Удалить задание");

  theMenu.appendChild(upButton);
  theMenu.appendChild(downButton);
  theMenu.appendChild(compButton);
  theMenu.appendChild(editButton);
  theMenu.appendChild(deleteButton);

  miniMenu.appendChild(theMenu);
  thisTR2.appendChild(miniMenu);
  thisTR.appendChild(thisTR2);
  task.getProgress();
  thisTR.appendChild(makeProgressBar(task.progress));
  return thisTR;
}


function monthName(monthValue) {
  switch(monthValue) {
    case 1: return "января";
    case 2: return "февраля";
    case 3: return "марта";
    case 4: return "апреля";
    case 5: return "мая";
    case 6: return "июня";
    case 7: return "июля";
    case 8: return "августа";
    case 9: return "сентября";
    case 10: return "октября";
    case 11: return "ноября";
    case 12: return "декабря";
    default: "незнаюбря";
  }
}

function monthNameReversed(monthName) {
  switch(monthName) {
    case "января": return '01';
    case "февраля": return '02';
    case "марта": return '03';
    case "апреля": return '04';
    case "мая": return '05';
    case "июня": return '06';
    case "июля": return '07';
    case "августа": return '08';
    case "сентября": return '09';
    case "октября": return '10';
    case "ноября": return '11';
    case "декабря": return '12';
    default: 0;
  }
}

function DateToValue(dateString, hasSeconds=false, alreadyString=false) {
  let DateArray;
  if (!alreadyString) DateArray = readDate(dateString, hasSeconds).split(", ");
  else DateArray = dateString.split(", ");
  let tDate = DateArray[0];
  let tTime = DateArray[1];
  let FDArray = tDate.split(' ');
  FDArray[1] = monthNameReversed(FDArray[1]);
  let newDateString = FDArray[2] + '-' + FDArray[1] + '-' + addZeroes(FDArray[0]);
  tTime = (hasSeconds ? tTime : tTime + ":00");
  let newFullString = newDateString + 'T' + tTime;
  let getDateFormat = new Date(newFullString);
  let getTimeValue = getDateFormat.valueOf();
  return getTimeValue;
}



function addZeroes(num) {
  if (num < 10) {
    return "0" + num;
  }
  else return num;
}


function addTask(body, count, name, startDate, endDate, isComplete=false, completeDate=new Date()) {
  count.value++;
  let valueN;
  (isComplete ? valueN = completeTasks.length + 1 : valueN = incompleteTasks.length + 1);

  let task = new TheTask(valueN, name, startDate, endDate, isComplete, completeDate);

  if (isComplete) completeTasks.push(task);
  else incompleteTasks.push(task);

  body.appendChild(makeTr(task));
}


function makeSortButton() {
  let sortButton = document.createElement('button');
  sortButton.className = "sortButton";
  sortButton.innerHTML = "↑↓";
  sortButton.style.float = "right";
  sortButton.style.marginRight = "5px";
  return sortButton;
}


function changeNQ(obj, text) {
  if (obj.innerHTML != text) {
    obj.innerHTML = text;
    return true;
  }
  return false;
}

//меняет содержимое только тогда, когда оно отличается,
//что позволяет нам не обновлять текст постоянно и
//спокойно выделять его
