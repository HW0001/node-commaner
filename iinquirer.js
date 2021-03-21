var inquirer = require("inquirer");
const api = require("./db.js");
const dbapi = require("./commander.js");
let selected = { id: null, name: null };
let taskList;
const taskHandleAction = {
  markdone: () => {
    console.log(taskList.find((t) => t.id.toString() === selected.id));
    taskList.find((t) => t.id.toString() === selected.id).done = true;
    api.write(JSON.stringify(taskList)).then(() => showAll());
  },
  markUndone: () => {
    taskList.find((t) => t.id.toString() === selected.id).done = false;
    api.write(JSON.stringify(taskList)).then(() => showAll());
  },
  updateTitle: () => {
    addOrUpdateTask(true);
  },
  remove: () => {
    api
      .write(
        JSON.stringify(taskList.filter((t) => t.id.toString() !== selected.id))
      )
      .then(() => showAll());
  },
};
showAll();

function showAll() {
  api.read().then((data) => {
    taskList = JSON.parse(data.toString());
    inquirer
      .prompt([
        {
          type: "list",
          name: "tasks",
          message: "选择查看内容?",
          choices: [
            { name: "增加", value: "-1" },
            ...taskList.map((t) => {
              return {
                name: `${t.done ? "完   成" : "未完成"}-----${t.name}`,
                value: t.id.toString(),
              };
            }),
            { name: "退出", value: "-2" },
          ],
        },
      ])
      .then((answers) => {
        if (answers.tasks != "-1") {
          selected.id = answers.tasks;
          selected.name = taskList.filter(
            (t) => t.id.toString() === answers.tasks
          )[0].name;
        } else selected.id = "-1";
        handleServer(answers);
      });
  });
}
function handleServer() {
  switch (selected.id) {
    case "-1":
      addOrUpdateTask();
      break;
    case "-2":
      break;
    default:
      showChildrenMenu();
  }
}

function addOrUpdateTask(isupdate = false) {
  var questions = [
    {
      type: "input",
      name: "taskname",
      message: "input a name",
      default: selected.name || "",
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    console.log(isupdate);
    if (!isupdate) {
      dbapi.add(answers.taskname, () => {
        showAll();
      });
    } else {
      taskList.find((t) => t.id.toString() === selected.id).name =
        answers.taskname;
      api.write(JSON.stringify(taskList)).then(() => showAll());
    }
  });
}

function showChildrenMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "taskhandle",
        message: "选择查看内容?",
        choices: [
          { name: "标记完成", value: "markdone" },
          { name: "标记未完成", value: "markUndone" },
          { name: "修改标题", value: "updateTitle" },
          { name: "删除", value: "remove" },
        ],
      },
    ])
    .then((answers) => {
      console.log(answers);
      taskHandleAction[answers.taskhandle]();
    });
}
