<h1 align="center">
  mppm
</h1>
<p align="center">
  <a href="https://travis-ci.org/helongbin/mppm">
    <img alt="Travis Status" src="https://img.shields.io/travis/helongbin/mppm/master.svg?style=flat&label=travis">
  </a>
  <a href="https://www.npmjs.com/package/mppm">
    <img alt="NPM version" src="https://img.shields.io/npm/v/mppm">
  </a>
</p>


* [Usage](#Usage)
* [Config](#Config)
* [Command](#command)
  * [bootsrap](#bootsrap)
  * [run](#run)
  * [changed](#changed)
  * [publish](#publish)

------
It is similiar with [lerna](https://github.com/lerna/lerna).
But lerna is a little complicated.

## Usage

Project structure can be below  
```
mppm-repo/
  package.json
  mppm.config.js
  packages/
    package-1/
      package.json
    package-2/
      package.json
```
Get started
```
npm install -D mppm
```

## Config
Initialize mppm config with `mppm.config.js` in root folder.  

eg:
```
module.exports = {
  packages: ['packages/*'],
  versionStep: 'patch',
  publishRegistry: 'https://registry.npmjs.org/'
}
```
Above config arguments can be set:
1. packages  
Default value is `['packages/*']`
2. versionStep  
   - `major`, if versionStep is `major`, the major version will be changed, eg: `1.1.1 => 2.0.0`
   - `minor`, `1.1.1 => 1.2.0`
   - `patch`, `1.1.1 => 1.1.2`
   - `premajor`, `1.1.1 => 2.0.0-0`
   - `preminor`, `1.1.1 => 1.2.0-0`
   - `prepatch`, `1.1.1 => 1.1.2-0`
   - `prerelease`, `1.1.1 => 1.1.2-0`
3. versionPreid  
It only works when `versionStep` is one of `prerelease | prepatch | preminor | premajor`.
Eg, if `versionStep` is `prelease` and `versionPreid` is `beta`, version will be changed like `1.1.1 => 1.1.2-beta.0`

4. commitBranch  
Specified branch to be committed
5. commitMessage  
Specified message to be committed
6. publishRegistry  
Your registry to publish, default is `https://registry.npmjs.org/`

## Command
### bootsrap
```
npx mppm bootstrap
``` 
It will install dependencies and devDependencies for each package.  
If there are dependencies between packages, they will be linked each other. 

### run
```
npx mppm run <command>
``` 
It will execute `npm run <command>` for each package.  

### changed
```
npx mppm changed
``` 
It will get all changed packages since last commit

### publish
```
npx mppm publish
```
Publish changed packages and packages which link changed packages.
