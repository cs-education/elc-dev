import Jor1k from './jor1k/js/master/master';
import LinuxTerm from './jor1k/js/plugins/terminal-linux';

// import MyWorker from 'worker-loader!./jor1k/js/worker/worker';

export default () => {
  let termTTY0 = new LinuxTerm('tty0');
  // let webWorker = new MyWorker();
  let webWorker = new Worker('jor1k-worker-min.js');

  return new Jor1k(
    {
      term: termTTY0,
      path: './sys/or1k/',
      worker: webWorker,
      fs: {
        basefsURL: 'basefs-compile.json',
        extendedfsURL: '../fs.json',
        earlyload: [
          'usr/bin/gcc',
          'usr/libexec/gcc/or1k-linux-musl/4.9.0/cc1',
          'usr/libexec/gcc/or1k-linux-musl/4.9.0/collect2',
          'usr/lib/libbfd-2.24.51.20140817.so',
          'usr/lib/gcc/or1k-linux-musl/4.9.0/libgcc.a',
          'usr/bin/as',
          'usr/include/stdio.h',
        ], // list of files which should be loaded immediately after they appear in the filesystem
      },
      system: {
        kernelURL: 'vmlinux.bin.bz2', // kernel image
        memorysize: 32, // in MB, must be a power of two
        cpu: 'asm', // short name for the cpu to use
        ncores: 1,
      }
    }
  );
}
