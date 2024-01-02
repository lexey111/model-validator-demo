import {useCallback, useEffect} from "react";

import {getValidationClass, hasErrors} from 'lx-model-validator';

import {
	ValidationMessageComponent,
	ValidationNoticeMessageComponent,
	ValidationWarningMessageComponent
} from 'lx-model-validator-react';
import {observer} from "mobx-react-lite";
import {UserStore} from "./form-mobx.storage.ts";

const textValidation = (await import('/src/pages/mobx/form-mobx.storage.ts?raw')).default;

const textCode = `import {observer} from "mobx-react-lite";
import {UserStore} from "./form-mobx.storage.ts";

export const FormMobx: React.FC = observer(() => {
	const handleChange = useCallback((fieldName: string, e: any) => {
		UserStore[fieldName] = e.target.value;
	}, []);
	...
`;

const textInputs = `<fieldset className={'mb-4'}>
	<label htmlFor="name" className={'text-sm'}>Name</label>
	<input
		className={'validation-' + getValidationClass(UserStore.validationResult, 'name')}
		type="text"
		id="name"
		onChange={(e) => handleChange('name', e)}
		value={UserStore.name}/>

	<ValidationMessageComponent field={'name'} result={UserStore.validationResult}/>
</fieldset>`;


export const FormMobx: React.FC = observer(() => {
	const handleChange = useCallback((fieldName: string, e: any) => {
		// @ts-ignore
		UserStore[fieldName] = e.target.value;
	}, []);

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
					MobX-based simple form
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
							className={'validation-' + getValidationClass(UserStore.validationResult, 'name')}
							type="text"
							id="name"
							onChange={(e) => handleChange('name', e)}
							value={UserStore.name}/>

						<ValidationMessageComponent field={'name'} result={UserStore.validationResult}/>
					</fieldset>
					<fieldset className={'mb-4'}>
						<label htmlFor="surname" className={'text-sm'}>Surname</label>
						<input
							className={'validation-' + getValidationClass(UserStore.validationResult, 'surname')}
							type="text"
							id="surname"
							onChange={(e) => handleChange('surname', e)}
							value={UserStore.surname}/>

						<ValidationWarningMessageComponent field={'surname'} result={UserStore.validationResult}/>

						<ValidationNoticeMessageComponent field={'surname'} result={UserStore.validationResult}/>
					</fieldset>
					<fieldset>
						<button
							className={'primary'}
							disabled={!UserStore.validationResult || hasErrors(UserStore.validationResult)}
							onClick={() => alert('OK')}
						>Submit
						</button>
						{hasErrors(UserStore.validationResult) &&
							<span className={"text-xs text-red-600 ml-2 font-bold"}>
							Total errors: {UserStore.validationResult?.stats?.total_errors}
						</span>}
					</fieldset>
				</form>
			</div>

			<div className={'bg-amber-100 rounded p-4 shadow'}>
				<pre>
                    {JSON.stringify({name: UserStore.name, surname: UserStore.surname}, null, 2)}
                </pre>
			</div>

			<div className={'bg-violet-100 rounded p-4 shadow'}>
				<pre>
                    {JSON.stringify(UserStore.validationResult, null, 2)}
                </pre>
			</div>
		</div>

		<div className={"description"}>
			<p className="mb-4">
				A fairly simple example of MobX and Model Validation integration.
			</p>
			<ul>
				<li>
					Create a <code className={'text'}>store</code> with <code className={'text'}>validationModel</code>,
				</li>
				<li>
					Add <code className={'text'}>reaction()</code> to start validation on any change,
				</li>
				<li>
					Profit!
				</li>
			</ul>
			<p className="mb-4">
				In a more sophisticated approach, there can be async- and debounced-validation, with spinners when
				validation is going on, etc.
			</p>
			<p className="mt-4">
				<a href="https://github.com/lexey111/model-validator-demo/blob/main/src/pages/mobx/form-mobx.page.tsx"
				   target="_blank">Github page</a> of this example. <a
				href="https://github.com/lexey111/model-validator-demo/blob/main/src/pages/mobx/form-mobx.storage.ts"
				target="_blank">Page</a> of
				MobX Store for this example.
			</p>
		</div>

		<div className={"bg-gray-100 mt-4 w-full p-4 rounded shadow"}>
			<h2 className={'text-xl mb-4'}>Store</h2>
			<pre className={'prism'}>
				<code className={"language-ts"}>
					{textValidation}
				</code>
			</pre>
		</div>

		<div className={"bg-gray-100 mt-4 w-full p-4 rounded shadow"}>
			<h2 className={'text-xl mb-4'}>Code</h2>
			<pre className={'prism'}>
				<code className={"language-ts"}>
					{textCode}
				</code>
			</pre>
		</div>

		<div className={"bg-gray-100 mt-4 w-full p-4 rounded shadow rounded-b-xl"}>
			<h2 className={'text-xl mb-4'}>Component</h2>
			<pre className={'prism'}>
				<code className={"language-ts"}>
					{textInputs}
				</code>
			</pre>
		</div>
	</div>;
});
