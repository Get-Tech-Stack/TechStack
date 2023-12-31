/* global document */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { runtime } from 'webextension-polyfill';
import MessageListener from './messageListener';
import TechStacks from './TechStacks';
import isGithubRepoPage from './isGithubRepoPage';

import PrivateRepo from 'components/PrivateRepo/PrivateRepo';
import storage from '../utils/storage';

import '../i18n';

runtime.onMessage.addListener(MessageListener);

const get_insert_dom = async () => {
  const result = await storage.get(['techstack_position']);
  let position = 0;

  if (result['techstack_position'] === 'top' || result['techstack_position'] === undefined) {
    position = 0;
  }

  if (result['techstack_position'] === 'middle') {
    position = 1;
  }

  if (result['techstack_position'] === 'bottom') {
    position = 3;
  }

  const dom = document.getElementsByClassName('BorderGrid-cell')[position];
  return dom;
};

async function injectComponent() {
  console.log('Tech-Stack: https://github.com/Get-Tech-Stack/TechStack');

  const url = window.location.href;

  const techStack = `<h2 class="mb-3 h4">Tech Stack</h2>
                        <div class="my-3">
                            <div id="techStackRoot">
                            </div>
                        </div>`;

  const dom = await get_insert_dom();
  if (dom !== undefined) {
    let ReactDom = <PrivateRepo url={url} />;

    let repoStatusDom = document
      .getElementsByClassName(`Label Label--secondary v-align-middle mr-1 d-none d-md-block`)
      .item(0);

    if (repoStatusDom === undefined || repoStatusDom === null) {
      repoStatusDom = document.getElementsByClassName(`Label Label--secondary v-align-middle mr-1`).item(0);
    }

    if (repoStatusDom === undefined || repoStatusDom === null) {
      repoStatusDom = document
        .getElementsByClassName(`Label Label--attention v-align-middle mr-1 d-none d-md-block`)
        .item(0);
    }

    if (repoStatusDom !== undefined && repoStatusDom !== null) {
      if (repoStatusDom.innerHTML === 'Private') {
        ReactDom = <PrivateRepo url={url} />;
      } else {
        ReactDom = <TechStacks url={url} />;
      }
    }

    if (document.getElementById('techStackRoot') === null) {
      dom.innerHTML = techStack + dom.innerHTML;
      const root = ReactDOM.createRoot(document.getElementById('techStackRoot') || document.createElement('div'));
      root.render(ReactDom);
    }
  }
}

window.addEventListener('reject', () => {
  const url = window.location.href;
  // to verify the url is github repo page
  // if url like https://github.com/Gepsonka/TDK in regex
  if (!isGithubRepoPage(url)) {
    return;
  }

  injectComponent();
});
