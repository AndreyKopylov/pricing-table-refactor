import type { AccountSize } from "../../types";
import type { ModelConfig } from "./types";
import {
	PAYOUT_CYCLES,
	TRADING_PERIODS,
	CONTRACT_TYPES,
} from "./constants";

const ALL_ACCOUNT_SIZES: AccountSize[] = ["25000", "50000", "100000"];

export const models: ModelConfig[] = [
	{
		id: "fundingticks_pro",
		name: "FundingTicks Pro",
		stepKey: "one_step_pro_plus",
		stepName: "Pro+",
		pricing: { "25000": 99, "50000": 125, "100000": 199 },
		recurring: true,
		discount: 35,
		profitTargetPercent: 6,
		maxLossPercent: 4,
		consistencyPercent: 40,
		minTradingDays: "3",
		payoutCycle: PAYOUT_CYCLES.TRADING_5,
		baseContracts: 2,
		roles: ["student", "master"],
		rewardCap: "$5000",
	},
	{
		id: "fundingticks_zero",
		name: "FundingTicks Zero",
		stepKey: "zero",
		stepName: "Zero",
		pricing: { "25000": 333, "50000": 499, "100000": 599 },
		recurring: false,
		discount: 35,
		maxLossPercent: 4,
		consistencyPercent: 25,
		payoutCycle: PAYOUT_CYCLES.TRADING_7,
		baseContracts: 1,
		contractsScaling: { "25000": 1, "50000": 3, "100000": 5 },
		roles: ["master"],
	},
	{
		id: "fundingticks_one_day_pass",
		name: "One Day Pass",
		stepKey: "one_day_pass",
		stepName: "One",
		pricing: { "25000": 112, "50000": 177, "100000": 312 },
		recurring: true,
		discount: 0,
		profitTargetPercent: 8,
		maxLossPercent: 3,
		dailyLossPercent: 2,
		tradingPeriod: TRADING_PERIODS.ONE_DAY,
		payoutCycle: PAYOUT_CYCLES.CALENDAR_7,
		baseContracts: CONTRACT_TYPES.MINI_1_MICRO_5,
		contractsScaling: {
			"25000": CONTRACT_TYPES.MINI_1_MICRO_5,
			"50000": CONTRACT_TYPES.MINI_3_MICRO_15,
		},
		roles: ["student", "master"],
		availableAccountSizes: ["25000", "50000"],
	},
];

export function getAvailableAccountSizes(
	model: ModelConfig,
): AccountSize[] {
	return model.availableAccountSizes ?? ALL_ACCOUNT_SIZES;
}

export function isModelAvailableForAccount(
	model: ModelConfig,
	accountSize: AccountSize,
): boolean {
	const available = getAvailableAccountSizes(model);
	return available.includes(accountSize);
}
