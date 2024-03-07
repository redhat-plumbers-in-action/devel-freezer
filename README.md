<!-- markdownlint-disable MD033 MD041 -->
<p align="center">
  <img src="https://github.com/redhat-plumbers-in-action/team/blob/30bfefc6f64a5e4f84dc58397dffcf4b829176f4/members/light-blue-plumber.png" width="100" />
  <h1 align="center">Devel Freezer</h1>
</p>

[![GitHub Marketplace][market-status]][market] [![Unit Tests][test-status]][test] [![Linter][linter-status]][linter] [![CodeQL][codeql-status]][codeql] [![Check dist/][check-dist-status]][check-dist] [![codecov][codecov-status]][codecov]

<!-- Status links -->

[market]: https://github.com/marketplace/actions/devel-freezer
[market-status]: https://img.shields.io/badge/Marketplace-Differential%20Shellcheck-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAM6wAADOsB5dZE0gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAERSURBVCiRhZG/SsMxFEZPfsVJ61jbxaF0cRQRcRJ9hlYn30IHN/+9iquDCOIsblIrOjqKgy5aKoJQj4O3EEtbPwhJbr6Te28CmdSKeqzeqr0YbfVIrTBKakvtOl5dtTkK+v4HfA9PEyBFCY9AGVgCBLaBp1jPAyfAJ/AAdIEG0dNAiyP7+K1qIfMdonZic6+WJoBJvQlvuwDqcXadUuqPA1NKAlexbRTAIMvMOCjTbMwl1LtI/6KWJ5Q6rT6Ht1MA58AX8Apcqqt5r2qhrgAXQC3CZ6i1+KMd9TRu3MvA3aH/fFPnBodb6oe6HM8+lYHrGdRXW8M9bMZtPXUji69lmf5Cmamq7quNLFZXD9Rq7v0Bpc1o/tp0fisAAAAASUVORK5CYII=

[test]: https://github.com/redhat-plumbers-in-action/devel-freezer/actions/workflows/unit-tests.yml
[test-status]: https://github.com/redhat-plumbers-in-action/devel-freezer/actions/workflows/unit-tests.yml/badge.svg

[linter]: https://github.com/redhat-plumbers-in-action/devel-freezer/actions/workflows/lint.yml
[linter-status]: https://github.com/redhat-plumbers-in-action/devel-freezer/actions/workflows/lint.yml/badge.svg

[codeql]: https://github.com/redhat-plumbers-in-action/devel-freezer/actions/workflows/codeql-analysis.yml
[codeql-status]: https://github.com/redhat-plumbers-in-action/devel-freezer/actions/workflows/codeql-analysis.yml/badge.svg

[check-dist]: https://github.com/redhat-plumbers-in-action/devel-freezer/actions/workflows/check-dist.yml
[check-dist-status]: https://github.com/redhat-plumbers-in-action/devel-freezer/actions/workflows/check-dist.yml/badge.svg

[codecov]: https://codecov.io/gh/redhat-plumbers-in-action/devel-freezer
[codecov-status]: https://codecov.io/gh/redhat-plumbers-in-action/devel-freezer/branch/main/graph/badge.svg

<!-- -->

Devel Freezer is a GitHub Action that can automatically notify contributors of your open-source project about the state of development. When the project is in development freeze or when the development freeze has ended.

## How does it work

TBA ...

## Features

