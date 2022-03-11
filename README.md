certme
=================

A CLI used to create a local https dev environment with the green lock.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Introduction](#introduction)
* [Roadmap](#roadmap)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Introduction

So you have a lot of projects running locally. To get to them, you visit `http://localhost:8080`. If you want HTTPS, you always get that "warning" window from your browser saying it's not safe. What's worse is that each system has different seeded users, now you need to remember the username and passwords for each one because your browser can't tell the difference between `http://localhost:3000` and `http://localhost:9000`.

This CLI is the answer to all of your problems. It allows you to set up custom development domains and routes them to the correct port on your local machine. You can set `https://mydev.local` to point to `http://localhost:8080` and your browser will trust the certificate!

## Dependencies
I've decided that I don't really want to do all of the work, no need to reinvent the wheel. So there are a few things you need installed on your PC before starting here:

 - [nginx](https://www.nginx.com/)
 - [mkcert](http://mkcert.dev/)

These two tools are used to generate the cert, use the cert and route traffic to the correct port.

I suggest you ensure that `nginx` is always running on system startup after you install it by using the following command:

```bash
sudo systemctl enable nginx
```

## Getting Started
Getting started is pretty easy! If you have `nginx` and `mkcert` installed, then you just need to install the CLI.

Once the CLI is installed, you need to register your system username (the certificates are generated locally) and then start adding your domains.

And example of the commands would be as follows, you'll notice that it must be run as `sudo` since it edits the `/etc/hosts` file and creates an `nginx` config file. 

```bash
sudo certme user:register kerren
sudo certme domain:register --domain=mytestdomain.com --port=9000
```

And that should be it! Visit [https://mytestdomain.com](https://mytestdomain.com) and you should see the green lock!

![](./assets/certme_eg1.png)

Now if you visit the domain:

![](./assets/certme_eg2.png)


# Roadmap
This was my "POC" to ensure that I wasn't crazy and that it was possible to get this to work, there are a couple of features that I'd like to implement from this point:

 - [ ] Create an `init` command that installs everything for you and prompts you for the info needed for a better UX.
 - [ ] Use `dnsmasq` instead of editing the `hosts` file so that I have wildcards... and I don't edit the `hosts` file.
 - [ ] Create a frontend dashboard to show you what has been registered and allow you to make edits
 - [ ] Create builds for all the different platforms: `deb`, `snap`, `AppImage`, etc.

# Usage
<!-- usage -->
```sh-session
$ npm install -g certme
$ certme COMMAND
running command...
$ certme (--version)
certme/1.0.0 linux-x64 node-v16.14.0
$ certme --help [COMMAND]
USAGE
  $ certme COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`certme domain clear-all`](#certme-domain-clear-all)
* [`certme domain list`](#certme-domain-list)
* [`certme domain register`](#certme-domain-register)
* [`certme domain remove`](#certme-domain-remove)
* [`certme help [COMMAND]`](#certme-help-command)
* [`certme plugins`](#certme-plugins)
* [`certme plugins:inspect PLUGIN...`](#certme-pluginsinspect-plugin)
* [`certme plugins:install PLUGIN...`](#certme-pluginsinstall-plugin)
* [`certme plugins:link PLUGIN`](#certme-pluginslink-plugin)
* [`certme plugins:uninstall PLUGIN...`](#certme-pluginsuninstall-plugin)
* [`certme plugins update`](#certme-plugins-update)
* [`certme user register USER`](#certme-user-register-user)

## `certme domain clear-all`

Removes all of the registered domains

```
USAGE
  $ certme domain clear-all

DESCRIPTION
  Removes all of the registered domains

EXAMPLES
  $ certme domain clear-all
```

## `certme domain list`

Lists the existing domains that have been registered

```
USAGE
  $ certme domain list

DESCRIPTION
  Lists the existing domains that have been registered

EXAMPLES
  $ certme domain list
```

## `certme domain register`

Registers a new domain, creates the certificate, nginx config update and a change in the hosts file.

```
USAGE
  $ certme domain register -d <value> [-p <value>]

FLAGS
  -d, --domain=<value>  (required) The domain that you would like to add to the system
  -p, --port=<value>    [default: 80] The port that this will be running on on your local machine

DESCRIPTION
  Registers a new domain, creates the certificate, nginx config update and a change in the hosts file.

EXAMPLES
  $ certme domain register
```

## `certme domain remove`

Remove a domain from the registered domains

```
USAGE
  $ certme domain remove -d <value>

FLAGS
  -d, --domain=<value>  (required) The domain that you would like to remove from the system

DESCRIPTION
  Remove a domain from the registered domains

EXAMPLES
  $ certme domain remove
```

## `certme help [COMMAND]`

Display help for certme.

```
USAGE
  $ certme help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for certme.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `certme plugins`

List installed plugins.

```
USAGE
  $ certme plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ certme plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.1.0/src/commands/plugins/index.ts)_

## `certme plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ certme plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ certme plugins:inspect myplugin
```

## `certme plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ certme plugins:install PLUGIN...

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
  $ certme plugins add

EXAMPLES
  $ certme plugins:install myplugin 

  $ certme plugins:install https://github.com/someuser/someplugin

  $ certme plugins:install someuser/someplugin
```

## `certme plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ certme plugins:link PLUGIN

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
  $ certme plugins:link myplugin
```

## `certme plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ certme plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ certme plugins unlink
  $ certme plugins remove
```

## `certme plugins update`

Update installed plugins.

```
USAGE
  $ certme plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `certme user register USER`

Register a user that is on the system so that we can edit the trust servers for their account

```
USAGE
  $ certme user register [USER]

ARGUMENTS
  USER  The username for the account using the browser (eg. run "whoami")

DESCRIPTION
  Register a user that is on the system so that we can edit the trust servers for their account

EXAMPLES
  $ certme user register
```
<!-- commandsstop -->
