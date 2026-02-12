import {
	AddActivity,
	AddClaim,
	ButtonContained
} from "@/components";

import BookIcon from "@suid/icons-material/Book";

export const DashboardPage = () => {

	return (
		<>
			<nav class="m-4 border rounded-md border-slate-700 p-8">
				<ul class="flex flex-col md:flex-row gap-8 justify-center">
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
							route="/weapons"
							fullWidth
						>
							<BookIcon fontSize="small" /> Vapen
						</ButtonContained>
					</li>
				</ul>
			</nav>
		</>
	);
}

export default DashboardPage;
