# appsodyExtension

This repository is an extension to Codewind that adds support for [Appsody](https://appsody.dev) projects.

- appsody version: 0.2.2
- appsody controller version: 0.2.1

## Installing the Appsody Extension on Codewind

Clone or download this repository to your Codewind workspace's `.extensions` folder, i.e.

`<codewind-workspace>/.extensions/appsodyExtension`

Restart Codewind to pick up the new extension.

## Adding the Appsody Templates

With Codewind running, execute the following `curl` command to add the Appsody templates to Codewind:

```bash
$ curl "http://localhost:9090/api/v1/templates/repositories" \
-X POST \
-d '{ "url": "https://raw.githubusercontent.com/kabanero-io/codewind-appsody-templates/master/devfiles/index.json", "description": "Appsody templates" }' \
-H "Content-Type: application/json"
```

# Creating an Appsody Project

After installing the Appsody extension and templates, you can create an Appsody project the same way you create other projects simply by selecting one of the Appsody templates.

# Limitations for Tech Preview

- There are currently only two Appsody templates, one for the Node.js Express stack and one for Java MicroProfile stack
- Debugging of Appsody projects in Codewind is not supported at this time
- Enabling and disabling auto build is not supported for Appsody projects
- Appsody is not supported on Codewind on Eclipse Che
