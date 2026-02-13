import { Severity } from "~/types";

export const severityColor = (severity: Severity) => ({
	error: "error.main",
	warning: "warning.main",
	info: "info.main",
	success: "success.main",
}[severity]);
