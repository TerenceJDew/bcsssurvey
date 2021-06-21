

## Step 1 - Dependencies

You will need:

- [Git](http://git-scm.com/downloads)
- [node](https://nodejs.org/)
- [yarn](https://yarnpkg.com/en/docs/install)

## Step 2 - Clone the repository:

From the command line, clone the repository:

```sh
$ git clone https://github.com/TerenceJDew/bcsssurvey.git
```

If you are using yarn run from the root of the repository:

```sh
yarn
```

## Step 4 - Run an app

Once the dependencies are installed, you can run the app:

````sh
cd bcsssurvey
yarn start

Your browser should open up to a running app.

## Troubleshooting

A few common problems:

* **You're having problems cloning the repository.** Some corporate networks block port 22, which git uses to communicate with GitHub over SSH. Instead of using SSH, clone the repo over HTTPS. Use the following command to tell git to always use `https` instead of `git`:

```sh
$ git config --global url."https://".insteadOf git://

# This adds the following to your `~/.gitconfig`:
[url "https://"]
  insteadOf = git://
````

- **You're having trouble installing node.** We recommend using [nvm](https://github.com/creationix/nvm). nvm makes it really easy to use multiple versions of node on the same machine painlessly. After you install nvm, install the latest stable version of node with the following command:

```sh
$ nvm use default stable
```

- **You don't have permissions to install stuff.** You might see an error like `EACCES` during the `npm install` step. If that's the case, it probably means that at some point you did an `sudo npm install` and installed some stuff with root permissions. To fix this, you need to forcefully remove all files that npm caches on your machine and re-install without sudo.

```sh
$ sudo rm -rf node_modules

# If you installed node with nvm (suggested):
$ rm -rf ~/.npm

# If you installed node with Homebrew:
$ sudo rm -rf /usr/local/lib/node_modules

$ npm install
```

