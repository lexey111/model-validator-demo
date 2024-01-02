import {useCallback, useEffect, useState} from "react";

import {
	getValidationClass,
	hasError,
	hasErrors,
	TValidationModel,
	TValidationResult,
	ValidationEngine,
	ValidatorArrayLength,
	ValidatorStringContains,
	ValidatorStringLength,
	ValidatorStringRequired
} from 'lx-model-validator';

import { ValidationMessageComponent} from 'lx-model-validator-react';

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
	'titles[]': {
		validators: [
			{
				level: 'error',
				validator: ValidatorArrayLength,
				params: {min: 3},
				message: 'At least 3 titles must exist'
			}
		]
	},
	'titles[*]': {
		validators: [
			{
				validator: ValidatorStringRequired,
				message: 'Title is required'
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
	'titles[]': {
		validators: [
			{
				level: 'error',
				validator: ValidatorArrayLength,
				params: {min: 3},
				message: 'At least 3 titles must exist'
			}
		]
	},
	'titles[*]': {
		validators: [
			{
				validator: ValidatorStringRequired,
				message: 'Title is required'
			}
		]
	},
};`;

const textModel = `<fieldset>
	<label htmlFor="name">Name</label>
	<input
		className={'validation-' + getValidationClass(validationResult, 'name')}
		type="text"
		id="name"
		onChange={(e) => handleChange('name', e)}
		value={model.name}/>

	<ValidationMessageComponent field={'name'} result={validationResult}/>
</fieldset>

<div className={'section-validation ' + getValidationClass(validationResult, 'titles', false)}>
	{model.titles.map((title: string, idx: number) => {
		return <fieldset key={idx}>
			<label>Title {idx + 1}</label>
			<div>
				<input
					className={'validation-' + getValidationClass(validationResult, 'titles[' + idx + '}]')}
					type="text"
					onChange={(e) => handleChangeTitle(idx, e)}
					value={title}/>

				<button onClick={() => removeTitle(idx)}>-</button>
			</div>

			<ValidationMessageComponent field={'titles[' + idx ']'} result={validationResult}/>
		</fieldset>
	})}
	{hasError('titles[]', validationResult) && <ValidationMessageComponent field={'titles[]'} result={validationResult}/>}

	<button onClick={() => addTitle()}>+ Add title</button>
</div>`;


export const FormArray: React.FC = () => {
	const [model, setModel] = useState<any>({name: 'John', titles: ['Mr.', '']});
	const [validationResult, setValidationResult] = useState<TValidationResult>();

	const handleChange = useCallback((fieldName: string, e: any) => {
		setModel((v: any) => ({...v, [fieldName]: e.target.value}));
	}, [model]);

	const handleChangeTitle = useCallback((idx: number, e: any) => {
		const newTitles = [...model.titles];
		newTitles[idx] = e.target.value;

		setModel((v: any) => ({...v, titles: newTitles}));
	}, [model]);

	const removeTitle = useCallback((idx: number) => {
		const newTitles = [...model.titles];
		newTitles.splice(idx, 1);

		setModel((v: any) => ({...v, titles: newTitles}));
	}, [model]);

	const addTitle = useCallback(() => {
		const newTitles = [...model.titles, ''];

		setModel((v: any) => ({...v, titles: newTitles}));
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
					Validation of array and dynamic items
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

					<div className={'mb-8 section-validation ' + getValidationClass(validationResult, 'titles', false)}>
						{model.titles.map((title: string, idx: number) => {
							return <fieldset className={'mb-4'} key={idx}>
								<label className={'text-sm'}>Title {idx + 1}</label>
								<div className={'flex flex-row flex-nowrap items-center'}>
									<input
										className={'mr-2 validation-' + getValidationClass(validationResult, `titles[${idx}]`)}
										type="text"
										onChange={(e) => handleChangeTitle(idx, e)}
										value={title}/>

									<button className={'title-action danger'} onClick={() => removeTitle(idx)}>
										-
									</button>
								</div>

								<ValidationMessageComponent field={`titles[${idx}]`} result={validationResult}/>
							</fieldset>
						})}
						{hasError(/titles\[\d+]/, validationResult) && <div className={'my-4'}>
							<hr className="my-6 h-0.5 border-t-0 bg-red-500"/>
						</div>}

						{hasError('titles[]', validationResult) && <div className={'my-4'}>
							<ValidationMessageComponent field={'titles[]'} result={validationResult}/>
						</div>}

						<button className={'title-action'} onClick={() => addTitle()}>+ Add title</button>
					</div>

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
				This is a more complex form. It includes not only direct checking, but also aggregate checking,
				array-level checking and array element-level checking. </p>
			<ul>
				<li>
					<code className="text">getValidationClass()</code> and <code className="text">getValidationClass(,,
					exact = true)</code>
				</li>
				<li>
					<code className="text">&lt;ValidationMessageComponent/&gt;</code> and its derivatives,
				</li>
				<li>
					<code className="text">hasError(string, ...)</code> helper function,
				</li>
				<li>
					<code className="text">hasError(RegExp, ...)</code> helper function,
				</li>
				<li>
					<code className="text">hasErrors()</code> helper function.
				</li>
			</ul>
			<p className="mt-4">
				<a href="https://github.com/lexey111/model-validator-demo/blob/main/src/pages/form-array.page.tsx" target="_blank">Github page</a> of this example.
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
			</pre>
		</div>
	</div>;
}
