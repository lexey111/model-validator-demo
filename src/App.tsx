import {Menu} from "./menu/Menu.tsx";
import './App.css';
import {Outlet} from "react-router-dom";

export const App: React.FC = () => {
	return <>
		<Menu/>
		<div className={'app-content'}>

			<Outlet/>

			<p className={'mt-20 text-xs text-slate-400 text-center'}>
				&copy; 2023-2024, Oleksii Koshkin aka lexey111
			</p>
		</div>
	</>;
};
