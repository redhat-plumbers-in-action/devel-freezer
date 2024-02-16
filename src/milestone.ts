import { MilestoneData } from './schema/pull-request';

export class Milestone {
  readonly htmlURL: string;
  readonly number: number;
  readonly title: string;
  readonly description: string;
  readonly state: string;

  readonly regex: RegExp;

  constructor(data: MilestoneData) {
    this.htmlURL = data.html_url;
    this.number = data.number;
    this.title = data.title;
    this.description = data.description;
    this.state = data.state;

    this.regex = new RegExp(`^${this.title}\\S*$`);
  }

  isCompliant(tag: string): boolean {
    return this.regex.test(tag);
  }
}
