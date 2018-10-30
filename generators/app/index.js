'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    async prompting() {
        this.answers = await this.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of your project?'
            },
            {
                type: 'input',
                name: 'description',
                message: 'What is the description of your project?'
            }
        ]);
    }

    writing() {
        this._writingPackageJSON();
        this._writingYarnInstallPackages();
        this._writingBabelRc();
        this._writingTailwind();
        this._writingPostCssConfig();
        this._writingNowJson();
        this._writingNextConfig();
        this._writingNotesTxt();
        this._writingGitIgnoreFile();
        this._writingEnvFiles();
        this._writingFavicons();
        this._writingPages();
        this._writingCss();
        this._writingServerFile();
    }

    _writingPackageJSON() {
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            {
                title: this.answers.title
                    .split(' ')
                    .map(word => word.toLowerCase())
                    .join('-'),
                description: this.answers.description
            }
        );
    }

    _writingYarnInstallPackages() {
        this.yarnInstall([
            '@zeit/next-css',
            'babel-plugin-styled-components',
            'convict',
            'dotenv',
            'express',
            'isomorphic-unfetch',
            'lru-cache',
            'next',
            'nprogress',
            'purgecss-webpack-plugin',
            'react',
            'react-dom',
            'react-responsive',
            'react-sizeme',
            'styled-components',
            'styled-normalize'
        ]);

        this.yarnInstall(
            [
                'autoprefixer',
                'babel-plugin-tailwind-components',
                'cssnano',
                'glob-all',
                'next-fonts',
                'next-images',
                'tailwindcss'
            ],
            { dev: true }
        );
    }

    _writingBabelRc() {
        this.fs.copy(this.templatePath('babelrc.json'), this.destinationPath('.babelrc'));
    }

    _writingTailwind() {
        this.fs.copy(
            this.templatePath('tailwind.js'),
            this.destinationPath('tailwind.js')
        );
    }

    _writingPostCssConfig() {
        this.fs.copy(
            this.templatePath('postcss.config.js'),
            this.destinationPath('postcss.config.js')
        );
    }

    _writingNowJson() {
        this.fs.copyTpl(this.templatePath('now.json'), this.destinationPath('now.json'), {
            title: this.answers.title
        });
    }

    _writingNextConfig() {
        this.fs.copy(
            this.templatePath('next.config.js'),
            this.destinationPath('next.config.js')
        );
    }

    _writingNotesTxt() {
        this.fs.copy(this.templatePath('notes.txt'), this.destinationPath('notes.txt'));
    }

    _writingGitIgnoreFile() {
        this.fs.copy(
            this.templatePath('gitignore.txt'),
            this.destinationPath('.gitignore')
        );
    }

    _writingEnvFiles() {
        this.fs.copy(this.templatePath('env.txt'), this.destinationPath('.env'));
        this.fs.copy(
            this.templatePath('env.production.txt'),
            this.destinationPath('.env.production')
        );
    }

    _writingFavicons() {
        this.fs.copy(
            this.templatePath('static/favicons/favicons.txt'),
            this.destinationPath('static/favicons/favicons.txt')
        );
    }

    _writingPages() {
        // Index
        this.fs.copyTpl(
            this.templatePath('pages/index.js'),
            this.destinationPath('pages/index.js'),
            {
                title: this.answers.title
            }
        );

        // _App
        this.fs.copyTpl(
            this.templatePath('pages/_app.js'),
            this.destinationPath('pages/_app.js'),
            {
                title: this.answers.title,
                appName: this.answers.title
                    .split(' ')
                    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
                    .join('')
            }
        );
        // _document
        this.fs.copy(
            this.templatePath('pages/_document.js'),
            this.destinationPath('pages/_document.js')
        );
    }

    _writingCss() {
        this.fs.copy(
            this.templatePath('assets/css/app.css'),
            this.destinationPath('assets/css/app.css')
        );
        this.fs.copy(
            this.templatePath('assets/css/nprogress.css'),
            this.destinationPath('assets/css/nprogress.css')
        );
    }

    _writingServerFile() {
        this.fs.copy(this.templatePath('server.js'), this.destinationPath('server.js'));
    }

    install() {
        this.installDependencies({
            npm: false,
            bower: false,
            yarn: true
        });
    }
};
