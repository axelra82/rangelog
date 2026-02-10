import "./styles/index.css";

import { SnackbarStack } from "./components/dialogue/snackbar-stack";
import { LayoutBottomBar, LayoutMainContent, LayoutMainMenu } from "./components/layout";
import { PieChart } from "./components/charts/pie";
import { Accessor, createSignal, onMount, ParentComponent, Setter } from "solid-js";
import { ColorMode, ListsCollectionModel } from "./types";
import { listLists } from "./utilities/pocketbase";

interface AppProps {
	colorMode: Accessor<ColorMode>;
	setColorMode: Setter<ColorMode>;
}


const App: ParentComponent<AppProps> = (props) => {
	const [lists, listsSet] = createSignal<ListsCollectionModel[]>([]);

	onMount(async () => {
		listsSet(listLists);


		console.log("–––––––––––––––––––––––––––");
		console.log("lists: ", lists());

	});

	return (
		<>
			<div class="flex h-screen">
				<LayoutMainMenu lists={lists} />
				<div class="flex flex-col grow">
					<LayoutMainContent>
						{/* <PieChart
							data={[
								{
									brand: "momo",
									price: 400,
									weight: 20,
								},
								{
									brand: "other",
									price: 30,
									weight: 66,
								},
								{
									brand: "something",
									price: 809,
									weight: 1,
								},
								{
									brand: "etc",
									price: 23,
									weight: 90,
								},
							]
							}
						/> */}
					</LayoutMainContent>

					<LayoutBottomBar  {...props} />
				</div>
			</div>
			<SnackbarStack />
		</>
	)
};

export default App;
