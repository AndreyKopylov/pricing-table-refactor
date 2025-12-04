import type {
	TradingData,
	ModelsMap,
	StepsMap,
	RoleItem,
	RoleData,
	AccountSize,
} from "../../types";
import {
	models,
	type ModelConfig,
	type RoleType,
	getAvailableAccountSizes,
	DEFAULTS,
} from "../config";
import { formatCurrency, percent, scaleByAccount } from "../utils/calculations";

function getContracts(model: ModelConfig, accountSize: AccountSize): string {
	if (model.contractsScaling) {
		const value = model.contractsScaling[accountSize];
		if (value !== undefined) {
			return typeof value === "number" ? String(value) : value;
		}
	}
	if (typeof model.baseContracts === "number") {
		return String(scaleByAccount(model.baseContracts, accountSize));
	}
	return model.baseContracts;
}

function buildStudentData(model: ModelConfig, accountSize: AccountSize): RoleData {
	const acc = Number.parseInt(accountSize);
	const data: RoleData = {};

	data.trading_period = model.tradingPeriod ?? DEFAULTS.tradingPeriod;
	if (model.minTradingDays) {
		data.minimum_trading_days = model.minTradingDays;
	}
	data.maximum_overall_loss = formatCurrency(percent(model.maxLossPercent, acc));
	if (model.dailyLossPercent) {
		data.maximum_daily_loss = formatCurrency(percent(model.dailyLossPercent, acc));
	}
	if (model.profitTargetPercent) {
		data.profit_target = formatCurrency(percent(model.profitTargetPercent, acc));
	}
	if (model.consistencyPercent) {
		data.consistency = `${model.consistencyPercent}%`;
	}
	data.max_contracts = getContracts(model, accountSize);
	if (model.rewardCap) {
		data.reward_cap = model.rewardCap;
	}
	if (model.leverage) {
		data.leverage = model.leverage;
	}

	return data;
}

function buildMasterData(model: ModelConfig, accountSize: AccountSize): RoleData {
	const acc = Number.parseInt(accountSize);
	const data: RoleData = {};

	data.trading_period = DEFAULTS.tradingPeriod;
	data.maximum_overall_loss = formatCurrency(percent(model.maxLossPercent, acc));
	if (model.dailyLossPercent) {
		data.maximum_daily_loss = formatCurrency(percent(model.dailyLossPercent, acc));
	}
	if (model.payoutCycle) {
		const split = model.profitSplit ?? DEFAULTS.profitSplit;
		data.payouts_profit_split = `${model.payoutCycle} at ${split}% split`;
	}
	data.max_contracts = getContracts(model, accountSize);
	if (model.consistencyPercent) {
		data.consistency = `${model.consistencyPercent}%`;
	}
	if (model.leverage) {
		data.leverage = model.leverage;
	}

	return data;
}

function generateRoles(model: ModelConfig, accountSize: AccountSize): RoleItem[] {
	return model.roles.map((role: RoleType) => {
		if (role === "student") {
			return {
				role: "student",
				isFunded: false,
				data: buildStudentData(model, accountSize),
			};
		}
		return {
			role: "master",
			isFunded: true,
			data: buildMasterData(model, accountSize),
		};
	});
}

export function generateTradingData(): TradingData {
	const data: TradingData = {};

	for (const model of models) {
		const accountSizes = getAvailableAccountSizes(model);

		for (const accountSize of accountSizes) {
			if (!data[accountSize]) {
				data[accountSize] = { steps: {} };
			}

			const step = {
				price: 1,
				total_cost: model.pricing[accountSize],
				recurring: model.recurring,
				discount: model.discount,
				roles: generateRoles(model, accountSize),
			};

			Object.assign(data[accountSize].steps, { [model.stepKey]: step });
		}
	}

	return data;
}

export function generateModelsMap(): ModelsMap {
	const map: Partial<Record<string, string>> = {};
	for (const model of models) {
		map[model.id] = model.name;
	}
	return map;
}

export function generateStepsMap(): StepsMap {
	const map: Partial<Record<string, Array<{ key: string; name: string }>>> = {};
	for (const model of models) {
		map[model.id] = [
			{ key: model.stepKey, name: model.stepName },
		];
	}
	return map;
}
