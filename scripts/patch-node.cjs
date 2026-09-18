const fs = require('node:fs');

// Fix for Node.js v22 on Windows where readlink returns EISDIR instead of EINVAL on regular files
const origReadlink = fs.readlink;
const origReadlinkSync = fs.readlinkSync;

fs.readlink = function (path, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  return origReadlink.call(fs, path, options, (err, linkString) => {
    if (err && (err.code === 'EISDIR' || err.code === 'UNKNOWN')) {
      const einval = new Error(`EINVAL: invalid argument, readlink '${path}'`);
      einval.code = 'EINVAL';
      return callback(einval);
    }
    return callback(err, linkString);
  });
};

fs.readlinkSync = function (path, options) {
  try {
    return origReadlinkSync.call(fs, path, options);
  } catch (err) {
    if (err && (err.code === 'EISDIR' || err.code === 'UNKNOWN')) {
      const einval = new Error(`EINVAL: invalid argument, readlink '${path}'`);
      einval.code = 'EINVAL';
      throw einval;
    }
    throw err;
  }
};

if (fs.promises && fs.promises.readlink) {
  const origPromisesReadlink = fs.promises.readlink;
  fs.promises.readlink = async function (path, options) {
    try {
      return await origPromisesReadlink.call(fs.promises, path, options);
    } catch (err) {
      if (err && (err.code === 'EISDIR' || err.code === 'UNKNOWN')) {
        const einval = new Error(`EINVAL: invalid argument, readlink '${path}'`);
        einval.code = 'EINVAL';
        throw einval;
      }
      throw err;
    }
  };
}
