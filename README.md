# Introduction
This project transforms static code snippets into live, runnable pieces of code.

# Installation
NOTE: **You need to be serving the given files on a server in order for the web workers to initialize properly**

To use this project in your own webpage, do the following:

1. Clone the repository with `git clone https://github.com/cs-education/elc-dev.git`
2. Run `cd elc-dev`
3. Run `npm run prod` to build a *production* version of the JS files
  * This will optimize for size, so please DO NOT try and open this file at the risk of crashing any reasonable editor
4. Copy the directory `sys` from `public` into `public-prod` in order to have access to the VM filesystem (the VM will not boot up properly without this)
5. Add all HTML files to this directory that you wish to add the project to (they must be in the same directory as `elc.js`, `jor1k-worker-min.js`, and the `sys` directory)
6. Add a `<div id="elc"></div>` tag to your HTML page
7. Add a `<script type="text/javascript" src="elc.js"></script>`
8. Write any code you wish to be transformed within `<pre class="code"></pre>` tags
  * You can specify which language you would like to use with either `c_cpp` or `python` in the `pre` tag's class name (e.g. `<pre class="code c_cpp">` for C support -- the app will default to C behavior if language not specified)
9. Start your server and access your HTML pages -- if you followed everything, you should see live code in your browser!
