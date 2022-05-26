// Recommended order for your solution:
// 1. Install the dotenv package.
// 2. Add a dotenv file, put the API key in dotenv and print it.
// 3. Install the node-fetch package. Make sure you install version 2.6.7 as discussed (V3 doesn't support commonjs modules).
// 4. Create a method that calls the API to get temperature using node-fetch.
// 5. Install the commander package.
// 6. Create a basic commander boilerplate without the actions implementation (just the metadata and commands configuration).
// 7. Implement the first command, including the optional arguments.
// 8. BONUS - Implement the second command.

// Commander usage example for your reference:
import chalk from "chalk";
import { Command } from "commander";
const program = new Command();

program
  .name("cli-calc")
  .description("The best CLI calculator")
  .version("1.0.0");

program
  .command("add")
  .description("Add two numbers")
  .argument("<number>", "first operand")
  .argument("<number>", "second operand")
  .option("-c, --color <string>", "Result color", "white")
  .action((firstNumber, secondNumber, options) => {
    console.log(
      chalk[options.color](
        `Result: ${Number(firstNumber) + Number(secondNumber)}`
      )
    );
  });

program.parse();
