
function sortTasks(typeOfSort) {
  if (!completeWindowOpened && !editWindowOpened) {
    if (typeOfSort == 1) {
      let key = 'startDate';
      if (currentPage == 1) {
        if (sorted1[0] == 0) incompleteTasks = incompleteTasks.sort((task1, task2) => task1[key] > task2[key] ? 1 : -1);
        if (sorted1[0] == 1) incompleteTasks = incompleteTasks.reverse();
        sorted1[0] = 1;
        sorted2[0] = 0;
        sorted3[0] = 0;
        sorted4[0] = 0;
      }
      else {
        if (sorted1[1] == 0) completeTasks = completeTasks.sort((task1, task2) => task1[key] > task2[key] ? 1 : -1);
        if (sorted1[1] == 1) completeTasks = completeTasks.reverse();
        sorted1[1] = 1;
        sorted2[1] = 0;
        sorted3[1] = 0;
        sorted4[1] = 0;
      }
    }
    else if (typeOfSort == 2) {
      let key = 'name';
      if (currentPage == 1) {
        if (sorted2[0] == 0) incompleteTasks = incompleteTasks.sort((task1, task2) => task1[key] > task2[key] ? 1 : -1);
        if (sorted2[0] == 1) incompleteTasks = incompleteTasks.reverse();
        sorted1[0] = 0;
        sorted2[0] = 1;
        sorted3[0] = 0;
        sorted4[0] = 0;
      }
      else {
        if (sorted2[1] == 0) completeTasks = completeTasks.sort((task1, task2) => task1[key] > task2[key] ? 1 : -1);
        if (sorted2[1] == 1) completeTasks = completeTasks.reverse();
        sorted1[1] = 0;
        sorted2[1] = 1;
        sorted3[1] = 0;
        sorted4[1] = 0;
      }
    }
    else if (typeOfSort == 3) {
      if (currentPage == 1) {
        let key = 'endDate';
        if (sorted3[0] == 0) incompleteTasks = incompleteTasks.sort((task1, task2) => task1[key] > task2[key] ? 1 : -1);
        if (sorted3[0] == 1) incompleteTasks = incompleteTasks.reverse();
        sorted1[0] = 0;
        sorted2[0] = 0;
        sorted3[0] = 1;
        sorted4[0] = 0;
      }
      else {
        let key = 'completeDate';
        if (sorted3[1] == 0) completeTasks = completeTasks.sort((task1, task2) => task1[key] > task2[key] ? 1 : -1);
        if (sorted3[1] == 1) completeTasks = completeTasks.reverse();
        sorted1[1] = 0;
        sorted2[1] = 0;
        sorted3[1] = 1;
        sorted4[1] = 0;
      }
    }
    else if (typeOfSort == 4) {
      if (currentPage == 1) {
        let key = 'progress';
        if (sorted4[0] == 0) incompleteTasks = incompleteTasks.sort((task1, task2) => task1[key] < task2[key] ? 1 : -1);
        if (sorted4[0] == 1) incompleteTasks = incompleteTasks.reverse();
        sorted1[0] = 0;
        sorted2[0] = 0;
        sorted3[0] = 0;
        sorted4[0] = 1;
      }
      else {
        //not working lol, because no progress bar for complete tasks ;)
      }
    }
  }
}


function upTask(idn) {
  if (!completeWindowOpened && !editWindowOpened) {
    let id = idn - 1;
    if (currentPage == 1) {
      let t = incompleteTasks[id - 1];
      incompleteTasks[id - 1] = incompleteTasks[id];
      incompleteTasks[id] = t;

      sorted1[0] = 0;
      sorted2[0] = 0;
      sorted3[0] = 0;
      sorted4[0] = 0;
    }
    else {
      let t = completeTasks[id - 1];
      completeTasks[id - 1] = completeTasks[id];
      completeTasks[id] = t;

      sorted1[1] = 0;
      sorted2[1] = 0;
      sorted3[1] = 0;
      sorted4[1] = 0;
    }
  }
}

function downTask(idn) {
  if (!completeWindowOpened && !editWindowOpened) {
    let id = idn - 1;
    if (currentPage == 1) {
      let t = incompleteTasks[id + 1];
      incompleteTasks[id + 1] = incompleteTasks[id];
      incompleteTasks[id] = t;

      sorted1[0] = 0;
      sorted2[0] = 0;
      sorted3[0] = 0;
      sorted4[0] = 0;
    }
    else {
      let t = completeTasks[id + 1];
      completeTasks[id + 1] = completeTasks[id];
      completeTasks[id] = t;

      sorted1[1] = 0;
      sorted2[1] = 0;
      sorted3[1] = 0;
      sorted4[1] = 0;
    }
  }
}
