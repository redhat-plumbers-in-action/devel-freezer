# Devel Freezer

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

## How does it work

... TBD ...

## Features

* TBA ...

## Usage

TBA

## Configuration options

Action currently accept following options:

```yml
# ...
```

### token

TBA

## Policy

It's possible to define labeling policy to further customize the labeling process. Policy can be defined using `.github/devel-freezer.yml` configuration file. Structure needs to be as follows:

```yml
policy:
  - tags: ['alpha', 'beta']
    feedback:
      freezed-state: |
        We are currently in ...
        Please ...
      un-freezed-state: |
        We are no longer in ...
  - tags: ['^\S*-rc\d$']
    feedback:
      freezed-state: |
        We are currently in development freeze.
        Please ...
      unfreezed-state: |
        We had succesfully released ${tag}.
        We are no longer in development freeze.
  # ...
```

## Limitations
