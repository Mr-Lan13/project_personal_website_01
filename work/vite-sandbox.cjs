const childProcess = require('child_process');

const originalExec = childProcess.exec;

childProcess.exec = function patchedExec(command, options, callback) {
  const done = typeof options === 'function' ? options : callback;

  if (typeof command === 'string' && command.trim().toLowerCase() === 'net use') {
    if (done) {
      process.nextTick(() => done(null, '', ''));
    }
    return {
      stdout: { on() {} },
      stderr: { on() {} },
      on() {},
      kill() {},
    };
  }

  return originalExec.apply(this, arguments);
};
