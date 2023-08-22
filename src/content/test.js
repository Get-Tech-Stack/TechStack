import isGithubRepoPage from './isGithubRepoPage';

asserts(isGithubRepoPage('https://github.com/reactjs/zh-hans.react.dev'), true);
asserts(isGithubRepoPage('https://github.com/cypress-io/cypress'), true);
asserts(isGithubRepoPage('https://github.com/'), false);
asserts(isGithubRepoPage('https://github.com/cypress-io'), false);
