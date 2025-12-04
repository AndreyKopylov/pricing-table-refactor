export const BASE_ACCOUNT = 25000;

export const DASH = "-" as const;

export const PAYOUT_CYCLES = {
	TRADING_5: "Every 5 trading days",
	TRADING_7: "Every 7 trading days",
	CALENDAR_7: "Every 7 calendar days",
} as const;

export const CONTRACT_TYPES = {
	MINI_1_MICRO_5: "1 Mini or 5 Micros",
	MINI_3_MICRO_15: "3 Mini or 15 Micros",
} as const;

export const TRADING_PERIODS = {
	UNLIMITED: "Unlimited",
	ONE_DAY: "1 Day",
} as const;

export const DEFAULTS = {
	tradingPeriod: TRADING_PERIODS.UNLIMITED,
	profitSplit: 90,
} as const;
