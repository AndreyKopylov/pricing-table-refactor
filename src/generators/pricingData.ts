import {
	generateTradingData,
	generateModelsMap,
	generateStepsMap,
} from "./generateData";

export const pricingTableData = generateTradingData();
export const modelsMap = generateModelsMap();
export const stepsMap = generateStepsMap();
