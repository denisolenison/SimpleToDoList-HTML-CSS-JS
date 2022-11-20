var mainT = document.getElementById("mainTable");

var incompleteTasks = [];
var completeTasks = [];
//here are the tasks classes


var theTable = document.createElement('div');
theTable.align = "center";
theTable.className = "table";

var tHead = document.createElement('div');
tHead.className = "tHead";
var tBody = document.createElement('div');
tBody.className = "tBody";

var currentPage = 1;

var sorted1 = [false, false];
var sorted2 = [false, false];
var sorted3 = [false, false];
var sorted4 = [false, false];


tHead.appendChild(makeTheadName("№", "t1"));
tHead.appendChild(makeTheadName("Дата начала", "t2"));
tHead.appendChild(makeTheadName("Задача", "t3"));
tHead.appendChild(makeTheadName("Дедлайн", "t4"));
tHead.appendChild(makeTheadName("Прочее", "t5"));

theTable.appendChild(tHead);
theTable.appendChild(tBody);
mainT.appendChild(theTable);

var tasks ={ value: 0 };

/*
addTask(tBody, tasks, "Доделать задание для собеседования", new Date('2022-11-07T15:00:00'), new Date('2022-11-21T01:00:00'));

addTask(tBody, tasks, "Разобраться с Angular и PrimeNG", new Date('2022-11-19T17:00:00'), new Date('2022-11-19T19:30:00'));
addTask(tBody, tasks, "Поизучать Java Spring Boot", new Date('2022-11-19T19:00:00'), new Date('2022-11-19T21:00:00'));

addTask(tBody, tasks, "Доделать сортировку", new Date('2022-11-19T10:00:00'), new Date('2022-11-19T13:00:00'), true, new Date('2022-11-19T12:58:00'));
addTask(tBody, tasks, "Сделать добавление заданий, изменение заданий, удаление, выполнение, и.т.д"
, new Date('2022-11-19T14:00:00'), new Date('2022-11-19T18:00:00'), true, new Date('2022-11-20T20:25:00'));
*/

var dateBox = document.createElement('div');
dateBox.id = 'dateBox';
dateBox.innerHTML = readDate(currentDate, true);
document.getElementById("body").appendChild(dateBox);

mainTickF();
setInterval(mainTickF, 50);

