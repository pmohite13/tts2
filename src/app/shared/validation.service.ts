//Original version created by Cory Rylan: https://coryrylan.com/blog/angular-2-form-builder-and-validation-management
import { AbstractControl } from '@angular/forms';

export class ValidationService {

    static getValidatorErrorMessage(code: string) {
        let config = {
            'required': 'Required',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.'
        };
        return config[code];
    }

    static creditCardValidator(control: AbstractControl) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        } else {
            return { 'invalidCreditCard': true };
        }
    }

    static emailValidator(control: AbstractControl) {
        let value = control.value.toString();
        // RFC 2822 compliant regex
        if (value.match(/[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/)) {
            // if (value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static onlyNumberValidator(control: AbstractControl) {
        let value = control.value.toString();
        if (value.match(/^[0-9]*$/)) {
            return null;
        } else {
            return { 'isNotNumber': true };
        }
    }

    static phoneNumberValidator(control: AbstractControl) {
        let value = control.value.toString();
        if (value.match(/\+?\d[\d -]{8,12}\d/)) {
            return null;
        } else {
            return { 'invalidPhoneNumber': true };
        }
    }

    static passwordValidator(control: AbstractControl) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,100}$/)) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }
    static pincodeZeroValidator(control: AbstractControl) {
        if (Number(control.value) !== 0) {
            return null;
        } else {
            return { 'isPincodeZero': true };
        }
    }

    static time24HourValidator(control: AbstractControl) {
        let time = control.value;
        if (time) {
            let hours = Number(time.substr(0, time.indexOf(':')));
            if (hours >= 24) {
                return { 'isTime24HourNotValid': true }
            }
            let minutes = Number(time.substr(time.indexOf(':') + 1, time.length));
            if (minutes >= 60) {
                return { 'isTime24HourNotValid': true };
            }
            return null;
        } else {
            return { 'isTime24HourNotValid': true };
        }
    }

}