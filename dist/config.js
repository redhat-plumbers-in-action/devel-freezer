var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { debug, getInput } from '@actions/core';
import { context } from '@actions/github';
import { ArrayMinSize, IsArray, IsString, MinLength, validate, ValidateNested, } from 'class-validator';
import { ValidationFeedback } from './validation-feedback';
export class Config {
    constructor(config) {
        this._policy = Array.isArray(config === null || config === void 0 ? void 0 : config.policy)
            ? config.policy.map(item => new PolicyItem(item))
            : [];
    }
    get policy() {
        return this._policy;
    }
    static async getConfig(octokit) {
        const path = getInput('config-path', { required: true });
        const retrievedConfig = (await octokit.config.get(Object.assign(Object.assign({}, context.repo), { path }))).config;
        debug(`Configuration '${path}': ${JSON.stringify(retrievedConfig)}`);
        if (Config.isConfigEmpty(retrievedConfig)) {
            throw new Error(`Missing configuration. Please setup 'devel-freezer' Action using 'development-freeze.yml' file.`);
        }
        const config = new this(retrievedConfig);
        return config;
    }
    static isConfigEmpty(config) {
        return config === null;
    }
    static async validate(instance) {
        const validationResult = await validate(instance, {
            whitelist: true,
            forbidNonWhitelisted: true,
        });
        const results = validationResult.map(error => {
            return ValidationFeedback.composeFeedbackObject(error);
        });
        return results;
    }
}
__decorate([
    IsArray(),
    ValidateNested({ each: true }),
    ArrayMinSize(1)
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
    IsString({ each: true }),
    MinLength(1, { each: true })
], PolicyItem.prototype, "_tags", void 0);
__decorate([
    ValidateNested()
], PolicyItem.prototype, "_feedback", void 0);
class Feedback {
    constructor(feedback) {
        this._frozenState = feedback['frozen-state'];
        this._unFreezeState = feedback['unfreeze-state'];
    }
    get frozenState() {
        return this._frozenState;
    }
    get unFreezeState() {
        return this._unFreezeState;
    }
}
__decorate([
    IsString(),
    MinLength(1)
], Feedback.prototype, "_frozenState", void 0);
__decorate([
    IsString(),
    MinLength(1)
], Feedback.prototype, "_unFreezeState", void 0);
//# sourceMappingURL=config.js.map