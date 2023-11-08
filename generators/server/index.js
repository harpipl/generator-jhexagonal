'use strict';

const Fs = require('fs/promises');

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
        this._generateAppMavenPOMs(this.configOptions);
        this._generateCommonMavenPOMs(this.configOptions);
        
        for (let i=0; i < this.configOptions.modules.length; i++) {
            this._generateModuleMavenPOMs(this.configOptions, this.configOptions.modules[i].moduleName);
        }
    }

    _generateMainMavenPOMs(configOptions) {
        const tmpMavenDir = "../../common/files/maven/";

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'pom.xml'),
            this.destinationPath('pom.xml'),
            configOptions
        );

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'modules/pom.xml'),
            this.destinationPath('modules/pom.xml'),
            configOptions
        )
    }

    _generateAppMavenPOMs(configOptions) {
        const tmpMavenDir = "../../common/files/maven/";

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'app/pom.xml'),
            this.destinationPath('app/pom.xml'),
            configOptions
        );

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'app/src/main/java/Application.java'),
            this.destinationPath('app/src/main/java/' + configOptions.packageFolder + '/Application.java'),
            configOptions
        );

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'app/src/main/resources/application.properties'),
            this.destinationPath('app/src/main/resources/application.properties'),
            configOptions
        );

    }

    _generateCommonMavenPOMs(configOptions) {
        const tmpMavenDir = "../../common/files/maven/modules/common/";

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'pom.xml'),
            this.destinationPath('modules/common/pom.xml'),
            configOptions
        )

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'common-app/pom.xml'),
            this.destinationPath('modules/common/common-app/pom.xml'),
            configOptions
        )

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'common-app/src/main/java/SpringBootAutoConfiguration.java'),
            this.destinationPath('modules/common/common-app/src/main/java/' + configOptions.packageFolder + '/common/app/SpringBootAutoConfiguration.java'),
            configOptions
        )

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'common-domain/pom.xml'),
            this.destinationPath('modules/common/common-domain/pom.xml'),
            configOptions
        )

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'common-domain/src/main/java/UseCase.java'),
            this.destinationPath('modules/common/common-domain/src/main/java/' + configOptions.packageFolder + '/common/domain/UseCase.java'),
            configOptions
        )

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'common-infrastructure/pom.xml'),
            this.destinationPath('modules/common/common-infrastructure/pom.xml'),
            configOptions
        )

        Fs.mkdir('modules/common/common-infrastructure/src/main/java/' + configOptions.packageFolder + '/common/infrastructure', { recursive: true });
    }

    _generateModuleMavenPOMs(configOptions, name) {
        const tmpMavenDir = "../../common/files/maven/modules/module/";
        configOptions.moduleName = name;

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'pom.xml'),
            this.destinationPath('modules/' + name + '/pom.xml'),
            configOptions
        )

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'module-app/pom.xml'),
            this.destinationPath('modules/' + name + '/' + name + '-app/pom.xml'),
            configOptions
        )

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'module-domain/pom.xml'),
            this.destinationPath('modules/' + name + '/' + name + '-domain/pom.xml'),
            configOptions
        )

        this.fs.copyTpl(
            this.templatePath(tmpMavenDir + 'module-infrastructure/pom.xml'),
            this.destinationPath('modules/' + name + '/' + name + '-infrastructure/pom.xml'),
            configOptions
        )
    }
}