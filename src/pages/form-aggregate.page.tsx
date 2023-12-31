import {useCallback, useEffect, useState} from "react";

import {
	countErrorsLike,
	getValidationClass,
	TValidationModel,
	TValidationResult,
	ValidationEngine,
	ValidatorStringContains,
	ValidatorStringLength,
	ValidatorStringRequired
} from 'model-validator';

import {ValidationAnyMessageComponent, ValidationMessageComponent} from 'model-validator-react';

const UserValidation: TValidationModel = {
	'user.personalData.name': {
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
				params: {searchString: 'a', skipIfEmpty: true},
				message: 'Only names containing "a" are allowed'
			}
		]
	},
	'user.personalData.surname': {
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
	'personalDataSection': {
		message: 'Invalid personal data',
		level: 'error',
		postvalidator: (_, result) => {
			return countErrorsLike('user.personalData', result) === 0;
		}
	}
};

const textValidation = `const UserValidation: TValidationModel = {
	'user.personalData.name': {
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
				params: {searchString: 'a', skipIfEmpty: true},
				message: 'Only names containing "a" are allowed'
			}
		]
	},
	'user.personalData.surname': {
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
	'personalDataSection': {
		message: 'Invalid personal data',
		level: 'error',
		postvalidator: (_, result) => {
			return countErrorsLike('user.personalData', result) === 0;
		}
	}
};`;

const textModel = `	const [model, setModel] = useState<any>({
	user: {
		personalData: {
			name: 'Jane',
			surname: 'Doe'
		},
	}
});

const [validationResult, setValidationResult] = useState<TValidationResult>();

const handleChange = useCallback((fieldName: string, e: any) => {
	setModel((v: any) => ({user: {personalData: {...v.user.personalData, [fieldName]: e.target.value}}}));
}, [model]);

useEffect(() => {
	// run validation when model changes
	setValidationResult(ValidationEngine.validate(model, UserValidation));
}, [model]);`;

const textButton = `<fieldset>
	<button
		className={'primary'}
		disabled={!validationResult || validationResult.stats.total_errors > 0}
		onClick={() => alert('OK')}
	>Submit
	</button>
</fieldset>`;

const textInputs = `<form className={'section-validation ' + getValidationClass(validationResult, 'personalDataSection')}>
	<fieldset>
		<label htmlFor="name">Name</label>
		<input
			className={'validation-' + getValidationClass(validationResult, 'user.personalData.name')}
			type="text"
			id="name"
			onChange={(e) => handleChange('name', e)}
			value={model.user.personalData.name}/>

		<ValidationMessageComponent field={'user.personalData.name'} result={validationResult}/>
	</fieldset>
	...
`;


export const FormAggregate: React.FC = () => {
	const [model, setModel] = useState<any>({
		user: {
			personalData: {
				name: 'Jane',
				surname: 'Doe'
			},
		}
	});

	const [validationResult, setValidationResult] = useState<TValidationResult>();

	const handleChange = useCallback((fieldName: string, e: any) => {
		setModel((v: any) => ({user: {personalData: {...v.user.personalData, [fieldName]: e.target.value}}}));
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
					Nested fields, aggregate validation
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
				<form onSubmit={(e) => e.preventDefault()}
				      className={'section-validation ' + getValidationClass(validationResult, 'personalDataSection')}>
					<fieldset className={'mb-4'}>
						<label htmlFor="name" className={'text-sm'}>Name</label>
						<input
							className={'validation-' + getValidationClass(validationResult, 'user.personalData.name')}
							type="text"
							id="name"
							onChange={(e) => handleChange('name', e)}
							value={model.user.personalData.name}/>

						<ValidationMessageComponent field={'user.personalData.name'} result={validationResult}/>
					</fieldset>
					<fieldset className={'mb-4'}>
						<label htmlFor="surname" className={'text-sm'}>Surname</label>
						<input
							className={'validation-' + getValidationClass(validationResult, 'user.personalData.surname')}
							type="text"
							id="surname"
							onChange={(e) => handleChange('surname', e)}
							value={model.user.personalData.surname}/>

						<ValidationAnyMessageComponent field={'user.personalData.surname'} result={validationResult}
						                               types={['warning', 'notice']}/>
					</fieldset>

					<fieldset>
						<button
							className={'primary'}
							disabled={!validationResult || validationResult.stats.total_errors > 0}
							onClick={() => alert('OK')}
						>Submit
						</button>
					</fieldset>

					<ValidationAnyMessageComponent field={'personalDataSection'} result={validationResult} />
				</form>

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
			<p>
				So-called "aggregate" validation is demonstrated. In addition to direct nested validators like <code
				className="text">user.personalData.name</code>, "virtual" post validation is also implemented here there
				for <code className="text">personalDataSection</code>.
			</p>

			<p className="mt-4">
				This function checks is there any violation of "error" level in <code
				className="text">user.personalData...</code> and applies corresponding class to the form section.
			</p>

			<p className="mt-4">
				<a href="#" target="_blank">Github page</a> of this example.
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
