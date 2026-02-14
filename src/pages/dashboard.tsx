import { AddActivity, AddClaim, AddWeapon } from "~/components";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const DashboardPage = () => {
	return (
		<Card class="my-8">
			<CardHeader>
				<CardTitle class="text-2xl">Vad vill du göra?</CardTitle>
			</CardHeader>
			<CardContent>
				<p class="text-muted-foreground mb-6">
				</p>
				<nav class="flex flex-col md:flex-row gap-4 justify-stretch">
					<AddActivity />
					<AddClaim />
					<AddWeapon />
				</nav>
			</CardContent>
		</Card>
	);
};

export default DashboardPage;
