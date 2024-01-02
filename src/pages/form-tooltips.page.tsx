import {useCallback, useEffect, useState} from "react";

import {
	getValidationClass,
	hasErrors,
	TValidationModel,
	TValidationResult,
	ValidationEngine,
	ValidatorStringContains,
	ValidatorStringLength,
	ValidatorStringRequired
} from 'lx-model-validator';

import {ValidationTooltipComponent} from 'lx-model-validator-react';
import {Tooltip} from "react-tooltip";
import {Switch} from "@headlessui/react";

const UserValidation: TValidationModel = {
	'name': {
		validators: [
			{
				validator: ValidatorStringRequired,
				message: 'Name is required'
			}, {
				validator: ValidatorStringLength,
				params: {min: 4, skipIfEmpty: true},
				message: 'At least 4 characters, please'
			}, {
				validator: ValidatorStringContains,
				params: {searchString: 'o', skipIfEmpty: true},
				message: 'Only names containing "o" are allowed'
			}
		]
	},
	'surname': {
		validators: [
			{
				level: 'notice',
				validator: ValidatorStringRequired,
				message: 'Surname is recommended to fill'
			}, {
				level: 'warning',
				validator: ValidatorStringLength,
				params: {min: 3, skipIfEmpty: true},
				message: 'At least 3 characters, please'
			}
		]
	},
};

const textValidation = `const UserValidation: TValidationModel = {
	'name': {
		validators: [
			{
				validator: ValidatorStringRequired,
				message: 'Name is required'
			}, {
				validator: ValidatorStringLength,
				params: {min: 4, skipIfEmpty: true},
				message: 'At least 4 characters, please'
			}, {
				validator: ValidatorStringContains,
				params: {searchString: 'o', skipIfEmpty: true},
				message: 'Only names containing "o" are allowed'
			}
		]
	},
	'surname': {
		validators: [
			{
				level: 'notice',
				validator: ValidatorStringRequired,
				message: 'Surname is recommended to fill'
			}, {
				level: 'warning',
				validator: ValidatorStringLength,
				params: {min: 3, skipIfEmpty: true},
				message: 'At least 3 characters, please'
			}
		]
	},
};
`;

const textButton = `<fieldset>
	<button
		className={'primary'}
		disabled={!validationResult || hasErrors(validationResult)}>Submit</button>

	{hasErrors(validationResult) && <span> Errors: {validationResult?.stats?.total_errors}</span>}
</fieldset>
`;

const textModel = `export const FormOne: React.FC = () => {
	const [model, setModel] = useState<any>({name: 'John', surname: 'Doe'})
	const [validationResult, setValidationResult] = useState<TValidationResult>();

	const handleChange = useCallback((fieldName: string, e: any) => {
		setModel((v: any) => ({...v, [fieldName]: e.target.value}));
	}, [model]);

	useEffect(() => {
		// run validation when model changes
		setValidationResult(ValidationEngine.validate(model, UserValidation));
	}, [model]);
`;

const textInputs = `<fieldset>
	<label htmlFor="name">Name</label>
	<div className={'field-with-tooltip'}>
		<input
			className={'validation-' + getValidationClass(validationResult, 'name')}
			type="text"
			id="name"
			onChange={(e) => handleChange('name', e)}
			value={model.name}/>

		<ValidationTooltipComponent
			field={'name'}
			showOk={showOk}
			showNumber={showNumber}
			result={validationResult} component={<Tooltip place={'right'}/>}/>
	</div>
</fieldset>`;

