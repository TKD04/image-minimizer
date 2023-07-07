import { deleteAsync } from "del";
import GulpClient from "gulp";
import imagemin from "gulp-imagemin";
import pngquant from "imagemin-pngquant";

const { dest, series, src, task, watch } = GulpClient;

const minifyImages = () =>
  src("./src/*")
    .pipe(imagemin([pngquant({ quality: [0.5, 0.5] })]))
    .pipe(dest("./dist"));
const clean = () => deleteAsync("./dist/**");

task("watch", () => watch(["./src/*"], minifyImages));
task("clean", clean);

export default series(clean, minifyImages);
