module.exports = class ValidationError {
    constructor(code, errorMessage) {
        this.name='ValidationError'
        this.code = code;
        if (typeof (errorMessage) === 'string') {
            this.errorMessage = [errorMessage];
        } else {
            this.errorMessage = errorMessage;
        }
    }
};
