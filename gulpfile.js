const { src, dest, series, parallel, watch } = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

function buildTypescript() {
  return tsProject.src().pipe(tsProject()).pipe(dest("dist"));
}

function copyIcons() {
  return src("src/nodes/TripIt/*.svg").pipe(dest("dist/nodes/TripIt"));
}

function watchFiles() {
  watch("src/**/*.ts", buildTypescript);
  watch("src/nodes/TripIt/*.svg", copyIcons);
}

exports.build = parallel(buildTypescript, copyIcons);
exports.watch = watchFiles;
exports.default = exports.build;
