import { AddActivity, AddClaim, ButtonContained } from "@/components";
import { A } from "@solidjs/router";
import BookIcon from "@suid/icons-material/Book";

export const DashboardPage = () => {

	return (
		<>
			<nav class="m-4 border rounded-md border-slate-700 p-8">
				<ul class="flex gap-8">
					<li>
						<AddActivity />
					</li>
					<li>
						<AddClaim />
					</li>
					<li>
						<ButtonContained
							size="large"
							color="primary"
						>
							<A href="/weapons">
								<BookIcon fontSize="small" /> Vapen
							</A>
						</ButtonContained>
					</li>
				</ul>
			</nav>
		</>
	);
}

export default DashboardPage;
