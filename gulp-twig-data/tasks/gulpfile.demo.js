/**
 * Common task
 * */

module.exports = function (gulp, config, plugins) {
    var basePath = config.basePath,
        appName = config.appName,
        appPath = basePath + config.appPath + '/' + appName,
        buildPath = appPath + '/build',
        distPath = appPath + '/dist',
        dataPath = appPath + '/data',
        assetsPath = config.assetsPath,
        viewsPath = config.viewsPath;

    console.log(buildPath);

    var getJsonData = function(file) {
            var fileName = plugins.path.basename(file.path);
            var fileFirsName = fileName.split('.')[0];
            return require(dataPath + '/' + fileFirsName + '.json');
        },
        fnTwig = function(){
            return gulp.src(buildPath+'/twig/*.twig')
                .pipe(plugins.data(getJsonData))
                .pipe(plugins.twig())
                .pipe(gulp.dest(distPath));
        },
        fnJs = function(){
            return gulp.src([buildPath+'/js/*.js'])
                .pipe(gulp.dest(distPath+'/js'))
                .pipe(plugins.rev())
                .pipe(gulp.dest(distPath+'/rev/js'))
                .pipe(plugins.rev.manifest({
                    path: 'rev-manifest-js.json',
                    merge: true
                }))
                .pipe(gulp.dest(distPath+'/rev'));
        },
        fnLess = function(){
            return gulp.src(buildPath+'/less/*.less')
                .pipe(plugins.less())
                .pipe(gulp.dest(distPath+'/css'))
                .pipe(plugins.rename({
                    extname: ".min.css"
                }))
                .pipe(plugins.cssmin())
                .pipe(gulp.dest(distPath+'/css'))
                .pipe(plugins.rev())
                .pipe(gulp.dest(distPath+'/rev/css'))
                .pipe(plugins.rev.manifest({
                        path: 'rev-manifest-css.json',
                        merge: true
                }))
                .pipe(gulp.dest(distPath+'/rev'));
        },
        fnImages = function(){
            return gulp.src([buildPath+'/images/*'])
                .pipe(gulp.dest(distPath+'/images'))
                .pipe(plugins.rev())
                .pipe(gulp.dest(distPath+'/rev/images'))
                .pipe(plugins.rev.manifest({
                    path: 'rev-manifest-images.json',
                    merge: true
                }))
                .pipe(gulp.dest(distPath+'/rev'));
        },
        fnTwigWatch = function(){
            console.log(appName+' watch ...');
            gulp.watch(buildPath + '/twig/**/*.twig',[appName+':twig']);
            gulp.watch(dataPath + '/*.json',[appName+':twig'])
        },
        fnTwigViews = function(){
            return gulp.src([distPath+'/rev/*.json',buildPath+'/twig/**/*.twig'])
                .pipe(plugins.revCollector({
                    replaceReved: true,
                    dirReplacements: {
                        "./images":"{{ asset('newyearbundle/wap') }}/images",
                        "./css": "{{ asset('newyearbundle/wap') }}/css",
                        "./js": "{{ asset('newyearbundle/wap') }}/js",
                        "./cdn/": function(manifest_value) {
                            console.log(manifest_value);
                           // return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                        }
                    }
                }))
                .pipe(gulp.dest(viewsPath+'/'+appName))
        },
        fnAssetsCss = function(){
            return gulp.src(distPath+'/rev/css/*.min.css')
                .pipe(gulp.dest(assetsPath+'/'+appName+'/css'))
        },
        fnAssetsJs = function(){
            return gulp.src(distPath+'/rev/js/*.js')
                .pipe(gulp.dest(assetsPath+'/'+appName+'/js'))
        },
        fnAssetsImages = function(){
            return gulp.src(distPath+'/rev/images/*')
                .pipe(gulp.dest(assetsPath+'/'+appName+'/images'))
        };

    var tasks = [
        appName+':twig',
        appName+':images',
        appName+':js',
        appName+':less',
        appName+':watch'
    ]

    gulp.task(appName+':twig',fnTwig);
    gulp.task(appName+':images',fnImages);
    gulp.task(appName+':js',fnJs);
    gulp.task(appName+':less',fnLess);
    gulp.task(appName+':watch',fnTwigWatch)
    gulp.task(appName+':views',fnTwigViews)

    gulp.task(appName+':assetsJs',fnAssetsJs)
    gulp.task(appName+':assetsCss',fnAssetsCss)
    gulp.task(appName+':assetsImages',fnAssetsImages)
    gulp.task(appName+':assets',[appName+':assetsCss',appName+':assetsJs',appName+':assetsImages'])

    gulp.task(appName,tasks,function(){
        console.log(appName+' run ...');

    });

};