function mainTickF () {
  document.getElementsByTagName("body")[0].style.height = (document.getElementById("header").offsetHeight
  + document.getElementById("mainTable").offsetHeight + 100)+"px";
  currentDate = new Date();

  document.getElementById("dateBox").innerHTML = readDate(currentDate, true);

  if (currentPage == 1) {
    document.getElementById("page1").style.backgroundColor = "#a4e0d0";
    document.getElementById("page2").style.backgroundColor = "#b8fcea";
  }
  else {
    document.getElementById("page1").style.backgroundColor = "#b8fcea";
    document.getElementById("page2").style.backgroundColor = "#a4e0d0";
  }

  document.getElementsByClassName("tHead")[0].style.top = document.getElementById("header").offsetHeight + "px";

  document.getElementById("mainTable").style.top = (document.getElementsByClassName("tHead")[0].offsetHeight
  + document.getElementById("header").offsetHeight) + "px";

  document.getElementById("compTaskId").innerHTML = "Установите дату выполнения задания №" + currentCompleteTaskId;

  //updating tasks
  let icLength = incompleteTasks.length;
  let cLength = completeTasks.length;

  for (var i = 0 ; i < icLength ; ++i) {
    let theTask = document.getElementsByClassName("tBody")[0].children[i];
    let thisTR = theTask.getElementsByClassName("tr")[0];
    let thisBar = theTask.getElementsByClassName("progressBar")[0];

    let hasChanged = false;

    //renumerating
    incompleteTasks[i].id = i+1;

    hasChanged = hasChanged || changeNQ(thisTR.getElementsByClassName("t1")[0], incompleteTasks[i].id);
    hasChanged = hasChanged || changeNQ(thisTR.getElementsByClassName("t2")[0], readDate(incompleteTasks[i].startDate));
    hasChanged = hasChanged || changeNQ(thisTR.getElementsByClassName("t3")[0], incompleteTasks[i].name);
    hasChanged = hasChanged || changeNQ(thisTR.getElementsByClassName("t4")[0], readDate(incompleteTasks[i].endDate));

    thisBar.style.display = "block";
    thisTR.getElementsByClassName("t3")[0].style.textDecoration = "none";
    if (currentPage == 1) theTask.style.display = "flex";
    if (currentPage == 2) theTask.style.display = "none";

    let dateText1 = thisTR.getElementsByClassName("t2")[0].innerHTML;
    let dateText2 = thisTR.getElementsByClassName("t4")[0].innerHTML;


    incompleteTasks[i].getProgress();
    let theProgress = incompleteTasks[i].progress;

    if (hasChanged) {
      thisBar.style.width = theProgress*100 + "%";
    }


    theProgress = (theProgress < 0 ? 0 : theProgress);

    if (theProgress >= 1) {
      thisTR.style.backgroundColor = "#ffcdc9";
      theProgress = 1;
    }
    else {
      thisTR.style.backgroundColor = "#ffffff";
    }

    let oldProgress = (thisBar.style.width).split('%')[0]/100;
    //для плавного передвижения строки "прогресса"
    thisBar.style.width = ((theProgress + oldProgress*9)*10) + "%";
    let fictProgress = (thisBar.style.width).split('%')[0]/100;

    let redColor = 255;
    let greenColor = 255;

    if (fictProgress <= 0.7) {
      greenColor = 255;
      redColor = Math.round(255 * (fictProgress/0.7));
    }
    else {
      redColor = 255;
      greenColor = Math.round(255 * ((1 - fictProgress)/0.3));
    }

    greenColor = greenColor.toString(16);
    redColor = redColor.toString(16);
    if (greenColor.length == 1) greenColor = '0' + greenColor;
    if (redColor.length == 1) redColor = '0' + redColor;

    let fullColor = "#" + redColor + greenColor + "00";
    thisBar.style.backgroundColor = fullColor;

    changeNQ(thisBar, Math.round(theProgress*10000)/100 + "%");

    //set buttons
    let t5 = thisTR.getElementsByClassName("t5")[0];
    let upBtn = t5.getElementsByClassName("upButton")[0];
    let downBtn = t5.getElementsByClassName("downButton")[0];
    let compBtn = t5.getElementsByClassName("compButton")[0];
    let editBtn = t5.getElementsByClassName("editButton")[0];
    let deleteBtn = t5.getElementsByClassName("deleteButton")[0];

    if (incompleteTasks[i].id == 1) {
      upBtn.style.display = "none";
      downBtn.style.display = "block";
    }
    else if (incompleteTasks[i].id == icLength) {
      upBtn.style.display = "block";
      downBtn.style.display = "none";
    }
    else {
      upBtn.style.display = "block";
      downBtn.style.display = "block";
    }
    compBtn.innerHTML = "✔";
    upBtn.setAttribute("onclick","upTask(" + incompleteTasks[i].id + ")");
    downBtn.setAttribute("onclick","downTask(" + incompleteTasks[i].id + ")");
    compBtn.setAttribute("onclick","compTask(" + incompleteTasks[i].id + ")");
    editBtn.setAttribute("onclick","openUpdateTask(" + incompleteTasks[i].id + ")");
    deleteBtn.setAttribute("onclick","deleteTask(" + incompleteTasks[i].id + ")");
  }
  for (var i = 0 ; i < cLength ; ++i) {
    let theTask = document.getElementsByClassName("tBody")[0].children[i + icLength];
    let thisTR = theTask.getElementsByClassName("tr")[0];
    let thisBar = theTask.getElementsByClassName("progressBar")[0];

    //renumerating
    completeTasks[i].id = i+1;

    changeNQ(thisTR.getElementsByClassName("t1")[0], completeTasks[i].id);
    changeNQ(thisTR.getElementsByClassName("t2")[0], readDate(completeTasks[i].startDate));
    changeNQ(thisTR.getElementsByClassName("t3")[0], completeTasks[i].name);
    changeNQ(thisTR.getElementsByClassName("t4")[0], readDate(completeTasks[i].completeDate));

    thisTR.style.backgroundColor = "#d9ffe2";
    thisBar.style.display = "none";
    thisTR.getElementsByClassName("t3")[0].style.textDecoration = "line-through";
    if (currentPage == 1) theTask.style.display = "none";
    if (currentPage == 2) theTask.style.display = "flex";

    //set buttons
    let t5 = thisTR.getElementsByClassName("t5")[0];
    let upBtn = t5.getElementsByClassName("upButton")[0];
    let downBtn = t5.getElementsByClassName("downButton")[0];
    let compBtn = t5.getElementsByClassName("compButton")[0];
    let editBtn = t5.getElementsByClassName("editButton")[0];
    let deleteBtn = t5.getElementsByClassName("deleteButton")[0];

    if (completeTasks[i].id == 1) {
      upBtn.style.display = "none";
      downBtn.style.display = "block";
    }
    else if (completeTasks[i].id == cLength) {
      upBtn.style.display = "block";
      downBtn.style.display = "none";
    }
    else {
      upBtn.style.display = "block";
      downBtn.style.display = "block";
    }
    compBtn.innerHTML = "⍻";
    upBtn.setAttribute("onclick","upTask(" + completeTasks[i].id + ")");
    downBtn.setAttribute("onclick","downTask(" + completeTasks[i].id + ")");
    compBtn.setAttribute("onclick","compTask(" + completeTasks[i].id + ")");
    editBtn.setAttribute("onclick","openUpdateTask(" + completeTasks[i].id + ")");
    deleteBtn.setAttribute("onclick","deleteTask(" + completeTasks[i].id + ")");
  }

}


