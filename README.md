<!-- markdownlint-disable MD033 MD041 -->
<p align="center">
  <img src="https://github.com/redhat-plumbers-in-action/team/blob/30bfefc6f64a5e4f84dc58397dffcf4b829176f4/members/light-blue-plumber.png" width="100" />
  <h1 align="center">Devel Freezer</h1>
</p>

[![GitHub Marketplace][market-status]][market] [![Unit Tests][test-status]][test] [![Linter][linter-status]][linter] [![CodeQL][codeql-status]][codeql] [![Check dist/][check-dist-status]][check-dist] [![codecov][codecov-status]][codecov] [![Mergify Status][mergify-status]][mergify]

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

[mergify]: https://mergify.com
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://api.mergify.com/v1/badges/redhat-plumbers-in-action/devel-freezer&style=flat

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

```yml
name: Development Freezer
on:
  pull_request:
    types: [ opened, reopened, synchronize ]
    branches: [ main ]

permissions:
  contents: read

jobs:
  freezer:
    runs-on: ubuntu-latest
    
    permissions:
      pull-requests: write

    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Development Freezer
        uses: redhat-plumbers-in-action/devel-freezer@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

> **Note**: `fetch-depth: 0` is required in order to have access to full history including tags.

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
    token: <GitHub token>

# ...
```

### token

Token used to create comments. Minimal required permissions are `contents: read` and `pull-requests: write`

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