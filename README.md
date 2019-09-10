# appsodyExtension

---

**This repository is deprecated. The new location of the Codewind Appsody extension is https://github.com/eclipse/codewind-appsody-extension, which as of Codewind version 0.3.0, will be automatically
installed.  If you still have the `.extensions/appsodyExtension` folder in your Codewind workspace, be sure to remove it so the new version of the extension will be used.**

---

This repository is an extension to Codewind that adds support for [Appsody](https://appsody.dev) projects.

- Appsody version: [0.2.8](https://github.com/appsody/appsody/releases/tag/0.2.8)
- Appsody controller version: [0.2.2](https://github.com/appsody/controller/releases/tag/0.2.2)

## Installing the Appsody Extension on Codewind

Download the latest [release](https://github.com/kabanero-io/appsodyExtension/releases) and unzip or untar it to your Codewind workspace's `.extensions` folder, i.e.

`<codewind-workspace>/.extensions/appsodyExtension`

Restart Codewind to pick up the new extension.

## Adding the Appsody Templates

With Codewind running, add the Appsody templates to Codewind by making a `POST` request to the http://localhost:9090/api/v1/templates/repositories REST API endpoint with the following content:

```json
{
    "url": "https://raw.githubusercontent.com/kabanero-io/codewind-appsody-templates/master/devfiles/index.json",
    "description": "Appsody templates"
}
```

You may make the request using a REST client utility such as [Postman](https://www.getpostman.com/products) or by using the `curl` command, e.g.:

```bash
$ curl "http://localhost:9090/api/v1/templates/repositories" \
-X POST \
-d '{ "url": "https://raw.githubusercontent.com/kabanero-io/codewind-appsody-templates/master/devfiles/index.json", "description": "Appsody templates" }' \
-H "Content-Type: application/json"
```

## Creating an Appsody Project

After installing the Appsody extension and templates, you can create an Appsody project the same way you create other projects simply by selecting one of the Appsody templates.

## Optional: Building the Full Application Image

1. Open a terminal into the Codewind server container:

   `docker exec -it codewind-pfe bash`
   
2. Run the following command, replacing *projectName* with the name of the project to build:

   `export APPSODY_MOUNT_PROJECT=$HOST_WORKSPACE_DIRECTORY/projectName`

3. Go into the project directory:

   `cd /codewind-workspace/projectName`
   
4. Run the command below. A docker image of the application will be built with the name *projectName*.

   `/codewind-workspace/.extensions/appsodyExtension/appsody build`

## Optional: Using the Same Appsody Configuration Between Local CLI and Codewind

If you have a local install of the Appsody CLI, you can configure it to use the same configuration as Codewind.

1. Open the `.appsody.yaml` configuration file that the Appsody CLI is using in an editor (by default, this file is located in your home directory, under the `.appsody` folder, but this can be changed via Appsody's [`--config`](https://appsody.dev/docs/using-appsody/cli-commands) flag)

2. Change the `home` property to point the Codewind's copy of the Appsody configuration

   `home: /some_path/codewind-workspace/.appsody`

## Current Limitations

- Currently you can use these Appsody templates:  Node.js Express stack, Java MicroProfile stack, and Java Spring Boot 2 stack.  More are coming shortly.
- Debugging of Appsody projects in Codewind is not yet supported.
- Enabling and disabling auto build in Codewind is not supported for Appsody projects.
- Appsody is supported on Codewind on VS Code and on Eclipse, but not on Eclipse Che at this time.
