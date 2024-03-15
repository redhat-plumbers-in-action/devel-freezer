export class FreezerError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
export function raise(error, code) {
    throw new FreezerError(error, code);
}
//# sourceMappingURL=error.js.map