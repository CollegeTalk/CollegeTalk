# Commit/Contribution Guidelines

These are some rules and guidelines developers should follow while working on the CollegeTalk project.

## Branches and development
- There are two main branches: `main` and `dev`
- The `main` branch should never be directly committed to because it will be used for deployment and grading
- The `dev` branch ideally should not be directly committed to as well, but documentation/README changes like in Artifacts are fine to directly commit to `dev`
- Each task a developer works on should have its own branch that can be directly committed to 
- When a task is complete, a pull request should be made to merge into the `dev` branch, with at least one reviewer assigned to peer review the changes before it can be merged (more information below)
- Once the peer reviewer approves the changes, the developer who made the PR can then merge the branch into `dev`
- Every Sunday, before submitting the project, a final review of the `dev` branch will be done by developers, and then `dev` will be merged into `main`

## Pull requests and peer reviews
- Merge `dev` into your branch and resolve merge conflicts before making the PR
- When making a pull request to merge your branch into dev, assign at least one developer (more is ideal) to the PR so they can peer review the changes 
- To peer review a PR, switch to the branch of the PR and pull down the changes, then look through and test the code to make sure there are none of the following issues:
    - Loose comments that aren't for documentation (commented out debug code for example)
    - Errors when running the code locally
    - Undocumented code that is not understandable to the reviewer 
    - Syntax or convention issues, like misuse of camelCase and snake_case or inconsistent file names
- If there are changes to make to the PR, the branch owner should make the changes before reassigning and pinging the old reviewer to approve the PR
- Once the PR is approved, the branch owner can merge the PR into `dev`


