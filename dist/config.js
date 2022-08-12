var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { error } from '@actions/core';
import { IsString, MinLength, ValidateNested } from 'class-validator';
export class Config {
    constructor(config) {
        this._policy = config.policy.map(item => new PolicyItem(item));
    }
    get policy() {
        return this._policy;
    }
    static async getConfig(context) {
        const retrievedConfig = await context.config('development-freeze.yml');
        if (Config.isConfigEmpty(retrievedConfig)) {
            error(``);
            throw new Error();
        }
        const config = new this(retrievedConfig);
        return config;
    }
    static isConfigEmpty(config) {
        return config === null;
    }
}
__decorate([
    ValidateNested()
], Config.prototype, "_policy", void 0);
class PolicyItem {
    constructor(item) {
        this._tags = item.tags;
        this._feedback = new Feedback(item.feedback);
    }
    get tags() {
        return this._tags;
    }
    get feedback() {
        return this._feedback;
    }
}
__decorate([
    MinLength(1, {
        each: true,
    })
], PolicyItem.prototype, "_tags", void 0);
__decorate([
    ValidateNested()
], PolicyItem.prototype, "_feedback", void 0);
class Feedback {
    constructor(feedback) {
        this._freezedState = feedback['freezed-state'];
        this._unFreezedState = feedback['un-freezed-state'];
    }
    get freezedState() {
        return this._freezedState;
    }
    get unFreezedState() {
        return this._unFreezedState;
    }
}
__decorate([
    IsString()
], Feedback.prototype, "_freezedState", void 0);
__decorate([
    IsString()
], Feedback.prototype, "_unFreezedState", void 0);
//# sourceMappingURL=config.js.map