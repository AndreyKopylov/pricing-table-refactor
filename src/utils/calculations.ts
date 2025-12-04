import type { AccountSize } from "../../types";
import { BASE_ACCOUNT } from "../config";

export function percent(percentValue: number, base: number): number {
	return (percentValue / 100) * base;
}

export function scaleByAccount(
	baseValue: number,
	accountSize: AccountSize,
): number {
	const accountSizeNum = Number.parseInt(accountSize);
	const multiplier = accountSizeNum / BASE_ACCOUNT;

	return baseValue * multiplier;
}

export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	}).format(amount);
}

