const a=`import {makeObservable, observable, reaction} from "mobx";
import {
	TValidationModel,
	TValidationResult,
	ValidationEngine,
	ValidatorStringContains,
	ValidatorStringLength,
	ValidatorStringRequired
} from "lx-model-validator";

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

class FormStore {
	name = 'John'
	surname = 'Doe'

	validationResult: TValidationResult = ValidationEngine.validate(this, UserValidation);

	constructor() {
		makeObservable(this, {
			name: observable,
			surname: observable,
			validationResult: observable
		});
	}
}

export const UserStore = new FormStore();

reaction(
	() => {
		return UserStore.name + ' ' + UserStore.surname; // to fire reaction on change
	}, () => {
		UserStore.validationResult = ValidationEngine.validate(UserStore, UserValidation);
	});
`;export{a as default};
