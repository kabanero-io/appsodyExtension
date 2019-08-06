/*******************************************************************************
 * 
 * Copyright 2019 IBM Corporation and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 *******************************************************************************/

'use strict';

const { exec } = require('child_process');
const os = require('os');

module.exports = {

    getRepositories: async function() {
        return new Promise((resolve, reject) => {

            // list of repositories start on 3rd line
            exec('/codewind-workspace/.extensions/appsodyExtension/appsody repo list | tail -n+3', (err, stdout) => {

                if (err)
                    return reject(err);

                const repos = [];

                stdout.split(os.EOL).forEach((line) => {

                    // split the line: <name> <url>
                    const pair = line.trim().split(/\s+/);
                    
                    // appsody uses index.yaml, change that to index.json
                    if (pair.length >= 2 && pair[1].endsWith('/index.yaml')) {

                        let url = pair[1];
                        url = url.substring(0, url.length - 10) + 'devfiles/index.json';

                        repos.push({
                            description: pair[0],
                            url: url
                        });
                    }
                });

                resolve(repos);
            });
        });
    }
}
