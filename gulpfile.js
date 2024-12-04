const { src, dest } = require("gulp");

function copyIcons() {
  return src("src/nodes/TripIt/*.svg").pipe(dest("dist/nodes/TripIt"));
}

exports.default = copyIcons;
exports["build:icons"] = copyIcons;
