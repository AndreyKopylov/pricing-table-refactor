import React, { type FC, useMemo } from "react";
import type { RoleItem } from "../types";

type StagesBannerProps = {
	roles: RoleItem[];
};

export const StagesBanner: FC<StagesBannerProps> = ({ roles }) => {
	const stages = useMemo(
		() => ({
			evaluation: roles.filter((r) => r.role !== "master"),
			master: roles.filter((r) => r.role === "master"),
		}),
		[roles],
	);

	const payoutsCycle = useMemo(() => {
		const payouts = roles
			.filter(({ data }) => data.payouts_profit_split)
			.map(({ data }) => data.payouts_profit_split);

		return [...new Set(payouts)];
	}, [roles]);

	return (
		<div className="banner">
			<div className="stages">
				{stages.evaluation.length > 0 && (
					<div className="stage">
						<p className="title">Evaluation Stage</p>
						<p className="subtitle">
							({stages.evaluation.map((stage) => stage.role).join(" & ")})
						</p>
					</div>
				)}

				{stages.master.length > 0 && (
					<div className="stage">
						<p className="title">Master Stage</p>
						<p className="subtitle">(Master)</p>
					</div>
				)}
			</div>

			{payoutsCycle.length > 0 && (
				<div className="payouts">
					<p className="label">Reward Cycles</p>
					<div className="cycles">
						{payoutsCycle.map((payout) => (
							<div key={payout} className="cycle">
								<span className="check">✓</span>
								<span className="text">{payout}</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
