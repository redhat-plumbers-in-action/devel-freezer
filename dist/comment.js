import { debug } from 'console';
import { getMetadata, setMetadata } from './metadata';
import { warning } from '@actions/core';
const develFreezerCommentID = 'devel-freezer-comment-id';
const develFreezerFreezingTag = 'devel-freezer-freezing-tag';
export async function publishComment(content, tag, context) {
    var _a;
    const commentID = await getCommentID(context);
    if (commentID) {
        updateComment(commentID, content, context);
        return;
    }
    const commentPayload = (_a = (await createComment(content, context))) === null || _a === void 0 ? void 0 : _a.data;
    if (!commentPayload) {
        warning(`Failed to create comment.`);
        return;
    }
    // Set metadata
    await setCommentID(commentPayload.id, context);
    // TODO: Probably dont work when updating comment!!!
    await setFeezingTag(tag, context);
}
async function getCommentID(context) {
    return getMetadata(develFreezerCommentID, context);
}
async function setCommentID(id, context) {
    debug(`id: '${id}'`);
    await setMetadata(develFreezerCommentID, id.toString(), context);
}
async function setFeezingTag(tag, context) {
    debug(`tag: '${tag}'`);
    await setMetadata(develFreezerFreezingTag, tag.toString(), context);
}
function createComment(body, context) {
    if (!body || body === '')
        return;
    return context.octokit.issues.createComment(context.issue({
        body,
    }));
}
async function updateComment(commentID, body, context) {
    return context.octokit.issues.updateComment(context.issue({
        comment_id: commentID,
        body,
    }));
}
//# sourceMappingURL=comment.js.map