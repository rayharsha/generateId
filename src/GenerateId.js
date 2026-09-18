import { randomInt } from "node:crypto";
class GenerateId {
#length;
#chars;
#maxAttempts;


    constructor(options = {}) {
        this.#length = options.length ?? 8;
        this.#chars = options.chars ?? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        this.#maxAttempts = options.maxAttempts ?? 1000;

    if (!Number.isInteger(this.#length) || this.#length <= 0) {
            throw new TypeError("length must be a positive integer.");
        }

        if (typeof this.#chars !== "string" || this.#chars.length === 0) {
            throw new TypeError("chars must be a non-empty string.");
        }
        if (
            !Number.isInteger(this.#maxAttempts) ||
            this.#maxAttempts <= 0
        ) {
            throw new TypeError("maxAttempts must be a positive integer.");
        }
    }

    generate(validationCallback) {
 if (typeof validationCallback !== "function") {
            throw new TypeError("validationCallback must be a function.");
        }

        for (let attempt = 1; attempt <= this.#maxAttempts; attempt++) {
            const id = this.#generateId();

            if (validationCallback(id)) {
                return id;
            }
        }
        throw new Error(
            `Unable to generate a unique ID after ${this.#maxAttempts} attempts.`
        );

    }
    #generateId() {
        let id = "";
        
            for (let index = 0; index < this.#length; index++) {
               id += this.#chars[randomInt(this.#chars.length)];
            }
            return id;
        }
    }
  

export default GenerateId;