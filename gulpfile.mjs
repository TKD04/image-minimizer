import { deleteAsync } from "del";
import GulpClient from "gulp";
import imagemin from "gulp-imagemin";
import pngquant from "imagemin-pngquant";

const { dest, src, series } = GulpClient;
const gulpWatch = GulpClient.watch;

const minifyImages = () =>
  src("./src/*.{jpg,jpeg,png,gif,svg}")
    .pipe(imagemin([pngquant({ quality: [0.5, 0.5] })]))
    .pipe(dest("./dist"));

export const convert = () => minifyImages;
export const watch = () => gulpWatch(["./src/*"], minifyImages);
export const clean = () => deleteAsync("./dist/**");
export default series(clean, minifyImages);
