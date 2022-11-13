
import gulp from 'gulp'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import gulpif from 'gulp-if'
import { deleteAsync as del } from 'del'
import dotenv from 'dotenv'

const {src, dest, series, parallel} = gulp

dotenv.config()

const sass = gulpSass(dartSass)

const path = {
    src: {
        root: 'src/',
        markup: 'src/*.html',
        styles: ['src/styles/*.css','src/styles/*.scss'],
        scripts: ['src/scripts/*.js', 'src/scripts/*.cjs', 'src/scripts/*.mjs'],
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
    }
}

const development = process.env['NODE_ENV'] == 'development'

function buildStyles() {
    return src(path.src.styles)
        .pipe(gulpif(development, sourcemaps.init()))
        .pipe(sass.sync({}).on('error', err => console.log(err)))
        .pipe(gulpif(development, sourcemaps.write('./')))
        .pipe(dest(path.dist.styles))
}

function buildMarkup() {
    return src(path.src.markup)
        .pipe(dest(path.dist.markup))
}

function buildScripts() {
    return src(path.src.scripts)
        .pipe(sourcemaps.init())
        .pipe(dest(path.dist.scripts))
        .pipe(sourcemaps.write('./'))
}

function buildImages() {
    return src(path.src.images)
        .pipe(dest(path.dist.images))
}

function buildFonts() {
    return src(path.src.fonts)
        .pipe(dest(path.dist.fonts))
}

function clean() {
    return del(path.dist.root)
}

// TODO
function dev() {

}

const build = series(clean, parallel(buildMarkup, buildStyles, buildScripts, buildImages, buildFonts))

export { dev, build, clean }