const gm = require('gm').subClass({ imageMagick: true });
const through = require('through2');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;
const colors = require('colors');

function gulpImg (options) {
  let config = {

  };
  if (typeof options === "object") {
    for (let i in options) {
      config[i] = options[i];
    }
  }

  let stream = through.obj(function (file, enc, cb) {
    if (file.isStream()) {
      this.emit('error');
      return cb();
    }
    if (file.isBuffer()) {
      let that = this;
      gm(file.contents)
        .format(function (err, format) {
          if (format == "JPEG") {
                // that.push(file.clone());
            this.interlace('Line')
                .toBuffer('JPEG', (err, buffer) => {
                  if (err) {
                    console.log((err + file.path + "-连续化失败").red);
                  }
                  file.contents = buffer;
                  that.push(file);
                  cb();
                });
          } else if (format == "PNG") {
            if (/\.((jpg)|(jpeg))$/i.test(file.path)) {
              this.toBuffer('JPEG', (err, buffer) => {
                if (err) {
                  console.log((err + file.path + "修改格式失败").red);
                }

                file.contents = buffer;
                that.push(file);
                cb();
              });
            } else {
              file.contents = buffer;
              that.push(file);
              cb();
            }
          }
        });
    }
  });

  return stream;
};

module.exports = gulpImg;
