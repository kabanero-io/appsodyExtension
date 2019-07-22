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

const request = module.parent.require('request');
const yaml = module.parent.require('js-yaml');

const supportedStacks = [
    'java-microprofile',
    'java-spring-boot2',
    'nodejs-express'
];

function readIndex() {

    const index = 'https://raw.githubusercontent.com/appsody/stacks/master/index.yaml';

    return new Promise((resolve, reject) => {
        request.get(index, {}, (err, response, body) => {

            if (err)
                return reject(err);

            // check status, may have gotten NOT FOUND etc.
            else if (response.statusCode != 200) 
                return reject(new Error('Appsody: failed to read ' + index));

            resolve(body);
        });
    });
}

module.exports = {

    getTemplates: async function() {

        const templates = [];

        const index = await readIndex();
        const json = yaml.safeLoad(index);

        for (let stackName of supportedStacks) {

            const stacks = json.projects[stackName];
            
            if (stacks && stacks.length > 0) {
                templates.push({
                    projectType: 'appsodyExtension',
                    label: `Appsody ${stackName} template`,
                    description: stacks[0].description,
                    url: stacks[0].urls[0],
                    language: (stackName == 'nodejs-express') ? 'nodejs' : 'java' // temporary
                });
            }
        }
        
        return templates;
    }
}