document.getElementById("page1").addEventListener("click" , function() {
  if (currentPage == 2) {
    currentPage = 1;
    for (var i = 0 ; i < incompleteTasks.length ; ++i) {
      let theTask = document.getElementsByClassName("tBody")[0].children[i];
      let thisTR = theTask.getElementsByClassName("tr")[0];

      let deadLine = readDate(incompleteTasks[i].endDate);

      thisTR.getElementsByClassName("t4")[0].innerHTML = deadLine;
    }
    document.getElementsByClassName("tHead")[0].getElementsByClassName("t4")[0].getElementsByTagName("b")[0].innerHTML = "Дедлайн";
  }
});
document.getElementById("page2").addEventListener("click" , function() {
  if (currentPage == 1) {
    currentPage = 2;
    for (var i = 0 ; i < completeTasks.length ; ++i) {
      let theTask = document.getElementsByClassName("tBody")[0].children[i + incompleteTasks.length];
      let thisTR = theTask.getElementsByClassName("tr")[0];

      let completeLine = readDate(incompleteTasks[i].completeDate);

      thisTR.getElementsByClassName("t4")[0].innerHTML = completeLine;
    }
    document.getElementsByClassName("tHead")[0].getElementsByClassName("t4")[0].getElementsByTagName("b")[0].innerHTML = "Выполнено";
  }
});



