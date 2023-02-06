'use strict';

const BaseGenerator = require('../common/base-generator');
const constants = require('../common/constants');
const prompts = require('./prompts');

const yosay = require('yosay');

module.exports = class extends BaseGenerator {
    constructor(args, opts) {
        super(args, opts);
        this.configOptions = this.options.configOptions || {};
    }

    initializing() {
        console.log(yosay('Generating SpringBoot Application with Hexagonal Architecture'))
        Object.assign(this.configOptions, constants);
    }

    get prompting() {
        return prompts.promptingMain;
    }

    get promptingModules() {
        return prompts.promptingModules;
    }

    writing() {
        console.log(this.configOptions)
        this._generateMainMavenPOMs(this.configOptions);
    }

    _generateMainMavenPOMs(configOptions) {
        const tmpMavenDir = "../../common/files/maven/";

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'pom.xml'),
            this.destinationPath('pom.xml'),
            configOptions
        );

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'app/pom.xml'),
            this.destinationPath('app/pom.xml'),
            configOptions
        );

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'modules/pom.xml'),
            this.destinationPath('modules/pom.xml'),
            configOptions
        )
    }
}