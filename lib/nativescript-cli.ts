let node = require("../package.json").engines.node;
// this call must be first to avoid requiring c++ dependencies
require("./common/verify-node-version").verifyNodeVersion(node, "NativeScript", "2.2.0");

require("./bootstrap");
import * as shelljs from "shelljs";
shelljs.config.silent = true;
import {installUncaughtExceptionListener} from "./common/errors";
installUncaughtExceptionListener(process.exit);

async function init(): Promise<any> {
	let config: Config.IConfig = $injector.resolve("$config");
	let err: IErrors = $injector.resolve("$errors");
	err.printCallStack = config.DEBUG;

	let commandDispatcher: ICommandDispatcher = $injector.resolve("commandDispatcher");

	let messages: IMessagesService = $injector.resolve("$messagesService");
	messages.pathsToMessageJsonFiles = [/* Place client-specific json message file paths here */];

	if (process.argv[2] === "completion") {
		await commandDispatcher.completeCommand();
	} else {
		await commandDispatcher.dispatchCommand();
	}

	$injector.dispose();
}

init();




// async function main() {
//  await ping();
// }

// async function ping() {
//  for (var i = 0; i < 10; i++) {
//   try {
//     await delay(300).catch(err => console.log("eeeeeeeeeeeee ", err));
//   } catch (err) {
//     console.log("error in await delay: ", err);
//   }
//   console.log("ping");
//  }
// }

// function delay(ms: number) {
//  return new Promise((resolve, reject) => setTimeout(reject, ms));
// }

// main();

// let childProcess = require("child_process");
// let p = require("path").join(__dirname, "..");
// console.log("p = ", p);
// let npmProcess = childProcess.spawn("npm", ["install", "lodash@latest"], { cwd: p });
// npmProcess.stdout.on("data", (d: NodeBuffer) => console.log("on data: ", d.toString()));
// npmProcess.stderr.on("data", (d: NodeBuffer) => console.log("on stderr data: ", d.toString()));
// npmProcess.on("error", (d: NodeBuffer) => console.log("on error: ", d.toString()));
// npmProcess.on("close", (d: NodeBuffer) => console.log("on close: ", d.toString()));

// fiber(() => {
// }).run();