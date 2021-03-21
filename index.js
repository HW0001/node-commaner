const { program } = require("commander");
program.version("0.0.1");

program.option("--add, --addTask", "add a task");

program.parse(process.argv);

const options = program.opts();

if (options.addTask) {
}
