import './index.css';
import './Markdown.css';
import './Typography.css';
import './Validation.css';
import './Controls.css';

import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, RouterProvider,} from "react-router-dom";
import {App} from './App.tsx';
import {FormSimple} from "./pages/form-simple.page.tsx";
import {Readme} from "./pages/validator.page.tsx";
import {Home} from "./pages/home.page.tsx";
import {FormAggregate} from "./pages/form-aggregate.page.tsx";
import {FormTooltips} from "./pages/form-tooltips.page.tsx";
import {FormArray} from "./pages/form-array.page.tsx";
import {FormArrayNested} from "./pages/form-array-nested.page.tsx";
import {FormMobx} from "./pages/mobx/form-mobx.page.tsx";
import {Helpers} from "./pages/helpers.page.tsx";
import {UI} from "./pages/ui.page.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App/>,
		children: [
			{
				path: 'mobx-form',
				element: <FormMobx/>
			},
			{
				path: 'array-nested-form',
				element: <FormArrayNested/>
			},
			{
				path: 'array-form',
				element: <FormArray/>
			},
			{
				path: 'tooltips-form',
				element: <FormTooltips/>
			},
			{
				path: 'aggregate-form',
				element: <FormAggregate/>
			},
			{
				path: 'simple-form',
				element: <FormSimple/>
			},
			{
				path: 'principles',
				element: <Readme/>
			},
			{
				path: 'helpers',
				element: <Helpers/>
			},
			{
				path: 'ui',
				element: <UI/>
			},
			{
				path: 'home',
				index: true,
				element: <Home/>
			},
			{
				path: '',
				element: <Navigate to={'/home'}/>
			},
			{
				path: '*',
				element: <Navigate to={'/home'}/>
			},
		]
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<RouterProvider router={router}/>,
)
