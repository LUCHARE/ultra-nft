import gulp from 'gulp'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import gulpHb from 'gulp-hb'
import sourcemaps from 'gulp-sourcemaps'
import gulpif from 'gulp-if'
import rename from 'gulp-rename'
import browserSync from 'browser-sync'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import { deleteAsync as del } from 'del'
import dotenv from 'dotenv'

const {src, dest, watch, series, parallel} = gulp

dotenv.config()

const sass = gulpSass(dartSass)
const reload = browserSync.reload

const path = {
    src: {
        root: 'src/',
        markup: ['src/*.html', 'src/*.hbs'],
        partials: 'src/partials/**/*.hbs',
        styles: ['src/styles/*.css','src/styles/*.scss'],
        scripts: ['src/scripts/**/*.js', 'src/scripts/**/*.cjs', 'src/scripts/**/*.mjs'],
        images: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    dist: {
        root: 'dist/',
        markup: 'dist/',
        styles: 'dist/styles/',
        scripts: 'dist/scripts/',
        images: 'dist/images/',
        fonts: 'dist/fonts/'
    },
    watch: {
        markup: ['src/*.html', 'src/*.hbs', 'src/partials/*.hbs'],
        styles: ['src/styles/**/*.css','src/styles/**/*.scss'],
        scripts: ['src/scripts/**/*.js', 'src/scripts/**/*.cjs', 'src/scripts/**/*.mjs'],
        images: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    }
}

const development = process.env['NODE_ENV'] == 'development'

function buildStyles() {
    return src(path.src.styles)
        .pipe(gulpif(development, sourcemaps.init()))
        .pipe(sass.sync({}).on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulpif(development, sourcemaps.write('./')))
        .pipe(dest(path.dist.styles))
        .pipe(reload({ stream: true }))
}

function buildMarkup() {
    return src(path.src.markup)
        .pipe(gulpHb().partials(path.src.partials).helpers('hbs-helpers.cjs'))
        .pipe(rename(path => path.extname = '.html'))
        .pipe(dest(path.dist.markup))
        .pipe(reload({ stream: true }))
}

function buildScripts() {
    return src(path.src.scripts)
        .pipe(sourcemaps.init())
        .pipe(dest(path.dist.scripts))
        .pipe(sourcemaps.write('./'))
        .pipe(reload({ stream: true }))
}

function buildImages() {
    return src(path.src.images)
        .pipe(dest(path.dist.images))
        .pipe(reload({ stream: true }))
}

function buildFonts() {
    return src(path.src.fonts)
        .pipe(dest(path.dist.fonts))
        .pipe(reload({ stream: true }))
}

function clean() {
    return del(path.dist.root)
}

// TODO
function dev() {
    browserSync({server: 'dist', ghostMode: false})

    watch(path.watch.markup, { ignoreInitial: false }, buildMarkup)
    watch(path.watch.styles, { ignoreInitial: false }, buildStyles)
    watch(path.watch.scripts, { ignoreInitial: false }, buildScripts)
    watch(path.watch.images, { ignoreInitial: false }, buildImages)
    watch(path.watch.fonts, { ignoreInitial: false }, buildFonts)
}

const build = series(clean, parallel(buildMarkup, buildStyles, buildScripts, buildImages, buildFonts))

export { dev, build, clean }