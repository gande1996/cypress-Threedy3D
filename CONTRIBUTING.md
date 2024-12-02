# apps-3d-cypress-e2e 
# Contributions Guidelines
## Branches
### Master
Develop is the main branch used for development and represents the most recent code that will be going out in the next release.  In general, you should be branching from develop unless you're contributing to a specific feature branch.
### Release Tags
Release tags represent code that is being tested for the next release. If you need to patch a release you should branch from the relevant tag.
### Branch naming conventions
For features our convention is to use ```feature/[ticketNumber]``` as the branch name. E.g ```feature/INAPPS-1234```
For bugfixes you can use ```bugfix/[ticketNumber]```.  E.g ```bugfix/INAPPS-1234```
For updating any configurations or other changes use ```enhancement/[ticketNumber]```.  E.g ```enhancement/INAPPS-1234```
If you don't have a ticket number, ask yourself why not? If the reason is good enough then a short, descriptive branch name will work. E.g ```version-bump```
## Commits
Commit messages should include the file name they relate to. E.g ```Made the button work (File Name)```

## Pull Requests
Branches cannot be merged to develop or master directly and must be approved via pull request.

## Code Standards
Follow eslint rules(single quotes, 4 spaces indentation, do not use semicolon)

Use camelCase for variables

Use SCREAMING_SNAKE_CASE for global variables

Do not use long comments on the code

Check spelling

Use clear naming

Use correct english spelling and conjugations

Don't push code that outputs warnings/errors in console 
