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

import {
	ValidationAnyMessageComponent,
	ValidationMessageComponent,
	ValidationNoticeMessageComponent,
	ValidationWarningMessageComponent
} from 'lx-model-validator-react';

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
	<input
		className={'validation-' + getValidationClass(validationResult, 'name')}
		type="text"
		id="name"
		onChange={(e) => handleChange('name', e)}
		value={model.name}/>

	<ValidationMessageComponent field={'name'} result={validationResult}/>
</fieldset>`;


export const FormSimple: React.FC = () => {
	const [model, setModel] = useState<any>({name: 'John', surname: 'Doe'});
	const [validationResult, setValidationResult] = useState<TValidationResult>();

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
					Simple form, simple validation
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
						<input
							className={'validation-' + getValidationClass(validationResult, 'name')}
							type="text"
							id="name"
							onChange={(e) => handleChange('name', e)}
							value={model.name}/>

						<ValidationMessageComponent field={'name'} result={validationResult}/>
					</fieldset>
					<fieldset className={'mb-4'}>
						<label htmlFor="surname" className={'text-sm'}>Surname</label>
						<input
							className={'validation-' + getValidationClass(validationResult, 'surname')}
							type="text"
							id="surname"
							onChange={(e) => handleChange('surname', e)}
							value={model.surname}/>

						<ValidationWarningMessageComponent field={'surname'} result={validationResult}/>

						<ValidationNoticeMessageComponent field={'surname'} result={validationResult}/>
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
				<p className={"text-sm font-bold text-slate-500 my-2"}>
					Wildcards
				</p>
				<p className={"text-xs font-bold text-slate-500 my-2"}>
					Any message type for any field:
				</p>
				<ValidationAnyMessageComponent result={validationResult}/>

				<p className={"text-xs font-bold text-slate-500 my-2"}>
					Errors and warnings type for any field:
				</p>
				<ValidationAnyMessageComponent result={validationResult} types={['error', 'warning']}/>

				<hr className="my-3 h-0.5 border-t-0 bg-blue-300"/>
				<p className="text-xs italic p-4 opacity-50 text-center">
					Edit values to see how it works
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
				It's just a form with "direct" validation. A couple of fields, a couple of rules, all three possible
				levels of violation: <code className="text">error</code>, <code
				className="text">warning</code> and <code className="text">notice</code> with dynamic
				classes and helper functions.
			</p>
			<ul>
				<li>
					<code className="text">getValidationClass()</code>
				</li>
				<li>
					<code className="text">&lt;ValidationMessageComponent/&gt;</code> and its derivatives
				</li>
				<li>
					<code className="text">hasErrors()</code>
				</li>
			</ul>
			<p className="mt-4">
				<a href="https://github.com/lexey111/model-validator-demo/blob/main/src/pages/form-simple.page.tsx" target="_blank">Github page</a> of this example.
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

		<div className={"bg-gray-100 mt-4 w-full p-4 rounded shadow rounded-b-xl"}>
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
	</div>;
}