* Ability to comment on Pull Requests predefined messages based on the latest tags
* Ability to find and update comments from Devel Freezer GitHub Action
* [Policy based](#policy) configuration using YAML syntax
* Support for regular expressions for freezing tags definitions
* And more ...

## Usage

To setup Development freeze, we need three files:

* Workflow that captures Pull Request metadata (number) and uploads this data as artifact
* Workflow that runs on `workflow-run` trigger, downloads artifact and runs `devel_freezer` GitHub Action
* `development-freeze` configuration

> [!NOTE]
>
> Setup is complicated due to GitHub [permissions on `GITHUB_TOKEN`](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token). When used in workflow executed from fork it has `read-only` permissions. By using `workflow-run` trigger we are able to [safely overcome this limitation](https://securitylab.github.com/research/github-actions-preventing-pwn-requests/) and it allow us to comment on Pull Requests.

```yml
name: Gather Pull Request Metadata
on:
  pull_request:
    branches: [ main ]
    types: [ opened, reopened, synchronize ]

permissions:
  contents: read

jobs:
  gather-metadata:
    runs-on: ubuntu-latest

    permissions:
      # only required for workflows in private repositories
      actions: read
      contents: read

    steps:
      - name: Repository checkout
        uses: actions/checkout@v4

      - id: Metadata
        name: Gather Pull Request Metadata
        uses: redhat-plumbers-in-action/gather-pull-request-metadata@v1

      - name: Upload Pull Request Metadata artifact
        uses: actions/upload-artifact@v4
        with:
          name: Pull Request Metadata
          path: ${{ steps.Metadata.outputs.metadata-file }}
          retention-days: 1
```

```yml
name: Development Freeze

on:
  workflow_run:
    workflows: [ Gather Pull Request Metadata ]
    types:
      - completed

permissions:
  contents: read

jobs:
  freezer:
    if: >
      github.event.workflow_run.event == 'pull_request' &&
      github.event.workflow_run.conclusion == 'success'
    runs-on: ubuntu-latest

    permissions:
      # Needed for commenting on Pull Requests
      pull-requests: write

    steps:
      - id: Artifact
        name: Download Pull Request Metadata artifact
        uses: redhat-plumbers-in-action/download-artifact@v1
        with:
          name: Pull Request Metadata

      - name: Repository checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Development Freezer
        uses: redhat-plumbers-in-action/devel-freezer@v1
        with:
          pr-number: ${{ fromJSON(steps.Artifact.outputs.pr-metadata-json).number }}
          token: ${{ secrets.GITHUB_TOKEN }}
```

> [!IMPORTANT]
>
> `fetch-depth: 0` is required in order to have access to full history including tags.

```yml
policy:
  - tags: ['alpha', 'beta']
    feedback:
      frozen-state: |
        🥶 We are currently in ...
        🙏 Please ...
      unfreeze-state: |
        😎 We are no longer in ...

  # Suport for regular expressions
  - tags: ['^\S*-rc\d$']
    feedback:
      frozen-state: |
        We are currently in a development freeze phase.
        Please ...
      unfreeze-state: |
        We had successfully released a new major release.
        We are no longer in a development freeze phase.
```

### Real-life examples

Feel free to try `devel-freezer` using template repository - [`@redhat-plumbers-in-action/development-freeze-automation`](https://github.com/redhat-plumbers-in-action/development-freeze-automation)

## Configuration options

Action currently accepts the following options:

```yml
# ...

- uses: redhat-plumbers-in-action/devel-freezer@v1
  with:
    pr-number:    <number>
    delay:        <seconds>
    config-path:  <path to config file>
    token:        <GitHub token or PAT>

# ...
```

### pr-number

Pull Request number.

* default value: `${{ github.event.number }}`
* requirements: `required`

### delay

Delay in seconds before the validation of the Pull Request starts. It might be useful to account for the time it takes to set labels and milestones on the Pull Request.

* default value: `0`
* requirements: `optional`

### config-path

Path to configuration file. Configuration file format is described in: [Policy section](#policy).

* default value: `.github/development-freeze.yml`
* requirements: `optional`

### token

GitHub token or PAT is used for creating comments on Pull Request.

```yml
# required permission
permissions:
  contents: read
  pull-requests: write
```

* default value: `undefined`
* requirements: `required`
* recomended value: `secrets.GITHUB_TOKEN`

## Policy

It's required to define a freezing policy for Action to behave correctly. The policy can be defined using `.github/development-freeze.yml` configuration file. The structure needs to be as follows:

```yml
policy:
  - tags: ['alpha', 'beta']
    feedback:
      frozen-state: |
        🥶 We are currently in ...
        🙏 Please ...
      unfreeze-state: |
        😎 We are no longer in ...

  # Suport for regular expressions
  - tags: ['^\S*-rc\d$']
    feedback:
      frozen-state: |
        We are currently in a development freeze phase.
        Please ...
      unfreeze-state: |
        We had successfully released a new major release.
        We are no longer in a development freeze phase.
  # tags: ...
```

### `tags` keyword

Array of tag names and/or regular expressions describing freezing tag scheme (e.g. `^\S*-rc\d$` for tags like `v251-rc1`, `v252-rc2`, etc.). Multiple freezing schemes are supported.

* requirements: `required`

### `feedback.frozen-state` keyword

The message that is going to be displayed in form of a comment when development freeze conditions are met. Support for a multi-line string using `|` YAML syntax.

* requirements: `required`

### `feedback.unfreeze-state` keyword

The message that is going to replace the development freeze message when development freeze conditions are no longer met. Support for a multi-line string using `|` YAML syntax.

* requirements: `required`
