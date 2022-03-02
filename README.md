oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g local-https-dev
$ local-https-dev COMMAND
running command...
$ local-https-dev (--version)
local-https-dev/0.0.0 linux-x64 node-v14.17.3
$ local-https-dev --help [COMMAND]
USAGE
  $ local-https-dev COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`local-https-dev hello PERSON`](#local-https-dev-hello-person)
* [`local-https-dev hello world`](#local-https-dev-hello-world)
* [`local-https-dev help [COMMAND]`](#local-https-dev-help-command)
* [`local-https-dev plugins`](#local-https-dev-plugins)
* [`local-https-dev plugins:inspect PLUGIN...`](#local-https-dev-pluginsinspect-plugin)
* [`local-https-dev plugins:install PLUGIN...`](#local-https-dev-pluginsinstall-plugin)
* [`local-https-dev plugins:link PLUGIN`](#local-https-dev-pluginslink-plugin)
* [`local-https-dev plugins:uninstall PLUGIN...`](#local-https-dev-pluginsuninstall-plugin)
* [`local-https-dev plugins update`](#local-https-dev-plugins-update)

## `local-https-dev hello PERSON`

Say hello

```
USAGE
  $ local-https-dev hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/Kerren-Entrostat/local-https-dev/blob/v0.0.0/dist/commands/hello/index.ts)_

## `local-https-dev hello world`

Say hello world

```
USAGE
  $ local-https-dev hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

## `local-https-dev help [COMMAND]`

Display help for local-https-dev.

```
USAGE
  $ local-https-dev help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for local-https-dev.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `local-https-dev plugins`

List installed plugins.

```
USAGE
  $ local-https-dev plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ local-https-dev plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `local-https-dev plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ local-https-dev plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ local-https-dev plugins:inspect myplugin
```

## `local-https-dev plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ local-https-dev plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ local-https-dev plugins add

EXAMPLES
  $ local-https-dev plugins:install myplugin 

  $ local-https-dev plugins:install https://github.com/someuser/someplugin

  $ local-https-dev plugins:install someuser/someplugin
```

## `local-https-dev plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ local-https-dev plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ local-https-dev plugins:link myplugin
```

## `local-https-dev plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ local-https-dev plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ local-https-dev plugins unlink
  $ local-https-dev plugins remove
```

## `local-https-dev plugins update`

Update installed plugins.

```
USAGE
  $ local-https-dev plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
