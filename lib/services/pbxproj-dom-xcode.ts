import * as PbxprojDomXcodeModule from "pbxproj-dom/xcode";

declare global {
	type IPbxprojDomXcode = typeof PbxprojDomXcodeModule;
}

$injector.register("pbxprojDomXcode", () => require("pbxproj-dom/xcode"), true);
