import { publishComment } from './comment';
export async function freezePullRequest(comment, tag, context) {
    await publishComment(comment, tag, context);
}
//# sourceMappingURL=freezer.js.map