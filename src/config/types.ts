import type { AccountSize, Models, StepKey, RoleItem, RoleData } from "../../types";

export type RoleType = "student" | "master";

export interface ModelConfig {
	id: Models;
	name: string;
	stepKey: StepKey;
	stepName: string;
	pricing: Record<AccountSize, number>;
	recurring: boolean;
	discount: number;
	profitTargetPercent?: number;
	maxLossPercent: number;
	dailyLossPercent?: number;
	consistencyPercent?: number;
	minTradingDays?: string;
	tradingPeriod?: string;
	payoutCycle?: string;
	profitSplit?: number;
	baseContracts: number | string;
	contractsScaling?: Partial<Record<AccountSize, number | string>>;
	roles: RoleType[];
	rewardCap?: string;
	leverage?: string;
	availableAccountSizes?: AccountSize[];
}

export interface FieldConfig {
	key: keyof RoleData;
	title: string;
	showByConditions?: (role: RoleItem, model: Models) => boolean;
	renderValue?: (role: RoleItem, model: Models) => string | undefined;
}
