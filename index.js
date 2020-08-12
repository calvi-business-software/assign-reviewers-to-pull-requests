const core = require('@actions/core');
const github = require('@actions/github');

try {
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  // TODO: add implementation

  // pull_request > user > id / login

  const token = core.getInput('githubToken');
  const octokit = github.getOctokit(token);

  var teams = octokit.teams.listForAuthenticatedUser.get();

  console.log(teams);

  foreach (team in teams)
  {
    console.log(team);
  }

} catch (error) {
  core.setFailed(error.message);
}