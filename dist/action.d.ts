import { CustomOctokit } from './octokit';
import { PullRequest } from './pull-request';
declare function action(pr: PullRequest, octokit: CustomOctokit): Promise<void>;
export default action;
