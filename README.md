# Assign reviewers to pull requests action

Use this action to assign reviewers to pull requests

Business rules:
* Requests reviews from all team mates of the pull request user
* Requests reviews from all teams of the pull request user
* Sets the pull request user as assignee

## Inputs

### `ghUserToken`

**Required** The GitHub user token.

The user token is needed because the teams endpoints from GitHub don't allow server-to-server requests (using ${{ secrets.GITHUB_TOKEN }}). For more information, see: https://developer.github.com/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps/#user-to-server-requests

The user token needs scopes:
* repo > public_repo
* admin:org > read:org

## Example usage

`.github/workflows/pull-request.yml`

```yaml
name: pull-request
on:
  pull_request:
    types: [opened]

jobs:
  assignReviewersToPullRequest:
    runs-on: ubuntu-latest
    steps:
      - name: Assign reviewers to pull request
        uses: calvi-business-software/assign-reviewers-to-pull-requests@v1
        env:
          ghUserToken: ${{ secrets.GH_USER_TOKEN_ASSIGN_REVIEWERS }}
```
