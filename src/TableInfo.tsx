import React, { type FC, useMemo } from "react";
import type { Models, RoleItem } from "../types";
import { getVisibleFields, DASH } from "./config";

export type TableInfoProps = {
	roles: RoleItem[];
	model: Models;
};

export const TableInfo: FC<TableInfoProps> = ({ roles, model }) => {
	const visibleFields = useMemo(
		() => getVisibleFields(roles, model),
		[roles, model],
	);

	return (
		<div className="table-info">
			<table className="pricing-table">
				<thead>
					<tr>
						<th />
						{roles.map(({ role }, i) => (
							<th key={role}>
								<div className="stage-number">{i + 1}</div>
								<div className="stage-name">{role}</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{visibleFields.map((field) => (
						<tr key={field.key}>
							<td className="parameter-title">{field.title}</td>
							{roles.map((roleItem) => {
								const value = field.renderValue
									? field.renderValue(roleItem, model)
									: roleItem.data[field.key];

								return (
									<td key={`${roleItem.role}-${field.key}`}>
										{(field.showByConditions?.(roleItem, model) ?? true) ? (value ?? DASH) : DASH}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
