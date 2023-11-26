# Automated Chrome DevTools frontend builder

This repository contains a [Github Action](.github/workflows/build.yml) that runs once a week on a schedule, builds the [Chrome DevTools frontend](https://chromium.googlesource.com/devtools/devtools-frontend) source code, and sends the build code to the [main](https://github.com/iam-medvedev/chrome-devtools/tree/main) branch via [PR](https://github.com/iam-medvedev/chrome-devtools/pulls?q=is%3Apr+label%3Aauto-build).

## Workflow

### Build and Merge

- **Schedule:** Runs once a week.
- **Build Action:** Automatically triggers a build process.
- **PR Creation and merge:** Creates a Pull Request with the changes and automatically merges into the main branch.

### Deployment and Release

- **Github Pages deploy**
- **NPM release**

## Deployed version

For your hack needs there is a [deployed version](https://iam-medvedev.github.io/chrome-devtools/) which will be updated after each build.

## NPM package

[![npm version](https://badge.fury.io/js/chrome-devtools-built.svg)](https://www.npmjs.com/package/chrome-devtools-built)

Also every build is published in the NPM.

Package versioning works as follows: `1.20232611.0` where `1.${current_date}.{patch_number}`.

## License

The [devtools-frontend](https://chromium.googlesource.com/devtools/devtools-frontend) code is subject to its own license terms. Please refer to the [Chromium DevTools Frontend License](https://chromium.googlesource.com/devtools/devtools-frontend/+/main/LICENSE) for details.

The code in this repository, specific to the automation process, is licensed under [MIT](LICENSE).

Feel free to use and modify this workflow to suit your needs.
