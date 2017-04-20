Public API
==

This document describes all methods that can be invoked when NativeScript CLI is required as library, i.e.

<table>
	<tr>
        <td>
        	JavaScript
        </td>
        <td>
        	TypeScript
        </td>
    </tr>
    <tr>
    	<td>
<pre lang="javascript">
const tns = require("nativescript");
</pre>
        </td>
    	<td>
<pre lang="typescript">
import * as tns from "nativescript";
</pre>
        </td>
    </tr>

</table>

## Module projectService

`projectService` modules allow you to create new NativeScript application.

* `createProject(projectSettings: IProjectSettings): Promise<void>` - Creates new NativeScript application. By passing `projectSettings` argument you specify the name of the application, the template that will be used, etc.:
```TypeScript
/**
 * Describes available settings when creating new NativeScript application.
 */
interface IProjectSettings {
	/**
	 * Name of the newly created application.
	 */
	projectName: string;

	/**
	 * Selected template from which to create the project. If not specified, defaults to hello-world template.
	 * Template can be any npm package, local dir, github url, .tgz file.
	 * If it is set to `angular` or `ng`, default NativeScript Angular Hello World template will be used.
	 * If it is set to `typescript` or `tsc`, default NativeScript TypeScript Hello World template will be used.
	 */
	template?: string;

	/**
	 * Application identifier for the newly created application. If not specified, defaults to org.nativescript.<projectName>.
	 */
	appId?: string;

	/**
	 * Path where the project will be created. If not specified, defaults to current working dir.
	 */
	pathToProject?: string;

	/**
	 * Defines if invalid application name can be used for project creation.
	 */
	force?: boolean;

	/**
	 * Defines whether the `npm install` command should be executed with `--ignore-scripts` option.
	 * When it is passed, all scripts (postinstall for example) will not be executed.
	 */
	ignoreScripts?: boolean;
}
```

Sample usage:
<table>
	<tr>
        <td>
        	JavaScript
        </td>
        <td>
        	TypeScript
        </td>
    </tr>
    <tr>
    	<td>
<pre lang="javascript">
const projectSettings = {
	projectName: "my-ns-app",
    template: "ng",
    pathToProject: "/home/my-user/project-dir"
};

