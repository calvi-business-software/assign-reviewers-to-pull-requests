const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  
    // TODO: add implementation
  
    // pull_request > user > id / login
  
    const token = core.getInput('ghToken');
    const octokit = github.getOctokit(token);
  
    console.log(token);
  
    var teams = await octokit.teams.listForAuthenticatedUser();
  
    console.log(teams);
  
    foreach (team in teams)
    {
      console.log(team);
    }
  
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();