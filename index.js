const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // Init octokit
    const token = core.getInput('ghToken');
    const octokit = github.getOctokit(token);

    // Get info from payload
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    var login = payload.sender.login;
    var org = payload.organization.login;
    var repo = payload.repository.name;
    var pullNumber = payload.pull_request.number;

    // Debug statements
    console.log(`login: '${login}'`)
    console.log(`org: '${org}'`)
    console.log(`repo: '${repo}'`)
    console.log(`pullNumber: '${pullNumber}'`)

    // Get teams for org
    var orgTeams = await octokit.teams.list({
      org: org
    });
    var orgTeams = orgTeams.data;

    // Get teams and teamMembers for user
    var teams = []
    var teamMembers = [];
    for (var index in orgTeams) {
      var team = orgTeams[index];

      var members = await octokit.teams.listMembersInOrg({
        org: org,
        team_slug: team.slug
      });
      var members = members.data;
      
      if (members.some(member => member.login == login)) {
        teams = [...teams, team];
        teamMembers = [...teamMembers, ...members.filter(member => member.login != login)];
      }
    }

    // Define reviewers
    var reviewers = [... new Set(teamMembers.map(member => member.login))];
    var teamReviewers = teams.map(team => team.slug);

    // Debug statements
    console.log(`reviewers: '${reviewers}'`);
    console.log(`teamReviewers: '${teamReviewers}'`);

    // Request reviewers
    await octokit.pulls.requestReviewers({
      owner: org,
      repo: repo,
      pull_number: pullNumber,
      reviewers: reviewers,
      team_reviewers: teamReviewers
    });

    // Add assignee
    await octokit.issues.addAssignees({
      owner: org,
      repo: repo,
      issue_number: pullNumber,
      assignees: login
    });    
  
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();