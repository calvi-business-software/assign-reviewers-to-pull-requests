# Assign reviewers to pull requests action

Use this action to assign reviewers to pull requests

Assigns team members as reviewer, and sets assignee to current user 

## Inputs

### `ghUserToken`

**Required** The GitHub user token.

The GitHub user token should have permissions:
* admin:org
	* read:org
* repo
    * public_repo

See: 
https://github.community/t/resource-not-accessible-by-integration-when-requesting-github-pages-build-via-rest-api/13567
https://developer.github.com/apps/building-github-apps/identifying-and-authorizing-users-for-github-apps/#user-to-server-requests


## Example usage

```yaml
- uses: calvi-business-software/assign-reviewers-to-pull-requests@v1
```

