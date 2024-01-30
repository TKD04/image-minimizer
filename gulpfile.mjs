/* eslint-disable import/no-extraneous-dependencies */
import { deleteAsync } from "del";
import GulpClient from "gulp";
import imagemin, { gifsicle, mozjpeg, svgo } from "gulp-imagemin";
import pngquant from "imagemin-pngquant";

const { dest, src, series } = GulpClient;
const gulpWatch = GulpClient.watch;

// ref. https://designsupply-web.com/media/programming/4409/
const minifyImages = () =>
  src("./src/*.{jpg,jpeg,png,gif,svg}")
    .pipe(
      imagemin([
        mozjpeg({ quality: 75 }),
        pngquant({ quality: [0.65, 0.8] }),
        svgo(),
        gifsicle(),
      ])
    )
    .pipe(dest("./dist"));

export const convert = () => minifyImages;
export const watch = () => gulpWatch(["./src/*"], minifyImages);
export const clean = () => deleteAsync("./dist/**");
export default series(clean, minifyImages);
