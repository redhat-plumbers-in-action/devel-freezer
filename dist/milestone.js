export class Milestone {
    constructor(data) {
        this.htmlURL = data.html_url;
        this.number = data.number;
        this.title = data.title;
        this.description = data.description;
        this.state = data.state;
        this.regex = new RegExp(`^${this.title}\\S*$`);
    }
    isCompliant(tag) {
        return this.regex.test(tag);
    }
}
//# sourceMappingURL=milestone.js.map