function submitTask() {
  let formText = document.getElementById("taskTextMake").value;

  let formDateStart = document.getElementById("taskDateStartMake").value;
  let formTimeStart = document.getElementById("taskTimeStartMake").value;
  let fullDateStart = formDateStart + "T" + formTimeStart + ":00";
  let fullDateStartValue = (new Date(fullDateStart)).valueOf();

  let formDateEnd = document.getElementById("taskDateEndMake").value;
  let formTimeEnd = document.getElementById("taskTimeEndMake").value;
  let fullDateEnd = formDateEnd + "T" + formTimeEnd + ":00";
  let fullDateEndValue = (new Date(fullDateEnd)).valueOf();

  let hasError = false;

  if (formText.length == 0) {
    hasError = true;
    document.getElementById("errorMake").style.display = "block";
    document.getElementById("errorMake").innerHTML = "Ошибка: введите название задания"
  }
  else if (formDateStart.length == 0) {
    hasError = true;
    document.getElementById("errorMake").style.display = "block";
    document.getElementById("errorMake").innerHTML = "Ошибка: введите дату начала задания"
  }
  else if (formTimeStart.length == 0) {
    hasError = true;
    document.getElementById("errorMake").style.display = "block";
    document.getElementById("errorMake").innerHTML = "Ошибка: введите время начала задания"
  }
  else if (formDateEnd.length == 0) {
    hasError = true;
    document.getElementById("errorMake").style.display = "block";
    document.getElementById("errorMake").innerHTML = "Ошибка: введите дату дедлайна"
  }
  else if (formTimeEnd.length == 0) {
    hasError = true;
    document.getElementById("errorMake").style.display = "block";
    document.getElementById("errorMake").innerHTML = "Ошибка: введите время дедлайна"
  }
  else if (fullDateStartValue >= fullDateEndValue) {
    hasError = true;
    document.getElementById("errorMake").style.display = "block";
    document.getElementById("errorMake").innerHTML = "Ошибка: дата дедлайна должна быть позже даты начала выполнения задания"
  }

  if (!hasError) {
    addTask(tBody, tasks, formText, new Date(fullDateStart), new Date(fullDateEnd));
    document.getElementById("addElementForm").style.display = "none";
    sorted1[0] = 0;
    sorted2[0] = 0;
    sorted3[0] = 0;
    sorted4[0] = 0;
  }
}


function openAddForm() {
  document.getElementById("addElementForm").style.display = "flex";
  document.getElementById("errorMake").style.display = "none";
  let newDate = new Date((new Date()).valueOf() + 3600000);

  let startDateGet = currentDate.getFullYear() + "-" + addZeroes(currentDate.getMonth()+1) + "-" + addZeroes(currentDate.getDate());
  let startTimeGet = addZeroes(currentDate.getHours()) + ":" + addZeroes(currentDate.getMinutes());

  let endDateGet = newDate.getFullYear() + "-" + addZeroes(newDate.getMonth()+1) + "-" + addZeroes(newDate.getDate());
  let endTimeGet = addZeroes(newDate.getHours()) + ":" +  addZeroes(newDate.getMinutes());

  document.getElementById("taskTextMake").value = "";

  document.getElementById("taskDateStartMake").value = startDateGet;
  document.getElementById("taskTimeStartMake").value = startTimeGet;

  document.getElementById("taskDateEndMake").value = endDateGet;
  document.getElementById("taskTimeEndMake").value = endTimeGet;
}


var currentCompleteTaskId = 1;
var completeWindowOpened = false;

function compTask(id) {
  if (currentPage == 1) {
    completeWindowOpened = true;
    currentCompleteTaskId = id;
    document.getElementById("setCompleteForm").style.display = "flex";
    document.getElementById("errorMake2").style.display = "none";

    let dateGet = currentDate.getFullYear() + "-" + addZeroes(currentDate.getMonth()+1) + "-" + addZeroes(currentDate.getDate());
    let timeGet = addZeroes(currentDate.getHours()) + ":" + addZeroes(currentDate.getMinutes());

    document.getElementById("taskDateCompMake").value = dateGet;
    document.getElementById("taskTimeCompMake").value = timeGet;
  }
  else {
    let confirmation = confirm("Вы уверены, что хотите вернуть данное задание в список текущих заданий?")
    if (confirmation) {
      let thisTask = completeTasks[id - 1];
      thisTask.isComplete = false;
      incompleteTasks.push(thisTask);
      completeTasks.splice(id - 1, 1);
      sorted1[1] = 0;
      sorted2[1] = 0;
      sorted3[1] = 0;
      sorted4[1] = 0;
    }
  }
}



var currentCompleteTaskId = 1;
var completeWindowOpened = false;

