const n=`# React bindings

For sure, you can use raw Model Validator functions, but I find it more convenient to have common react components for common tasks.

This package is for them. Just bindings: _headless_ components that use Model Validator helpers.

>_Headless_ means that they do not contain any CSS styles.

**You can see all these components in the examples (yellow items in the side menu).**

## ValidationMessageComponent

This is the root component to display the violations.

\`\`\`tsx
type TValidationMessageComponentProps = {
	type?: 'error' | 'warning' | 'notice'
	field?: string
	result?: TValidationResult
}
const ValidationMessageComponent: React.FC<TValidationMessageComponentProps> = (...) => {
	...
	return <div className={'validation-messages ' + type}>
		{allMessages.map((messageKey: string, idx:number) => {
			return <div className={'validation-message'} key={idx}>{messageKey}</div>;
		})}
	</div>;
};
\`\`\`

Properties:

* \`type\`, one of \`error\`, \`warning\` or \`notice, dfefault \`error\`,
* \`field\` to check (the \`key\` in terms of Validator's helper functions),
* \`result\` to process.

Usage:

\`\`\`tsx
<fieldset>
	<label htmlFor="name">Name</label>
	<input className={'validation-' + getValidationClass(validationResult, 'name')}
		type="text"
		id="name"
		onChange={(e) => handleChange('name', e)}
		value={model.name}/>

	<ValidationMessageComponent field={'name'} result={validationResult}/>
</fieldset>

\`\`\`

## ValidationAnyMessageComponent

This is the dispatching component. As you can see, it just wraps up the calls of \`ValidationMessageComponent\` with corresponding settings: 

\`\`\`tsx
type TValidationAnyMessageComponentProps = {
	field?: string
	types?: Array<string> // 'error' | 'warning' | 'notice'
	result?: TValidationResult
}
const ValidationAnyMessageComponent: React.FC<TValidationAnyMessageComponentProps> = ({...}) => {
	return <>
		{(!types || types.includes('error')) &&
			<ValidationMessageComponent type={'error'} field={field} result={result}/>}

		{(!types || types.includes('warning')) &&
			<ValidationMessageComponent type={'warning'} field={field} result={result}/>}

		{(!types || types.includes('notice')) && 
		    <ValidationMessageComponent type={'notice'} field={field} result={result}/>}
	</>;
};
\`\`\`

Properties:

* \`field\` to check (the \`key\` in terms of Validator's helper functions),
* optional \`types\`,
* \`result\` to process.

This is an extended version of \`ValidationMessageComponent\` which allows you to display not just one type of violations (\`errors\`, \`warning\`, \`notices\`) but the required set.

Usage:

\`\`\`tsx
<h1>Errors:</h1>

<ValidationAnyMessageComponent result={validationResult}/>
\`\`\`

## ValidationErrorMessageComponent

Wrapper for \`<ValidationMessageComponent>\` with predefined \`type={'error'}\`

## ValidationWarningMessageComponent

Wrapper for \`<ValidationMessageComponent>\` with predefined \`type={'warning'}\`

## ValidationNoticeMessageComponent

Wrapper for \`<ValidationMessageComponent>\` with predefined \`type={'notice'}\`


## ValidationTooltipComponent

This component is designed to work together with [React tooltip](https://www.npmjs.com/package/react-tooltip) component.

\`\`\`tsx
type TValidationTooltipComponentProps = {
	field: string
	component: any
	result?: TValidationResult
	showOk?: boolean
	showNumber?: boolean
}
const ValidationTooltipComponent: React.FC<TValidationTooltipComponentProps> = (...) => {
	if (!result) {
		return null;
	}

    ...

	return <div className={'validation-tooltip ' + level}>
		<a data-tooltip-id={'validation-' + field} className={showNumber ? 'with-number' : ''}>{showNumber ? count : ''}</a>
		{element}
	</div>;
};
\`\`\`

Properties:
* \`field\` to check (the \`key\` in terms of Validator's helper functions),
* \`component\` – target component which \`children\` will be replaced with
    \`\`\`tsx
    <ul>
        {errors?.map(str => <li key={str}>{str}</li>)}
        {warnings?.map(str => <li key={str}>{str}</li>)}
        {notices?.map(str => <li key={str}>{str}</li>)}
    </ul>
    \`\`\`
* \`result\` to process,
* \`showOk\` to display the component even if there are no errors:
    \`\`\`tsx
    <div className={'validation-tooltip ok'}>
        <a data-tooltip-id={'validation-' + field}></a>
    </div>
    \`\`\`
* \`showNumber\` to output the number ov violation inside \`<a></a>\` tag.


Usage:

\`\`\`tsx
<fieldset>
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
</fieldset>
\`\`\`
`;export{n as default};
