import './Menu.css';
import {NavLink} from "react-router-dom";

export const Menu: React.FC = () => {
	return <div className={'main-menu'}>
		<div className={'main-menu-items'}>
			<h1 className="mt-4 mb-0 ml-3 text-2xl text-slate-100">
				Model Validator <span className={'text-xs text-indigo-800 bg-indigo-300 rounded p-1 opacity-70'}>v1.0.0</span>
			</h1>
			<h2 className="mt-0 mb-8 ml-3 text-xs text-slate-300">
				+React bindings | Demo
			</h2>
			<nav>
				<NavLink to="/home">
					Home
				</NavLink>

				<NavLink to="/principles">
					Model validator
				</NavLink>

				<NavLink to="/helpers">
					Helper functions
				</NavLink>

				<NavLink to="/ui">
					UI components
				</NavLink>

				<hr className="my-1 h-[1px] border-none bg-violet-400"/>
			</nav>

			<nav className={'examples'}>
				<NavLink to="/simple-form">
					Simple form
				</NavLink>

				<NavLink to="/aggregate-form">
					With aggregate
				</NavLink>

				<NavLink to="/tooltips-form">
					With tooltips
				</NavLink>

				<NavLink to="/array-form">
					Arrays
				</NavLink>

				<NavLink to="/array-nested-form">
					Arrays and structures
				</NavLink>

				<NavLink to="/mobx-form">
					MobX integration
				</NavLink>
			</nav>
		</div>
	</div>;
}
