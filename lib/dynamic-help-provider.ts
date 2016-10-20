import * as constants from './constants';
import Future = require("fibers/future");

export class DynamicHelpProvider implements IDynamicHelpProvider {
	public async isProjectType(args: string[]): Promise<boolean> {
return true;
	}

	public async getLocalVariables(options: { isHtml: boolean }): Promise<IDictionary<any>> {
		let localVariables: IDictionary<any> = {
			constants: constants
		};
		return localVariables;
	}
}
$injector.register("dynamicHelpProvider", DynamicHelpProvider);