function completeTask() {

  let formDate = document.getElementById("taskDateCompMake").value;
  let formTime = document.getElementById("taskTimeCompMake").value;
  let fullDate = formDate + "T" + formTime + ":00";
  let fullDateValue = (new Date(fullDate)).valueOf();

  let nowDateValue = (new Date()).valueOf();

  let hasError = false;

  if (fullDateValue > nowDateValue) {
    hasError = true;
    document.getElementById("errorMake2").style.display = "block";
    document.getElementById("errorMake2").innerHTML = "Ошибка: дата выполнения не может быть позже текущей даты";
  }

  if (!hasError) {
    let thisTask = incompleteTasks[currentCompleteTaskId - 1];
    thisTask.isComplete = true;
    thisTask.completeDate = new Date(fullDate);
    completeTasks.push(thisTask);
    incompleteTasks.splice(currentCompleteTaskId - 1, 1);
    document.getElementById("setCompleteForm").style.display = "none";
    completeWindowOpened = false;
    sorted1[0] = 0;
    sorted2[0] = 0;
    sorted3[0] = 0;
    sorted4[0] = 0;
  }
}


var currentEditTaskId = 1;
var currentEditTaskComplete = false;
var editWindowOpened = false;

function openUpdateTask(id) {
  editWindowOpened = true;
  currentEditTaskId = id;
  let date1;
  let date2;
  let textThis;
  if (currentPage == 1) {
    currentEditTaskComplete = false;
    date1 = incompleteTasks[currentEditTaskId-1].startDate;
    date2 = incompleteTasks[currentEditTaskId-1].endDate;
    textThis = incompleteTasks[currentEditTaskId-1].name;
    document.getElementById("labelUpdateEnd").innerHTML = "Дата и время дедлайна:";
  }
  else {
    currentEditTaskComplete = true;
    date1 = completeTasks[currentEditTaskId-1].startDate;
    date2 = completeTasks[currentEditTaskId-1].completeDate;
    textThis = completeTasks[currentEditTaskId-1].name;
    document.getElementById("labelUpdateEnd").innerHTML = "Дата и время выполнения:";
  }

  let startDateGet = date1.getFullYear() + "-" + addZeroes(date1.getMonth()+1) + "-" + addZeroes(date1.getDate());
  let startTimeGet = addZeroes(date1.getHours()) + ":" + addZeroes(date1.getMinutes());

  let endDateGet = date2.getFullYear() + "-" + addZeroes(date2.getMonth()+1) + "-" + addZeroes(date2.getDate());
  let endTimeGet = addZeroes(date2.getHours()) + ":" +  addZeroes(date2.getMinutes());

  document.getElementById("editElementForm").style.display = "flex";
  document.getElementById("errorUpdate").style.display = "none";

  document.getElementById("taskTextUpdate").value = textThis;

  document.getElementById("taskDateStartUpdate").value = startDateGet;
  document.getElementById("taskTimeStartUpdate").value = startTimeGet;

  document.getElementById("taskDateEndUpdate").value = endDateGet;
  document.getElementById("taskTimeEndUpdate").value = endTimeGet;
}

