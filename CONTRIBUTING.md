# Contributing Guidelines

Hedera Minting is grateful for any contributions it receives from the community. Contributions can come in many shapes
and forms including bug reports, code, answering questions on Discord, etc. This document outlines the process to help
get your contribution accepted.

## Questions

If you have a question on how to use the product, please contact one of our contributors or [open an issue](https://github.com/HashGuild/hedera-minting/issues).

## Issues

GitHub [issues](https://docs.github.com/en/issues) are used as the primary method for tracking project changes.

### Vulnerability Disclosure

Most of the time, when you find a bug, it should be reported the GitHub issue tracker for the project. However, if you
are reporting a _security vulnerability_, please [report it directly to our CTO, Alex](mailto:alex@hashguild.xyz).

### Issue Types

There are three types of issues each with their own corresponding label:

- **Bug:** These track issues with the code
- **Documentation:** These track problems or insufficient coverage with the documentation
- **Enhancement:** These track specific feature requests and ideas until they are complete.

### Issue Lifecycle

The issue lifecycle is mainly driven by the core maintainers, but is still useful to know for those wanting to
contribute. All issue types follow the same general lifecycle. Differences will be noted below.

#### Creation

- The user will open a ticket in the GitHub project and apply one of the [issue type](#issue-types) labels.

#### Triage

- The maintainer in charge of triaging will apply the proper labels for the issue. This includes labels for priority and
  area.
- Clean up the title to succinctly and clearly state the issue (if needed).
- Ask the submitter to clarify any items.

#### Discussion

- Issues should be connected to the [pull request](#pull-requests) that resolves it.
- Whoever is working on an issue (whether a maintainer or someone from the community), should either assign the issue to
  themself or add a comment that they will be working on it.

#### Closure

- Linked issues should be automatically closed when a PR is merged or closed manually by the submitter or maintainer if
  it is determined that is not necessary.

## Pull Requests

Like most open source projects, we use
[pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) (
PRs) to track code changes.

### Forking

1. [Fork](https://guides.github.com/activities/forking/) the repository. Go to the project page then hit the `Fork`
   button to fork your own copy of the repository to your GitHub account.

2. Clone the forked repository to your local working directory.

```sh
$ git clone https://github.com/${owner}/${repo}.git
```

3. Add an `upstream` remote to keep your fork in sync with the main repo.

```sh
$ git remote add upstream https://github.com/hashgraph/${repo}.git
```

4. Sync your local `main` branch.

```sh
$ git pull upstream main
```

> **_Note_** Some repositories may still be using `master` for their default branch.

5. Create a branch to add a new feature or fix issues.

```sh
$ git checkout -b new-feature
```

6. Make any change on the branch `new-feature` then build and test your code locally.

7. Add files that you want to be committed.

```sh
$ git add <file>
```

8. [Submit](#pr-lifecycle) a pull request.

### PR Lifecycle

Now that you've got your [forked](#forking) branch, you can proceed to submit it.

#### Submitting

- It is preferred, but not required, to have a PR tied to a specific issue. There can be circumstances where if it is a
  quick fix then an issue might be overkill. The details provided in the PR description would suffice in this case.
- The PR description or commit message should contain
  a [keyword](https://help.github.com/en/articles/closing-issues-using-keywords)
  to automatically close the related issue.
- Commits should be as small as possible, while ensuring that each commit is correct independently
  (i.e., each commit should compile and pass tests).
- Add tests and documentation relevant to the fixed bug or new feature.
- We more than welcome PRs that are currently in progress. If a PR is a work in progress, it should be opened as
  a [Draft PR](https://help.github.com/en/articles/about-pull-requests#draft-pull-requests). Once the PR is ready for
  review, mark it as ready to convert it to a regular PR.
- After submitting, ensure all GitHub checks pass before requesting a review. Also double-check all static analysis and
  coverage tools show a sufficient coverage and quality level.

#### Triage

- The maintainer in charge of triaging will apply the proper labels for the PR.
- The maintainer can assign a reviewer, or a reviewer can assign themselves.

#### Reviewing

- All reviews will be completed using the GitHub review tool.
- A "Comment" review should be used when there are questions about the code that should be answered, but that don't
  involve code changes. This type of review does not count as approval.
- A "Changes Requested" review indicates that changes to the code need to be made before they will be merged.
- For documentation, special attention will be paid to spelling, grammar, and clarity
  (whereas those things don't matter _as_ much for comments in code).
- Reviews are also welcome from others in the community. In the code review, a message can be added, as well as `LGTM`
  if the PR is good to merge. It’s also possible to add comments to specific lines in a file, for giving context to the
  comment.
- PR owner should try to be responsive to comments by answering questions or changing code. If the owner is unsure of
  any comment, please ask for clarification in the PR comments.
- Once all comments have been addressed and all reviewers have approved, the PR is ready to be merged.

#### Merge or Close

- PRs should stay open until they are merged or closed. The issue may be closed if the submitter has not been responsive
  for more than 30 days. This will help keep the PR queue to a manageable size and reduce noise.