tns.projectService.createProject(projectSettings)
	.then(() => console.log("Project successfully created."))
    .catch((err) => console.log("Unable to create project, reason: ", err);
</pre>
        </td>
    	<td>
<pre lang="typescript">
const projectSettings: IProjectSettings = {
	projectName: "my-ns-app",
    template: "ng",
    pathToProject: "/home/my-user/project-dir"
};

tns.projectService.createProject(projectSettings)
	.then(() => console.log("Project successfully created."))
    .catch((err) => console.log("Unable to create project, reason: ", err);
</pre>
        </td>
    </tr>
</table>

* `isValidNativeScriptProject(projectDir: string): boolean` - Checks if the specified path is a valid NativeScript project. Returns `true` in case the directory is a valid project, `false` otherwise.

Sample usage:
<table>
	<tr>
        <td>
        	JavaScript
        </td>
        <td>
        	TypeScript
        </td>
    </tr>
    <tr>
    	<td>
<pre lang="javascript">
const isValidProject = tns.projectService.isValidNativeScriptProject("/tmp/myProject");
</pre>
        </td>
    	<td>
<pre lang="typescript">
const isValidProject = tns.projectService.isValidNativeScriptProject("/tmp/myProject");
</pre>
        </td>
    </tr>
</table>

## npm
`npm` module provides a way to interact with npm specifically the use of install, uninstall, search and view commands.

### install
Installs specified package. Note that you can use the third argument in order to pass different options to the installation like `ignore-scripts`, `save` or `save-exact` which work exactly like they would if you would execute npm from the command line and pass them as `--` flags.
* Auxiliary interfaces:
```TypeScript
/**
 * Describes information about installed package.
 */
interface INpmInstallResultInfo {
	/**
	 * Installed package's name.
	 * @type {string}
	 */
	name: string;
	/**
	 * Installed package's version.
	 * @type {string}
	 */
	version: string;
	/**
	 * The original output that npm CLI produced upon installation.
	 * @type {INpmInstallCLIResult}
	 */
	originalOutput: INpmInstallCLIResult;
}
```

* Definition:
```TypeScript
/**
 * Installs dependency
 * @param  {string}                            packageName The name of the dependency - can be a path, a url or a string.
 * @param  {string}                            pathToSave  The destination of the installation.
 * @param  {IDictionary<string | boolean>} config      Additional options that can be passed to manipulate installation.
 * @return {Promise<INpmInstallResultInfo>}                Information about installed package.
*/
install(packageName: string, pathToSave: string, config: IDictionary<string | boolean>): Promise<INpmInstallResultInfo>;
```

* Usage:
```JavaScript
tns.npm.install("lodash", "/tmp/myProject", { save: true }).then(result => {
	console.log(`${result.name} installed successfully`);
}, err => {
	console.log("An error occurred during installation", err);
});
```

### uninstall
Uninstalls a specified package.

* Definition:
```TypeScript
/**
 * Uninstalls a dependency
 * @param  {string}                            packageName The name of the dependency.
 * @param  {IDictionary<string | boolean>} config      Additional options that can be passed to manipulate  uninstallation.
 * @param  {string}                            path  The destination of the uninstallation.
 * @return {Promise<any>}                The output of the uninstallation.
*/
uninstall(packageName: string, config?: IDictionary<string | boolean>, path?: string): Promise<string>;
```

* Usage:
```JavaScript
tns.npm.uninstall("lodash", "/tmp/myProject", { save: true }).then(output => {
	console.log(`Uninstalled successfully, output: ${output}`);
}, err => {
	console.log("An error occurred during uninstallation", err);
});
```

### search
Searches for a package using keywords.

* Definition:
```TypeScript
/**
 * Searches for a package.
 * @param  {string[]}                            filter Keywords with which to perform the search.
 * @param  {IDictionary<string | boolean>} config      Additional options that can be passed to manipulate search.
 * @return {Promise<string>}                The output of the uninstallation.
 */
search(filter: string[], config: IDictionary<string | boolean>): Promise<string>;
```

* Usage:
```JavaScript
tns.npm.search(["nativescript", "cloud"], { silent: true }).then(output => {
	console.log(`Found: ${output}`);
}, err => {
	console.log("An error occurred during searching", err);
});
```

### view
Provides information about a given package.

* Definition
```TypeScript
/**
 * Provides information about a given package.
 * @param  {string}                            packageName The name of the package.
 * @param  {IDictionary<string | boolean>} config      Additional options that can be passed to manipulate view.
 * @return {Promise<any>}                Object, containing information about the package.
 */
view(packageName: string, config: Object): Promise<any>;
```

* Usage:
```JavaScript
tns.npm.view(["nativescript"], {}).then(result => {
	console.log(`${result.name}'s latest version is ${result["dist-tags"].latest}`);
}, err => {
	console.log("An error occurred during viewing", err);
});
```

## How to add a new method to Public API
CLI is designed as command line tool and when it is used as a library, it does not give you access to all of the methods. This is mainly implementation detail. Most of the CLI's code is created to work in command line, not as a library, so before adding method to public API, most probably it will require some modification.
For example the `$options` injected module contains information about all `--` options passed on the terminal. When the CLI is used as a library, the options are not populated. Before adding method to public API, make sure its implementation does not rely on `$options`.

More information how to add a method to public API is available [here](https://github.com/telerik/mobile-cli-lib#how-to-make-a-method-public).
After that add each method that you've exposed to the tests in `tests/nativescript-cli-lib.ts` file. There you'll find an object describing each publicly available module and the methods that you can call.
