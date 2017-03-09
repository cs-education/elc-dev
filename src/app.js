import React from 'react';
import ReactDOM from 'react-dom';

import Terminal from './components/terminal-component';
import CodeEditor from './components/code-editor';

import './style.css';

function update(term) {
  let link = document.createElement('a');
  let text = document.createTextNode('Project Homepage');
  link.appendChild(text);
  link.href = 'https://github.com/cs-education/elc-dev';
  document.getElementById('elc').insertBefore(link, elc.firstChild);

  let codeBlocks = document.getElementsByClassName('code');
  let children = [];

  for (let i = 0; i < codeBlocks.length; i++) {
    let element = codeBlocks[i];
    let options = element.className.split(" ");

    let text = element.innerHTML
                      .replace(/&lt;/g, '<')
                      .replace(/&gt;/g, '>')
                      .replace(/&amp;/g, '&');
    element.innerHTML = '';
    let editorId = 'editor-' + i;

    children.push(
      <div key={i}>
        <CodeEditor
          width="600px"
          height="200px"
          id={editorId}
          term={term}
          language={options[1]}
          text={text}/>
      </div>
    );
    ReactDOM.render(children[i], element);
  }
}

ReactDOM.render(
  <Terminal width="600px" height="400px" updateTerm={update} />,
  document.getElementById('elc')
);