const textCSS = `.field-with-tooltip {
	@apply flex flex-row flex-nowrap items-center;
}

.validation-tooltip a {
	width: 22px;
	height: 22px;
	@apply flex flex-row bg-slate-500 rounded-2xl ml-2 relative shadow;
	@apply items-center content-center justify-center;
	@apply text-xs text-white text-center p-0 font-bold;
	@apply hover:no-underline;
}

.validation-tooltip a.with-number:before {
	display: none;
}

.validation-tooltip ul {
	list-style: disc;
	@apply mx-2;
}

.validation-tooltip.error a {
	@apply bg-red-600;
}

.validation-tooltip.warning a {
	@apply bg-amber-500;
}

...

.validation-tooltip a:before {
	content: '!';
	position: absolute;
	display: inline-block;
	text-align: center;
	vertical-align: text-top;
	color: white;
	top: 50%;
	left: 50%;
	line-height: 15px;
	font-weight: bold;
	padding: 0;
	margin: 0;
	font-size: 15px;
	width: 15px;
	height: 15px;
	transform: translateX(-50%) translateY(-50%);
}
...
.validation-tooltip.warning a:before {
	content: '!';
}
`;


export const FormTooltips: React.FC = () => {
	const [model, setModel] = useState<any>({name: 'John', surname: 'Doe'});
	const [validationResult, setValidationResult] = useState<TValidationResult>();
	const [showOk, setShowOk] = useState(true);
	const [showNumber, setShowNumber] = useState(false);

	const handleChange = useCallback((fieldName: string, e: any) => {
		setModel((v: any) => ({...v, [fieldName]: e.target.value}));
	}, [model]);

	useEffect(() => {
		// run validation when model changes
		setValidationResult(ValidationEngine.validate(model, UserValidation));
	}, [model]);

	useEffect(() => {
		setTimeout(() => {
			// @ts-ignore
			Prism.highlightAll();
		}, 0);
	}, []);

	return <div className="container animate-fadein">
		<div className={'grid grid-cols-3 gap-4 mb-1'}>
			<div className={'bg-blue-200 rounded px-4 py-2 shadow rounded-tl-xl'}>
				<h2 className={'text-xl mb-0'}>UI</h2>
				<p className={'mb-1 text-xs'}>
					Simple form, simple validation but with tooltips
				</p>
			</div>

			<div className={'bg-amber-200 rounded px-4 py-2 shadow'}>
				<h2 className={'text-xl mb-0'}>Model</h2>
				<p className={'mb-1 text-xs'}>
					Target data
				</p>
			</div>

			<div className={'bg-violet-200 rounded px-4 py-2 shadow rounded-tr-xl'}>
				<h2 className={'text-xl mb-0'}>Validation</h2>
				<p className={'mb-1 text-xs'}>
					Validation result
				</p>
			</div>
		</div>

		<div className={'grid grid-cols-3 gap-4'}>
			<div className={'bg-blue-100 rounded p-4 shadow'}>
				<form onSubmit={(e) => e.preventDefault()}>
					<fieldset className={'mb-4'}>
						<label htmlFor="name" className={'text-sm'}>Name</label>
						<div className={'field-with-tooltip'}>
							<input
								className={'validation-' + getValidationClass(validationResult, 'name')}
								type="text"
								id="name"
								onChange={(e) => handleChange('name', e)}
								value={model.name}/>

							<ValidationTooltipComponent
								field={'name'}
								showOk={showOk}
								showNumber={showNumber}
								result={validationResult} component={<Tooltip place={'right'}/>}/>
						</div>
					</fieldset>
					<fieldset className={'mb-4'}>
						<label htmlFor="surname" className={'text-sm'}>Surname</label>
						<div className={'field-with-tooltip'}>
							<input
								className={'validation-' + getValidationClass(validationResult, 'surname')}
								type="text"
								id="surname"
								onChange={(e) => handleChange('surname', e)}
								value={model.surname}/>

							<ValidationTooltipComponent
								field={'surname'}
								showOk={showOk}
								showNumber={showNumber}
								result={validationResult} component={<Tooltip place={'right'}/>}/>
						</div>
					</fieldset>
					<fieldset>
						<button
							className={'primary'}
							disabled={!validationResult || hasErrors(validationResult)}
							onClick={() => alert('OK')}
						>Submit
						</button>
						{hasErrors(validationResult) && <span className={"text-xs text-red-600 ml-2 font-bold"}>
							Total errors: {validationResult?.stats?.total_errors}
						</span>}
					</fieldset>
				</form>

				<hr className="my-3 h-0.5 border-t-0 bg-blue-300"/>

				<div className="mt-4 w-full flex flex-row items-center">
					<Switch
						checked={showOk}
						onChange={setShowOk}
						className={`${
							showOk ? 'bg-blue-600' : 'bg-gray-300'
						} relative inline-flex h-6 w-11 items-center rounded-full`}
					>
						<span className="sr-only">Show when OK</span>
						<span
							className={`${
								showOk ? 'translate-x-6' : 'translate-x-1'
							} inline-block h-4 w-4 transform rounded-full bg-white transition`}
						/>
					</Switch>
					<span className="text-sm text-slate-700 ml-2">Show marks when OK</span>
				</div>

				<div className="mt-4 w-full flex flex-row items-center">
					<Switch
						checked={showNumber}
						onChange={setShowNumber}
						className={`${
							showNumber ? 'bg-blue-600' : 'bg-gray-300'
						} relative inline-flex h-6 w-11 items-center rounded-full`}
					>
						<span className="sr-only">Show numbers</span>
						<span
							className={`${
								showNumber ? 'translate-x-6' : 'translate-x-1'
							} inline-block h-4 w-4 transform rounded-full bg-white transition`}
						/>
					</Switch>
					<span className="text-sm text-slate-700 ml-2">Show numbers</span>
				</div>

				<hr className="my-3 h-0.5 border-t-0 bg-blue-300"/>
				<p className="text-xs italic p-4 opacity-50 text-center">
					Edit values to see how it works. Move pointer over error mark to see the tooltip.
				</p>
			</div>

			<div className={'bg-amber-100 rounded p-4 shadow'}>
				<pre>
                    {JSON.stringify(model, null, 2)}
                </pre>
			</div>

			<div className={'bg-violet-100 rounded p-4 shadow'}>
				<pre>
                    {JSON.stringify(validationResult, null, 2)}
                </pre>
			</div>
		</div>

		<div className={"description"}>
			<p className="mb-4">
				It's the same "simple" form, but with validation messages in tooltips.
			</p>

			<p className="mb-4">
				It uses <a href="https://react-tooltip.com/" target="_blank">React Tooltip</a> component to display the
				state, but technically can use any component which receives <code className={'text'}>children</code> and
				the similar markup.
			</p>

			<p className="mt-4">
				<a href="https://github.com/lexey111/model-validator-demo/blob/main/src/pages/form-tooltips.page.tsx" target="_blank">Github page</a> of this example.
			</p>
		</div>

		<div className={"bg-gray-100 mt-4 w-full p-4 rounded shadow"}>
			<h2 className={'text-xl mb-4'}>Validation model</h2>
			<pre className={'prism'}>
				<code className={"language-ts"}>
					{textValidation}
				</code>
			</pre>
		</div>

		<div className={"bg-gray-100 mt-4 w-full p-4 rounded shadow"}>
			<h2 className={'text-xl mb-4'}>Component</h2>
			<pre className={'prism'}>
				<code className={"language-ts"}>
					{textModel}
				</code>
				<p className={'py-4 italic text-slate-400'}>...input...</p>
				<code className={'language-tsx'}>
					{textInputs}
				</code>
				<p className={'py-4 italic text-slate-400'}>...button...</p>
				<code className={'language-tsx'}>
					{textButton}
				</code>
			</pre>
		</div>

		<div className={"bg-gray-100 mt-4 w-full p-4 rounded shadow rounded-b-xl"}>
			<h2 className={'text-xl mb-4'}>CSS</h2>
			<pre className={'prism'}>
				<code className={'language-css'}>
					{textCSS}
				</code>
			</pre>
		</div>
	</div>;
}
