const { program } = require("commander");
const api = require("./commander.js");
require("./iinquirer.js");
program.version("0.0.1");

program.option("--add, --addTask", "add a task");

program.parse(process.argv);

const options = program.opts();

if (process.argv.length === 4)
  if (options.addTask) {
    api.add(process.argv[3]);
  }
