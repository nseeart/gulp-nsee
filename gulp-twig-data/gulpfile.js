'use strict';
/**
 * Created by n.see on 2015/10/8.
 */
var path = require('path');
var gulp = require('gulp'),
    tasks = require('fs').readdirSync('./tasks/'),
    config = require('./gulpConfig.json'),
    tasksArray = (function (bundles) {
        var tasks = [];
        for (var i in bundles) {
            tasks.push(bundles[i].split('.')[1]);
        }
        return tasks;
    })(tasks);

var plugins = {
    "path":path,
    "concat": require('gulp-concat'),
    "jsmin": require('gulp-jsmin'),
    "cssmin": require('gulp-minify-css'),
    "less": require('gulp-less'),
    "data" : require('gulp-data'),
    "twig" : require('gulp-twig'),
    "rename" : require('gulp-rename'),
    "replace" : require('gulp-replace'),
    "rev": require('gulp-rev'),
    "revCollector":require('gulp-rev-collector')
   // "inject": require('gulp-inject'),
    //"usemin": require('gulp-usemin'),
   // "pngquant": require('imagemin-pngquant'),
};

tasks.forEach(function (task) {
    config.appName = task.split('.')[1];
    config.basePath = path.join(__dirname,'/');
    return require('./tasks/' + task)(gulp, config, plugins)
});

gulp.task('default', function () {
    console.log();
    console.log('     +--------------------------------------+')
    console.log('     |  gulp + 你的项目名                   |')
    console.log('     +--------------------------------------+')
    console.log('     |  你的项目列表                        |');
    for(var i in tasksArray){
    console.log('     |  '+ (parseInt(i)+1)+'、 '+tasksArray[i]);
    }
    console.log('     +--------------------------------------+')
    console.log();
});