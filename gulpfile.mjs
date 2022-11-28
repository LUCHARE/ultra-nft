import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import gulpHb from "gulp-hb";
import sourcemaps from "gulp-sourcemaps";
import gulpif from "gulp-if";
import rename from "gulp-rename";
import browserSync from "browser-sync";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import { deleteAsync as del } from "del";
import dotenv from "dotenv";
import realFavicon from "gulp-real-favicon";
import fs from "fs";
import webpack from "webpack";
import webpackStream from "webpack-stream";

const { src, dest, watch, series, parallel } = gulp;

dotenv.config();

const sass = gulpSass(dartSass);
const reload = browserSync.reload;

const path = {
    src: {
        root: "src/",
        markup: ["src/*.html", "src/*.hbs"],
        partials: "src/partials/**/*.hbs",
        styles: ["src/styles/*.css", "src/styles/*.scss"],
        scripts: [
            "src/scripts/**/*.js",
            "src/scripts/**/*.cjs",
            "src/scripts/**/*.mjs",
        ],
        images: "src/images/**/*.*",
        fonts: "src/fonts/**/*.*",
    },
    dist: {
        root: "dist/",
        markup: "dist/",
        styles: "dist/styles/",
        scripts: "dist/scripts/",
        images: "dist/images/",
        fonts: "dist/fonts/",
    },
    watch: {
        markup: ["src/*.html", "src/*.hbs", "src/partials/*.hbs"],
        styles: ["src/styles/**/*.css", "src/styles/**/*.scss"],
        scripts: [
            "src/scripts/**/*.js",
            "src/scripts/**/*.cjs",
            "src/scripts/**/*.mjs",
        ],
        images: "src/images/**/*.*",
        fonts: "src/fonts/**/*.*",
        favicon: "src/favicon/*.*",
    },
    favicon: {
        root: "src/favicon",
        master: "src/favicon/master.svg",
        data: "src/favicon/data.json",
        src: [
            "src/favicon/*.*",
            "!src/favicon/master.svg",
            "!src/favicon/data.json",
        ],
        dest: "dist/",
    },
};

const development = process.env["NODE_ENV"] == "development";

function buildStyles() {
    return src(path.src.styles)
        .pipe(gulpif(development, sourcemaps.init()))
        .pipe(sass.sync({}).on("error", sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulpif(development, sourcemaps.write("./")))
        .pipe(dest(path.dist.styles))
        .pipe(reload({ stream: true }));
}

function buildMarkup() {
    return src(path.src.markup)
        .pipe(gulpHb().partials(path.src.partials).helpers("hbs-helpers.cjs"))
        .pipe(rename((path) => (path.extname = ".html")))
        .pipe(
            realFavicon.injectFaviconMarkups(
                JSON.parse(fs.readFileSync(path.favicon.data)).favicon.html_code
            )
        )
        .pipe(dest(path.dist.markup))
        .pipe(reload({ stream: true }));
}

function buildScripts() {
    return src(path.src.scripts)
        .pipe(
            webpackStream(
                {
                    mode: process.env["NODE_ENV"],
                    entry: { main: "./src/scripts/main.mjs" },
                    output: { filename: "[name].js" },
                    devtool: 'source-map'
                },
                webpack,
                (err, stats) => { if (err) console.log(err) }
            )
        )
        .pipe(dest(path.dist.scripts))
        .pipe(reload({ stream: true }));
}

function buildImages() {
    return src(path.src.images)
        .pipe(dest(path.dist.images))
        .pipe(reload({ stream: true }));
}

function buildFonts() {
    return src(path.src.fonts)
        .pipe(dest(path.dist.fonts))
        .pipe(reload({ stream: true }));
}

function buildFavicon() {
    return src(path.favicon.src).pipe(dest(path.favicon.dest));
}

function clean() {
    return del(path.dist.root);
}

// TODO
function dev() {
    browserSync({ server: "dist", ghostMode: false });

    watch(path.watch.markup, { ignoreInitial: false }, buildMarkup);
    watch(path.watch.styles, { ignoreInitial: false }, buildStyles);
    watch(path.watch.scripts, { ignoreInitial: false }, buildScripts);
    watch(path.watch.images, { ignoreInitial: false }, buildImages);
    watch(path.watch.fonts, { ignoreInitial: false }, buildFonts);
    watch(path.watch.favicon, { ignoreInitial: false }, buildFavicon);
}

function generateFavicon(done) {
    realFavicon.generateFavicon(
        {
            masterPicture: path.favicon.master,
            dest: path.favicon.root,
            iconsPath: "/",
            design: {
                ios: {
                    pictureAspect: "noChange",
                    assets: {
                        ios6AndPriorIcons: false,
                        ios7AndLaterIcons: false,
                        precomposedIcons: false,
                        declareOnlyDefaultIcon: true,
                    },
                },
                desktopBrowser: {
                    design: "raw",
                },
                windows: {
                    pictureAspect: "noChange",
                    backgroundColor: "#da532c",
                    onConflict: "override",
                    assets: {
                        windows80Ie10Tile: false,
                        windows10Ie11EdgeTiles: {
                            small: false,
                            medium: true,
                            big: false,
                            rectangle: false,
                        },
                    },
                },
                androidChrome: {
                    pictureAspect: "noChange",
                    themeColor: "#030812",
                    manifest: {
                        display: "standalone",
                        orientation: "notSet",
                        onConflict: "override",
                        declared: true,
                    },
                    assets: {
                        legacyIcon: false,
                        lowResolutionIcons: false,
                    },
                },
            },
            settings: {
                scalingAlgorithm: "Mitchell",
                errorOnImageTooSmall: false,
                readmeFile: false,
                htmlCodeFile: false,
                usePathAsIs: false,
            },
            markupFile: path.favicon.data,
        },
        function () {
            done();
        }
    );
}

const build = series(
    clean,
    parallel(
        buildMarkup,
        buildStyles,
        buildScripts,
        buildImages,
        buildFonts,
        buildFavicon
    )
);

export { dev, build, clean, generateFavicon };