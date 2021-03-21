const { program } = require("commander");
const api = require("./commander.js");
var inquirer = require("inquirer");
program.version("0.0.1");

program.option("--add, --addTask", "add a task");

program.parse(process.argv);

const options = program.opts();

if (process.argv.length === 4)
  if (options.addTask) {
    api.add(process.argv[3]);
  }

inquirer
  .prompt([
    {
      type: "list",
      name: "tasks",
      message: "选择查看内容?",
      choices: [
        "Order a pizza",
        "Make a reservation",
        new inquirer.Separator(),
        "Ask for opening hours",
        {
          name: "Contact support",
          disabled: "Unavailable at this time",
        },
        "Talk to the receptionist",
      ],
    },
    {
      type: "list",
      name: "size",
      message: "What size do you need?",
      choices: ["Jumbo", "Large", "Standard", "Medium", "Small", "Micro"],
      filter: function (val) {
        return val.toLowerCase();
      },
    },
  ])
  .then((answers) => {
    console.log(JSON.stringify(answers, null, "  "));
  });