function updateTaskF() {
  let formText = document.getElementById("taskTextUpdate").value;

  let formDateStart = document.getElementById("taskDateStartUpdate").value;
  let formTimeStart = document.getElementById("taskTimeStartUpdate").value;
  let fullDateStart = formDateStart + "T" + formTimeStart + ":00";
  let fullDateStartValue = (new Date(fullDateStart)).valueOf();

  let formDateEnd = document.getElementById("taskDateEndUpdate").value;
  let formTimeEnd = document.getElementById("taskTimeEndUpdate").value;
  let fullDateEnd = formDateEnd + "T" + formTimeEnd + ":00";
  let fullDateEndValue = (new Date(fullDateEnd)).valueOf();

  let nowDateValue = (new Date()).valueOf();

  let hasError = false;

  if (formText.length == 0) {
    hasError = true;
    document.getElementById("errorUpdate").style.display = "block";
    document.getElementById("errorUpdate").innerHTML = "Ошибка: введите название задания";
  }
  else if (formDateStart.length == 0) {
    hasError = true;
    document.getElementById("errorUpdate").style.display = "block";
    document.getElementById("errorUpdate").innerHTML = "Ошибка: введите дату начала задания";
  }
  else if (formTimeStart.length == 0) {
    hasError = true;
    document.getElementById("errorUpdate").style.display = "block";
    document.getElementById("errorUpdate").innerHTML = "Ошибка: введите время начала задания";
  }
  else if (formDateEnd.length == 0 && !currentEditTaskComplete) {
    hasError = true;
    document.getElementById("errorUpdate").style.display = "block";
    document.getElementById("errorUpdate").innerHTML = "Ошибка: введите дату дедлайна";
  }
  else if (formTimeEnd.length == 0 && !currentEditTaskComplete) {
    hasError = true;
    document.getElementById("errorUpdate").style.display = "block";
    document.getElementById("errorUpdate").innerHTML = "Ошибка: введите время дедлайна";
  }
  else if (formDateEnd.length == 0 && currentEditTaskComplete) {
    hasError = true;
    document.getElementById("errorUpdate").style.display = "block";
    document.getElementById("errorUpdate").innerHTML = "Ошибка: введите дату выполнения задания";
  }
  else if (formTimeEnd.length == 0 && currentEditTaskComplete) {
    hasError = true;
    document.getElementById("errorUpdate").style.display = "block";
    document.getElementById("errorUpdate").innerHTML = "Ошибка: введите время выполнения задания";
  }
  else if (fullDateStartValue >= fullDateEndValue && !currentEditTaskComplete) {
    hasError = true;
    document.getElementById("errorUpdate").style.display = "block";
    document.getElementById("errorUpdate").innerHTML = "Ошибка: дата дедлайна должна быть позже даты начала выполнения задания";
  }
  else if (fullDateEndValue >= nowDateValue && currentEditTaskComplete) {
    hasError = true;
    document.getElementById("errorUpdate").style.display = "block";
    document.getElementById("errorUpdate").innerHTML = "Ошибка: дата выполнения не может быть позже текущей даты";
  }//последнего условия нет, т.к. задание можно выполнить до предположительно начала времени выполнения

  if (!hasError) {
    if (!currentEditTaskComplete) {
      incompleteTasks[currentEditTaskId-1].name = formText;
      incompleteTasks[currentEditTaskId-1].startDate = new Date(fullDateStart);
      incompleteTasks[currentEditTaskId-1].endDate = new Date(fullDateEnd);
      incompleteTasks[currentEditTaskId-1].getProgress();
      document.getElementById("editElementForm").style.display = "none";
      editWindowOpened = false;
      sorted1[0] = 0;
      sorted2[0] = 0;
      sorted3[0] = 0;
      sorted4[0] = 0;
    }
    else {
      completeTasks[currentEditTaskId-1].name = formText;
      completeTasks[currentEditTaskId-1].startDate = new Date(fullDateStart);
      completeTasks[currentEditTaskId-1].completeDate = new Date(fullDateEnd);
      completeTasks[currentEditTaskId-1].getProgress();
      document.getElementById("editElementForm").style.display = "none";
      editWindowOpened = false;
      sorted1[1] = 0;
      sorted2[1] = 0;
      sorted3[1] = 0;
      sorted4[1] = 0;
    }
  }
}





function deleteTask(id) {
  if (currentPage == 1) {
    let confirmation = confirm("Вы уверены, что хотите удалить данное задание?");
    if (confirmation) {
      let confirmation2 = confirm("Вы ТОЧНО уверены, что хотите удалить данное задание?");
      if (confirmation2) {
        incompleteTasks.splice(id - 1, 1);
        tasks.value--;
        let parent = document.getElementsByClassName("tBody")[0];
        let child = parent.getElementsByClassName("full_tr")[id - 1];
        parent.removeChild(child);
      }
    }
  }
  else {
    let confirmation = confirm("Вы уверены, что хотите удалить данное задание?");
    if (confirmation) {
      let confirmation2 = confirm("Вы ТОЧНО уверены, что хотите удалить данное задание?");
      if (confirmation2) {
        completeTasks.splice(id - 1, 1);
        tasks.value--;
        let parent = document.getElementsByClassName("tBody")[0];
        let child = parent.getElementsByClassName("full_tr")[id + completeTasks.length];
        parent.removeChild(child);
      }
    }
  }
}







function closeForm() {
  document.getElementById("addElementForm").style.display = "none";
}

function closeForm2() {
  document.getElementById("setCompleteForm").style.display = "none";
  completeWindowOpened = false;
}

function closeForm3() {
  document.getElementById("editElementForm").style.display = "none";
  editWindowOpened = false;
}
