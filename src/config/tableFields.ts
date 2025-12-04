import type { RoleItem, Models } from "../../types";
import type { FieldConfig } from "./types";
import { DASH } from "./constants";

function hasValue(value: string | undefined): boolean {
	return value !== undefined && value !== null && value !== "" && value !== DASH;
}

export const tableFields: FieldConfig[] = [
	{
		key: "profit_target",
		title: "Profit Target",
		showByConditions: (role) =>
			role.role === "student" && hasValue(role.data.profit_target),
	},
	{
		key: "maximum_overall_loss",
		title: "Max. EOD Trailing Loss",
	},
	{
		key: "maximum_daily_loss",
		title: "Maximum Daily Loss",
	},
	{
		key: "minimum_trading_days",
		title: "Minimum Trading Days",
		showByConditions: (role) =>
			role.role === "student" && hasValue(role.data.minimum_trading_days),
	},
	{
		key: "consistency",
		title: "Consistency",
		showByConditions: (role) => hasValue(role.data.consistency),
	},
	{
		key: "leverage",
		title: "Leverage",
		showByConditions: (role) => hasValue(role.data.leverage),
	},
	{
		key: "payouts_profit_split",
		title: "Rewards & Split",
		showByConditions: (role) =>
			role.role === "master" && hasValue(role.data.payouts_profit_split),
	},
	{
		key: "max_contracts",
		title: "Contracts",
		showByConditions: (role) => hasValue(role.data.max_contracts),
	},
	{
		key: "account_fee",
		title: "Account Fee",
		showByConditions: (role) => hasValue(role.data.account_fee),
	},
	{
		key: "activation_fee",
		title: "Activation Fee",
		showByConditions: (role) =>
			role.role === "master" && hasValue(role.data.activation_fee),
	},
	{
		key: "reward_cap",
		title: "Reward Cap",
		showByConditions: (role) =>
			role.role === "student" && hasValue(role.data.reward_cap),
	},
];

export function getVisibleFields(
	roles: RoleItem[],
	model: Models,
): FieldConfig[] {
	return tableFields.filter((field) =>
		roles.some((role) => field.showByConditions?.(role, model) ?? true),
	);
}

 