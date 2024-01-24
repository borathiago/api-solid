export class MaxNumberOsCheckInsError extends Error {
    constructor() {
        super('Max check-ins reached.')
    }
}
