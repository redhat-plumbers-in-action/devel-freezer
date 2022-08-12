/**
 * Based on probot-metadata - https://github.com/probot/metadata
 */

import { Context } from 'probot';

const regex = /\n\n<!-- devel-freezer = (.*) -->/;

export async function getMetadata(key: string, context: Context) {
  const body =
    (await context.octokit.issues.get(context.issue())).data.body || '';

  const match = body.match(regex);

  if (match) {
    const data = JSON.parse(match[1]);
    return key ? data && data[key] : data;
  }
}

export async function setMetadata(
  key: string,
  value: string,
  context: Context,
  issueNumber?: number
) {
  let body =
    (
      await context.octokit.issues.get(
        context.issue(issueNumber ? { issue_number: issueNumber } : {})
      )
    ).data.body || '';

  let data = {};

  body = body.replace(regex, (_, json) => {
    data = JSON.parse(json);
    return '';
  });

  if (!data) data = {};

  if (typeof key === 'object') {
    Object.assign(data, key);
  } else {
    (data as { [key: string]: string })[key] = value;
  }

  return context.octokit.issues.update(
    context.issue({
      body: `${body}\n\n<!-- devel-freezer = ${JSON.stringify(data)} -->`,
      ...(issueNumber ? { issue_number: issueNumber } : {}),
    })
  );
}
