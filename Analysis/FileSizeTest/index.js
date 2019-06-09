// Copyright 2010 The Emscripten Authors.  All rights reserved.
// Emscripten is available under two separate licenses, the MIT license and the
// University of Illinois/NCSA Open Source License.  Both these licenses can be
// found in the LICENSE file.

// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module !== 'undefined' ? Module : {};

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'index.data';
    var REMOTE_PACKAGE_BASE = 'index.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
  
    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onerror = function(event) {
        throw new Error("NetworkError for: " + packageName);
      }
      xhr.onload = function(event) {
        if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
          var packageData = xhr.response;
          callback(packageData);
        } else {
          throw new Error(xhr.statusText + " : " + xhr.responseURL);
        }
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', 'build', true, true);
Module['FS_createPath']('/build', 'windows', true, true);
Module['FS_createPath']('/build', 'windows64', true, true);
Module['FS_createPath']('/', 'emu', true, true);
Module['FS_createPath']('/emu', 'dde', true, true);
Module['FS_createPath']('/emu', 'orastuff', true, true);
Module['FS_createPath']('/emu', 'debugs', true, true);
Module['FS_createPath']('/', 'prolog-commons', true, true);
Module['FS_createPath']('/', 'installer', true, true);
Module['FS_createPath']('/installer', 'docs', true, true);
Module['FS_createPath']('/', 'syslib', true, true);
Module['FS_createPath']('/', 'gpp', true, true);
Module['FS_createPath']('/', 'lib', true, true);
Module['FS_createPath']('/', 'etc', true, true);
Module['FS_createPath']('/etc', 'images', true, true);
Module['FS_createPath']('/', 'prolog_includes', true, true);
Module['FS_createPath']('/', 'cmplib', true, true);
Module['FS_createPath']('/cmplib', 'objfiles.saved', true, true);
Module['FS_createPath']('/', 'admin', true, true);
Module['FS_createPath']('/', 'bin', true, true);
Module['FS_createPath']('/', 'packages', true, true);
Module['FS_createPath']('/packages', 'xpath', true, true);
Module['FS_createPath']('/packages/xpath', 'cc', true, true);
Module['FS_createPath']('/packages/xpath/cc', 'libxml', true, true);
Module['FS_createPath']('/packages/xpath/cc', 'bin64', true, true);
Module['FS_createPath']('/packages/xpath/cc', 'bin', true, true);
Module['FS_createPath']('/packages/xpath', 'Misc', true, true);
Module['FS_createPath']('/packages', 'rdf', true, true);
Module['FS_createPath']('/packages', 'altCDF', true, true);
Module['FS_createPath']('/packages/altCDF', 'cdfpt', true, true);
Module['FS_createPath']('/packages/altCDF', 'mknf', true, true);
Module['FS_createPath']('/packages/altCDF/mknf', 'tests', true, true);
Module['FS_createPath']('/packages/altCDF/mknf/tests', 'ex_disj', true, true);
Module['FS_createPath']('/packages/altCDF/mknf/tests', 'chkCon', true, true);
Module['FS_createPath']('/packages/altCDF', 'cdf', true, true);
Module['FS_createPath']('/packages/altCDF', 'mytest', true, true);
Module['FS_createPath']('/packages/altCDF/mytest', 'cdftest1', true, true);
Module['FS_createPath']('/packages/altCDF', 'doc', true, true);
Module['FS_createPath']('/packages/altCDF/doc', 'Figures', true, true);
Module['FS_createPath']('/packages/altCDF', 'cdftp', true, true);
Module['FS_createPath']('/packages/altCDF/cdftp', 'ontologies', true, true);
Module['FS_createPath']('/packages/altCDF/cdftp/ontologies', 'ont1', true, true);
Module['FS_createPath']('/packages/altCDF/cdftp', 'curtest', true, true);
Module['FS_createPath']('/packages/altCDF', 'tests', true, true);
Module['FS_createPath']('/packages/altCDF/tests', 'ce_tests', true, true);
Module['FS_createPath']('/packages/altCDF/tests', 'onto_tests', true, true);
Module['FS_createPath']('/packages/altCDF/tests/onto_tests', 'ont1', true, true);
Module['FS_createPath']('/packages/altCDF', 'scripts', true, true);
Module['FS_createPath']('/packages', 'sgml', true, true);
Module['FS_createPath']('/packages/sgml', 'cc', true, true);
Module['FS_createPath']('/packages/sgml/cc', 'dtd', true, true);
Module['FS_createPath']('/packages', 'libwww', true, true);
Module['FS_createPath']('/packages/libwww', 'cc', true, true);
Module['FS_createPath']('/packages', 'chr_d', true, true);
Module['FS_createPath']('/packages', 'curl', true, true);
Module['FS_createPath']('/packages/curl', 'cc', true, true);
Module['FS_createPath']('/packages/curl/cc', 'curl', true, true);
Module['FS_createPath']('/packages/curl/cc', 'bin64', true, true);
Module['FS_createPath']('/packages/curl/cc', 'bin', true, true);
Module['FS_createPath']('/packages/curl', 'Misc', true, true);
Module['FS_createPath']('/packages', 'w4', true, true);
Module['FS_createPath']('/packages', 'xsbdoc', true, true);
Module['FS_createPath']('/packages/xsbdoc', 'doc', true, true);
Module['FS_createPath']('/packages', 'clpqr', true, true);
Module['FS_createPath']('/packages', 'gap', true, true);
Module['FS_createPath']('/packages', 'pcre', true, true);
Module['FS_createPath']('/packages/pcre', 'cc', true, true);
Module['FS_createPath']('/packages/pcre/cc', 'pcre', true, true);
Module['FS_createPath']('/packages/pcre/cc', 'bin64', true, true);
Module['FS_createPath']('/packages/pcre/cc', 'bin', true, true);
Module['FS_createPath']('/packages/pcre', 'Misc', true, true);
Module['FS_createPath']('/packages', 'chr', true, true);
Module['FS_createPath']('/packages', 'slx', true, true);
Module['FS_createPath']('/packages', 'pita', true, true);
Module['FS_createPath']('/packages/pita', 'examples', true, true);
Module['FS_createPath']('/packages', 'dbdrivers', true, true);
Module['FS_createPath']('/packages/dbdrivers', 'cc', true, true);
Module['FS_createPath']('/packages/dbdrivers/cc', 'windows', true, true);
Module['FS_createPath']('/packages/dbdrivers/cc', 'windows64', true, true);
Module['FS_createPath']('/packages/dbdrivers', 'mysql', true, true);
Module['FS_createPath']('/packages/dbdrivers/mysql', 'cc', true, true);
Module['FS_createPath']('/packages/dbdrivers/mysql/cc', 'windows', true, true);
Module['FS_createPath']('/packages/dbdrivers/mysql/cc', 'windows64', true, true);
Module['FS_createPath']('/packages/dbdrivers/mysql', 'Misc', true, true);
Module['FS_createPath']('/packages/dbdrivers', 'odbc', true, true);
Module['FS_createPath']('/packages/dbdrivers/odbc', 'cc', true, true);
Module['FS_createPath']('/packages/dbdrivers/odbc/cc', 'windows', true, true);
Module['FS_createPath']('/packages/dbdrivers/odbc/cc', 'windows64', true, true);
Module['FS_createPath']('/packages/dbdrivers/odbc', 'Misc', true, true);
Module['FS_createPath']('/packages/dbdrivers', 'mysqlembedded', true, true);
Module['FS_createPath']('/packages/dbdrivers/mysqlembedded', 'cc', true, true);
Module['FS_createPath']('/packages/dbdrivers/mysqlembedded', 'Misc', true, true);
Module['FS_createPath']('/packages', 'xmc', true, true);
Module['FS_createPath']('/packages/xmc', 'GUI', true, true);
Module['FS_createPath']('/packages', 'perlmatch', true, true);
Module['FS_createPath']('/packages/perlmatch', 'cc', true, true);
Module['FS_createPath']('/packages', 'justify', true, true);
Module['FS_createPath']('/packages', 'xref', true, true);
Module['FS_createPath']('/packages', 'wildmatch', true, true);
Module['FS_createPath']('/packages/wildmatch', 'cc', true, true);
Module['FS_createPath']('/packages', 'CDF', true, true);
Module['FS_createPath']('/packages/CDF', 'rdf', true, true);
Module['FS_createPath']('/packages/CDF', 'doc', true, true);
Module['FS_createPath']('/packages/CDF', 'test', true, true);
Module['FS_createPath']('/packages/CDF/test', 'test5dir', true, true);
Module['FS_createPath']('/packages/CDF/test', 'test2dir', true, true);
Module['FS_createPath']('/packages/CDF/test', 'test3dir', true, true);
Module['FS_createPath']('/packages/CDF/test', 'test6dir', true, true);
Module['FS_createPath']('/packages/CDF', 'theoremprover', true, true);
Module['FS_createPath']('/packages', 'bounds', true, true);
Module['FS_createPath']('/packages', 'regmatch', true, true);
Module['FS_createPath']('/packages/regmatch', 'cc', true, true);
Module['FS_createPath']('/packages', 'xasp', true, true);
Module['FS_createPath']('/packages/xasp', 'intf_examples', true, true);
Module['FS_createPath']('/packages/xasp', 'doc', true, true);
Module['FS_createPath']('/packages/xasp', 'makefiles', true, true);
Module['FS_createPath']('/packages/xasp', 'smodels', true, true);
Module['FS_createPath']('/packages/xasp', 'tests', true, true);
Module['FS_createPath']('/packages/xasp/tests', 'basic_tests', true, true);
Module['FS_createPath']('/', 'config', true, true);
Module['FS_createPath']('/config', 'x86_64-unknown-linux-gnu', true, true);
Module['FS_createPath']('/config/x86_64-unknown-linux-gnu', 'saved.o', true, true);
Module['FS_createPath']('/config/x86_64-unknown-linux-gnu', 'lib', true, true);
Module['FS_createPath']('/config/x86_64-unknown-linux-gnu', 'bin', true, true);
Module['FS_createPath']('/', 'examples', true, true);
Module['FS_createPath']('/examples', 'xpath', true, true);
Module['FS_createPath']('/examples/xpath', 'files', true, true);
Module['FS_createPath']('/examples/xpath', 'expectedoutput', true, true);
Module['FS_createPath']('/examples', 'rdf', true, true);
Module['FS_createPath']('/examples/rdf', 'suite', true, true);
Module['FS_createPath']('/examples/rdf', 'expectedoutput', true, true);
Module['FS_createPath']('/examples', 'sgml', true, true);
Module['FS_createPath']('/examples/sgml', 'files', true, true);
Module['FS_createPath']('/examples/sgml', 'expectedoutput', true, true);
Module['FS_createPath']('/examples', 'libwww', true, true);
Module['FS_createPath']('/examples/libwww', 'files', true, true);
Module['FS_createPath']('/examples', 'chr_d', true, true);
Module['FS_createPath']('/examples', 'curl', true, true);
Module['FS_createPath']('/examples/curl', 'certificates', true, true);
Module['FS_createPath']('/examples/curl', 'expectedoutput', true, true);
Module['FS_createPath']('/examples', 'c_calling_XSB', true, true);
Module['FS_createPath']('/examples', 'XSB_calling_c', true, true);
Module['FS_createPath']('/examples', 'chr', true, true);
Module['FS_createPath']('/examples', 'threads', true, true);
Module['FS_createPath']('/examples', 'xmc', true, true);
Module['FS_createPath']('/examples/xmc', 'Tests', true, true);
Module['FS_createPath']('/examples/xmc', 'ABP', true, true);
Module['FS_createPath']('/examples/xmc', 'Iproto', true, true);
Module['FS_createPath']('/examples/xmc', 'Needham', true, true);
Module['FS_createPath']('/examples/xmc', 'Rether', true, true);
Module['FS_createPath']('/examples/xmc', 'Metalock', true, true);
Module['FS_createPath']('/examples/xmc', 'Sieve', true, true);
Module['FS_createPath']('/examples/xmc', 'Leader', true, true);
Module['FS_createPath']('/examples', 'socket', true, true);
Module['FS_createPath']('/examples/socket', 'select', true, true);
Module['FS_createPath']('/examples', 'subprocess', true, true);
Module['FS_createPath']('/examples', 'incremental', true, true);
Module['FS_createPath']('/', 'docs', true, true);
Module['FS_createPath']('/docs', 'userman', true, true);

    function DataRequest(start, end, audio) {
      this.start = start;
      this.end = end;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);
        this.finish(byteArray);
      },
      finish: function(byteArray) {
        var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      }
    };

        var files = metadata.files;
        for (var i = 0; i < files.length; ++i) {
          new DataRequest(files[i].start, files[i].end, files[i].audio).open('GET', files[i].filename);
        }

  
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
  
          var files = metadata.files;
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }
              Module['removeRunDependency']('datafile_index.data');

    };
    Module['addRunDependency']('datafile_index.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage({"files": [{"start": 0, "audio": 0, "end": 616, "filename": "/FAQ"}, {"start": 616, "audio": 0, "end": 46946, "filename": "/InstallXSB.jar"}, {"start": 46946, "audio": 0, "end": 49202, "filename": "/README"}, {"start": 49202, "audio": 0, "end": 50923, "filename": "/INSTALL_PROBLEMS"}, {"start": 50923, "audio": 0, "end": 58556, "filename": "/INSTALL"}, {"start": 58556, "audio": 0, "end": 59962, "filename": "/Makefile"}, {"start": 59962, "audio": 0, "end": 62864, "filename": "/INSTALL_WINDOWS"}, {"start": 62864, "audio": 0, "end": 86847, "filename": "/LICENSE"}, {"start": 86847, "audio": 0, "end": 91274, "filename": "/build/xsb.in"}, {"start": 91274, "audio": 0, "end": 94732, "filename": "/build/private_builtin.in"}, {"start": 94732, "audio": 0, "end": 110436, "filename": "/build/README"}, {"start": 110436, "audio": 0, "end": 142780, "filename": "/build/config.sub"}, {"start": 142780, "audio": 0, "end": 143168, "filename": "/build/pkg_config.sh"}, {"start": 143168, "audio": 0, "end": 143399, "filename": "/build/xmc-gui.in"}, {"start": 143399, "audio": 0, "end": 143506, "filename": "/build/strip.sh"}, {"start": 143506, "audio": 0, "end": 143936, "filename": "/build/def_debug.in"}, {"start": 143936, "audio": 0, "end": 144159, "filename": "/build/banner.in"}, {"start": 144159, "audio": 0, "end": 146248, "filename": "/build/smoMakefile.in"}, {"start": 146248, "audio": 0, "end": 146248, "filename": "/build/MSVC.dep"}, {"start": 146248, "audio": 0, "end": 336373, "filename": "/build/a.out"}, {"start": 336373, "audio": 0, "end": 339038, "filename": "/build/makexsb.in"}, {"start": 339038, "audio": 0, "end": 339698, "filename": "/build/MSVC.sed"}, {"start": 339698, "audio": 0, "end": 341775, "filename": "/build/copysubdirs.sh"}, {"start": 341775, "audio": 0, "end": 593038, "filename": "/build/configure"}, {"start": 593038, "audio": 0, "end": 595430, "filename": "/build/modMakefile.in"}, {"start": 595430, "audio": 0, "end": 603175, "filename": "/build/xsb_configuration.in"}, {"start": 603175, "audio": 0, "end": 603793, "filename": "/build/makedef.sh.in"}, {"start": 603793, "audio": 0, "end": 603826, "filename": "/build/sendlog.msg"}, {"start": 603826, "audio": 0, "end": 640060, "filename": "/build/config.status"}, {"start": 640060, "audio": 0, "end": 648296, "filename": "/build/a.out.worker.js"}, {"start": 648296, "audio": 0, "end": 656137, "filename": "/build/acconfig.h"}, {"start": 656137, "audio": 0, "end": 656470, "filename": "/build/touch.sh"}, {"start": 656470, "audio": 0, "end": 657412, "filename": "/build/register.sh"}, {"start": 657412, "audio": 0, "end": 658979, "filename": "/build/clean_pkgs.sh"}, {"start": 658979, "audio": 0, "end": 664701, "filename": "/build/Installation_summary"}, {"start": 664701, "audio": 0, "end": 681829, "filename": "/build/topMakefile.in"}, {"start": 681829, "audio": 0, "end": 726417, "filename": "/build/config.guess"}, {"start": 726417, "audio": 0, "end": 916495, "filename": "/build/a.out.js"}, {"start": 916495, "audio": 0, "end": 923068, "filename": "/build/def_config.in"}, {"start": 923068, "audio": 0, "end": 925929, "filename": "/build/makexsb"}, {"start": 925929, "audio": 0, "end": 928025, "filename": "/build/chr_pp.in"}, {"start": 928025, "audio": 0, "end": 937331, "filename": "/build/def_config_mnoc.in"}, {"start": 937331, "audio": 0, "end": 938858, "filename": "/build/makexsb64.bat"}, {"start": 938858, "audio": 0, "end": 940208, "filename": "/build/xmc.in"}, {"start": 940208, "audio": 0, "end": 950975, "filename": "/build/emuMakefile.in"}, {"start": 950975, "audio": 0, "end": 956560, "filename": "/build/install-sh"}, {"start": 956560, "audio": 0, "end": 957994, "filename": "/build/makexsb.bat"}, {"start": 957994, "audio": 0, "end": 958063, "filename": "/build/registration.msg"}, {"start": 958063, "audio": 0, "end": 1018077, "filename": "/build/config.log"}, {"start": 1018077, "audio": 0, "end": 1019732, "filename": "/build/MSVC.sh"}, {"start": 1019732, "audio": 0, "end": 1021498, "filename": "/build/gppMakefile.in"}, {"start": 1021498, "audio": 0, "end": 1090815, "filename": "/build/configure.in"}, {"start": 1090815, "audio": 0, "end": 1092672, "filename": "/build/version.sh"}, {"start": 1092672, "audio": 0, "end": 1092884, "filename": "/build/windows/banner.in"}, {"start": 1092884, "audio": 0, "end": 1100710, "filename": "/build/windows/xsb_configuration.in"}, {"start": 1100710, "audio": 0, "end": 1103517, "filename": "/build/windows/xsb_config.h"}, {"start": 1103517, "audio": 0, "end": 1112745, "filename": "/build/windows/MSVC_mkfile.in"}, {"start": 1112745, "audio": 0, "end": 1120482, "filename": "/build/windows/xsb_configuration.P"}, {"start": 1120482, "audio": 0, "end": 1120864, "filename": "/build/windows/xsb_config_aux.h"}, {"start": 1120864, "audio": 0, "end": 1123555, "filename": "/build/windows/def_config.in"}, {"start": 1123555, "audio": 0, "end": 1123701, "filename": "/build/windows/banner.msg"}, {"start": 1123701, "audio": 0, "end": 1124244, "filename": "/build/windows/xsb_debug.h"}, {"start": 1124244, "audio": 0, "end": 1133524, "filename": "/build/windows/MSVC_mkfile.mak"}, {"start": 1133524, "audio": 0, "end": 1133736, "filename": "/build/windows64/banner.in"}, {"start": 1133736, "audio": 0, "end": 1141553, "filename": "/build/windows64/xsb_configuration.in"}, {"start": 1141553, "audio": 0, "end": 1144362, "filename": "/build/windows64/xsb_config.h"}, {"start": 1144362, "audio": 0, "end": 1153592, "filename": "/build/windows64/MSVC_mkfile.in"}, {"start": 1153592, "audio": 0, "end": 1161322, "filename": "/build/windows64/xsb_configuration.P"}, {"start": 1161322, "audio": 0, "end": 1161721, "filename": "/build/windows64/xsb_config_aux.h"}, {"start": 1161721, "audio": 0, "end": 1164412, "filename": "/build/windows64/def_config.in"}, {"start": 1164412, "audio": 0, "end": 1164558, "filename": "/build/windows64/banner.msg"}, {"start": 1164558, "audio": 0, "end": 1165103, "filename": "/build/windows64/xsb_debug.h"}, {"start": 1165103, "audio": 0, "end": 1174387, "filename": "/build/windows64/MSVC_mkfile.mak"}, {"start": 1174387, "audio": 0, "end": 1175679, "filename": "/emu/interprolog_xsb_i.h"}, {"start": 1175679, "audio": 0, "end": 1218416, "filename": "/emu/system_xsb.c"}, {"start": 1218416, "audio": 0, "end": 1227206, "filename": "/emu/residual.c"}, {"start": 1227206, "audio": 0, "end": 1236459, "filename": "/emu/schedrev_xsb_i.h"}, {"start": 1236459, "audio": 0, "end": 1309399, "filename": "/emu/debug_xsb.o"}, {"start": 1309399, "audio": 0, "end": 1339603, "filename": "/emu/loader_xsb.o"}, {"start": 1339603, "audio": 0, "end": 1341189, "filename": "/emu/sha1.h"}, {"start": 1341189, "audio": 0, "end": 1342389, "filename": "/emu/emuloop.h"}, {"start": 1342389, "audio": 0, "end": 1350201, "filename": "/emu/residual.o"}, {"start": 1350201, "audio": 0, "end": 1352380, "filename": "/emu/heap_defs_xsb.h"}, {"start": 1352380, "audio": 0, "end": 1379916, "filename": "/emu/tst_insert.o"}, {"start": 1379916, "audio": 0, "end": 1413827, "filename": "/emu/tc_insts_xsb_i.h"}, {"start": 1413827, "audio": 0, "end": 1424770, "filename": "/emu/Makefile.bak"}, {"start": 1424770, "audio": 0, "end": 1429655, "filename": "/emu/dynwin32_xsb_i.h"}, {"start": 1429655, "audio": 0, "end": 1433157, "filename": "/emu/sw_envs.h"}, {"start": 1433157, "audio": 0, "end": 1452705, "filename": "/emu/cinterf.h"}, {"start": 1452705, "audio": 0, "end": 1454121, "filename": "/emu/cell_def_xsb.h"}, {"start": 1454121, "audio": 0, "end": 1470776, "filename": "/emu/cell_xsb.h"}, {"start": 1470776, "audio": 0, "end": 1484116, "filename": "/emu/dis.o"}, {"start": 1484116, "audio": 0, "end": 1729788, "filename": "/emu/builtin.o"}, {"start": 1729788, "audio": 0, "end": 1792492, "filename": "/emu/thread_xsb.c"}, {"start": 1792492, "audio": 0, "end": 1798817, "filename": "/emu/struct_manager.c"}, {"start": 1798817, "audio": 0, "end": 1808266, "filename": "/emu/binding.h"}, {"start": 1808266, "audio": 0, "end": 1811074, "filename": "/emu/call_xsb.c"}, {"start": 1811074, "audio": 0, "end": 1812446, "filename": "/emu/interprolog_xsb.h"}, {"start": 1812446, "audio": 0, "end": 1816115, "filename": "/emu/deadlock.c"}, {"start": 1816115, "audio": 0, "end": 1823512, "filename": "/emu/README"}, {"start": 1823512, "audio": 0, "end": 1836586, "filename": "/emu/orient_xsb.c"}, {"start": 1836586, "audio": 0, "end": 1861406, "filename": "/emu/context.h"}, {"start": 1861406, "audio": 0, "end": 1868234, "filename": "/emu/hashtable_xsb.o"}, {"start": 1868234, "audio": 0, "end": 1880106, "filename": "/emu/sha1.c"}, {"start": 1880106, "audio": 0, "end": 1933592, "filename": "/emu/init_xsb.c"}, {"start": 1933592, "audio": 0, "end": 1989849, "filename": "/emu/trie_lookup.c"}, {"start": 1989849, "audio": 0, "end": 1993919, "filename": "/emu/storage_xsb.c"}, {"start": 1993919, "audio": 0, "end": 2028047, "filename": "/emu/trie_lookup.o"}, {"start": 2028047, "audio": 0, "end": 2029816, "filename": "/emu/cell_xsb_i.h"}, {"start": 2029816, "audio": 0, "end": 2572032, "filename": "/emu/emuloop.o"}, {"start": 2572032, "audio": 0, "end": 2576258, "filename": "/emu/xsb.def"}, {"start": 2576258, "audio": 0, "end": 2605514, "filename": "/emu/tables.o"}, {"start": 2605514, "audio": 0, "end": 2613213, "filename": "/emu/complete_xsb_i.h"}, {"start": 2613213, "audio": 0, "end": 2614469, "filename": "/emu/flags_xsb.h"}, {"start": 2614469, "audio": 0, "end": 2618313, "filename": "/emu/hash_xsb.h"}, {"start": 2618313, "audio": 0, "end": 2631534, "filename": "/emu/struct_intern.c"}, {"start": 2631534, "audio": 0, "end": 2639435, "filename": "/emu/memory_xsb.h"}, {"start": 2639435, "audio": 0, "end": 2641171, "filename": "/emu/sp_unify_xsb_i.h"}, {"start": 2641171, "audio": 0, "end": 2645129, "filename": "/emu/scc_xsb.c"}, {"start": 2645129, "audio": 0, "end": 2648624, "filename": "/emu/findall.h"}, {"start": 2648624, "audio": 0, "end": 2670097, "filename": "/emu/struct_manager.h"}, {"start": 2670097, "audio": 0, "end": 2750465, "filename": "/emu/io_builtins_xsb.o"}, {"start": 2750465, "audio": 0, "end": 2798417, "filename": "/emu/ubi_BinTree.c"}, {"start": 2798417, "audio": 0, "end": 2801717, "filename": "/emu/loader_xsb.h"}, {"start": 2801717, "audio": 0, "end": 2804878, "filename": "/emu/call_graph_xsb.h"}, {"start": 2804878, "audio": 0, "end": 2805948, "filename": "/emu/timer_defs_xsb.h"}, {"start": 2805948, "audio": 0, "end": 2805990, "filename": "/emu/remove_unf.h"}, {"start": 2805990, "audio": 0, "end": 2871610, "filename": "/emu/io_builtins_xsb.c"}, {"start": 2871610, "audio": 0, "end": 2894770, "filename": "/emu/tst_utils.o"}, {"start": 2894770, "audio": 0, "end": 2896653, "filename": "/emu/trassert.h"}, {"start": 2896653, "audio": 0, "end": 2910773, "filename": "/emu/incr_xsb.o"}, {"start": 2910773, "audio": 0, "end": 2968053, "filename": "/emu/error_xsb.c"}, {"start": 2968053, "audio": 0, "end": 2969223, "filename": "/emu/scc_xsb.h"}, {"start": 2969223, "audio": 0, "end": 2975251, "filename": "/emu/url_encode.o"}, {"start": 2975251, "audio": 0, "end": 2980175, "filename": "/emu/call_xsb.o"}, {"start": 2980175, "audio": 0, "end": 2982109, "filename": "/emu/ptoc_tag_xsb_i.h"}, {"start": 2982109, "audio": 0, "end": 2984661, "filename": "/emu/url_encode.c"}, {"start": 2984661, "audio": 0, "end": 2990621, "filename": "/emu/syscall_xsb.h"}, {"start": 2990621, "audio": 0, "end": 3000902, "filename": "/emu/md5.c"}, {"start": 3000902, "audio": 0, "end": 3014594, "filename": "/emu/orient_xsb.o"}, {"start": 3014594, "audio": 0, "end": 3020932, "filename": "/emu/dynaout_xsb_i.h"}, {"start": 3020932, "audio": 0, "end": 3023897, "filename": "/emu/io_builtins_xsb.h"}, {"start": 3023897, "audio": 0, "end": 3027000, "filename": "/emu/token_xsb.h"}, {"start": 3027000, "audio": 0, "end": 3143308, "filename": "/emu/tries.c"}, {"start": 3143308, "audio": 0, "end": 3197647, "filename": "/emu/token_xsb.c"}, {"start": 3197647, "audio": 0, "end": 3199469, "filename": "/emu/dynload.c"}, {"start": 3199469, "audio": 0, "end": 3247853, "filename": "/emu/function.o"}, {"start": 3247853, "audio": 0, "end": 3249377, "filename": "/emu/celltags_xsb.h"}, {"start": 3249377, "audio": 0, "end": 3253320, "filename": "/emu/sys_include.h"}, {"start": 3253320, "audio": 0, "end": 3255534, "filename": "/emu/sig_xsb.h"}, {"start": 3255534, "audio": 0, "end": 3258036, "filename": "/emu/odbc_string.h"}, {"start": 3258036, "audio": 0, "end": 3333516, "filename": "/emu/Makefile"}, {"start": 3333516, "audio": 0, "end": 3451651, "filename": "/emu/builtin.c"}, {"start": 3451651, "audio": 0, "end": 3452661, "filename": "/emu/url_encode.h"}, {"start": 3452661, "audio": 0, "end": 3454833, "filename": "/emu/main_xsb.c"}, {"start": 3454833, "audio": 0, "end": 3503709, "filename": "/emu/findall.o"}, {"start": 3503709, "audio": 0, "end": 3521407, "filename": "/emu/ubi_SplayTree.h"}, {"start": 3521407, "audio": 0, "end": 3566229, "filename": "/emu/slginsts_xsb_i.h"}, {"start": 3566229, "audio": 0, "end": 3659099, "filename": "/emu/emuloop.c"}, {"start": 3659099, "audio": 0, "end": 3660351, "filename": "/emu/orient_xsb.h"}, {"start": 3660351, "audio": 0, "end": 3663455, "filename": "/emu/demand.h"}, {"start": 3663455, "audio": 0, "end": 3666213, "filename": "/emu/com_xsb_interprolog_NativeEngine.h"}, {"start": 3666213, "audio": 0, "end": 3674717, "filename": "/emu/sub_delete.c"}, {"start": 3674717, "audio": 0, "end": 3685333, "filename": "/emu/sha1.o"}, {"start": 3685333, "audio": 0, "end": 3687819, "filename": "/emu/struct_intern.h"}, {"start": 3687819, "audio": 0, "end": 3691370, "filename": "/emu/table_inspection_defs.h"}, {"start": 3691370, "audio": 0, "end": 3700984, "filename": "/emu/gc_profile.h"}, {"start": 3700984, "audio": 0, "end": 3710246, "filename": "/emu/interprolog_callback.c"}, {"start": 3710246, "audio": 0, "end": 3769618, "filename": "/emu/token_xsb.o"}, {"start": 3769618, "audio": 0, "end": 3781371, "filename": "/emu/unify_xsb.h"}, {"start": 3781371, "audio": 0, "end": 3783030, "filename": "/emu/function.h"}, {"start": 3783030, "audio": 0, "end": 3838467, "filename": "/emu/slgdelay.c"}, {"start": 3838467, "audio": 0, "end": 3881342, "filename": "/emu/trace_xsb.c"}, {"start": 3881342, "audio": 0, "end": 3942996, "filename": "/emu/cinterf.c"}, {"start": 3942996, "audio": 0, "end": 3944898, "filename": "/emu/rw_lock.h"}, {"start": 3944898, "audio": 0, "end": 4154873, "filename": "/emu/tr_utils.c"}, {"start": 4154873, "audio": 0, "end": 4158763, "filename": "/emu/random_xsb.c"}, {"start": 4158763, "audio": 0, "end": 4173210, "filename": "/emu/psc_xsb.c"}, {"start": 4173210, "audio": 0, "end": 4175395, "filename": "/emu/wind2unix.h"}, {"start": 4175395, "audio": 0, "end": 4213355, "filename": "/emu/table_stats.o"}, {"start": 4213355, "audio": 0, "end": 4260323, "filename": "/emu/std_pred_xsb_i.h"}, {"start": 4260323, "audio": 0, "end": 4262141, "filename": "/emu/storage_xsb.h"}, {"start": 4262141, "audio": 0, "end": 4274769, "filename": "/emu/thread_xsb.o"}, {"start": 4274769, "audio": 0, "end": 4290268, "filename": "/emu/tr_code_xsb_i.h"}, {"start": 4290268, "audio": 0, "end": 4344876, "filename": "/emu/tst_retrv.o"}, {"start": 4344876, "audio": 0, "end": 4345970, "filename": "/emu/random_xsb.h"}, {"start": 4345970, "audio": 0, "end": 4348756, "filename": "/emu/deref.h"}, {"start": 4348756, "audio": 0, "end": 4351196, "filename": "/emu/getMemorySize.o"}, {"start": 4351196, "audio": 0, "end": 4353535, "filename": "/emu/incr_xsb_defs.h"}, {"start": 4353535, "audio": 0, "end": 4357829, "filename": "/emu/auxlry.c"}, {"start": 4357829, "audio": 0, "end": 4367861, "filename": "/emu/flag_defs_xsb.h"}, {"start": 4367861, "audio": 0, "end": 4379205, "filename": "/emu/bineg_xsb_i.h"}, {"start": 4379205, "audio": 0, "end": 4927893, "filename": "/emu/tries.o"}, {"start": 4927893, "audio": 0, "end": 4945808, "filename": "/emu/tst_aux.h"}, {"start": 4945808, "audio": 0, "end": 4949255, "filename": "/emu/socket_xsb.h"}, {"start": 4949255, "audio": 0, "end": 5005307, "filename": "/emu/subp.o"}, {"start": 5005307, "audio": 0, "end": 5009463, "filename": "/emu/hashtable_itr.h"}, {"start": 5009463, "audio": 0, "end": 5016431, "filename": "/emu/struct_manager.o"}, {"start": 5016431, "audio": 0, "end": 5025205, "filename": "/emu/dis.c"}, {"start": 5025205, "audio": 0, "end": 5112231, "filename": "/emu/debug_xsb.c"}, {"start": 5112231, "audio": 0, "end": 5113312, "filename": "/emu/dynload.h"}, {"start": 5113312, "audio": 0, "end": 5118726, "filename": "/emu/dynelf_xsb_i.h"}, {"start": 5118726, "audio": 0, "end": 5154345, "filename": "/emu/tables.c"}, {"start": 5154345, "audio": 0, "end": 5172621, "filename": "/emu/struct_intern.o"}, {"start": 5172621, "audio": 0, "end": 5178365, "filename": "/emu/trie_search.o"}, {"start": 5178365, "audio": 0, "end": 5297061, "filename": "/emu/cinterf.o"}, {"start": 5297061, "audio": 0, "end": 5307081, "filename": "/emu/hash_xsb.c"}, {"start": 5307081, "audio": 0, "end": 5356433, "filename": "/emu/call_graph_xsb.o"}, {"start": 5356433, "audio": 0, "end": 5361445, "filename": "/emu/dynload.o"}, {"start": 5361445, "audio": 0, "end": 5373909, "filename": "/emu/ubi_SplayTree.o"}, {"start": 5373909, "audio": 0, "end": 5381319, "filename": "/emu/hashtable.h"}, {"start": 5381319, "audio": 0, "end": 5382057, "filename": "/emu/memory_defs.h"}, {"start": 5382057, "audio": 0, "end": 5383101, "filename": "/emu/string_xsb.h"}, {"start": 5383101, "audio": 0, "end": 5526569, "filename": "/emu/biassert.o"}, {"start": 5526569, "audio": 0, "end": 5528222, "filename": "/emu/extensions_xsb.h"}, {"start": 5528222, "audio": 0, "end": 5537341, "filename": "/emu/timer_xsb.c"}, {"start": 5537341, "audio": 0, "end": 5541067, "filename": "/emu/auxlry.h"}, {"start": 5541067, "audio": 0, "end": 5561341, "filename": "/emu/pathname_xsb.c"}, {"start": 5561341, "audio": 0, "end": 5562982, "filename": "/emu/setjmp_xsb.h"}, {"start": 5562982, "audio": 0, "end": 5564214, "filename": "/emu/deadlock.o"}, {"start": 5564214, "audio": 0, "end": 5575662, "filename": "/emu/hash_xsb.o"}, {"start": 5575662, "audio": 0, "end": 5578235, "filename": "/emu/call_xsb_i.h"}, {"start": 5578235, "audio": 0, "end": 5580235, "filename": "/emu/table_status_defs.h"}, {"start": 5580235, "audio": 0, "end": 5606951, "filename": "/emu/tries.h"}, {"start": 5606951, "audio": 0, "end": 5616637, "filename": "/emu/incr_xsb.c"}, {"start": 5616637, "audio": 0, "end": 5627374, "filename": "/emu/hashtable.c"}, {"start": 5627374, "audio": 0, "end": 5628396, "filename": "/emu/incr_xsb.h"}, {"start": 5628396, "audio": 0, "end": 5635987, "filename": "/emu/emuloop_aux.h"}, {"start": 5635987, "audio": 0, "end": 5639898, "filename": "/emu/realloc.h"}, {"start": 5639898, "audio": 0, "end": 5641841, "filename": "/emu/subinst.h"}, {"start": 5641841, "audio": 0, "end": 5652329, "filename": "/emu/sub_delete.o"}, {"start": 5652329, "audio": 0, "end": 5658811, "filename": "/emu/tr_utils.h"}, {"start": 5658811, "audio": 0, "end": 5805677, "filename": "/emu/biassert.c"}, {"start": 5805677, "audio": 0, "end": 5807892, "filename": "/emu/rw_lock.c"}, {"start": 5807892, "audio": 0, "end": 5834122, "filename": "/emu/memory_xsb.c"}, {"start": 5834122, "audio": 0, "end": 5835388, "filename": "/emu/deadlock.h"}, {"start": 5835388, "audio": 0, "end": 5838281, "filename": "/emu/oracle_xsb_i.h"}, {"start": 5838281, "audio": 0, "end": 5840499, "filename": "/emu/usurp.h"}, {"start": 5840499, "audio": 0, "end": 5843214, "filename": "/emu/proc.mk"}, {"start": 5843214, "audio": 0, "end": 5856758, "filename": "/emu/memory_xsb.o"}, {"start": 5856758, "audio": 0, "end": 5869709, "filename": "/emu/inst_xsb.h"}, {"start": 5869709, "audio": 0, "end": 5871293, "filename": "/emu/hashtable_xsb.h"}, {"start": 5871293, "audio": 0, "end": 5930726, "filename": "/emu/call_graph_xsb.c"}, {"start": 5930726, "audio": 0, "end": 5932390, "filename": "/emu/tst_utils.h"}, {"start": 5932390, "audio": 0, "end": 5935160, "filename": "/emu/register.h"}, {"start": 5935160, "audio": 0, "end": 5965664, "filename": "/emu/socket_xsb.o"}, {"start": 5965664, "audio": 0, "end": 5981632, "filename": "/emu/ubi_BinTree.o"}, {"start": 5981632, "audio": 0, "end": 5998241, "filename": "/emu/complete_local.h"}, {"start": 5998241, "audio": 0, "end": 6000141, "filename": "/emu/socket_defs_xsb.h"}, {"start": 6000141, "audio": 0, "end": 6001534, "filename": "/emu/term_psc_xsb_i.h"}, {"start": 6001534, "audio": 0, "end": 6011518, "filename": "/emu/hashtable.o"}, {"start": 6011518, "audio": 0, "end": 6013218, "filename": "/emu/odbc_def_xsb.h"}, {"start": 6013218, "audio": 0, "end": 6024929, "filename": "/emu/varstring.c"}, {"start": 6024929, "audio": 0, "end": 6069205, "filename": "/emu/init_xsb.o"}, {"start": 6069205, "audio": 0, "end": 6070437, "filename": "/emu/scc_xsb.o"}, {"start": 6070437, "audio": 0, "end": 6104280, "filename": "/emu/gc_mark.h"}, {"start": 6104280, "audio": 0, "end": 6105516, "filename": "/emu/conc_compl.o"}, {"start": 6105516, "audio": 0, "end": 6116526, "filename": "/emu/slgdelay.h"}, {"start": 6116526, "audio": 0, "end": 6117782, "filename": "/emu/trie_defs.h"}, {"start": 6117782, "audio": 0, "end": 6118019, "filename": "/emu/cinterf_defs.h"}, {"start": 6118019, "audio": 0, "end": 6124348, "filename": "/emu/hashtable_xsb.c"}, {"start": 6124348, "audio": 0, "end": 6131500, "filename": "/emu/debug_xsb.h"}, {"start": 6131500, "audio": 0, "end": 6133550, "filename": "/emu/conget_xsb_i.h"}, {"start": 6133550, "audio": 0, "end": 6143534, "filename": "/emu/gc_print.h"}, {"start": 6143534, "audio": 0, "end": 6149550, "filename": "/emu/windows_stdint.h"}, {"start": 6149550, "audio": 0, "end": 6189391, "filename": "/emu/findall.c"}, {"start": 6189391, "audio": 0, "end": 6250192, "filename": "/emu/orastuff.pc"}, {"start": 6250192, "audio": 0, "end": 6252636, "filename": "/emu/main_xsb.o"}, {"start": 6252636, "audio": 0, "end": 6275079, "filename": "/emu/tst_insert.c"}, {"start": 6275079, "audio": 0, "end": 6416163, "filename": "/emu/tr_utils.o"}, {"start": 6416163, "audio": 0, "end": 6420823, "filename": "/emu/timer_xsb.o"}, {"start": 6420823, "audio": 0, "end": 6421894, "filename": "/emu/trace_xsb.h"}, {"start": 6421894, "audio": 0, "end": 6425727, "filename": "/emu/token_defs_xsb.h"}, {"start": 6425727, "audio": 0, "end": 6467620, "filename": "/emu/loader_xsb.c"}, {"start": 6467620, "audio": 0, "end": 6482816, "filename": "/emu/psc_xsb.o"}, {"start": 6482816, "audio": 0, "end": 6504457, "filename": "/emu/ubi_SplayTree.c"}, {"start": 6504457, "audio": 0, "end": 6507515, "filename": "/emu/hashtable_private.h"}, {"start": 6507515, "audio": 0, "end": 6525451, "filename": "/emu/tst_utils.c"}, {"start": 6525451, "audio": 0, "end": 6526624, "filename": "/emu/residual.h"}, {"start": 6526624, "audio": 0, "end": 6528952, "filename": "/emu/odbc_xsb_i.h"}, {"start": 6528952, "audio": 0, "end": 6542522, "filename": "/emu/xsb_inst_list.h"}, {"start": 6542522, "audio": 0, "end": 6557603, "filename": "/emu/tst_unify.c"}, {"start": 6557603, "audio": 0, "end": 6564568, "filename": "/emu/thread_xsb.h"}, {"start": 6564568, "audio": 0, "end": 6565800, "filename": "/emu/rw_lock.o"}, {"start": 6565800, "audio": 0, "end": 6567748, "filename": "/emu/system_defs_xsb.h"}, {"start": 6567748, "audio": 0, "end": 6593912, "filename": "/emu/function.c"}, {"start": 6593912, "audio": 0, "end": 6603376, "filename": "/emu/gc_copy.h"}, {"start": 6603376, "audio": 0, "end": 6668068, "filename": "/emu/error_xsb.o"}, {"start": 6668068, "audio": 0, "end": 6671673, "filename": "/emu/tables.h"}, {"start": 6671673, "audio": 0, "end": 6692985, "filename": "/emu/string_xsb.o"}, {"start": 6692985, "audio": 0, "end": 6723505, "filename": "/emu/io_builtins_xsb_i.h"}, {"start": 6723505, "audio": 0, "end": 6725572, "filename": "/emu/subp.h"}, {"start": 6725572, "audio": 0, "end": 6733832, "filename": "/emu/cut_xsb.h"}, {"start": 6733832, "audio": 0, "end": 6734363, "filename": "/emu/CODING_GUIDELINES"}, {"start": 6734363, "audio": 0, "end": 6737264, "filename": "/emu/heap_xsb.h"}, {"start": 6737264, "audio": 0, "end": 6741526, "filename": "/emu/inst_xsb.c"}, {"start": 6741526, "audio": 0, "end": 6744984, "filename": "/emu/private_builtin.c"}, {"start": 6744984, "audio": 0, "end": 6746216, "filename": "/emu/export.h"}, {"start": 6746216, "audio": 0, "end": 6755800, "filename": "/emu/psc_xsb.h"}, {"start": 6755800, "audio": 0, "end": 6759428, "filename": "/emu/storage_xsb.o"}, {"start": 6759428, "audio": 0, "end": 6762532, "filename": "/emu/getMemorySize.c"}, {"start": 6762532, "audio": 0, "end": 6801862, "filename": "/emu/trie_internals.h"}, {"start": 6801862, "audio": 0, "end": 6844978, "filename": "/emu/inst_xsb.o"}, {"start": 6844978, "audio": 0, "end": 6851774, "filename": "/emu/hashtable_itr.o"}, {"start": 6851774, "audio": 0, "end": 6864739, "filename": "/emu/string_xsb.c"}, {"start": 6864739, "audio": 0, "end": 6897283, "filename": "/emu/socket_xsb.c"}, {"start": 6897283, "audio": 0, "end": 6939626, "filename": "/emu/ubi_BinTree.h"}, {"start": 6939626, "audio": 0, "end": 6940852, "filename": "/emu/remove_unf.c"}, {"start": 6940852, "audio": 0, "end": 6954176, "filename": "/emu/orastuff.h"}, {"start": 6954176, "audio": 0, "end": 6969024, "filename": "/emu/tst_unify.o"}, {"start": 6969024, "audio": 0, "end": 7008064, "filename": "/emu/slgdelay.o"}, {"start": 7008064, "audio": 0, "end": 7014352, "filename": "/emu/std_cases_xsb_i.h"}, {"start": 7014352, "audio": 0, "end": 7042476, "filename": "/emu/trace_xsb.o"}, {"start": 7042476, "audio": 0, "end": 7044359, "filename": "/emu/wsipx.h"}, {"start": 7044359, "audio": 0, "end": 7076084, "filename": "/emu/heap_xsb.c"}, {"start": 7076084, "audio": 0, "end": 7077252, "filename": "/emu/tables_i.h"}, {"start": 7077252, "audio": 0, "end": 7082137, "filename": "/emu/varstring_xsb.h"}, {"start": 7082137, "audio": 0, "end": 7086371, "filename": "/emu/dynamic_stack.h"}, {"start": 7086371, "audio": 0, "end": 7101731, "filename": "/emu/pathname_xsb.o"}, {"start": 7101731, "audio": 0, "end": 7188079, "filename": "/emu/heap_xsb.o"}, {"start": 7188079, "audio": 0, "end": 7201472, "filename": "/emu/gc_slide.h"}, {"start": 7201472, "audio": 0, "end": 7221842, "filename": "/emu/wfs_xsb_i.h"}, {"start": 7221842, "audio": 0, "end": 7224366, "filename": "/emu/system_xsb.h"}, {"start": 7224366, "audio": 0, "end": 7228226, "filename": "/emu/tr_delay.h"}, {"start": 7228226, "audio": 0, "end": 7235263, "filename": "/emu/error_xsb.h"}, {"start": 7235263, "audio": 0, "end": 7252606, "filename": "/emu/choice.h"}, {"start": 7252606, "audio": 0, "end": 7262646, "filename": "/emu/trie_search.c"}, {"start": 7262646, "audio": 0, "end": 7263819, "filename": "/emu/storage_xsb_defs.h"}, {"start": 7263819, "audio": 0, "end": 7268908, "filename": "/emu/basictypes.h"}, {"start": 7268908, "audio": 0, "end": 7271726, "filename": "/emu/box_defines.h"}, {"start": 7271726, "audio": 0, "end": 7281441, "filename": "/emu/builtin.h"}, {"start": 7281441, "audio": 0, "end": 7284226, "filename": "/emu/oracle_xsb.h"}, {"start": 7284226, "audio": 0, "end": 7289194, "filename": "/emu/auxlry.o"}, {"start": 7289194, "audio": 0, "end": 7335150, "filename": "/emu/system_xsb.o"}, {"start": 7335150, "audio": 0, "end": 7350308, "filename": "/emu/emudef.h"}, {"start": 7350308, "audio": 0, "end": 7351200, "filename": "/emu/conc_compl.h"}, {"start": 7351200, "audio": 0, "end": 7356903, "filename": "/emu/thread_defs_xsb.h"}, {"start": 7356903, "audio": 0, "end": 7359154, "filename": "/emu/basicdefs.h"}, {"start": 7359154, "audio": 0, "end": 7374832, "filename": "/emu/sub_tables_xsb_i.h"}, {"start": 7374832, "audio": 0, "end": 7376891, "filename": "/emu/biassert_defs.h"}, {"start": 7376891, "audio": 0, "end": 7380447, "filename": "/emu/io_defs_xsb.h"}, {"start": 7380447, "audio": 0, "end": 7381683, "filename": "/emu/remove_unf.o"}, {"start": 7381683, "audio": 0, "end": 7385129, "filename": "/emu/psc_defs.h"}, {"start": 7385129, "audio": 0, "end": 7450387, "filename": "/emu/odbc_xsb.c"}, {"start": 7450387, "audio": 0, "end": 7464711, "filename": "/emu/varstring.o"}, {"start": 7464711, "audio": 0, "end": 7496475, "filename": "/emu/table_stats.c"}, {"start": 7496475, "audio": 0, "end": 7507644, "filename": "/emu/table_stats.h"}, {"start": 7507644, "audio": 0, "end": 7509024, "filename": "/emu/file_modes_xsb.h"}, {"start": 7509024, "audio": 0, "end": 7514205, "filename": "/emu/dynamic_stack.c"}, {"start": 7514205, "audio": 0, "end": 7523433, "filename": "/emu/conc_compl.c"}, {"start": 7523433, "audio": 0, "end": 7524600, "filename": "/emu/xsb_time.h"}, {"start": 7524600, "audio": 0, "end": 7532584, "filename": "/emu/random_xsb.o"}, {"start": 7532584, "audio": 0, "end": 7547120, "filename": "/emu/md5.o"}, {"start": 7547120, "audio": 0, "end": 7553074, "filename": "/emu/hashtable_itr.c"}, {"start": 7553074, "audio": 0, "end": 7600475, "filename": "/emu/tab_structs.h"}, {"start": 7600475, "audio": 0, "end": 7602535, "filename": "/emu/odbc_xsb.h"}, {"start": 7602535, "audio": 0, "end": 7607391, "filename": "/emu/dynamic_stack.o"}, {"start": 7607391, "audio": 0, "end": 7639993, "filename": "/emu/subp.c"}, {"start": 7639993, "audio": 0, "end": 7644782, "filename": "/emu/timer_xsb.h"}, {"start": 7644782, "audio": 0, "end": 7678677, "filename": "/emu/tst_retrv.c"}, {"start": 7678677, "audio": 0, "end": 7691218, "filename": "/emu/dde/ddemain_xsb.c"}, {"start": 7691218, "audio": 0, "end": 7694497, "filename": "/emu/orastuff/desc_sli_xsb_i.h"}, {"start": 7694497, "audio": 0, "end": 7697663, "filename": "/emu/orastuff/open_xsb_i.h"}, {"start": 7697663, "audio": 0, "end": 7701215, "filename": "/emu/orastuff/prepdecl_xsb_i.h"}, {"start": 7701215, "audio": 0, "end": 7704584, "filename": "/emu/orastuff/desc_bv_xsb_i.h"}, {"start": 7704584, "audio": 0, "end": 7707326, "filename": "/emu/orastuff/fetch_xsb_i.h"}, {"start": 7707326, "audio": 0, "end": 7709366, "filename": "/emu/orastuff/close_xsb_i.h"}, {"start": 7709366, "audio": 0, "end": 7709384, "filename": "/emu/debugs/debug_attv.h"}, {"start": 7709384, "audio": 0, "end": 7709692, "filename": "/emu/debugs/README"}, {"start": 7709692, "audio": 0, "end": 7709930, "filename": "/emu/debugs/debug_tries.h"}, {"start": 7709930, "audio": 0, "end": 7710126, "filename": "/emu/debugs/debug_tables.h"}, {"start": 7710126, "audio": 0, "end": 7710192, "filename": "/emu/debugs/debug_delay.h"}, {"start": 7710192, "audio": 0, "end": 7710276, "filename": "/emu/debugs/debug_biassert.h"}, {"start": 7710276, "audio": 0, "end": 7710318, "filename": "/emu/debugs/debug_residual.h"}, {"start": 7710318, "audio": 0, "end": 7710682, "filename": "/prolog-commons/c_arith.pl"}, {"start": 7710682, "audio": 0, "end": 7722185, "filename": "/prolog-commons/c_ordsets.pl"}, {"start": 7722185, "audio": 0, "end": 7723299, "filename": "/prolog-commons/c_numlists.pl"}, {"start": 7723299, "audio": 0, "end": 7732658, "filename": "/prolog-commons/c_aggregate.xwam"}, {"start": 7732658, "audio": 0, "end": 7737890, "filename": "/prolog-commons/c_pairs.pl"}, {"start": 7737890, "audio": 0, "end": 7739297, "filename": "/prolog-commons/c_terms.pl"}, {"start": 7739297, "audio": 0, "end": 7740402, "filename": "/prolog-commons/c_commas.pl"}, {"start": 7740402, "audio": 0, "end": 7759746, "filename": "/prolog-commons/c_aggregate.pl"}, {"start": 7759746, "audio": 0, "end": 7760500, "filename": "/prolog-commons/c_numlists.xwam"}, {"start": 7760500, "audio": 0, "end": 7761640, "filename": "/prolog-commons/c_lists.pl"}, {"start": 7761640, "audio": 0, "end": 7761826, "filename": "/installer/README"}, {"start": 7761826, "audio": 0, "end": 7773467, "filename": "/installer/unixinstall.sh"}, {"start": 7773467, "audio": 0, "end": 7773488, "filename": "/installer/manifest.mf"}, {"start": 7773488, "audio": 0, "end": 7773742, "filename": "/installer/Makefile"}, {"start": 7773742, "audio": 0, "end": 7773847, "filename": "/installer/system.properties"}, {"start": 7773847, "audio": 0, "end": 7774220, "filename": "/installer/makeinstall.sh"}, {"start": 7774220, "audio": 0, "end": 7774403, "filename": "/installer/link.properties"}, {"start": 7774403, "audio": 0, "end": 7777185, "filename": "/installer/Tools.java"}, {"start": 7777185, "audio": 0, "end": 7777546, "filename": "/installer/windowsinstall.bat"}, {"start": 7777546, "audio": 0, "end": 7808628, "filename": "/installer/LinuxFrame.java"}, {"start": 7808628, "audio": 0, "end": 7810045, "filename": "/installer/MainRun.java"}, {"start": 7810045, "audio": 0, "end": 7836900, "filename": "/installer/WindowsFrame.java"}, {"start": 7836900, "audio": 0, "end": 7943211, "filename": "/installer/docs/AddingNewXSBpackage.pdf"}, {"start": 7943211, "audio": 0, "end": 7968158, "filename": "/installer/docs/AddingNewUnixLikeOS.docx"}, {"start": 7968158, "audio": 0, "end": 8145631, "filename": "/installer/docs/FindingTheWindowsOStype.pdf"}, {"start": 8145631, "audio": 0, "end": 8487373, "filename": "/installer/docs/AddingNewUnixLikeOS.pdf"}, {"start": 8487373, "audio": 0, "end": 8502360, "filename": "/installer/docs/AddingNewXSBpackage.docx"}, {"start": 8502360, "audio": 0, "end": 8515216, "filename": "/installer/docs/FindingTheWindowsOStype.docx"}, {"start": 8515216, "audio": 0, "end": 8531001, "filename": "/syslib/xsb_writ.xwam"}, {"start": 8531001, "audio": 0, "end": 8540161, "filename": "/syslib/basics.P"}, {"start": 8540161, "audio": 0, "end": 8545548, "filename": "/syslib/ccallxsb.P"}, {"start": 8545548, "audio": 0, "end": 8553868, "filename": "/syslib/dcg.xwam"}, {"start": 8553868, "audio": 0, "end": 8555417, "filename": "/syslib/basics.H"}, {"start": 8555417, "audio": 0, "end": 8556490, "filename": "/syslib/term_exp.H"}, {"start": 8556490, "audio": 0, "end": 8557788, "filename": "/syslib/xcallxsb.xwam"}, {"start": 8557788, "audio": 0, "end": 8559463, "filename": "/syslib/ccallxsb.H"}, {"start": 8559463, "audio": 0, "end": 8560523, "filename": "/syslib/term_exp.P"}, {"start": 8560523, "audio": 0, "end": 8563745, "filename": "/syslib/gensym.P"}, {"start": 8563745, "audio": 0, "end": 8565153, "filename": "/syslib/gensym.H"}, {"start": 8565153, "audio": 0, "end": 8576153, "filename": "/syslib/file_op.P"}, {"start": 8576153, "audio": 0, "end": 8577865, "filename": "/syslib/gensym.xwam"}, {"start": 8577865, "audio": 0, "end": 8582997, "filename": "/syslib/domain.P"}, {"start": 8582997, "audio": 0, "end": 8584975, "filename": "/syslib/shell.H"}, {"start": 8584975, "audio": 0, "end": 8585274, "filename": "/syslib/README"}, {"start": 8585274, "audio": 0, "end": 8588588, "filename": "/syslib/file_io.H"}, {"start": 8588588, "audio": 0, "end": 8598542, "filename": "/syslib/loader.xwam"}, {"start": 8598542, "audio": 0, "end": 8603022, "filename": "/syslib/debugger_data.P"}, {"start": 8603022, "audio": 0, "end": 8623764, "filename": "/syslib/loader.P"}, {"start": 8623764, "audio": 0, "end": 8624716, "filename": "/syslib/push_io.xwam"}, {"start": 8624716, "audio": 0, "end": 8663256, "filename": "/syslib/assert.P"}, {"start": 8663256, "audio": 0, "end": 8663635, "filename": "/syslib/eval.xwam"}, {"start": 8663635, "audio": 0, "end": 8689972, "filename": "/syslib/std_xsb.P"}, {"start": 8689972, "audio": 0, "end": 8702011, "filename": "/syslib/dcg.P"}, {"start": 8702011, "audio": 0, "end": 8706653, "filename": "/syslib/num_vars.P"}, {"start": 8706653, "audio": 0, "end": 8725836, "filename": "/syslib/xsb_read.xwam"}, {"start": 8725836, "audio": 0, "end": 8739564, "filename": "/syslib/thread.xwam"}, {"start": 8739564, "audio": 0, "end": 8765318, "filename": "/syslib/error_handler.P"}, {"start": 8765318, "audio": 0, "end": 8766663, "filename": "/syslib/xcallxsb.H"}, {"start": 8766663, "audio": 0, "end": 8768030, "filename": "/syslib/subsumes.H"}, {"start": 8768030, "audio": 0, "end": 8845096, "filename": "/syslib/tables.P"}, {"start": 8845096, "audio": 0, "end": 8859163, "filename": "/syslib/increval.P"}, {"start": 8859163, "audio": 0, "end": 8860373, "filename": "/syslib/std_xsb.H"}, {"start": 8860373, "audio": 0, "end": 8864786, "filename": "/syslib/Makefile"}, {"start": 8864786, "audio": 0, "end": 8875494, "filename": "/syslib/dbclause.P"}, {"start": 8875494, "audio": 0, "end": 8879466, "filename": "/syslib/assert.H"}, {"start": 8879466, "audio": 0, "end": 8904762, "filename": "/syslib/xsb_writ.P"}, {"start": 8904762, "audio": 0, "end": 8917738, "filename": "/syslib/increval_v1.P"}, {"start": 8917738, "audio": 0, "end": 8936290, "filename": "/syslib/thread.P"}, {"start": 8936290, "audio": 0, "end": 8961758, "filename": "/syslib/file_io.P"}, {"start": 8961758, "audio": 0, "end": 8967709, "filename": "/syslib/tables.H"}, {"start": 8967709, "audio": 0, "end": 8970628, "filename": "/syslib/xsb_hook.xwam"}, {"start": 8970628, "audio": 0, "end": 8972678, "filename": "/syslib/push_io.P"}, {"start": 8972678, "audio": 0, "end": 8999749, "filename": "/syslib/debugger.P"}, {"start": 8999749, "audio": 0, "end": 9015434, "filename": "/syslib/machine.xwam"}, {"start": 9015434, "audio": 0, "end": 9018294, "filename": "/syslib/x_interp.H"}, {"start": 9018294, "audio": 0, "end": 9019610, "filename": "/syslib/banner.xwam"}, {"start": 9019610, "audio": 0, "end": 9020780, "filename": "/syslib/hilogsym.H"}, {"start": 9020780, "audio": 0, "end": 9023390, "filename": "/syslib/sysinitrc.P"}, {"start": 9023390, "audio": 0, "end": 9045486, "filename": "/syslib/machine.P"}, {"start": 9045486, "audio": 0, "end": 9045648, "filename": "/syslib/CompileChangedFiles.sh"}, {"start": 9045648, "audio": 0, "end": 9047457, "filename": "/syslib/increval_v1.H"}, {"start": 9047457, "audio": 0, "end": 9077463, "filename": "/syslib/std_xsb.xwam"}, {"start": 9077463, "audio": 0, "end": 9080018, "filename": "/syslib/banner.P"}, {"start": 9080018, "audio": 0, "end": 9110706, "filename": "/syslib/debugger.xwam"}, {"start": 9110706, "audio": 0, "end": 9112667, "filename": "/syslib/increval.H"}, {"start": 9112667, "audio": 0, "end": 9118016, "filename": "/syslib/shell.xwam"}, {"start": 9118016, "audio": 0, "end": 9131187, "filename": "/syslib/string.xwam"}, {"start": 9131187, "audio": 0, "end": 9152119, "filename": "/syslib/file_io.xwam"}, {"start": 9152119, "audio": 0, "end": 9154568, "filename": "/syslib/thread.H"}, {"start": 9154568, "audio": 0, "end": 9155865, "filename": "/syslib/num_vars.H"}, {"start": 9155865, "audio": 0, "end": 9157440, "filename": "/syslib/subsumes.xwam"}, {"start": 9157440, "audio": 0, "end": 9157620, "filename": "/syslib/sub_atom.H"}, {"start": 9157620, "audio": 0, "end": 9165388, "filename": "/syslib/standard.H"}, {"start": 9165388, "audio": 0, "end": 9166217, "filename": "/syslib/sysinitrc.xwam"}, {"start": 9166217, "audio": 0, "end": 9232957, "filename": "/syslib/tables.xwam"}, {"start": 9232957, "audio": 0, "end": 9239674, "filename": "/syslib/setof.P"}, {"start": 9239674, "audio": 0, "end": 9243685, "filename": "/syslib/unix.P"}, {"start": 9243685, "audio": 0, "end": 9259447, "filename": "/syslib/x_interp.P"}, {"start": 9259447, "audio": 0, "end": 9264671, "filename": "/syslib/subsumes.P"}, {"start": 9264671, "audio": 0, "end": 9265353, "filename": "/syslib/xsbbrat.xwam"}, {"start": 9265353, "audio": 0, "end": 9267201, "filename": "/syslib/dcg.H"}, {"start": 9267201, "audio": 0, "end": 9272539, "filename": "/syslib/atts.xwam"}, {"start": 9272539, "audio": 0, "end": 9306744, "filename": "/syslib/consult.P"}, {"start": 9306744, "audio": 0, "end": 9325410, "filename": "/syslib/assert.xwam"}, {"start": 9325410, "audio": 0, "end": 9336200, "filename": "/syslib/Artistic"}, {"start": 9336200, "audio": 0, "end": 9339788, "filename": "/syslib/debugger.H"}, {"start": 9339788, "audio": 0, "end": 9339921, "filename": "/syslib/term_exp.xwam"}, {"start": 9339921, "audio": 0, "end": 9423848, "filename": "/syslib/standard.P"}, {"start": 9423848, "audio": 0, "end": 9473218, "filename": "/syslib/curr_sym.P"}, {"start": 9473218, "audio": 0, "end": 9492704, "filename": "/syslib/error_handler.xwam"}, {"start": 9492704, "audio": 0, "end": 9498347, "filename": "/syslib/dbclause.xwam"}, {"start": 9498347, "audio": 0, "end": 9499757, "filename": "/syslib/domain.H"}, {"start": 9499757, "audio": 0, "end": 9510631, "filename": "/syslib/x_interp.xwam"}, {"start": 9510631, "audio": 0, "end": 9512176, "filename": "/syslib/dbclause.H"}, {"start": 9512176, "audio": 0, "end": 9520084, "filename": "/syslib/eval.P"}, {"start": 9520084, "audio": 0, "end": 9523057, "filename": "/syslib/setof.xwam"}, {"start": 9523057, "audio": 0, "end": 9527098, "filename": "/syslib/consult.H"}, {"start": 9527098, "audio": 0, "end": 9528497, "filename": "/syslib/xsb_hook.H"}, {"start": 9528497, "audio": 0, "end": 9532169, "filename": "/syslib/ccallxsb.xwam"}, {"start": 9532169, "audio": 0, "end": 9541824, "filename": "/syslib/file_op.xwam"}, {"start": 9541824, "audio": 0, "end": 9546581, "filename": "/syslib/domain.xwam"}, {"start": 9546581, "audio": 0, "end": 9549483, "filename": "/syslib/error_handler.H"}, {"start": 9549483, "audio": 0, "end": 9550373, "filename": "/syslib/hilogsym.xwam"}, {"start": 9550373, "audio": 0, "end": 9553105, "filename": "/syslib/unix.xwam"}, {"start": 9553105, "audio": 0, "end": 9570412, "filename": "/syslib/string.P"}, {"start": 9570412, "audio": 0, "end": 9573231, "filename": "/syslib/curr_sym.H"}, {"start": 9573231, "audio": 0, "end": 9579984, "filename": "/syslib/sub_atom.P"}, {"start": 9579984, "audio": 0, "end": 9581663, "filename": "/syslib/hilogsym.P"}, {"start": 9581663, "audio": 0, "end": 9610176, "filename": "/syslib/consult.xwam"}, {"start": 9610176, "audio": 0, "end": 9613183, "filename": "/syslib/num_vars.xwam"}, {"start": 9613183, "audio": 0, "end": 9615132, "filename": "/syslib/string.H"}, {"start": 9615132, "audio": 0, "end": 9618847, "filename": "/syslib/sub_atom.xwam"}, {"start": 9618847, "audio": 0, "end": 9625668, "filename": "/syslib/shell.P"}, {"start": 9625668, "audio": 0, "end": 9626785, "filename": "/syslib/eval.H"}, {"start": 9626785, "audio": 0, "end": 9633986, "filename": "/syslib/basics.xwam"}, {"start": 9633986, "audio": 0, "end": 9636040, "filename": "/syslib/xsb_read.H"}, {"start": 9636040, "audio": 0, "end": 9709859, "filename": "/syslib/standard.xwam"}, {"start": 9709859, "audio": 0, "end": 9715063, "filename": "/syslib/machine.H"}, {"start": 9715063, "audio": 0, "end": 9716949, "filename": "/syslib/file_op.H"}, {"start": 9716949, "audio": 0, "end": 9717596, "filename": "/syslib/xsbbrat.P"}, {"start": 9717596, "audio": 0, "end": 9751982, "filename": "/syslib/curr_sym.xwam"}, {"start": 9751982, "audio": 0, "end": 9761870, "filename": "/syslib/increval.xwam"}, {"start": 9761870, "audio": 0, "end": 9762990, "filename": "/syslib/push_io.H"}, {"start": 9762990, "audio": 0, "end": 9764917, "filename": "/syslib/xsb_writ.H"}, {"start": 9764917, "audio": 0, "end": 9766749, "filename": "/syslib/xcallxsb.P"}, {"start": 9766749, "audio": 0, "end": 9769197, "filename": "/syslib/loader.H"}, {"start": 9769197, "audio": 0, "end": 9803031, "filename": "/syslib/xsb_read.P"}, {"start": 9803031, "audio": 0, "end": 9807614, "filename": "/syslib/xsb_hook.P"}, {"start": 9807614, "audio": 0, "end": 9809070, "filename": "/syslib/setof.H"}, {"start": 9809070, "audio": 0, "end": 9896152, "filename": "/gpp/gpp.c"}, {"start": 9896152, "audio": 0, "end": 9897777, "filename": "/gpp/MSVC_mkfile64.mak"}, {"start": 9897777, "audio": 0, "end": 9899706, "filename": "/gpp/Makefile"}, {"start": 9899706, "audio": 0, "end": 9901332, "filename": "/gpp/MSVC_mkfile.mak"}, {"start": 9901332, "audio": 0, "end": 9921338, "filename": "/lib/aggregs1.P"}, {"start": 9921338, "audio": 0, "end": 9943386, "filename": "/lib/prolog_db.P"}, {"start": 9943386, "audio": 0, "end": 9963771, "filename": "/lib/ugraphs.xwam"}, {"start": 9963771, "audio": 0, "end": 9965987, "filename": "/lib/foreign.H"}, {"start": 9965987, "audio": 0, "end": 9967009, "filename": "/lib/xnmr.P"}, {"start": 9967009, "audio": 0, "end": 9969054, "filename": "/lib/xsb_profiling.H"}, {"start": 9969054, "audio": 0, "end": 9970113, "filename": "/lib/mttestutils.xwam"}, {"start": 9970113, "audio": 0, "end": 9986638, "filename": "/lib/assoc_xsb.P"}, {"start": 9986638, "audio": 0, "end": 9987047, "filename": "/lib/prolog_db.H"}, {"start": 9987047, "audio": 0, "end": 9993793, "filename": "/lib/constraintLib.xwam"}, {"start": 9993793, "audio": 0, "end": 10001090, "filename": "/lib/ordsets.xwam"}, {"start": 10001090, "audio": 0, "end": 10010134, "filename": "/lib/basic_props.P"}, {"start": 10010134, "audio": 0, "end": 10017160, "filename": "/lib/stdscan.P"}, {"start": 10017160, "audio": 0, "end": 10037069, "filename": "/lib/write_term.P"}, {"start": 10037069, "audio": 0, "end": 10037199, "filename": "/lib/README"}, {"start": 10037199, "audio": 0, "end": 10055557, "filename": "/lib/xsb_lint_impexp.xwam"}, {"start": 10055557, "audio": 0, "end": 10057856, "filename": "/lib/socket.xwam"}, {"start": 10057856, "audio": 0, "end": 10059885, "filename": "/lib/ora_call.H"}, {"start": 10059885, "audio": 0, "end": 10065824, "filename": "/lib/xsb_profiling.xwam"}, {"start": 10065824, "audio": 0, "end": 10082091, "filename": "/lib/aggregs.P"}, {"start": 10082091, "audio": 0, "end": 10084409, "filename": "/lib/swi.P"}, {"start": 10084409, "audio": 0, "end": 10086085, "filename": "/lib/pairlist.xwam"}, {"start": 10086085, "audio": 0, "end": 10115331, "filename": "/lib/wrapping.P"}, {"start": 10115331, "audio": 0, "end": 10123721, "filename": "/lib/storage.xwam"}, {"start": 10123721, "audio": 0, "end": 10128610, "filename": "/lib/pretty_print.P"}, {"start": 10128610, "audio": 0, "end": 10130914, "filename": "/lib/xsb_ciao.xwam"}, {"start": 10130914, "audio": 0, "end": 10131080, "filename": "/lib/xnmr.xwam"}, {"start": 10131080, "audio": 0, "end": 10156730, "filename": "/lib/ugraphs.P"}, {"start": 10156730, "audio": 0, "end": 10167844, "filename": "/lib/mutex_xsb.xwam"}, {"start": 10167844, "audio": 0, "end": 10185386, "filename": "/lib/iso8601.P"}, {"start": 10185386, "audio": 0, "end": 10199669, "filename": "/lib/foreign.xwam"}, {"start": 10199669, "audio": 0, "end": 10220810, "filename": "/lib/proc_files.P"}, {"start": 10220810, "audio": 0, "end": 10224438, "filename": "/lib/Makefile"}, {"start": 10224438, "audio": 0, "end": 10226879, "filename": "/lib/aggregs.H"}, {"start": 10226879, "audio": 0, "end": 10229560, "filename": "/lib/pairlist.P"}, {"start": 10229560, "audio": 0, "end": 10231521, "filename": "/lib/stdscan_defs.P"}, {"start": 10231521, "audio": 0, "end": 10244848, "filename": "/lib/lists.P"}, {"start": 10244848, "audio": 0, "end": 10251008, "filename": "/lib/xsb_profiling.P"}, {"start": 10251008, "audio": 0, "end": 10255227, "filename": "/lib/pretty_print.xwam"}, {"start": 10255227, "audio": 0, "end": 10257064, "filename": "/lib/mutex_xsb.H"}, {"start": 10257064, "audio": 0, "end": 10259275, "filename": "/lib/storage.H"}, {"start": 10259275, "audio": 0, "end": 10266746, "filename": "/lib/dump_table.xwam"}, {"start": 10266746, "audio": 0, "end": 10274873, "filename": "/lib/format.xwam"}, {"start": 10274873, "audio": 0, "end": 10291055, "filename": "/lib/storage.P"}, {"start": 10291055, "audio": 0, "end": 10369291, "filename": "/lib/odbc_call.P"}, {"start": 10369291, "audio": 0, "end": 10371033, "filename": "/lib/xsb_ciao.P"}, {"start": 10371033, "audio": 0, "end": 10383384, "filename": "/lib/write_term.xwam"}, {"start": 10383384, "audio": 0, "end": 10384950, "filename": "/lib/socket.H"}, {"start": 10384950, "audio": 0, "end": 10386448, "filename": "/lib/justifyLP.H"}, {"start": 10386448, "audio": 0, "end": 10390529, "filename": "/lib/array.P"}, {"start": 10390529, "audio": 0, "end": 10421507, "filename": "/lib/wrapping.xwam"}, {"start": 10421507, "audio": 0, "end": 10435290, "filename": "/lib/proc_files.xwam"}, {"start": 10435290, "audio": 0, "end": 10436499, "filename": "/lib/obsolete.P"}, {"start": 10436499, "audio": 0, "end": 10440372, "filename": "/lib/random.xwam"}, {"start": 10440372, "audio": 0, "end": 10442201, "filename": "/lib/proc_files.H"}, {"start": 10442201, "audio": 0, "end": 10447782, "filename": "/lib/packaging.P"}, {"start": 10447782, "audio": 0, "end": 10458218, "filename": "/lib/constraintLib.P"}, {"start": 10458218, "audio": 0, "end": 10477662, "filename": "/lib/xsb_lint_impexp.P"}, {"start": 10477662, "audio": 0, "end": 10484131, "filename": "/lib/directry.P"}, {"start": 10484131, "audio": 0, "end": 10492957, "filename": "/lib/aggregs.xwam"}, {"start": 10492957, "audio": 0, "end": 10509352, "filename": "/lib/foreign.P"}, {"start": 10509352, "audio": 0, "end": 10520341, "filename": "/lib/assoc_xsb.xwam"}, {"start": 10520341, "audio": 0, "end": 10523176, "filename": "/lib/odbc_call.H"}, {"start": 10523176, "audio": 0, "end": 10524714, "filename": "/lib/packaging.H"}, {"start": 10524714, "audio": 0, "end": 10528687, "filename": "/lib/scrptutl.xwam"}, {"start": 10528687, "audio": 0, "end": 10531527, "filename": "/lib/basic_props.xwam"}, {"start": 10531527, "audio": 0, "end": 10532700, "filename": "/lib/globalvar.xwam"}, {"start": 10532700, "audio": 0, "end": 10546507, "filename": "/lib/mutex_xsb.P"}, {"start": 10546507, "audio": 0, "end": 10574730, "filename": "/lib/intern.P"}, {"start": 10574730, "audio": 0, "end": 10622849, "filename": "/lib/ora_call.xwam"}, {"start": 10622849, "audio": 0, "end": 10637073, "filename": "/lib/ordsets.P"}, {"start": 10637073, "audio": 0, "end": 10639470, "filename": "/lib/aggregs1.H"}, {"start": 10639470, "audio": 0, "end": 10662394, "filename": "/lib/justifyLP.P"}, {"start": 10662394, "audio": 0, "end": 10663628, "filename": "/lib/random.H"}, {"start": 10663628, "audio": 0, "end": 10664711, "filename": "/lib/obsolete.H"}, {"start": 10664711, "audio": 0, "end": 10681896, "filename": "/lib/dump_table.P"}, {"start": 10681896, "audio": 0, "end": 10684254, "filename": "/lib/intern.H"}, {"start": 10684254, "audio": 0, "end": 10686661, "filename": "/lib/globalvar.P"}, {"start": 10686661, "audio": 0, "end": 10705677, "filename": "/lib/intern.xwam"}, {"start": 10705677, "audio": 0, "end": 10709864, "filename": "/lib/scrptutl.P"}, {"start": 10709864, "audio": 0, "end": 10715824, "filename": "/lib/random.P"}, {"start": 10715824, "audio": 0, "end": 10716234, "filename": "/lib/array.xwam"}, {"start": 10716234, "audio": 0, "end": 10718125, "filename": "/lib/mttestutils.P"}, {"start": 10718125, "audio": 0, "end": 10770184, "filename": "/lib/odbc_call.xwam"}, {"start": 10770184, "audio": 0, "end": 10772564, "filename": "/lib/swi.xwam"}, {"start": 10772564, "audio": 0, "end": 10778610, "filename": "/lib/directry.xwam"}, {"start": 10778610, "audio": 0, "end": 10782258, "filename": "/lib/packaging.xwam"}, {"start": 10782258, "audio": 0, "end": 10783735, "filename": "/lib/wrapping.H"}, {"start": 10783735, "audio": 0, "end": 10785193, "filename": "/lib/mutablevar.P"}, {"start": 10785193, "audio": 0, "end": 10792021, "filename": "/lib/lists.xwam"}, {"start": 10792021, "audio": 0, "end": 10804022, "filename": "/lib/prolog_db.xwam"}, {"start": 10804022, "audio": 0, "end": 10878015, "filename": "/lib/ora_call.P"}, {"start": 10878015, "audio": 0, "end": 10881611, "filename": "/lib/socket.P"}, {"start": 10881611, "audio": 0, "end": 10883214, "filename": "/lib/scrptutl.H"}, {"start": 10883214, "audio": 0, "end": 10883756, "filename": "/lib/mutablevar.xwam"}, {"start": 10883756, "audio": 0, "end": 10884164, "filename": "/lib/obsolete.xwam"}, {"start": 10884164, "audio": 0, "end": 10911572, "filename": "/lib/justifyLP.xwam"}, {"start": 10911572, "audio": 0, "end": 10929800, "filename": "/lib/format.P"}, {"start": 10929800, "audio": 0, "end": 10930097, "filename": "/etc/copying.msg"}, {"start": 10930097, "audio": 0, "end": 10933310, "filename": "/etc/help.msg"}, {"start": 10933310, "audio": 0, "end": 11091255, "filename": "/etc/prolog.el"}, {"start": 11091255, "audio": 0, "end": 11091286, "filename": "/etc/create_patch.sh"}, {"start": 11091286, "audio": 0, "end": 11099060, "filename": "/etc/images/xsb-logo.ico"}, {"start": 11099060, "audio": 0, "end": 11116747, "filename": "/etc/images/xsb-logo.eps"}, {"start": 11116747, "audio": 0, "end": 11120855, "filename": "/prolog_includes/http_errors.h"}, {"start": 11120855, "audio": 0, "end": 11121926, "filename": "/prolog_includes/flora2.Ph"}, {"start": 11121926, "audio": 0, "end": 11123374, "filename": "/prolog_includes/standard.h"}, {"start": 11123374, "audio": 0, "end": 11129605, "filename": "/prolog_includes/char_defs.h"}, {"start": 11129605, "audio": 0, "end": 11130639, "filename": "/cmplib/config.H"}, {"start": 11130639, "audio": 0, "end": 11132324, "filename": "/cmplib/prof_sbp.D"}, {"start": 11132324, "audio": 0, "end": 11146720, "filename": "/cmplib/suppltab.P"}, {"start": 11146720, "audio": 0, "end": 11148989, "filename": "/cmplib/makemode.xwam"}, {"start": 11148989, "audio": 0, "end": 11154960, "filename": "/cmplib/tp_goal.xwam"}, {"start": 11154960, "audio": 0, "end": 11155493, "filename": "/cmplib/asm_opt.D"}, {"start": 11155493, "audio": 0, "end": 11156941, "filename": "/cmplib/varproc.H"}, {"start": 11156941, "audio": 0, "end": 11158492, "filename": "/cmplib/printres.P"}, {"start": 11158492, "audio": 0, "end": 11215297, "filename": "/cmplib/parse.P"}, {"start": 11215297, "audio": 0, "end": 11218901, "filename": "/cmplib/pre_cond.P"}, {"start": 11218901, "audio": 0, "end": 11220296, "filename": "/cmplib/tp_comp.P"}, {"start": 11220296, "audio": 0, "end": 11221841, "filename": "/cmplib/suppltab.H"}, {"start": 11221841, "audio": 0, "end": 11236652, "filename": "/cmplib/compile.P"}, {"start": 11236652, "audio": 0, "end": 11244513, "filename": "/cmplib/asm_inst.P"}, {"start": 11244513, "audio": 0, "end": 11248994, "filename": "/cmplib/README"}, {"start": 11248994, "audio": 0, "end": 11255842, "filename": "/cmplib/cutcheck.xwam"}, {"start": 11255842, "audio": 0, "end": 11258319, "filename": "/cmplib/modeinf.H"}, {"start": 11258319, "audio": 0, "end": 11268625, "filename": "/cmplib/tp_index.P"}, {"start": 11268625, "audio": 0, "end": 11280442, "filename": "/cmplib/peephole.xwam"}, {"start": 11280442, "audio": 0, "end": 11290684, "filename": "/cmplib/flatten.P"}, {"start": 11290684, "audio": 0, "end": 11290996, "filename": "/cmplib/builtin.D"}, {"start": 11290996, "audio": 0, "end": 11291687, "filename": "/cmplib/tprog.D"}, {"start": 11291687, "audio": 0, "end": 11293510, "filename": "/cmplib/pre_cond.xwam"}, {"start": 11293510, "audio": 0, "end": 11295331, "filename": "/cmplib/tabdef.D"}, {"start": 11295331, "audio": 0, "end": 11312882, "filename": "/cmplib/symtab.P"}, {"start": 11312882, "audio": 0, "end": 11319553, "filename": "/cmplib/tp_eval.D"}, {"start": 11319553, "audio": 0, "end": 11322720, "filename": "/cmplib/singlton.xwam"}, {"start": 11322720, "audio": 0, "end": 11361369, "filename": "/cmplib/cp_opt.P"}, {"start": 11361369, "audio": 0, "end": 11382855, "filename": "/cmplib/cp_opt.xwam"}, {"start": 11382855, "audio": 0, "end": 11384601, "filename": "/cmplib/symtab.H"}, {"start": 11384601, "audio": 0, "end": 11394089, "filename": "/cmplib/symtab.xwam"}, {"start": 11394089, "audio": 0, "end": 11395522, "filename": "/cmplib/spec.H"}, {"start": 11395522, "audio": 0, "end": 11396816, "filename": "/cmplib/ti_mod.H"}, {"start": 11396816, "audio": 0, "end": 11399514, "filename": "/cmplib/varproc.D"}, {"start": 11399514, "audio": 0, "end": 11403330, "filename": "/cmplib/symtab.D"}, {"start": 11403330, "audio": 0, "end": 11426787, "filename": "/cmplib/modeinf.xwam"}, {"start": 11426787, "audio": 0, "end": 11429388, "filename": "/cmplib/listutil.xwam"}, {"start": 11429388, "audio": 0, "end": 11435358, "filename": "/cmplib/writeasm.P"}, {"start": 11435358, "audio": 0, "end": 11440413, "filename": "/cmplib/asm_opt.P"}, {"start": 11440413, "audio": 0, "end": 11446249, "filename": "/cmplib/writeasm.xwam"}, {"start": 11446249, "audio": 0, "end": 11454270, "filename": "/cmplib/asmpass2.P"}, {"start": 11454270, "audio": 0, "end": 11455788, "filename": "/cmplib/useinfer.H"}, {"start": 11455788, "audio": 0, "end": 11459283, "filename": "/cmplib/tp_cond.xwam"}, {"start": 11459283, "audio": 0, "end": 11461696, "filename": "/cmplib/spec.D"}, {"start": 11461696, "audio": 0, "end": 11462520, "filename": "/cmplib/pre_cond.D"}, {"start": 11462520, "audio": 0, "end": 11466892, "filename": "/cmplib/Makefile"}, {"start": 11466892, "audio": 0, "end": 11467389, "filename": "/cmplib/sanity.D"}, {"start": 11467389, "audio": 0, "end": 11468577, "filename": "/cmplib/printres.H"}, {"start": 11468577, "audio": 0, "end": 11469894, "filename": "/cmplib/inprog.H"}, {"start": 11469894, "audio": 0, "end": 11471433, "filename": "/cmplib/tp_var.H"}, {"start": 11471433, "audio": 0, "end": 11474013, "filename": "/cmplib/modes.D"}, {"start": 11474013, "audio": 0, "end": 11475079, "filename": "/cmplib/tp_comp.H"}, {"start": 11475079, "audio": 0, "end": 11481098, "filename": "/cmplib/sanity.P"}, {"start": 11481098, "audio": 0, "end": 11482693, "filename": "/cmplib/prof_sbp.H"}, {"start": 11482693, "audio": 0, "end": 11500306, "filename": "/cmplib/modes.xwam"}, {"start": 11500306, "audio": 0, "end": 11501130, "filename": "/cmplib/tp_comp.xwam"}, {"start": 11501130, "audio": 0, "end": 11501369, "filename": "/cmplib/config.D"}, {"start": 11501369, "audio": 0, "end": 11505941, "filename": "/cmplib/listutil.P"}, {"start": 11505941, "audio": 0, "end": 11506673, "filename": "/cmplib/ciao_directives.P"}, {"start": 11506673, "audio": 0, "end": 11517037, "filename": "/cmplib/tp_var.P"}, {"start": 11517037, "audio": 0, "end": 11518251, "filename": "/cmplib/cutcheck.H"}, {"start": 11518251, "audio": 0, "end": 11519391, "filename": "/cmplib/parse.D"}, {"start": 11519391, "audio": 0, "end": 11519964, "filename": "/cmplib/inprog.D"}, {"start": 11519964, "audio": 0, "end": 11520865, "filename": "/cmplib/makemode.D"}, {"start": 11520865, "audio": 0, "end": 11522814, "filename": "/cmplib/listutil.D"}, {"start": 11522814, "audio": 0, "end": 11524122, "filename": "/cmplib/listutil.H"}, {"start": 11524122, "audio": 0, "end": 11525384, "filename": "/cmplib/tp_index.H"}, {"start": 11525384, "audio": 0, "end": 11538778, "filename": "/cmplib/useinfer.P"}, {"start": 11538778, "audio": 0, "end": 11545025, "filename": "/cmplib/tpinline.P"}, {"start": 11545025, "audio": 0, "end": 11546143, "filename": "/cmplib/peephole.H"}, {"start": 11546143, "audio": 0, "end": 11554894, "filename": "/cmplib/ti_mod.xwam"}, {"start": 11554894, "audio": 0, "end": 11556908, "filename": "/cmplib/auxlry.H"}, {"start": 11556908, "audio": 0, "end": 11562715, "filename": "/cmplib/tp_index.xwam"}, {"start": 11562715, "audio": 0, "end": 11564018, "filename": "/cmplib/singlton.H"}, {"start": 11564018, "audio": 0, "end": 11572048, "filename": "/cmplib/suppltab.xwam"}, {"start": 11572048, "audio": 0, "end": 11579644, "filename": "/cmplib/stdmodes.D"}, {"start": 11579644, "audio": 0, "end": 11583227, "filename": "/cmplib/compile.H"}, {"start": 11583227, "audio": 0, "end": 11583864, "filename": "/cmplib/asmpass2.D"}, {"start": 11583864, "audio": 0, "end": 11589942, "filename": "/cmplib/asmpass2.xwam"}, {"start": 11589942, "audio": 0, "end": 11590255, "filename": "/cmplib/printres.D"}, {"start": 11590255, "audio": 0, "end": 11601238, "filename": "/cmplib/tabdef.xwam"}, {"start": 11601238, "audio": 0, "end": 11608132, "filename": "/cmplib/useinfer.xwam"}, {"start": 11608132, "audio": 0, "end": 11609725, "filename": "/cmplib/asmpass2.H"}, {"start": 11609725, "audio": 0, "end": 11611268, "filename": "/cmplib/asm.H"}, {"start": 11611268, "audio": 0, "end": 11611622, "filename": "/cmplib/singlton.D"}, {"start": 11611622, "audio": 0, "end": 11612879, "filename": "/cmplib/tabdef.H"}, {"start": 11612879, "audio": 0, "end": 11624035, "filename": "/cmplib/builtin.xwam"}, {"start": 11624035, "audio": 0, "end": 11636102, "filename": "/cmplib/auxlry.P"}, {"start": 11636102, "audio": 0, "end": 11642970, "filename": "/cmplib/cutcheck.P"}, {"start": 11642970, "audio": 0, "end": 11644187, "filename": "/cmplib/config.P"}, {"start": 11644187, "audio": 0, "end": 11664396, "filename": "/cmplib/tp_eval.P"}, {"start": 11664396, "audio": 0, "end": 11665802, "filename": "/cmplib/tp_cond.H"}, {"start": 11665802, "audio": 0, "end": 11666682, "filename": "/cmplib/printres.xwam"}, {"start": 11666682, "audio": 0, "end": 11671093, "filename": "/cmplib/inprog.xwam"}, {"start": 11671093, "audio": 0, "end": 11674718, "filename": "/cmplib/parse.H"}, {"start": 11674718, "audio": 0, "end": 11675175, "filename": "/cmplib/cp_opt.D"}, {"start": 11675175, "audio": 0, "end": 11676571, "filename": "/cmplib/writeasm.H"}, {"start": 11676571, "audio": 0, "end": 11684167, "filename": "/cmplib/auxlry.xwam"}, {"start": 11684167, "audio": 0, "end": 11685121, "filename": "/cmplib/preproc.D"}, {"start": 11685121, "audio": 0, "end": 11685559, "filename": "/cmplib/tp_comp.D"}, {"start": 11685559, "audio": 0, "end": 11689004, "filename": "/cmplib/modeinf.D"}, {"start": 11689004, "audio": 0, "end": 11689668, "filename": "/cmplib/writeasm.D"}, {"start": 11689668, "audio": 0, "end": 11694577, "filename": "/cmplib/sanity.xwam"}, {"start": 11694577, "audio": 0, "end": 11698412, "filename": "/cmplib/asm.xwam"}, {"start": 11698412, "audio": 0, "end": 11713198, "filename": "/cmplib/varproc.xwam"}, {"start": 11713198, "audio": 0, "end": 11740319, "filename": "/cmplib/modeinf.P"}, {"start": 11740319, "audio": 0, "end": 11741364, "filename": "/cmplib/asm_inst.H"}, {"start": 11741364, "audio": 0, "end": 11751682, "filename": "/cmplib/tprog.P"}, {"start": 11751682, "audio": 0, "end": 11769109, "filename": "/cmplib/spec.xwam"}, {"start": 11769109, "audio": 0, "end": 11772532, "filename": "/cmplib/prof_sbp.xwam"}, {"start": 11772532, "audio": 0, "end": 11784564, "filename": "/cmplib/asm.P"}, {"start": 11784564, "audio": 0, "end": 11802148, "filename": "/cmplib/tabdef.P"}, {"start": 11802148, "audio": 0, "end": 11803227, "filename": "/cmplib/builtin.H"}, {"start": 11803227, "audio": 0, "end": 11810148, "filename": "/cmplib/preproc.xwam"}, {"start": 11810148, "audio": 0, "end": 11816893, "filename": "/cmplib/tp_var.xwam"}, {"start": 11816893, "audio": 0, "end": 11817581, "filename": "/cmplib/peephole.D"}, {"start": 11817581, "audio": 0, "end": 11819837, "filename": "/cmplib/tp_goal.D"}, {"start": 11819837, "audio": 0, "end": 11820678, "filename": "/cmplib/asm.D"}, {"start": 11820678, "audio": 0, "end": 11822168, "filename": "/cmplib/tp_eval.H"}, {"start": 11822168, "audio": 0, "end": 11828339, "filename": "/cmplib/flatten.xwam"}, {"start": 11828339, "audio": 0, "end": 11841218, "filename": "/cmplib/ti_mod.P"}, {"start": 11841218, "audio": 0, "end": 11843193, "filename": "/cmplib/cp_opt.H"}, {"start": 11843193, "audio": 0, "end": 11843473, "filename": "/cmplib/asm_inst.D"}, {"start": 11843473, "audio": 0, "end": 11859414, "filename": "/cmplib/tp_eval.xwam"}, {"start": 11859414, "audio": 0, "end": 11868338, "filename": "/cmplib/inprog.P"}, {"start": 11868338, "audio": 0, "end": 11869384, "filename": "/cmplib/suppltab.D"}, {"start": 11869384, "audio": 0, "end": 11906363, "filename": "/cmplib/spec.P"}, {"start": 11906363, "audio": 0, "end": 11916855, "filename": "/cmplib/builtin.P"}, {"start": 11916855, "audio": 0, "end": 11921740, "filename": "/cmplib/singlton.P"}, {"start": 11921740, "audio": 0, "end": 11925889, "filename": "/cmplib/tpinline.xwam"}, {"start": 11925889, "audio": 0, "end": 11940238, "filename": "/cmplib/peephole.P"}, {"start": 11940238, "audio": 0, "end": 11948518, "filename": "/cmplib/tp_goal.P"}, {"start": 11948518, "audio": 0, "end": 11973334, "filename": "/cmplib/varproc.P"}, {"start": 11973334, "audio": 0, "end": 11973899, "filename": "/cmplib/cutcheck.D"}, {"start": 11973899, "audio": 0, "end": 11974040, "filename": "/cmplib/config.xwam"}, {"start": 11974040, "audio": 0, "end": 11988569, "filename": "/cmplib/asm_inst.xwam"}, {"start": 11988569, "audio": 0, "end": 11990069, "filename": "/cmplib/tprog.H"}, {"start": 11990069, "audio": 0, "end": 11991725, "filename": "/cmplib/asm_opt.xwam"}, {"start": 11991725, "audio": 0, "end": 11993404, "filename": "/cmplib/tpinline.H"}, {"start": 11993404, "audio": 0, "end": 11994586, "filename": "/cmplib/flatten.H"}, {"start": 11994586, "audio": 0, "end": 11994950, "filename": "/cmplib/flatten.D"}, {"start": 11994950, "audio": 0, "end": 11998171, "filename": "/cmplib/tp_var.D"}, {"start": 11998171, "audio": 0, "end": 11999227, "filename": "/cmplib/pre_cond.H"}, {"start": 11999227, "audio": 0, "end": 12003976, "filename": "/cmplib/tprog.xwam"}, {"start": 12003976, "audio": 0, "end": 12005084, "filename": "/cmplib/asm_opt.H"}, {"start": 12005084, "audio": 0, "end": 12006328, "filename": "/cmplib/sanity.H"}, {"start": 12006328, "audio": 0, "end": 12011898, "filename": "/cmplib/tp_cond.P"}, {"start": 12011898, "audio": 0, "end": 12030753, "filename": "/cmplib/modes.P"}, {"start": 12030753, "audio": 0, "end": 12033832, "filename": "/cmplib/makemode.P"}, {"start": 12033832, "audio": 0, "end": 12042946, "filename": "/cmplib/compile.xwam"}, {"start": 12042946, "audio": 0, "end": 12044411, "filename": "/cmplib/preproc.H"}, {"start": 12044411, "audio": 0, "end": 12046092, "filename": "/cmplib/auxlry.D"}, {"start": 12046092, "audio": 0, "end": 12047536, "filename": "/cmplib/tp_goal.H"}, {"start": 12047536, "audio": 0, "end": 12058226, "filename": "/cmplib/preproc.P"}, {"start": 12058226, "audio": 0, "end": 12063241, "filename": "/cmplib/prof_sbp.P"}, {"start": 12063241, "audio": 0, "end": 12064032, "filename": "/cmplib/ciao_directives.xwam"}, {"start": 12064032, "audio": 0, "end": 12065685, "filename": "/cmplib/tp_index.D"}, {"start": 12065685, "audio": 0, "end": 12066624, "filename": "/cmplib/tp_cond.D"}, {"start": 12066624, "audio": 0, "end": 12067145, "filename": "/cmplib/useinfer.D"}, {"start": 12067145, "audio": 0, "end": 12068083, "filename": "/cmplib/compile.D"}, {"start": 12068083, "audio": 0, "end": 12075679, "filename": "/cmplib/stdmode.D"}, {"start": 12075679, "audio": 0, "end": 12077212, "filename": "/cmplib/tpinline.D"}, {"start": 12077212, "audio": 0, "end": 12079299, "filename": "/cmplib/modes.H"}, {"start": 12079299, "audio": 0, "end": 12118973, "filename": "/cmplib/parse.xwam"}, {"start": 12118973, "audio": 0, "end": 12120796, "filename": "/cmplib/objfiles.saved/pre_cond.xwam"}, {"start": 12120796, "audio": 0, "end": 12124291, "filename": "/cmplib/objfiles.saved/tp_cond.xwam"}, {"start": 12124291, "audio": 0, "end": 12132321, "filename": "/cmplib/objfiles.saved/suppltab.xwam"}, {"start": 12132321, "audio": 0, "end": 12149748, "filename": "/cmplib/objfiles.saved/spec.xwam"}, {"start": 12149748, "audio": 0, "end": 12155919, "filename": "/cmplib/objfiles.saved/flatten.xwam"}, {"start": 12155919, "audio": 0, "end": 12160068, "filename": "/cmplib/objfiles.saved/tpinline.xwam"}, {"start": 12160068, "audio": 0, "end": 12161724, "filename": "/cmplib/objfiles.saved/asm_opt.xwam"}, {"start": 12161724, "audio": 0, "end": 12170838, "filename": "/cmplib/objfiles.saved/compile.xwam"}, {"start": 12170838, "audio": 0, "end": 12171629, "filename": "/cmplib/objfiles.saved/ciao_directives.xwam"}, {"start": 12171629, "audio": 0, "end": 12211303, "filename": "/cmplib/objfiles.saved/parse.xwam"}, {"start": 12211303, "audio": 0, "end": 12212218, "filename": "/admin/TarBin.sh"}, {"start": 12212218, "audio": 0, "end": 12212938, "filename": "/admin/TarCore.sh"}, {"start": 12212938, "audio": 0, "end": 12213814, "filename": "/admin/cleandist.sh"}, {"start": 12213814, "audio": 0, "end": 12214878, "filename": "/admin/TarRelease.sh"}, {"start": 12214878, "audio": 0, "end": 12215756, "filename": "/admin/TarNT.sh"}, {"start": 12215756, "audio": 0, "end": 12216575, "filename": "/admin/configure_release.sh"}, {"start": 12216575, "audio": 0, "end": 12217471, "filename": "/admin/TarAll.sh"}, {"start": 12217471, "audio": 0, "end": 12217625, "filename": "/bin/xsb64.bat"}, {"start": 12217625, "audio": 0, "end": 12219709, "filename": "/bin/chr_pp"}, {"start": 12219709, "audio": 0, "end": 12219863, "filename": "/bin/xsb.bat"}, {"start": 12219863, "audio": 0, "end": 12224328, "filename": "/bin/xsb"}, {"start": 12224328, "audio": 0, "end": 12225853, "filename": "/packages/libwww.P"}, {"start": 12225853, "audio": 0, "end": 12228671, "filename": "/packages/clpr.P"}, {"start": 12228671, "audio": 0, "end": 12230088, "filename": "/packages/altcdf.P"}, {"start": 12230088, "audio": 0, "end": 12231349, "filename": "/packages/README"}, {"start": 12231349, "audio": 0, "end": 12233674, "filename": "/packages/wildmatch.P"}, {"start": 12233674, "audio": 0, "end": 12239108, "filename": "/packages/sgml.P"}, {"start": 12239108, "audio": 0, "end": 12250455, "filename": "/packages/pitavitind.P"}, {"start": 12250455, "audio": 0, "end": 12259420, "filename": "/packages/pitaposs.P"}, {"start": 12259420, "audio": 0, "end": 12260693, "filename": "/packages/gap.P"}, {"start": 12260693, "audio": 0, "end": 12265421, "filename": "/packages/dbdrivers.P"}, {"start": 12265421, "audio": 0, "end": 12274126, "filename": "/packages/pitacount.P"}, {"start": 12274126, "audio": 0, "end": 12275126, "filename": "/packages/pita.P"}, {"start": 12275126, "audio": 0, "end": 12278268, "filename": "/packages/Makefile"}, {"start": 12278268, "audio": 0, "end": 12280268, "filename": "/packages/pcre.P"}, {"start": 12280268, "audio": 0, "end": 12320596, "filename": "/packages/bounds.pl"}, {"start": 12320596, "audio": 0, "end": 12321886, "filename": "/packages/xsbdoc.P"}, {"start": 12321886, "audio": 0, "end": 12324614, "filename": "/packages/perlmatch.P"}, {"start": 12324614, "audio": 0, "end": 12326200, "filename": "/packages/xpath.P"}, {"start": 12326200, "audio": 0, "end": 12327393, "filename": "/packages/slx.P"}, {"start": 12327393, "audio": 0, "end": 12337449, "filename": "/packages/pitaindexc.P"}, {"start": 12337449, "audio": 0, "end": 12338050, "filename": "/packages/justify.P"}, {"start": 12338050, "audio": 0, "end": 12339302, "filename": "/packages/chr_d.P"}, {"start": 12339302, "audio": 0, "end": 12344147, "filename": "/packages/rdf.P"}, {"start": 12344147, "audio": 0, "end": 12344446, "filename": "/packages/chr.xwam"}, {"start": 12344446, "audio": 0, "end": 12384360, "filename": "/packages/bounds.xwam"}, {"start": 12384360, "audio": 0, "end": 12394274, "filename": "/packages/curl.P"}, {"start": 12394274, "audio": 0, "end": 12394740, "filename": "/packages/xmc.H"}, {"start": 12394740, "audio": 0, "end": 12396455, "filename": "/packages/clpr.xwam"}, {"start": 12396455, "audio": 0, "end": 12396753, "filename": "/packages/xref.P"}, {"start": 12396753, "audio": 0, "end": 12398169, "filename": "/packages/flora2.P"}, {"start": 12398169, "audio": 0, "end": 12399890, "filename": "/packages/xmc.P"}, {"start": 12399890, "audio": 0, "end": 12402168, "filename": "/packages/regmatch.P"}, {"start": 12402168, "audio": 0, "end": 12403181, "filename": "/packages/regmatch.xwam"}, {"start": 12403181, "audio": 0, "end": 12404278, "filename": "/packages/chr.P"}, {"start": 12404278, "audio": 0, "end": 12405499, "filename": "/packages/cdf.P"}, {"start": 12405499, "audio": 0, "end": 12406819, "filename": "/packages/xasp.P"}, {"start": 12406819, "audio": 0, "end": 12407887, "filename": "/packages/wildmatch.xwam"}, {"start": 12407887, "audio": 0, "end": 12408310, "filename": "/packages/justify.xwam"}, {"start": 12408310, "audio": 0, "end": 12409945, "filename": "/packages/xpath/xml2-config"}, {"start": 12409945, "audio": 0, "end": 12411075, "filename": "/packages/xpath/xpath_init.in"}, {"start": 12411075, "audio": 0, "end": 12417510, "filename": "/packages/xpath/xpathconfig.P"}, {"start": 12417510, "audio": 0, "end": 12505328, "filename": "/packages/xpath/configure"}, {"start": 12505328, "audio": 0, "end": 12529384, "filename": "/packages/xpath/config.status"}, {"start": 12529384, "audio": 0, "end": 12529501, "filename": "/packages/xpath/Installation_summary"}, {"start": 12529501, "audio": 0, "end": 12530686, "filename": "/packages/xpath/xpath_init.P"}, {"start": 12530686, "audio": 0, "end": 12534416, "filename": "/packages/xpath/config.log"}, {"start": 12534416, "audio": 0, "end": 12536988, "filename": "/packages/xpath/configure.in"}, {"start": 12536988, "audio": 0, "end": 12550784, "filename": "/packages/xpath/cc/xpathparser.c"}, {"start": 12550784, "audio": 0, "end": 12551167, "filename": "/packages/xpath/cc/README"}, {"start": 12551167, "audio": 0, "end": 12552784, "filename": "/packages/xpath/cc/NMakefile.mak"}, {"start": 12552784, "audio": 0, "end": 12557553, "filename": "/packages/xpath/cc/iconv.h"}, {"start": 12557553, "audio": 0, "end": 12560318, "filename": "/packages/xpath/cc/fetch_file.c"}, {"start": 12560318, "audio": 0, "end": 12561938, "filename": "/packages/xpath/cc/NMakefile64.mak"}, {"start": 12561938, "audio": 0, "end": 12562363, "filename": "/packages/xpath/cc/socketcall.h"}, {"start": 12562363, "audio": 0, "end": 12579245, "filename": "/packages/xpath/cc/libxml/parserInternals.h"}, {"start": 12579245, "audio": 0, "end": 12585560, "filename": "/packages/xpath/cc/libxml/xmlversion.h"}, {"start": 12585560, "audio": 0, "end": 12591168, "filename": "/packages/xpath/cc/libxml/xmlstring.h"}, {"start": 12591168, "audio": 0, "end": 12594617, "filename": "/packages/xpath/cc/libxml/xmlexports.h"}, {"start": 12594617, "audio": 0, "end": 12604821, "filename": "/packages/xpath/cc/libxml/xmlunicode.h"}, {"start": 12604821, "audio": 0, "end": 12609961, "filename": "/packages/xpath/cc/libxml/catalog.h"}, {"start": 12609961, "audio": 0, "end": 12612757, "filename": "/packages/xpath/cc/libxml/xinclude.h"}, {"start": 12612757, "audio": 0, "end": 12618086, "filename": "/packages/xpath/cc/libxml/chvalid.h"}, {"start": 12618086, "audio": 0, "end": 12623052, "filename": "/packages/xpath/cc/libxml/xmlschemas.h"}, {"start": 12623052, "audio": 0, "end": 12624208, "filename": "/packages/xpath/cc/libxml/pattern.h"}, {"start": 12624208, "audio": 0, "end": 12660085, "filename": "/packages/xpath/cc/libxml/xmlerror.h"}, {"start": 12660085, "audio": 0, "end": 12673822, "filename": "/packages/xpath/cc/libxml/valid.h"}, {"start": 12673822, "audio": 0, "end": 12677707, "filename": "/packages/xpath/cc/libxml/xmlautomata.h"}, {"start": 12677707, "audio": 0, "end": 12681407, "filename": "/packages/xpath/cc/libxml/HTMLtree.h"}, {"start": 12681407, "audio": 0, "end": 12695320, "filename": "/packages/xpath/cc/libxml/globals.h"}, {"start": 12695320, "audio": 0, "end": 12707435, "filename": "/packages/xpath/cc/libxml/xmlreader.h"}, {"start": 12707435, "audio": 0, "end": 12709086, "filename": "/packages/xpath/cc/libxml/dict.h"}, {"start": 12709086, "audio": 0, "end": 12710314, "filename": "/packages/xpath/cc/libxml/xmlmodule.h"}, {"start": 12710314, "audio": 0, "end": 12713002, "filename": "/packages/xpath/cc/libxml/c14n.h"}, {"start": 12713002, "audio": 0, "end": 12718454, "filename": "/packages/xpath/cc/libxml/relaxng.h"}, {"start": 12718454, "audio": 0, "end": 12723508, "filename": "/packages/xpath/cc/libxml/SAX2.h"}, {"start": 12723508, "audio": 0, "end": 12725866, "filename": "/packages/xpath/cc/libxml/uri.h"}, {"start": 12725866, "audio": 0, "end": 12764223, "filename": "/packages/xpath/cc/libxml/parser.h"}, {"start": 12764223, "audio": 0, "end": 12774832, "filename": "/packages/xpath/cc/libxml/xmlIO.h"}, {"start": 12774832, "audio": 0, "end": 12782989, "filename": "/packages/xpath/cc/libxml/encoding.h"}, {"start": 12782989, "audio": 0, "end": 12805499, "filename": "/packages/xpath/cc/libxml/schemasInternals.h"}, {"start": 12805499, "audio": 0, "end": 12810897, "filename": "/packages/xpath/cc/libxml/debugXML.h"}, {"start": 12810897, "audio": 0, "end": 12814422, "filename": "/packages/xpath/cc/libxml/xpointer.h"}, {"start": 12814422, "audio": 0, "end": 12847747, "filename": "/packages/xpath/cc/libxml/tree.h"}, {"start": 12847747, "audio": 0, "end": 12849740, "filename": "/packages/xpath/cc/libxml/xmlsave.h"}, {"start": 12849740, "audio": 0, "end": 12859072, "filename": "/packages/xpath/cc/libxml/HTMLparser.h"}, {"start": 12859072, "audio": 0, "end": 12861171, "filename": "/packages/xpath/cc/libxml/nanohttp.h"}, {"start": 12861171, "audio": 0, "end": 12864661, "filename": "/packages/xpath/cc/libxml/nanoftp.h"}, {"start": 12864661, "audio": 0, "end": 12885446, "filename": "/packages/xpath/cc/libxml/xmlwriter.h"}, {"start": 12885446, "audio": 0, "end": 12901346, "filename": "/packages/xpath/cc/libxml/xpath.h"}, {"start": 12901346, "audio": 0, "end": 12904905, "filename": "/packages/xpath/cc/libxml/list.h"}, {"start": 12904905, "audio": 0, "end": 12907558, "filename": "/packages/xpath/cc/libxml/xmlregexp.h"}, {"start": 12907558, "audio": 0, "end": 12912798, "filename": "/packages/xpath/cc/libxml/xlink.h"}, {"start": 12912798, "audio": 0, "end": 12917289, "filename": "/packages/xpath/cc/libxml/entities.h"}, {"start": 12917289, "audio": 0, "end": 12937367, "filename": "/packages/xpath/cc/libxml/xpathInternals.h"}, {"start": 12937367, "audio": 0, "end": 12941952, "filename": "/packages/xpath/cc/libxml/SAX.h"}, {"start": 12941952, "audio": 0, "end": 12948032, "filename": "/packages/xpath/cc/libxml/xmlmemory.h"}, {"start": 12948032, "audio": 0, "end": 12951405, "filename": "/packages/xpath/cc/libxml/DOCBparser.h"}, {"start": 12951405, "audio": 0, "end": 12956154, "filename": "/packages/xpath/cc/libxml/xmlwin32version.h"}, {"start": 12956154, "audio": 0, "end": 12962703, "filename": "/packages/xpath/cc/libxml/hash.h"}, {"start": 12962703, "audio": 0, "end": 12965685, "filename": "/packages/xpath/cc/libxml/xmlschemastypes.h"}, {"start": 12965685, "audio": 0, "end": 12967471, "filename": "/packages/xpath/cc/libxml/threads.h"}, {"start": 12967471, "audio": 0, "end": 13245669, "filename": "/packages/xpath/cc/bin64/zlib.lib"}, {"start": 13245669, "audio": 0, "end": 13326053, "filename": "/packages/xpath/cc/bin64/zlib1.dll"}, {"start": 13326053, "audio": 0, "end": 13422895, "filename": "/packages/xpath/cc/bin/zlib.lib"}, {"start": 13422895, "audio": 0, "end": 13478703, "filename": "/packages/xpath/cc/bin/zlib1.dll"}, {"start": 13478703, "audio": 0, "end": 14310703, "filename": "/packages/xpath/cc/bin/libxml2.dll"}, {"start": 14310703, "audio": 0, "end": 14313793, "filename": "/packages/xpath/cc/bin/iconv.lib"}, {"start": 14313793, "audio": 0, "end": 14667767, "filename": "/packages/xpath/cc/bin/libxml2.lib"}, {"start": 14667767, "audio": 0, "end": 15556599, "filename": "/packages/xpath/cc/bin/iconv.dll"}, {"start": 15556599, "audio": 0, "end": 15557717, "filename": "/packages/xpath/Misc/xpath_init-wind.P"}, {"start": 15557717, "audio": 0, "end": 15558777, "filename": "/packages/rdf/rdf_term_exp.P"}, {"start": 15558777, "audio": 0, "end": 15568863, "filename": "/packages/rdf/rdf_triple.P"}, {"start": 15568863, "audio": 0, "end": 15572300, "filename": "/packages/rdf/option.P"}, {"start": 15572300, "audio": 0, "end": 15587167, "filename": "/packages/rdf/rdf_parser.P"}, {"start": 15587167, "audio": 0, "end": 15590761, "filename": "/packages/rdf/rewrite.P"}, {"start": 15590761, "audio": 0, "end": 15591687, "filename": "/packages/rdf/rdfconfig.P"}, {"start": 15591687, "audio": 0, "end": 15597338, "filename": "/packages/altCDF/cdf_utilities.P"}, {"start": 15597338, "audio": 0, "end": 15597378, "filename": "/packages/altCDF/cdf_definitions.h"}, {"start": 15597378, "audio": 0, "end": 15670010, "filename": "/packages/altCDF/cdf_init_cdf.P"}, {"start": 15670010, "audio": 0, "end": 15672974, "filename": "/packages/altCDF/Makefile"}, {"start": 15672974, "audio": 0, "end": 15708551, "filename": "/packages/altCDF/cdf_checks.P"}, {"start": 15708551, "audio": 0, "end": 15726227, "filename": "/packages/altCDF/cdf_io.P"}, {"start": 15726227, "audio": 0, "end": 15728619, "filename": "/packages/altCDF/newpp.P"}, {"start": 15728619, "audio": 0, "end": 15730578, "filename": "/packages/altCDF/cdf_exceptions.P"}, {"start": 15730578, "audio": 0, "end": 15762543, "filename": "/packages/altCDF/cdf_comps_share.P"}, {"start": 15762543, "audio": 0, "end": 15762700, "filename": "/packages/altCDF/cdf_concurrency.P"}, {"start": 15762700, "audio": 0, "end": 15770321, "filename": "/packages/altCDF/cdf_config.P"}, {"start": 15770321, "audio": 0, "end": 15770658, "filename": "/packages/altCDF/cdf_init.P"}, {"start": 15770658, "audio": 0, "end": 15800695, "filename": "/packages/altCDF/cdf_oblivion.P"}, {"start": 15800695, "audio": 0, "end": 15802943, "filename": "/packages/altCDF/cdfpt/cdf_intensional.P"}, {"start": 15802943, "audio": 0, "end": 15803580, "filename": "/packages/altCDF/cdfpt/cdf_extensional.P"}, {"start": 15803580, "audio": 0, "end": 15829196, "filename": "/packages/altCDF/mknf/mknf_chkCon.P"}, {"start": 15829196, "audio": 0, "end": 15843762, "filename": "/packages/altCDF/mknf/mknf.P"}, {"start": 15843762, "audio": 0, "end": 15844523, "filename": "/packages/altCDF/mknf/tests/ex_disj/cdf_intensional.P"}, {"start": 15844523, "audio": 0, "end": 15855877, "filename": "/packages/altCDF/mknf/tests/ex_disj/rules.P"}, {"start": 15855877, "audio": 0, "end": 15857583, "filename": "/packages/altCDF/mknf/tests/ex_disj/cdf_extensional.P"}, {"start": 15857583, "audio": 0, "end": 15857584, "filename": "/packages/altCDF/mknf/tests/chkCon/cdf_intensional.P"}, {"start": 15857584, "audio": 0, "end": 15858548, "filename": "/packages/altCDF/mknf/tests/chkCon/rules.P"}, {"start": 15858548, "audio": 0, "end": 15864426, "filename": "/packages/altCDF/mknf/tests/chkCon/cdf_extensional.P"}, {"start": 15864426, "audio": 0, "end": 15864426, "filename": "/packages/altCDF/cdf/cdf_intensional.P"}, {"start": 15864426, "audio": 0, "end": 15866056, "filename": "/packages/altCDF/cdf/cdf_extensional.P"}, {"start": 15866056, "audio": 0, "end": 15866934, "filename": "/packages/altCDF/mytest/ruletest.P"}, {"start": 15866934, "audio": 0, "end": 15868774, "filename": "/packages/altCDF/mytest/comptest.P"}, {"start": 15868774, "audio": 0, "end": 15872988, "filename": "/packages/altCDF/mytest/checktest.P"}, {"start": 15872988, "audio": 0, "end": 15873340, "filename": "/packages/altCDF/mytest/cdftest1/cdf_intensional.P"}, {"start": 15873340, "audio": 0, "end": 15873430, "filename": "/packages/altCDF/mytest/cdftest1/initialization_file.P"}, {"start": 15873430, "audio": 0, "end": 15876840, "filename": "/packages/altCDF/mytest/cdftest1/cdf_extensional.P"}, {"start": 15876840, "audio": 0, "end": 15879416, "filename": "/packages/altCDF/doc/enumerate.sty"}, {"start": 15879416, "audio": 0, "end": 15884096, "filename": "/packages/altCDF/doc/ecltree.sty"}, {"start": 15884096, "audio": 0, "end": 15884707, "filename": "/packages/altCDF/doc/acknowledgements.tex"}, {"start": 15884707, "audio": 0, "end": 15886984, "filename": "/packages/altCDF/doc/nondoc.tex"}, {"start": 15886984, "audio": 0, "end": 15891074, "filename": "/packages/altCDF/doc/includeopt.tex"}, {"start": 15891074, "audio": 0, "end": 15899001, "filename": "/packages/altCDF/doc/graphics.tex"}, {"start": 15899001, "audio": 0, "end": 15910559, "filename": "/packages/altCDF/doc/inheritance.tex"}, {"start": 15910559, "audio": 0, "end": 15917780, "filename": "/packages/altCDF/doc/update.tex"}, {"start": 15917780, "audio": 0, "end": 15923619, "filename": "/packages/altCDF/doc/newaltmodel.tex"}, {"start": 15923619, "audio": 0, "end": 15927840, "filename": "/packages/altCDF/doc/dl.tex"}, {"start": 15927840, "audio": 0, "end": 15928045, "filename": "/packages/altCDF/doc/cdf_init_cdf.tex"}, {"start": 15928045, "audio": 0, "end": 15945325, "filename": "/packages/altCDF/doc/examples.tex"}, {"start": 15945325, "audio": 0, "end": 15959043, "filename": "/packages/altCDF/doc/subfigure.sty"}, {"start": 15959043, "audio": 0, "end": 15971663, "filename": "/packages/altCDF/doc/components.tex"}, {"start": 15971663, "audio": 0, "end": 15972509, "filename": "/packages/altCDF/doc/fullpage.sty"}, {"start": 15972509, "audio": 0, "end": 15977866, "filename": "/packages/altCDF/doc/concurrency.tex"}, {"start": 15977866, "audio": 0, "end": 15990545, "filename": "/packages/altCDF/doc/appendix.tex"}, {"start": 15990545, "audio": 0, "end": 16009864, "filename": "/packages/altCDF/doc/type1.tex"}, {"start": 16009864, "audio": 0, "end": 16018787, "filename": "/packages/altCDF/doc/prologCache.tex"}, {"start": 16018787, "audio": 0, "end": 16021580, "filename": "/packages/altCDF/doc/impl.tex"}, {"start": 16021580, "audio": 0, "end": 16035215, "filename": "/packages/altCDF/doc/checks.tex"}, {"start": 16035215, "audio": 0, "end": 16044369, "filename": "/packages/altCDF/doc/product.tex"}, {"start": 16044369, "audio": 0, "end": 16046576, "filename": "/packages/altCDF/doc/longstring.bib"}, {"start": 16046576, "audio": 0, "end": 16048700, "filename": "/packages/altCDF/doc/predindex.sty"}, {"start": 16048700, "audio": 0, "end": 16051687, "filename": "/packages/altCDF/doc/configuration.tex"}, {"start": 16051687, "audio": 0, "end": 16065343, "filename": "/packages/altCDF/doc/database.tex"}, {"start": 16065343, "audio": 0, "end": 16071350, "filename": "/packages/altCDF/doc/float.sty"}, {"start": 16071350, "audio": 0, "end": 16076088, "filename": "/packages/altCDF/doc/include.tex"}, {"start": 16076088, "audio": 0, "end": 16078081, "filename": "/packages/altCDF/doc/tools.tex"}, {"start": 16078081, "audio": 0, "end": 16084732, "filename": "/packages/altCDF/doc/comparisons.tex"}, {"start": 16084732, "audio": 0, "end": 16100435, "filename": "/packages/altCDF/doc/url.sty"}, {"start": 16100435, "audio": 0, "end": 16117271, "filename": "/packages/altCDF/doc/type0impl.tex"}, {"start": 16117271, "audio": 0, "end": 16127063, "filename": "/packages/altCDF/doc/type1impl.tex"}, {"start": 16127063, "audio": 0, "end": 16129526, "filename": "/packages/altCDF/doc/abstract.tex"}, {"start": 16129526, "audio": 0, "end": 16141041, "filename": "/packages/altCDF/doc/instances.tex"}, {"start": 16141041, "audio": 0, "end": 16145959, "filename": "/packages/altCDF/doc/manual.tex"}, {"start": 16145959, "audio": 0, "end": 16171043, "filename": "/packages/altCDF/doc/semantics.tex"}, {"start": 16171043, "audio": 0, "end": 16202722, "filename": "/packages/altCDF/doc/consist.tex"}, {"start": 16202722, "audio": 0, "end": 16211068, "filename": "/packages/altCDF/doc/intro.tex"}, {"start": 16211068, "audio": 0, "end": 16261773, "filename": "/packages/altCDF/doc/Figures/xjPickDirectory.eps"}, {"start": 16261773, "audio": 0, "end": 16297031, "filename": "/packages/altCDF/doc/Figures/xjShowOptionDialog.eps"}, {"start": 16297031, "audio": 0, "end": 16340844, "filename": "/packages/altCDF/doc/Figures/xjPickFile.eps"}, {"start": 16340844, "audio": 0, "end": 16349272, "filename": "/packages/altCDF/doc/Figures/struct2.eps"}, {"start": 16349272, "audio": 0, "end": 16400164, "filename": "/packages/altCDF/doc/Figures/xjConfirmUser.eps"}, {"start": 16400164, "audio": 0, "end": 16404243, "filename": "/packages/altCDF/doc/Figures/arch.eps"}, {"start": 16404243, "audio": 0, "end": 16452548, "filename": "/packages/altCDF/doc/Figures/chooseFromTerms.eps"}, {"start": 16452548, "audio": 0, "end": 16457233, "filename": "/packages/altCDF/doc/Figures/struct1.eps"}, {"start": 16457233, "audio": 0, "end": 16459816, "filename": "/packages/altCDF/cdftp/tp_utils.P"}, {"start": 16459816, "audio": 0, "end": 16471264, "filename": "/packages/altCDF/cdftp/cdftp_rules.P"}, {"start": 16471264, "audio": 0, "end": 16471582, "filename": "/packages/altCDF/cdftp/compile.sh"}, {"start": 16471582, "audio": 0, "end": 16491767, "filename": "/packages/altCDF/cdftp/cdftp_meta.P"}, {"start": 16491767, "audio": 0, "end": 16494824, "filename": "/packages/altCDF/cdftp/cdftp_getObj.P"}, {"start": 16494824, "audio": 0, "end": 16499308, "filename": "/packages/altCDF/cdftp/cdftp_preproc.P"}, {"start": 16499308, "audio": 0, "end": 16523740, "filename": "/packages/altCDF/cdftp/cdftp_chkCon.P"}, {"start": 16523740, "audio": 0, "end": 16524011, "filename": "/packages/altCDF/cdftp/cdftp_cdfsc.P"}, {"start": 16524011, "audio": 0, "end": 16524126, "filename": "/packages/altCDF/cdftp/ontologies/ont1/cdf_intensional.P"}, {"start": 16524126, "audio": 0, "end": 16530605, "filename": "/packages/altCDF/cdftp/ontologies/ont1/cdf_extensional.P"}, {"start": 16530605, "audio": 0, "end": 16531336, "filename": "/packages/altCDF/cdftp/curtest/testing.P"}, {"start": 16531336, "audio": 0, "end": 16560966, "filename": "/packages/altCDF/cdftp/curtest/cur_tests.P"}, {"start": 16560966, "audio": 0, "end": 16561354, "filename": "/packages/altCDF/cdftp/curtest/cdf_extensional.P"}, {"start": 16561354, "audio": 0, "end": 16561856, "filename": "/packages/altCDF/tests/ce_tests/testing.P"}, {"start": 16561856, "audio": 0, "end": 16582341, "filename": "/packages/altCDF/tests/ce_tests/cur_tests.P"}, {"start": 16582341, "audio": 0, "end": 16582691, "filename": "/packages/altCDF/tests/ce_tests/cdf_extensional.P"}, {"start": 16582691, "audio": 0, "end": 16585140, "filename": "/packages/altCDF/tests/onto_tests/testont.P"}, {"start": 16585140, "audio": 0, "end": 16585255, "filename": "/packages/altCDF/tests/onto_tests/ont1/cdf_intensional.P"}, {"start": 16585255, "audio": 0, "end": 16591734, "filename": "/packages/altCDF/tests/onto_tests/ont1/cdf_extensional.P"}, {"start": 16591734, "audio": 0, "end": 16591774, "filename": "/packages/altCDF/scripts/cdf_def00.h"}, {"start": 16591774, "audio": 0, "end": 16591814, "filename": "/packages/altCDF/scripts/cdf_def01.h"}, {"start": 16591814, "audio": 0, "end": 16591854, "filename": "/packages/altCDF/scripts/cdf_def10.h"}, {"start": 16591854, "audio": 0, "end": 16591894, "filename": "/packages/altCDF/scripts/cdf_def11.h"}, {"start": 16591894, "audio": 0, "end": 16593223, "filename": "/packages/altCDF/scripts/cdfconftest.sh"}, {"start": 16593223, "audio": 0, "end": 16598743, "filename": "/packages/sgml/Makefile"}, {"start": 16598743, "audio": 0, "end": 16598926, "filename": "/packages/sgml/TODO"}, {"start": 16598926, "audio": 0, "end": 16604624, "filename": "/packages/sgml/sgmlconfig.P"}, {"start": 16604624, "audio": 0, "end": 16607417, "filename": "/packages/sgml/cc/quote.c"}, {"start": 16607417, "audio": 0, "end": 16609662, "filename": "/packages/sgml/cc/catalog.h"}, {"start": 16609662, "audio": 0, "end": 16615749, "filename": "/packages/sgml/cc/xmlns.c"}, {"start": 16615749, "audio": 0, "end": 16616203, "filename": "/packages/sgml/cc/error_term.h"}, {"start": 16616203, "audio": 0, "end": 16617199, "filename": "/packages/sgml/cc/model.h"}, {"start": 16617199, "audio": 0, "end": 16623585, "filename": "/packages/sgml/cc/error.c"}, {"start": 16623585, "audio": 0, "end": 16626466, "filename": "/packages/sgml/cc/charmap.c"}, {"start": 16626466, "audio": 0, "end": 16640514, "filename": "/packages/sgml/cc/catalog.c"}, {"start": 16640514, "audio": 0, "end": 16642038, "filename": "/packages/sgml/cc/NMakefile.mak"}, {"start": 16642038, "audio": 0, "end": 16653553, "filename": "/packages/sgml/cc/model.c"}, {"start": 16653553, "audio": 0, "end": 16653697, "filename": "/packages/sgml/cc/basic_defs.h"}, {"start": 16653697, "audio": 0, "end": 16656429, "filename": "/packages/sgml/cc/fetch_file.c"}, {"start": 16656429, "audio": 0, "end": 16663915, "filename": "/packages/sgml/cc/parser.h"}, {"start": 16663915, "audio": 0, "end": 16664089, "filename": "/packages/sgml/cc/deprecation.h"}, {"start": 16664089, "audio": 0, "end": 16822178, "filename": "/packages/sgml/cc/parser.c"}, {"start": 16822178, "audio": 0, "end": 16823740, "filename": "/packages/sgml/cc/NMakefile64.mak"}, {"start": 16823740, "audio": 0, "end": 16824315, "filename": "/packages/sgml/cc/utf8.h"}, {"start": 16824315, "audio": 0, "end": 16824461, "filename": "/packages/sgml/cc/common.h"}, {"start": 16824461, "audio": 0, "end": 16824870, "filename": "/packages/sgml/cc/socketcall.h"}, {"start": 16824870, "audio": 0, "end": 16828382, "filename": "/packages/sgml/cc/sgmlutil.h"}, {"start": 16828382, "audio": 0, "end": 16830100, "filename": "/packages/sgml/cc/utf8.c"}, {"start": 16830100, "audio": 0, "end": 16832581, "filename": "/packages/sgml/cc/sgmldefs.h"}, {"start": 16832581, "audio": 0, "end": 16833503, "filename": "/packages/sgml/cc/xmlns.h"}, {"start": 16833503, "audio": 0, "end": 16878568, "filename": "/packages/sgml/cc/sgml2pl.c"}, {"start": 16878568, "audio": 0, "end": 16879401, "filename": "/packages/sgml/cc/error.h"}, {"start": 16879401, "audio": 0, "end": 16892738, "filename": "/packages/sgml/cc/dtd.h"}, {"start": 16892738, "audio": 0, "end": 16902186, "filename": "/packages/sgml/cc/sgmlutil.c"}, {"start": 16902186, "audio": 0, "end": 16934393, "filename": "/packages/sgml/cc/dtd/xhtml1-transitional.dtd"}, {"start": 16934393, "audio": 0, "end": 16980058, "filename": "/packages/sgml/cc/dtd/HTML4.dtd"}, {"start": 16980058, "audio": 0, "end": 16982495, "filename": "/packages/libwww/Makefile"}, {"start": 16982495, "audio": 0, "end": 17068468, "filename": "/packages/libwww/configure"}, {"start": 17068468, "audio": 0, "end": 17075359, "filename": "/packages/libwww/libwwwconfig.P"}, {"start": 17075359, "audio": 0, "end": 17080937, "filename": "/packages/libwww/http_liberr.P"}, {"start": 17080937, "audio": 0, "end": 17082097, "filename": "/packages/libwww/libwww_init.in"}, {"start": 17082097, "audio": 0, "end": 17084930, "filename": "/packages/libwww/configure.in"}, {"start": 17084930, "audio": 0, "end": 17086556, "filename": "/packages/libwww/cc/libwww_parse_rdf.h"}, {"start": 17086556, "audio": 0, "end": 17092645, "filename": "/packages/libwww/cc/libwww_util.h"}, {"start": 17092645, "audio": 0, "end": 17117723, "filename": "/packages/libwww/cc/libwww_parse_xml.c"}, {"start": 17117723, "audio": 0, "end": 17121622, "filename": "/packages/libwww/cc/libwww_parse_xml.h"}, {"start": 17121622, "audio": 0, "end": 17124831, "filename": "/packages/libwww/cc/libwww_parse_html.h"}, {"start": 17124831, "audio": 0, "end": 17126745, "filename": "/packages/libwww/cc/NMakefile.mak"}, {"start": 17126745, "audio": 0, "end": 17133771, "filename": "/packages/libwww/cc/libwww_parse_rdf.c"}, {"start": 17133771, "audio": 0, "end": 17173830, "filename": "/packages/libwww/cc/libwww_request.c"}, {"start": 17173830, "audio": 0, "end": 17177100, "filename": "/packages/libwww/cc/libwww_req.h"}, {"start": 17177100, "audio": 0, "end": 17194286, "filename": "/packages/libwww/cc/libwww_parse_html.c"}, {"start": 17194286, "audio": 0, "end": 17196661, "filename": "/packages/libwww/cc/libwww_parse.h"}, {"start": 17196661, "audio": 0, "end": 17206590, "filename": "/packages/chr_d/attv_aux.P"}, {"start": 17206590, "audio": 0, "end": 17228877, "filename": "/packages/chr_d/flatten_chr.P"}, {"start": 17228877, "audio": 0, "end": 17234868, "filename": "/packages/chr_d/print_chrd.P"}, {"start": 17234868, "audio": 0, "end": 17354836, "filename": "/packages/chr_d/chr2attv.P"}, {"start": 17354836, "audio": 0, "end": 17357162, "filename": "/packages/curl/Makefile"}, {"start": 17357162, "audio": 0, "end": 17547287, "filename": "/packages/curl/a.out"}, {"start": 17547287, "audio": 0, "end": 17548381, "filename": "/packages/curl/NMakefile.mak"}, {"start": 17548381, "audio": 0, "end": 17683284, "filename": "/packages/curl/configure"}, {"start": 17683284, "audio": 0, "end": 17683376, "filename": "/packages/curl/TODO"}, {"start": 17683376, "audio": 0, "end": 17708206, "filename": "/packages/curl/config.status"}, {"start": 17708206, "audio": 0, "end": 17709304, "filename": "/packages/curl/NMakefile64.mak"}, {"start": 17709304, "audio": 0, "end": 17709357, "filename": "/packages/curl/Installation_summary"}, {"start": 17709357, "audio": 0, "end": 17899435, "filename": "/packages/curl/a.out.js"}, {"start": 17899435, "audio": 0, "end": 17900520, "filename": "/packages/curl/curl_info.in"}, {"start": 17900520, "audio": 0, "end": 17901641, "filename": "/packages/curl/curl_info.P"}, {"start": 17901641, "audio": 0, "end": 17917772, "filename": "/packages/curl/config.log"}, {"start": 17917772, "audio": 0, "end": 17921253, "filename": "/packages/curl/configure.in"}, {"start": 17921253, "audio": 0, "end": 17927239, "filename": "/packages/curl/curlconfig.P"}, {"start": 17927239, "audio": 0, "end": 17927954, "filename": "/packages/curl/cc/README"}, {"start": 17927954, "audio": 0, "end": 17929249, "filename": "/packages/curl/cc/error_term.h"}, {"start": 17929249, "audio": 0, "end": 17936129, "filename": "/packages/curl/cc/error.c"}, {"start": 17936129, "audio": 0, "end": 17937194, "filename": "/packages/curl/cc/nodeprecate.h"}, {"start": 17937194, "audio": 0, "end": 17939498, "filename": "/packages/curl/cc/NMakefile.mak"}, {"start": 17939498, "audio": 0, "end": 17940569, "filename": "/packages/curl/cc/load_page.h"}, {"start": 17940569, "audio": 0, "end": 17942889, "filename": "/packages/curl/cc/NMakefile64.mak"}, {"start": 17942889, "audio": 0, "end": 17944144, "filename": "/packages/curl/cc/common.h"}, {"start": 17944144, "audio": 0, "end": 17949958, "filename": "/packages/curl/cc/load_page.c"}, {"start": 17949958, "audio": 0, "end": 17951632, "filename": "/packages/curl/cc/error.h"}, {"start": 17951632, "audio": 0, "end": 17957921, "filename": "/packages/curl/cc/curl2pl.c"}, {"start": 17957921, "audio": 0, "end": 17980194, "filename": "/packages/curl/cc/curl/curlbuild.h"}, {"start": 17980194, "audio": 0, "end": 17983720, "filename": "/packages/curl/cc/curl/easy.h"}, {"start": 17983720, "audio": 0, "end": 17985104, "filename": "/packages/curl/cc/curl/stdcheaders.h"}, {"start": 17985104, "audio": 0, "end": 17985119, "filename": "/packages/curl/cc/curl/types.h"}, {"start": 17985119, "audio": 0, "end": 17993538, "filename": "/packages/curl/cc/curl/curlrules.h"}, {"start": 17993538, "audio": 0, "end": 17996337, "filename": "/packages/curl/cc/curl/curlver.h"}, {"start": 17996337, "audio": 0, "end": 18009374, "filename": "/packages/curl/cc/curl/multi.h"}, {"start": 18009374, "audio": 0, "end": 18012222, "filename": "/packages/curl/cc/curl/mprintf.h"}, {"start": 18012222, "audio": 0, "end": 18084899, "filename": "/packages/curl/cc/curl/curl.h"}, {"start": 18084899, "audio": 0, "end": 18118316, "filename": "/packages/curl/cc/curl/typecheck-gcc.h"}, {"start": 18118316, "audio": 0, "end": 18396514, "filename": "/packages/curl/cc/bin64/zlib.lib"}, {"start": 18396514, "audio": 0, "end": 18692962, "filename": "/packages/curl/cc/bin64/ssleay32.dll"}, {"start": 18692962, "audio": 0, "end": 19011426, "filename": "/packages/curl/cc/bin64/libcurl.dll"}, {"start": 19011426, "audio": 0, "end": 19091810, "filename": "/packages/curl/cc/bin64/zlib1.dll"}, {"start": 19091810, "audio": 0, "end": 19741238, "filename": "/packages/curl/cc/bin64/libeay32.lib"}, {"start": 19741238, "audio": 0, "end": 19792346, "filename": "/packages/curl/cc/bin64/ssleay32.lib"}, {"start": 19792346, "audio": 0, "end": 19793361, "filename": "/packages/curl/cc/bin64/curl2pl.exp"}, {"start": 19793361, "audio": 0, "end": 19806769, "filename": "/packages/curl/cc/bin64/libcurl.lib"}, {"start": 19806769, "audio": 0, "end": 19943473, "filename": "/packages/curl/cc/bin64/curl2pl.dll"}, {"start": 19943473, "audio": 0, "end": 19945847, "filename": "/packages/curl/cc/bin64/curl2pl.lib"}, {"start": 19945847, "audio": 0, "end": 21341559, "filename": "/packages/curl/cc/bin64/libeay32.dll"}, {"start": 21341559, "audio": 0, "end": 21781367, "filename": "/packages/curl/cc/bin/libcurl.dll"}, {"start": 21781367, "audio": 0, "end": 21850999, "filename": "/packages/curl/cc/bin/zlib1.dll"}, {"start": 21850999, "audio": 0, "end": 22729591, "filename": "/packages/curl/cc/bin/libiconv-2.dll"}, {"start": 22729591, "audio": 0, "end": 23010246, "filename": "/packages/curl/cc/bin/libidn-11.dll"}, {"start": 23010246, "audio": 0, "end": 23189958, "filename": "/packages/curl/cc/bin/libssh2.dll"}, {"start": 23189958, "audio": 0, "end": 23190997, "filename": "/packages/curl/cc/bin/curl2pl.exp"}, {"start": 23190997, "audio": 0, "end": 23204295, "filename": "/packages/curl/cc/bin/libcurl.lib"}, {"start": 23204295, "audio": 0, "end": 23320007, "filename": "/packages/curl/cc/bin/curl2pl.dll"}, {"start": 23320007, "audio": 0, "end": 23652261, "filename": "/packages/curl/cc/bin/libssl32.dll"}, {"start": 23652261, "audio": 0, "end": 23654685, "filename": "/packages/curl/cc/bin/curl2pl.lib"}, {"start": 23654685, "audio": 0, "end": 25201466, "filename": "/packages/curl/cc/bin/libeay32.dll"}, {"start": 25201466, "audio": 0, "end": 25202591, "filename": "/packages/curl/Misc/curl_init-wind.P"}, {"start": 25202591, "audio": 0, "end": 25214530, "filename": "/packages/w4/taxonomy.ruleml"}, {"start": 25214530, "audio": 0, "end": 25217772, "filename": "/packages/w4/prologread.P"}, {"start": 25217772, "audio": 0, "end": 25234291, "filename": "/packages/w4/index2.htm"}, {"start": 25234291, "audio": 0, "end": 25239895, "filename": "/packages/w4/utf.P"}, {"start": 25239895, "audio": 0, "end": 25288021, "filename": "/packages/w4/xmlparser.P"}, {"start": 25288021, "audio": 0, "end": 25291117, "filename": "/packages/w4/gwfsxpengine.P"}, {"start": 25291117, "audio": 0, "end": 25292784, "filename": "/packages/w4/predparserint.P"}, {"start": 25292784, "audio": 0, "end": 25322761, "filename": "/packages/w4/iriparse.P"}, {"start": 25322761, "audio": 0, "end": 25420630, "filename": "/packages/w4/xmlchars.G"}, {"start": 25420630, "audio": 0, "end": 25445241, "filename": "/packages/w4/rulemlindex.htm"}, {"start": 25445241, "audio": 0, "end": 25445352, "filename": "/packages/w4/uri.P"}, {"start": 25445352, "audio": 0, "end": 25452437, "filename": "/packages/w4/lookupdcg.P"}, {"start": 25452437, "audio": 0, "end": 25459183, "filename": "/packages/w4/xmlchars11.G"}, {"start": 25459183, "audio": 0, "end": 25489058, "filename": "/packages/w4/xmlparser.G"}, {"start": 25489058, "audio": 0, "end": 25506400, "filename": "/packages/w4/index.htm"}, {"start": 25506400, "audio": 0, "end": 25509625, "filename": "/packages/w4/example.P"}, {"start": 25509625, "audio": 0, "end": 25526094, "filename": "/packages/w4/xmldtd.G"}, {"start": 25526094, "audio": 0, "end": 25532879, "filename": "/packages/w4/xml.P"}, {"start": 25532879, "audio": 0, "end": 25564698, "filename": "/packages/w4/iri.htm"}, {"start": 25564698, "audio": 0, "end": 25567648, "filename": "/packages/w4/xmlparser.H"}, {"start": 25567648, "audio": 0, "end": 25576881, "filename": "/packages/w4/iostream.P"}, {"start": 25576881, "audio": 0, "end": 25583928, "filename": "/packages/w4/ruleml.P"}, {"start": 25583928, "audio": 0, "end": 25586638, "filename": "/packages/w4/rulebase.P"}, {"start": 25586638, "audio": 0, "end": 25587632, "filename": "/packages/w4/example.G"}, {"start": 25587632, "audio": 0, "end": 25602777, "filename": "/packages/w4/xmlcanonicalization.P"}, {"start": 25602777, "audio": 0, "end": 25612507, "filename": "/packages/w4/xmlcommon.G"}, {"start": 25612507, "audio": 0, "end": 25706759, "filename": "/packages/w4/xmldom.htm"}, {"start": 25706759, "audio": 0, "end": 25722767, "filename": "/packages/w4/rulemlread.P"}, {"start": 25722767, "audio": 0, "end": 25724210, "filename": "/packages/w4/builtins.P"}, {"start": 25724210, "audio": 0, "end": 25726223, "filename": "/packages/w4/readgram.P"}, {"start": 25726223, "audio": 0, "end": 25728497, "filename": "/packages/w4/parserexp.P"}, {"start": 25728497, "audio": 0, "end": 25742750, "filename": "/packages/w4/iri.P"}, {"start": 25742750, "audio": 0, "end": 25744052, "filename": "/packages/w4/taxonomy.P"}, {"start": 25744052, "audio": 0, "end": 25750413, "filename": "/packages/w4/xmldom.H"}, {"start": 25750413, "audio": 0, "end": 25763302, "filename": "/packages/w4/lookupdcg.htm"}, {"start": 25763302, "audio": 0, "end": 25764116, "filename": "/packages/w4/w4small.GIF"}, {"start": 25764116, "audio": 0, "end": 25767569, "filename": "/packages/w4/utilities.P"}, {"start": 25767569, "audio": 0, "end": 25789930, "filename": "/packages/w4/example.txt"}, {"start": 25789930, "audio": 0, "end": 25795554, "filename": "/packages/w4/testiri.P"}, {"start": 25795554, "audio": 0, "end": 25816206, "filename": "/packages/w4/iriparse.G"}, {"start": 25816206, "audio": 0, "end": 25820339, "filename": "/packages/w4/xml2termns.P"}, {"start": 25820339, "audio": 0, "end": 25829070, "filename": "/packages/w4/rulemlwrite.P"}, {"start": 25829070, "audio": 0, "end": 25829579, "filename": "/packages/w4/unused.G"}, {"start": 25829579, "audio": 0, "end": 25850197, "filename": "/packages/w4/xmldom.P"}, {"start": 25850197, "audio": 0, "end": 25852661, "filename": "/packages/w4/prologwrite.P"}, {"start": 25852661, "audio": 0, "end": 25862245, "filename": "/packages/xsbdoc/basic_props.P"}, {"start": 25862245, "audio": 0, "end": 25862703, "filename": "/packages/xsbdoc/README"}, {"start": 25862703, "audio": 0, "end": 25864785, "filename": "/packages/xsbdoc/ciaoaux.P"}, {"start": 25864785, "audio": 0, "end": 25936515, "filename": "/packages/xsbdoc/autodocformats.P"}, {"start": 25936515, "audio": 0, "end": 26003104, "filename": "/packages/xsbdoc/autodoc.P"}, {"start": 26003104, "audio": 0, "end": 26003187, "filename": "/packages/xsbdoc/Makefile"}, {"start": 26003187, "audio": 0, "end": 26026174, "filename": "/packages/xsbdoc/xsbdoc_term_proc.P"}, {"start": 26026174, "audio": 0, "end": 26048915, "filename": "/packages/xsbdoc/alist.bst"}, {"start": 26048915, "audio": 0, "end": 26049090, "filename": "/packages/xsbdoc/init_ciao_flags.P"}, {"start": 26049090, "audio": 0, "end": 26071809, "filename": "/packages/xsbdoc/lpdoc.bst"}, {"start": 26071809, "audio": 0, "end": 26072702, "filename": "/packages/xsbdoc/full_ciao_ops.P"}, {"start": 26072702, "audio": 0, "end": 26081817, "filename": "/packages/xsbdoc/xsbdoc1.P"}, {"start": 26081817, "audio": 0, "end": 26110865, "filename": "/packages/xsbdoc/rewrite_command.P"}, {"start": 26110865, "audio": 0, "end": 26112091, "filename": "/packages/xsbdoc/usage_message.P"}, {"start": 26112091, "audio": 0, "end": 26137818, "filename": "/packages/xsbdoc/doc/Intro.xsbdoc"}, {"start": 26137818, "audio": 0, "end": 26140401, "filename": "/packages/xsbdoc/doc/xsbdoc_format.P"}, {"start": 26140401, "audio": 0, "end": 26142250, "filename": "/packages/xsbdoc/doc/README.xsbdoc"}, {"start": 26142250, "audio": 0, "end": 26237768, "filename": "/packages/xsbdoc/doc/all.bib"}, {"start": 26237768, "audio": 0, "end": 26268744, "filename": "/packages/xsbdoc/doc/Generating.P"}, {"start": 26268744, "audio": 0, "end": 26294427, "filename": "/packages/xsbdoc/doc/assertions_props.P"}, {"start": 26294427, "audio": 0, "end": 26333751, "filename": "/packages/xsbdoc/doc/comments.P"}, {"start": 26333751, "audio": 0, "end": 26336693, "filename": "/packages/xsbdoc/doc/Copyright.Manuals"}, {"start": 26336693, "audio": 0, "end": 26388416, "filename": "/packages/clpqr/bv_r.P"}, {"start": 26388416, "audio": 0, "end": 26392574, "filename": "/packages/clpqr/itf_r.xwam"}, {"start": 26392574, "audio": 0, "end": 26398470, "filename": "/packages/clpqr/geler.pl"}, {"start": 26398470, "audio": 0, "end": 26407444, "filename": "/packages/clpqr/dump.pl"}, {"start": 26407444, "audio": 0, "end": 26409800, "filename": "/packages/clpqr/class.xwam"}, {"start": 26409800, "audio": 0, "end": 26438786, "filename": "/packages/clpqr/nf_r.P"}, {"start": 26438786, "audio": 0, "end": 26487112, "filename": "/packages/clpqr/bv_q.pl"}, {"start": 26487112, "audio": 0, "end": 26489975, "filename": "/packages/clpqr/Makefile"}, {"start": 26489975, "audio": 0, "end": 26497543, "filename": "/packages/clpqr/store_r.xwam"}, {"start": 26497543, "audio": 0, "end": 26500350, "filename": "/packages/clpqr/itf.xwam"}, {"start": 26500350, "audio": 0, "end": 26507998, "filename": "/packages/clpqr/bb_r.P"}, {"start": 26507998, "audio": 0, "end": 26508052, "filename": "/packages/clpqr/quantum.h"}, {"start": 26508052, "audio": 0, "end": 26521467, "filename": "/packages/clpqr/fourmotz_r.P"}, {"start": 26521467, "audio": 0, "end": 26525241, "filename": "/packages/clpqr/clpr.pl"}, {"start": 26525241, "audio": 0, "end": 26529668, "filename": "/packages/clpqr/dump.xwam"}, {"start": 26529668, "audio": 0, "end": 26570137, "filename": "/packages/clpqr/bv_r.xwam"}, {"start": 26570137, "audio": 0, "end": 26573704, "filename": "/packages/clpqr/ordering.xwam"}, {"start": 26573704, "audio": 0, "end": 26614904, "filename": "/packages/clpqr/ineq_r.P"}, {"start": 26614904, "audio": 0, "end": 26619690, "filename": "/packages/clpqr/ordering.P"}, {"start": 26619690, "audio": 0, "end": 26649890, "filename": "/packages/clpqr/ineq_r.xwam"}, {"start": 26649890, "audio": 0, "end": 26657863, "filename": "/packages/clpqr/fourmotz_r.xwam"}, {"start": 26657863, "audio": 0, "end": 26669471, "filename": "/packages/clpqr/store_r.P"}, {"start": 26669471, "audio": 0, "end": 26675397, "filename": "/packages/clpqr/redund.xwam"}, {"start": 26675397, "audio": 0, "end": 26680404, "filename": "/packages/clpqr/class.pl"}, {"start": 26680404, "audio": 0, "end": 26688271, "filename": "/packages/clpqr/project.pl"}, {"start": 26688271, "audio": 0, "end": 26693686, "filename": "/packages/clpqr/project.xwam"}, {"start": 26693686, "audio": 0, "end": 26694022, "filename": "/packages/clpqr/clpr_make.P"}, {"start": 26694022, "audio": 0, "end": 26698985, "filename": "/packages/clpqr/itf.pl"}, {"start": 26698985, "audio": 0, "end": 26702217, "filename": "/packages/clpqr/geler.xwam"}, {"start": 26702217, "audio": 0, "end": 26705872, "filename": "/packages/clpqr/bb_r.xwam"}, {"start": 26705872, "audio": 0, "end": 26729689, "filename": "/packages/clpqr/nf_r.xwam"}, {"start": 26729689, "audio": 0, "end": 26736363, "filename": "/packages/clpqr/itf_r.P"}, {"start": 26736363, "audio": 0, "end": 26744355, "filename": "/packages/clpqr/redund.P"}, {"start": 26744355, "audio": 0, "end": 26744695, "filename": "/packages/gap/README"}, {"start": 26744695, "audio": 0, "end": 26746946, "filename": "/packages/gap/Makefile"}, {"start": 26746946, "audio": 0, "end": 26747544, "filename": "/packages/gap/gapaux.P"}, {"start": 26747544, "audio": 0, "end": 26748265, "filename": "/packages/gap/gapexamps.P"}, {"start": 26748265, "audio": 0, "end": 26751361, "filename": "/packages/gap/gapmeta.P"}, {"start": 26751361, "audio": 0, "end": 26758302, "filename": "/packages/pcre/pcreconfig.P"}, {"start": 26758302, "audio": 0, "end": 26760575, "filename": "/packages/pcre/Makefile"}, {"start": 26760575, "audio": 0, "end": 26761660, "filename": "/packages/pcre/pcre_info.in"}, {"start": 26761660, "audio": 0, "end": 26894437, "filename": "/packages/pcre/configure.lineno"}, {"start": 26894437, "audio": 0, "end": 27084562, "filename": "/packages/pcre/a.out"}, {"start": 27084562, "audio": 0, "end": 27085673, "filename": "/packages/pcre/NMakefile.mak"}, {"start": 27085673, "audio": 0, "end": 27219002, "filename": "/packages/pcre/configure"}, {"start": 27219002, "audio": 0, "end": 27243679, "filename": "/packages/pcre/config.status"}, {"start": 27243679, "audio": 0, "end": 27244796, "filename": "/packages/pcre/NMakefile64.mak"}, {"start": 27244796, "audio": 0, "end": 27244849, "filename": "/packages/pcre/Installation_summary"}, {"start": 27244849, "audio": 0, "end": 27434927, "filename": "/packages/pcre/a.out.js"}, {"start": 27434927, "audio": 0, "end": 27451103, "filename": "/packages/pcre/config.log"}, {"start": 27451103, "audio": 0, "end": 27454591, "filename": "/packages/pcre/configure.in"}, {"start": 27454591, "audio": 0, "end": 27455712, "filename": "/packages/pcre/pcre_info.P"}, {"start": 27455712, "audio": 0, "end": 27458052, "filename": "/packages/pcre/cc/NMakefile.mak"}, {"start": 27458052, "audio": 0, "end": 27470692, "filename": "/packages/pcre/cc/pcre4pl.c"}, {"start": 27470692, "audio": 0, "end": 27470866, "filename": "/packages/pcre/cc/deprecation.h"}, {"start": 27470866, "audio": 0, "end": 27473222, "filename": "/packages/pcre/cc/NMakefile64.mak"}, {"start": 27473222, "audio": 0, "end": 27478310, "filename": "/packages/pcre/cc/pcre/pcreposix.h"}, {"start": 27478310, "audio": 0, "end": 27490979, "filename": "/packages/pcre/cc/pcre/pcre.h"}, {"start": 27490979, "audio": 0, "end": 27558311, "filename": "/packages/pcre/cc/bin64/pcrecpp.lib"}, {"start": 27558311, "audio": 0, "end": 27560217, "filename": "/packages/pcre/cc/bin64/pcre4pl.lib"}, {"start": 27560217, "audio": 0, "end": 27598617, "filename": "/packages/pcre/cc/bin64/pcrecpp.dll"}, {"start": 27598617, "audio": 0, "end": 27600829, "filename": "/packages/pcre/cc/bin64/pcreposix.lib"}, {"start": 27600829, "audio": 0, "end": 27710909, "filename": "/packages/pcre/cc/bin64/pcre4pl.dll"}, {"start": 27710909, "audio": 0, "end": 27711806, "filename": "/packages/pcre/cc/bin64/pcreposix.exp"}, {"start": 27711806, "audio": 0, "end": 27715441, "filename": "/packages/pcre/cc/bin64/pcre.exp"}, {"start": 27715441, "audio": 0, "end": 27725169, "filename": "/packages/pcre/cc/bin64/pcreposix.dll"}, {"start": 27725169, "audio": 0, "end": 27913073, "filename": "/packages/pcre/cc/bin64/pcre.dll"}, {"start": 27913073, "audio": 0, "end": 27919453, "filename": "/packages/pcre/cc/bin64/pcre.lib"}, {"start": 27919453, "audio": 0, "end": 27920184, "filename": "/packages/pcre/cc/bin64/pcre4pl.exp"}, {"start": 27920184, "audio": 0, "end": 27960544, "filename": "/packages/pcre/cc/bin64/pcrecpp.exp"}, {"start": 27960544, "audio": 0, "end": 27962474, "filename": "/packages/pcre/cc/bin/pcre4pl.lib"}, {"start": 27962474, "audio": 0, "end": 27963045, "filename": "/packages/pcre/cc/bin/pcre.def"}, {"start": 27963045, "audio": 0, "end": 28056229, "filename": "/packages/pcre/cc/bin/pcre4pl.dll"}, {"start": 28056229, "audio": 0, "end": 28329637, "filename": "/packages/pcre/cc/bin/pcre.dll"}, {"start": 28329637, "audio": 0, "end": 28338577, "filename": "/packages/pcre/cc/bin/pcre.lib"}, {"start": 28338577, "audio": 0, "end": 28339314, "filename": "/packages/pcre/cc/bin/pcre4pl.exp"}, {"start": 28339314, "audio": 0, "end": 28340439, "filename": "/packages/pcre/Misc/pcre_init-wind.P"}, {"start": 28340439, "audio": 0, "end": 28363598, "filename": "/packages/chr/time.xwam"}, {"start": 28363598, "audio": 0, "end": 28379348, "filename": "/packages/chr/chr_interp.P"}, {"start": 28379348, "audio": 0, "end": 28395299, "filename": "/packages/chr/allentable.P"}, {"start": 28395299, "audio": 0, "end": 28453930, "filename": "/packages/chr/chr_pp.P"}, {"start": 28453930, "audio": 0, "end": 28472423, "filename": "/packages/chr/time.P"}, {"start": 28472423, "audio": 0, "end": 28491156, "filename": "/packages/chr/allentable.xwam"}, {"start": 28491156, "audio": 0, "end": 28498570, "filename": "/packages/chr/chr_TimeMachine.P"}, {"start": 28498570, "audio": 0, "end": 28503974, "filename": "/packages/chr/ctest.P"}, {"start": 28503974, "audio": 0, "end": 28550813, "filename": "/packages/chr/chr_pp.xwam"}, {"start": 28550813, "audio": 0, "end": 28559177, "filename": "/packages/chr/mdl_TimeMachine.P"}, {"start": 28559177, "audio": 0, "end": 28566078, "filename": "/packages/chr/timeConstraints.chr"}, {"start": 28566078, "audio": 0, "end": 28577761, "filename": "/packages/chr/chr_interp.xwam"}, {"start": 28577761, "audio": 0, "end": 28580230, "filename": "/packages/chr/chr_TimeMachine.xwam"}, {"start": 28580230, "audio": 0, "end": 28589605, "filename": "/packages/slx/slxshell.P"}, {"start": 28589605, "audio": 0, "end": 28591163, "filename": "/packages/slx/Makefile"}, {"start": 28591163, "audio": 0, "end": 28593510, "filename": "/packages/pita/testpitaindexc.P"}, {"start": 28593510, "audio": 0, "end": 28595673, "filename": "/packages/pita/testpitacount.P"}, {"start": 28595673, "audio": 0, "end": 28603117, "filename": "/packages/pita/pita_lib.c"}, {"start": 28603117, "audio": 0, "end": 28605990, "filename": "/packages/pita/pita_lib.H.in"}, {"start": 28605990, "audio": 0, "end": 28717299, "filename": "/packages/pita/configure"}, {"start": 28717299, "audio": 0, "end": 28719917, "filename": "/packages/pita/testpita.P"}, {"start": 28719917, "audio": 0, "end": 28733350, "filename": "/packages/pita/pita_int.P.in"}, {"start": 28733350, "audio": 0, "end": 28735409, "filename": "/packages/pita/testpitaposs.P"}, {"start": 28735409, "audio": 0, "end": 28737810, "filename": "/packages/pita/testpitavitind.P"}, {"start": 28737810, "audio": 0, "end": 28738750, "filename": "/packages/pita/configure.in"}, {"start": 28738750, "audio": 0, "end": 28738894, "filename": "/packages/pita/examples/threesideddice.cpl"}, {"start": 28738894, "audio": 0, "end": 28739257, "filename": "/packages/pita/examples/throws.cpl"}, {"start": 28739257, "audio": 0, "end": 28739294, "filename": "/packages/pita/examples/exist.cpl"}, {"start": 28739294, "audio": 0, "end": 28739331, "filename": "/packages/pita/examples/ex.cpl"}, {"start": 28739331, "audio": 0, "end": 28739684, "filename": "/packages/pita/examples/hiv.cpl"}, {"start": 28739684, "audio": 0, "end": 28739914, "filename": "/packages/pita/examples/alarm.cpl"}, {"start": 28739914, "audio": 0, "end": 28740397, "filename": "/packages/pita/examples/hmm.cpl"}, {"start": 28740397, "audio": 0, "end": 28740905, "filename": "/packages/pita/examples/dice.cpl"}, {"start": 28740905, "audio": 0, "end": 28741080, "filename": "/packages/pita/examples/coin.cpl"}, {"start": 28741080, "audio": 0, "end": 28741202, "filename": "/packages/pita/examples/path.cpl"}, {"start": 28741202, "audio": 0, "end": 28741770, "filename": "/packages/pita/examples/mendel.cpl"}, {"start": 28741770, "audio": 0, "end": 28741998, "filename": "/packages/pita/examples/path_loop_chk.cpl"}, {"start": 28741998, "audio": 0, "end": 28742183, "filename": "/packages/pita/examples/coin2.cpl"}, {"start": 28742183, "audio": 0, "end": 28742313, "filename": "/packages/pita/examples/trigger.cpl"}, {"start": 28742313, "audio": 0, "end": 28742362, "filename": "/packages/pita/examples/light.cpl"}, {"start": 28742362, "audio": 0, "end": 28743085, "filename": "/packages/dbdrivers/NMakefile.mak"}, {"start": 28743085, "audio": 0, "end": 28743890, "filename": "/packages/dbdrivers/NMakefile64.mak"}, {"start": 28743890, "audio": 0, "end": 28745159, "filename": "/packages/dbdrivers/db_interface.H"}, {"start": 28745159, "audio": 0, "end": 28749220, "filename": "/packages/dbdrivers/db_interface.P"}, {"start": 28749220, "audio": 0, "end": 28750560, "filename": "/packages/dbdrivers/mysql.P"}, {"start": 28750560, "audio": 0, "end": 28751890, "filename": "/packages/dbdrivers/odbc.P"}, {"start": 28751890, "audio": 0, "end": 28753359, "filename": "/packages/dbdrivers/mysqlembedded.P"}, {"start": 28753359, "audio": 0, "end": 28753837, "filename": "/packages/dbdrivers/run_configure_scripts"}, {"start": 28753837, "audio": 0, "end": 28755058, "filename": "/packages/dbdrivers/cc/driver_manager.H"}, {"start": 28755058, "audio": 0, "end": 28780102, "filename": "/packages/dbdrivers/cc/driver_manager.c"}, {"start": 28780102, "audio": 0, "end": 28781172, "filename": "/packages/dbdrivers/cc/nodeprecate.h"}, {"start": 28781172, "audio": 0, "end": 28782375, "filename": "/packages/dbdrivers/cc/NMakefile.mak"}, {"start": 28782375, "audio": 0, "end": 28783573, "filename": "/packages/dbdrivers/cc/NMakefile64.mak"}, {"start": 28783573, "audio": 0, "end": 28786991, "filename": "/packages/dbdrivers/cc/driver_manager_defs.h"}, {"start": 28786991, "audio": 0, "end": 28788948, "filename": "/packages/dbdrivers/cc/windows/driver_manager.exp"}, {"start": 28788948, "audio": 0, "end": 28886228, "filename": "/packages/dbdrivers/cc/windows/driver_manager.dll"}, {"start": 28886228, "audio": 0, "end": 28890362, "filename": "/packages/dbdrivers/cc/windows/driver_manager.lib"}, {"start": 28890362, "audio": 0, "end": 28892229, "filename": "/packages/dbdrivers/cc/windows64/driver_manager.exp"}, {"start": 28892229, "audio": 0, "end": 29007429, "filename": "/packages/dbdrivers/cc/windows64/driver_manager.dll"}, {"start": 29007429, "audio": 0, "end": 29011401, "filename": "/packages/dbdrivers/cc/windows64/driver_manager.lib"}, {"start": 29011401, "audio": 0, "end": 29012557, "filename": "/packages/dbdrivers/mysql/mysql_init.in"}, {"start": 29012557, "audio": 0, "end": 29149292, "filename": "/packages/dbdrivers/mysql/configure"}, {"start": 29149292, "audio": 0, "end": 29158677, "filename": "/packages/dbdrivers/mysql/mysql_driver_config.P"}, {"start": 29158677, "audio": 0, "end": 29163412, "filename": "/packages/dbdrivers/mysql/configure.in"}, {"start": 29163412, "audio": 0, "end": 29165123, "filename": "/packages/dbdrivers/mysql/cc/NMakefile.mak"}, {"start": 29165123, "audio": 0, "end": 29185199, "filename": "/packages/dbdrivers/mysql/cc/mysql_driver.c"}, {"start": 29185199, "audio": 0, "end": 29187635, "filename": "/packages/dbdrivers/mysql/cc/mysql_driver_defs.h"}, {"start": 29187635, "audio": 0, "end": 29189350, "filename": "/packages/dbdrivers/mysql/cc/NMakefile64.mak"}, {"start": 29189350, "audio": 0, "end": 29191514, "filename": "/packages/dbdrivers/mysql/cc/windows/mysql_driver.lib"}, {"start": 29191514, "audio": 0, "end": 29192331, "filename": "/packages/dbdrivers/mysql/cc/windows/mysql_driver.exp"}, {"start": 29192331, "audio": 0, "end": 29194471, "filename": "/packages/dbdrivers/mysql/cc/windows64/mysql_driver.lib"}, {"start": 29194471, "audio": 0, "end": 29195282, "filename": "/packages/dbdrivers/mysql/cc/windows64/mysql_driver.exp"}, {"start": 29195282, "audio": 0, "end": 29196445, "filename": "/packages/dbdrivers/mysql/Misc/mysql_init-wind.P"}, {"start": 29196445, "audio": 0, "end": 29197588, "filename": "/packages/dbdrivers/odbc/odbc_init.in"}, {"start": 29197588, "audio": 0, "end": 29206791, "filename": "/packages/dbdrivers/odbc/odbc_driver_config.P"}, {"start": 29206791, "audio": 0, "end": 29341859, "filename": "/packages/dbdrivers/odbc/configure"}, {"start": 29341859, "audio": 0, "end": 29345768, "filename": "/packages/dbdrivers/odbc/configure.in"}, {"start": 29345768, "audio": 0, "end": 29367539, "filename": "/packages/dbdrivers/odbc/cc/odbc_driver.c"}, {"start": 29367539, "audio": 0, "end": 29369945, "filename": "/packages/dbdrivers/odbc/cc/odbc_driver_defs.h"}, {"start": 29369945, "audio": 0, "end": 29388553, "filename": "/packages/dbdrivers/odbc/cc/odbc_driver.so"}, {"start": 29388553, "audio": 0, "end": 29389827, "filename": "/packages/dbdrivers/odbc/cc/NMakefile.mak"}, {"start": 29389827, "audio": 0, "end": 29391104, "filename": "/packages/dbdrivers/odbc/cc/NMakefile64.mak"}, {"start": 29391104, "audio": 0, "end": 29465344, "filename": "/packages/dbdrivers/odbc/cc/windows/odbc_driver.dll"}, {"start": 29465344, "audio": 0, "end": 29467406, "filename": "/packages/dbdrivers/odbc/cc/windows/odbc_driver.lib"}, {"start": 29467406, "audio": 0, "end": 29468213, "filename": "/packages/dbdrivers/odbc/cc/windows/odbc_driver.exp"}, {"start": 29468213, "audio": 0, "end": 29556789, "filename": "/packages/dbdrivers/odbc/cc/windows64/odbc_driver.dll"}, {"start": 29556789, "audio": 0, "end": 29558827, "filename": "/packages/dbdrivers/odbc/cc/windows64/odbc_driver.lib"}, {"start": 29558827, "audio": 0, "end": 29559628, "filename": "/packages/dbdrivers/odbc/cc/windows64/odbc_driver.exp"}, {"start": 29559628, "audio": 0, "end": 29560799, "filename": "/packages/dbdrivers/odbc/Misc/odbc_init-wind.P"}, {"start": 29560799, "audio": 0, "end": 29697980, "filename": "/packages/dbdrivers/mysqlembedded/configure"}, {"start": 29697980, "audio": 0, "end": 29707976, "filename": "/packages/dbdrivers/mysqlembedded/mysqlembedded_driver_config.P"}, {"start": 29707976, "audio": 0, "end": 29709118, "filename": "/packages/dbdrivers/mysqlembedded/mysqlembedded_init.in"}, {"start": 29709118, "audio": 0, "end": 29714293, "filename": "/packages/dbdrivers/mysqlembedded/configure.in"}, {"start": 29714293, "audio": 0, "end": 29734524, "filename": "/packages/dbdrivers/mysqlembedded/cc/mysqlembedded_driver.c"}, {"start": 29734524, "audio": 0, "end": 29736241, "filename": "/packages/dbdrivers/mysqlembedded/cc/NMakefile.mak"}, {"start": 29736241, "audio": 0, "end": 29737943, "filename": "/packages/dbdrivers/mysqlembedded/cc/NMakefile64.mak"}, {"start": 29737943, "audio": 0, "end": 29740517, "filename": "/packages/dbdrivers/mysqlembedded/cc/mysqlembedded_driver_defs.h"}, {"start": 29740517, "audio": 0, "end": 29741760, "filename": "/packages/dbdrivers/mysqlembedded/Misc/mysqlembedded_init-wind.P"}, {"start": 29741760, "audio": 0, "end": 29741835, "filename": "/packages/xmc/setpath.P"}, {"start": 29741835, "audio": 0, "end": 29749026, "filename": "/packages/xmc/README"}, {"start": 29749026, "audio": 0, "end": 29753394, "filename": "/packages/xmc/mucalculus.P"}, {"start": 29753394, "audio": 0, "end": 29754486, "filename": "/packages/xmc/trans.H"}, {"start": 29754486, "audio": 0, "end": 29757114, "filename": "/packages/xmc/quad.P"}, {"start": 29757114, "audio": 0, "end": 29765074, "filename": "/packages/xmc/simgui.P"}, {"start": 29765074, "audio": 0, "end": 29770936, "filename": "/packages/xmc/tcl_interface.P"}, {"start": 29770936, "audio": 0, "end": 29772580, "filename": "/packages/xmc/navigate.P"}, {"start": 29772580, "audio": 0, "end": 29780415, "filename": "/packages/xmc/comp2.P"}, {"start": 29780415, "audio": 0, "end": 29781778, "filename": "/packages/xmc/typecheck.H"}, {"start": 29781778, "audio": 0, "end": 29782786, "filename": "/packages/xmc/xlparse.H"}, {"start": 29782786, "audio": 0, "end": 29783840, "filename": "/packages/xmc/navigate.H"}, {"start": 29783840, "audio": 0, "end": 29786236, "filename": "/packages/xmc/Makefile"}, {"start": 29786236, "audio": 0, "end": 29793752, "filename": "/packages/xmc/gui.P"}, {"start": 29793752, "audio": 0, "end": 29794779, "filename": "/packages/xmc/tcl_interface.H"}, {"start": 29794779, "audio": 0, "end": 29808276, "filename": "/packages/xmc/comp1.P"}, {"start": 29808276, "audio": 0, "end": 29809941, "filename": "/packages/xmc/stdtype.P"}, {"start": 29809941, "audio": 0, "end": 29811144, "filename": "/packages/xmc/mucalculus.H"}, {"start": 29811144, "audio": 0, "end": 29812403, "filename": "/packages/xmc/models_rule.P"}, {"start": 29812403, "audio": 0, "end": 29813437, "filename": "/packages/xmc/formula.H"}, {"start": 29813437, "audio": 0, "end": 29815552, "filename": "/packages/xmc/xlparse.c"}, {"start": 29815552, "audio": 0, "end": 29838117, "filename": "/packages/xmc/justify.P"}, {"start": 29838117, "audio": 0, "end": 29840372, "filename": "/packages/xmc/count.P"}, {"start": 29840372, "audio": 0, "end": 29844200, "filename": "/packages/xmc/xl.l"}, {"start": 29844200, "audio": 0, "end": 29848459, "filename": "/packages/xmc/ccs.P"}, {"start": 29848459, "audio": 0, "end": 29850828, "filename": "/packages/xmc/script.P"}, {"start": 29850828, "audio": 0, "end": 29852146, "filename": "/packages/xmc/quad.H"}, {"start": 29852146, "audio": 0, "end": 29854204, "filename": "/packages/xmc/formula.P"}, {"start": 29854204, "audio": 0, "end": 29870277, "filename": "/packages/xmc/xl.y"}, {"start": 29870277, "audio": 0, "end": 29895062, "filename": "/packages/xmc/comp.P"}, {"start": 29895062, "audio": 0, "end": 29900038, "filename": "/packages/xmc/reader.P"}, {"start": 29900038, "audio": 0, "end": 29901254, "filename": "/packages/xmc/xmc.H"}, {"start": 29901254, "audio": 0, "end": 29902515, "filename": "/packages/xmc/comp.H"}, {"start": 29902515, "audio": 0, "end": 29903805, "filename": "/packages/xmc/gui.H"}, {"start": 29903805, "audio": 0, "end": 29905514, "filename": "/packages/xmc/trans.P"}, {"start": 29905514, "audio": 0, "end": 29907140, "filename": "/packages/xmc/main.c"}, {"start": 29907140, "audio": 0, "end": 29909118, "filename": "/packages/xmc/xmc.P"}, {"start": 29909118, "audio": 0, "end": 29937779, "filename": "/packages/xmc/typecheck.P"}, {"start": 29937779, "audio": 0, "end": 29939402, "filename": "/packages/xmc/annot.P"}, {"start": 29939402, "audio": 0, "end": 29939703, "filename": "/packages/xmc/xmc-gui"}, {"start": 29939703, "audio": 0, "end": 29943787, "filename": "/packages/xmc/util.P"}, {"start": 29943787, "audio": 0, "end": 29945076, "filename": "/packages/xmc/util.H"}, {"start": 29945076, "audio": 0, "end": 29946225, "filename": "/packages/xmc/simgui.H"}, {"start": 29946225, "audio": 0, "end": 29947487, "filename": "/packages/xmc/justify.H"}, {"start": 29947487, "audio": 0, "end": 29949000, "filename": "/packages/xmc/driver.c"}, {"start": 29949000, "audio": 0, "end": 29951558, "filename": "/packages/xmc/runlib.P"}, {"start": 29951558, "audio": 0, "end": 29952624, "filename": "/packages/xmc/attr.h"}, {"start": 29952624, "audio": 0, "end": 29953785, "filename": "/packages/xmc/count.H"}, {"start": 29953785, "audio": 0, "end": 29953848, "filename": "/packages/xmc/GUI/true.gif"}, {"start": 29953848, "audio": 0, "end": 29959776, "filename": "/packages/xmc/GUI/tcl_interface.P"}, {"start": 29959776, "audio": 0, "end": 29959840, "filename": "/packages/xmc/GUI/false.gif"}, {"start": 29959840, "audio": 0, "end": 30035949, "filename": "/packages/xmc/GUI/mclistbox.tcl"}, {"start": 30035949, "audio": 0, "end": 30036251, "filename": "/packages/xmc/GUI/close.bmp"}, {"start": 30036251, "audio": 0, "end": 30036550, "filename": "/packages/xmc/GUI/node.bmp"}, {"start": 30036550, "audio": 0, "end": 30049023, "filename": "/packages/xmc/GUI/mck.tcl"}, {"start": 30049023, "audio": 0, "end": 30049322, "filename": "/packages/xmc/GUI/open.bmp"}, {"start": 30049322, "audio": 0, "end": 30058748, "filename": "/packages/xmc/GUI/xsb_interface.tcl"}, {"start": 30058748, "audio": 0, "end": 30062919, "filename": "/packages/xmc/GUI/xmc.tcl"}, {"start": 30062919, "audio": 0, "end": 30066313, "filename": "/packages/perlmatch/plmchshell.P"}, {"start": 30066313, "audio": 0, "end": 30068665, "filename": "/packages/perlmatch/Makefile"}, {"start": 30068665, "audio": 0, "end": 30073140, "filename": "/packages/perlmatch/plmchconfig.P"}, {"start": 30073140, "audio": 0, "end": 30076985, "filename": "/packages/perlmatch/cc/interface.h"}, {"start": 30076985, "audio": 0, "end": 30092515, "filename": "/packages/perlmatch/cc/xsbpattern.c"}, {"start": 30092515, "audio": 0, "end": 30102026, "filename": "/packages/perlmatch/cc/perlpattern.c"}, {"start": 30102026, "audio": 0, "end": 30102270, "filename": "/packages/justify/jxm.H"}, {"start": 30102270, "audio": 0, "end": 30119318, "filename": "/packages/justify/jxm.xwam"}, {"start": 30119318, "audio": 0, "end": 30120744, "filename": "/packages/justify/README"}, {"start": 30120744, "audio": 0, "end": 30122662, "filename": "/packages/justify/evid.P"}, {"start": 30122662, "audio": 0, "end": 30124273, "filename": "/packages/justify/Makefile"}, {"start": 30124273, "audio": 0, "end": 30141303, "filename": "/packages/justify/jxm.P"}, {"start": 30141303, "audio": 0, "end": 30143824, "filename": "/packages/justify/evid.xwam"}, {"start": 30143824, "audio": 0, "end": 30145381, "filename": "/packages/xref/Makefile"}, {"start": 30145381, "audio": 0, "end": 30159565, "filename": "/packages/xref/xxref.P"}, {"start": 30159565, "audio": 0, "end": 30160743, "filename": "/packages/xref/xxref.H"}, {"start": 30160743, "audio": 0, "end": 30163072, "filename": "/packages/wildmatch/Makefile"}, {"start": 30163072, "audio": 0, "end": 30167071, "filename": "/packages/wildmatch/wldmtchconfig.P"}, {"start": 30167071, "audio": 0, "end": 30169405, "filename": "/packages/wildmatch/wldmtchconfig.xwam"}, {"start": 30169405, "audio": 0, "end": 30179042, "filename": "/packages/wildmatch/cc/xsb_wildmatch.c"}, {"start": 30179042, "audio": 0, "end": 30179416, "filename": "/packages/wildmatch/cc/xsb_wildmatch.H"}, {"start": 30179416, "audio": 0, "end": 30180680, "filename": "/packages/wildmatch/cc/NMakefile.mak"}, {"start": 30180680, "audio": 0, "end": 30236665, "filename": "/packages/CDF/oms_components.P"}, {"start": 30236665, "audio": 0, "end": 30258589, "filename": "/packages/CDF/oms_queries.P"}, {"start": 30258589, "audio": 0, "end": 30268071, "filename": "/packages/CDF/oms_q_annot.P"}, {"start": 30268071, "audio": 0, "end": 30269057, "filename": "/packages/CDF/oms_cdf.P"}, {"start": 30269057, "audio": 0, "end": 30276418, "filename": "/packages/CDF/oms_odbc.P"}, {"start": 30276418, "audio": 0, "end": 30278810, "filename": "/packages/CDF/newpp.P"}, {"start": 30278810, "audio": 0, "end": 30287596, "filename": "/packages/CDF/oms_utilities.P"}, {"start": 30287596, "audio": 0, "end": 30389576, "filename": "/packages/CDF/oms_init_oms.P"}, {"start": 30389576, "audio": 0, "end": 30392778, "filename": "/packages/CDF/oms_exceptions.P"}, {"start": 30392778, "audio": 0, "end": 30432121, "filename": "/packages/CDF/oms_io.P"}, {"start": 30432121, "audio": 0, "end": 30434676, "filename": "/packages/CDF/my_getindexes.sp"}, {"start": 30434676, "audio": 0, "end": 30480275, "filename": "/packages/CDF/oms_db_storage.P"}, {"start": 30480275, "audio": 0, "end": 30487725, "filename": "/packages/CDF/oms_oblivion.P"}, {"start": 30487725, "audio": 0, "end": 30489087, "filename": "/packages/CDF/oms_utils.P"}, {"start": 30489087, "audio": 0, "end": 30501977, "filename": "/packages/CDF/oms_filters.P"}, {"start": 30501977, "audio": 0, "end": 30522345, "filename": "/packages/CDF/oms_diffs.P"}, {"start": 30522345, "audio": 0, "end": 30527028, "filename": "/packages/CDF/todo"}, {"start": 30527028, "audio": 0, "end": 30528449, "filename": "/packages/CDF/oms_config.P"}, {"start": 30528449, "audio": 0, "end": 30552298, "filename": "/packages/CDF/oms_db_updatable.P"}, {"start": 30552298, "audio": 0, "end": 30568272, "filename": "/packages/CDF/xsb_logger.P"}, {"start": 30568272, "audio": 0, "end": 30581955, "filename": "/packages/CDF/oms_constraints.P"}, {"start": 30581955, "audio": 0, "end": 30587507, "filename": "/packages/CDF/oms_rules.P"}, {"start": 30587507, "audio": 0, "end": 30603998, "filename": "/packages/CDF/rdf/oms_rdf.P"}, {"start": 30603998, "audio": 0, "end": 30625154, "filename": "/packages/CDF/rdf/xml_acquisition.P"}, {"start": 30625154, "audio": 0, "end": 30638190, "filename": "/packages/CDF/rdf/oms_dump_rdf.P"}, {"start": 30638190, "audio": 0, "end": 30649927, "filename": "/packages/CDF/rdf/xml_generation.P"}, {"start": 30649927, "audio": 0, "end": 30656139, "filename": "/packages/CDF/rdf/xml.P"}, {"start": 30656139, "audio": 0, "end": 30658365, "filename": "/packages/CDF/rdf/oms_daml_names.P"}, {"start": 30658365, "audio": 0, "end": 30666434, "filename": "/packages/CDF/rdf/oms_trans_triples.P"}, {"start": 30666434, "audio": 0, "end": 30693378, "filename": "/packages/CDF/rdf/xml_utilities.P"}, {"start": 30693378, "audio": 0, "end": 30699067, "filename": "/packages/CDF/rdf/xml_pp.P"}, {"start": 30699067, "audio": 0, "end": 30703968, "filename": "/packages/CDF/rdf/xml_diagnosis.P"}, {"start": 30703968, "audio": 0, "end": 30707532, "filename": "/packages/CDF/doc/README.cdf"}, {"start": 30707532, "audio": 0, "end": 30710585, "filename": "/packages/CDF/doc/oms_format.P"}, {"start": 30710585, "audio": 0, "end": 30747668, "filename": "/packages/CDF/doc/main.P"}, {"start": 30747668, "audio": 0, "end": 30747921, "filename": "/packages/CDF/test/test.sh"}, {"start": 30747921, "audio": 0, "end": 30755301, "filename": "/packages/CDF/test/oms_test.P"}, {"start": 30755301, "audio": 0, "end": 30756215, "filename": "/packages/CDF/test/test1.P"}, {"start": 30756215, "audio": 0, "end": 30756639, "filename": "/packages/CDF/test/test8.P"}, {"start": 30756639, "audio": 0, "end": 30758763, "filename": "/packages/CDF/test/ext8.P"}, {"start": 30758763, "audio": 0, "end": 30760070, "filename": "/packages/CDF/test/ext10.P"}, {"start": 30760070, "audio": 0, "end": 30761973, "filename": "/packages/CDF/test/ext9.P"}, {"start": 30761973, "audio": 0, "end": 30761973, "filename": "/packages/CDF/test/ext3.P"}, {"start": 30761973, "audio": 0, "end": 30763871, "filename": "/packages/CDF/test/ext5.P"}, {"start": 30763871, "audio": 0, "end": 30764170, "filename": "/packages/CDF/test/get_diff.sh"}, {"start": 30764170, "audio": 0, "end": 30764489, "filename": "/packages/CDF/test/get_internal_diff.sh"}, {"start": 30764489, "audio": 0, "end": 30764919, "filename": "/packages/CDF/test/test3.P"}, {"start": 30764919, "audio": 0, "end": 30765050, "filename": "/packages/CDF/test/test5.P"}, {"start": 30765050, "audio": 0, "end": 30765226, "filename": "/packages/CDF/test/test6.P"}, {"start": 30765226, "audio": 0, "end": 30766732, "filename": "/packages/CDF/test/ext2.P"}, {"start": 30766732, "audio": 0, "end": 30768261, "filename": "/packages/CDF/test/ext1.P"}, {"start": 30768261, "audio": 0, "end": 30768261, "filename": "/packages/CDF/test/ext6.P"}, {"start": 30768261, "audio": 0, "end": 30768566, "filename": "/packages/CDF/test/gentest.sh"}, {"start": 30768566, "audio": 0, "end": 30770099, "filename": "/packages/CDF/test/test4.P"}, {"start": 30770099, "audio": 0, "end": 30772289, "filename": "/packages/CDF/test/ext4.P"}, {"start": 30772289, "audio": 0, "end": 30772510, "filename": "/packages/CDF/test/test2.P"}, {"start": 30772510, "audio": 0, "end": 30776980, "filename": "/packages/CDF/test/test5dir/subset.prev"}, {"start": 30776980, "audio": 0, "end": 30779102, "filename": "/packages/CDF/test/test2dir/subset.prev"}, {"start": 30779102, "audio": 0, "end": 30782068, "filename": "/packages/CDF/test/test3dir/subset.prev"}, {"start": 30782068, "audio": 0, "end": 30785237, "filename": "/packages/CDF/test/test6dir/subset.prev"}, {"start": 30785237, "audio": 0, "end": 30786349, "filename": "/packages/CDF/theoremprover/tp_utils.P"}, {"start": 30786349, "audio": 0, "end": 30786626, "filename": "/packages/CDF/theoremprover/testing.P"}, {"start": 30786626, "audio": 0, "end": 30786830, "filename": "/packages/CDF/theoremprover/gctest1.P"}, {"start": 30786830, "audio": 0, "end": 30795613, "filename": "/packages/CDF/theoremprover/meta_io.P"}, {"start": 30795613, "audio": 0, "end": 30801641, "filename": "/packages/CDF/theoremprover/bench.P"}, {"start": 30801641, "audio": 0, "end": 30821519, "filename": "/packages/CDF/theoremprover/metaback.P"}, {"start": 30821519, "audio": 0, "end": 30825643, "filename": "/packages/CDF/theoremprover/meta.P"}, {"start": 30825643, "audio": 0, "end": 30825676, "filename": "/packages/CDF/theoremprover/tp_debug.h"}, {"start": 30825676, "audio": 0, "end": 30837727, "filename": "/packages/CDF/theoremprover/cur_tests.P"}, {"start": 30837727, "audio": 0, "end": 30837727, "filename": "/packages/CDF/theoremprover/tp_debug.none"}, {"start": 30837727, "audio": 0, "end": 30838004, "filename": "/packages/CDF/theoremprover/testing_capi.P"}, {"start": 30838004, "audio": 0, "end": 30848106, "filename": "/packages/CDF/theoremprover/metafront.P"}, {"start": 30848106, "audio": 0, "end": 30848139, "filename": "/packages/CDF/theoremprover/tp_debug.df"}, {"start": 30848139, "audio": 0, "end": 30848588, "filename": "/packages/bounds/bounds_ops.pl"}, {"start": 30848588, "audio": 0, "end": 30851331, "filename": "/packages/bounds/clp_events.pl"}, {"start": 30851331, "audio": 0, "end": 30852586, "filename": "/packages/bounds/clp_events.xwam"}, {"start": 30852586, "audio": 0, "end": 30854311, "filename": "/packages/bounds/swi.xwam"}, {"start": 30854311, "audio": 0, "end": 30856648, "filename": "/packages/regmatch/Makefile"}, {"start": 30856648, "audio": 0, "end": 30859021, "filename": "/packages/regmatch/regmtchconfig.xwam"}, {"start": 30859021, "audio": 0, "end": 30863050, "filename": "/packages/regmatch/regmtchconfig.P"}, {"start": 30863050, "audio": 0, "end": 30864344, "filename": "/packages/regmatch/cc/NMakefile.mak"}, {"start": 30864344, "audio": 0, "end": 30864762, "filename": "/packages/regmatch/cc/xsb_re_match.H"}, {"start": 30864762, "audio": 0, "end": 30866055, "filename": "/packages/regmatch/cc/NMakefile64.mak"}, {"start": 30866055, "audio": 0, "end": 30888119, "filename": "/packages/regmatch/cc/xsb_re_match.c"}, {"start": 30888119, "audio": 0, "end": 30888322, "filename": "/packages/xasp/xasp.h"}, {"start": 30888322, "audio": 0, "end": 30899943, "filename": "/packages/xasp/xnmr.P"}, {"start": 30899943, "audio": 0, "end": 30902691, "filename": "/packages/xasp/sm_int.H"}, {"start": 30902691, "audio": 0, "end": 30904748, "filename": "/packages/xasp/xasppkg.def"}, {"start": 30904748, "audio": 0, "end": 30916414, "filename": "/packages/xasp/xnmr_int.P"}, {"start": 30916414, "audio": 0, "end": 30918729, "filename": "/packages/xasp/README.Win32"}, {"start": 30918729, "audio": 0, "end": 30942782, "filename": "/packages/xasp/sm_int.P"}, {"start": 30942782, "audio": 0, "end": 30942914, "filename": "/packages/xasp/makelinks.sh"}, {"start": 30942914, "audio": 0, "end": 30952878, "filename": "/packages/xasp/xsb_wrap_xasppkg.c"}, {"start": 30952878, "audio": 0, "end": 30955094, "filename": "/packages/xasp/xnmr.H"}, {"start": 30955094, "audio": 0, "end": 30962139, "filename": "/packages/xasp/xnmr.doc"}, {"start": 30962139, "audio": 0, "end": 30978737, "filename": "/packages/xasp/patch-smodels-2.27"}, {"start": 30978737, "audio": 0, "end": 30981485, "filename": "/packages/xasp/prologMake.P"}, {"start": 30981485, "audio": 0, "end": 30984827, "filename": "/packages/xasp/xasppkg.H"}, {"start": 30984827, "audio": 0, "end": 30986753, "filename": "/packages/xasp/patch-smodels-2.31"}, {"start": 30986753, "audio": 0, "end": 30991673, "filename": "/packages/xasp/xasppkg.c"}, {"start": 30991673, "audio": 0, "end": 30992080, "filename": "/packages/xasp/sm_clause_store.P"}, {"start": 30992080, "audio": 0, "end": 30993787, "filename": "/packages/xasp/xnmr_int.H"}, {"start": 30993787, "audio": 0, "end": 30995445, "filename": "/packages/xasp/intf_examples/cooked_choice.P"}, {"start": 30995445, "audio": 0, "end": 30996745, "filename": "/packages/xasp/intf_examples/rawex.P"}, {"start": 30996745, "audio": 0, "end": 30996902, "filename": "/packages/xasp/intf_examples/exwfs.P"}, {"start": 30996902, "audio": 0, "end": 30997945, "filename": "/packages/xasp/intf_examples/cook_ex.P"}, {"start": 30997945, "audio": 0, "end": 30998345, "filename": "/packages/xasp/intf_examples/lowlevel_ex.H"}, {"start": 30998345, "audio": 0, "end": 30998985, "filename": "/packages/xasp/intf_examples/lowlevel_ex.P"}, {"start": 30998985, "audio": 0, "end": 30999231, "filename": "/packages/xasp/doc/README"}, {"start": 30999231, "audio": 0, "end": 31005722, "filename": "/packages/xasp/doc/xnmr.doc"}, {"start": 31005722, "audio": 0, "end": 31008050, "filename": "/packages/xasp/doc/xasp_format.P"}, {"start": 31008050, "audio": 0, "end": 31008509, "filename": "/packages/xasp/doc/LICENSE"}, {"start": 31008509, "audio": 0, "end": 31011021, "filename": "/packages/xasp/doc/main.P"}, {"start": 31011021, "audio": 0, "end": 31013642, "filename": "/packages/xasp/makefiles/smoMakefile.OSX-10.4"}, {"start": 31013642, "audio": 0, "end": 31016120, "filename": "/packages/xasp/makefiles/smoMakefile.OSX-10.3"}, {"start": 31016120, "audio": 0, "end": 31019277, "filename": "/packages/xasp/smodels/improve.cc"}, {"start": 31019277, "audio": 0, "end": 31020371, "filename": "/packages/xasp/smodels/queue.cc"}, {"start": 31020371, "audio": 0, "end": 31028625, "filename": "/packages/xasp/smodels/api.cc"}, {"start": 31028625, "audio": 0, "end": 31029713, "filename": "/packages/xasp/smodels/stack.cc"}, {"start": 31029713, "audio": 0, "end": 31031048, "filename": "/packages/xasp/smodels/restart.h"}, {"start": 31031048, "audio": 0, "end": 31032315, "filename": "/packages/xasp/smodels/dcl.h"}, {"start": 31032315, "audio": 0, "end": 31035976, "filename": "/packages/xasp/smodels/stable.cc"}, {"start": 31035976, "audio": 0, "end": 31037138, "filename": "/packages/xasp/smodels/list.cc"}, {"start": 31037138, "audio": 0, "end": 31038044, "filename": "/packages/xasp/smodels/Makefile"}, {"start": 31038044, "audio": 0, "end": 31040716, "filename": "/packages/xasp/smodels/api.h"}, {"start": 31040716, "audio": 0, "end": 31043905, "filename": "/packages/xasp/smodels/main.cc"}, {"start": 31043905, "audio": 0, "end": 31061912, "filename": "/packages/xasp/smodels/COPYING"}, {"start": 31061912, "audio": 0, "end": 31066110, "filename": "/packages/xasp/smodels/denant.cc"}, {"start": 31066110, "audio": 0, "end": 31073391, "filename": "/packages/xasp/smodels/dcl.cc"}, {"start": 31073391, "audio": 0, "end": 31095921, "filename": "/packages/xasp/smodels/smodels.cc"}, {"start": 31095921, "audio": 0, "end": 31097139, "filename": "/packages/xasp/smodels/stable.h"}, {"start": 31097139, "audio": 0, "end": 31141345, "filename": "/packages/xasp/smodels/atomrule.cc"}, {"start": 31141345, "audio": 0, "end": 31147786, "filename": "/packages/xasp/smodels/CHANGES"}, {"start": 31147786, "audio": 0, "end": 31149537, "filename": "/packages/xasp/smodels/print.h"}, {"start": 31149537, "audio": 0, "end": 31150830, "filename": "/packages/xasp/smodels/tree.h"}, {"start": 31150830, "audio": 0, "end": 31152286, "filename": "/packages/xasp/smodels/queue.h"}, {"start": 31152286, "audio": 0, "end": 31161904, "filename": "/packages/xasp/smodels/read.cc"}, {"start": 31161904, "audio": 0, "end": 31163210, "filename": "/packages/xasp/smodels/timer.cc"}, {"start": 31163210, "audio": 0, "end": 31164149, "filename": "/packages/xasp/smodels/Makefile.osx"}, {"start": 31164149, "audio": 0, "end": 31165773, "filename": "/packages/xasp/smodels/list.h"}, {"start": 31165773, "audio": 0, "end": 31170028, "filename": "/packages/xasp/smodels/smodels.h"}, {"start": 31170028, "audio": 0, "end": 31171421, "filename": "/packages/xasp/smodels/read.h"}, {"start": 31171421, "audio": 0, "end": 31172424, "filename": "/packages/xasp/smodels/timer.h"}, {"start": 31172424, "audio": 0, "end": 31176223, "filename": "/packages/xasp/smodels/restart.cc"}, {"start": 31176223, "audio": 0, "end": 31179855, "filename": "/packages/xasp/smodels/tree.cc"}, {"start": 31179855, "audio": 0, "end": 31194709, "filename": "/packages/xasp/smodels/atomrule.h"}, {"start": 31194709, "audio": 0, "end": 31197528, "filename": "/packages/xasp/smodels/program.cc"}, {"start": 31197528, "audio": 0, "end": 31198674, "filename": "/packages/xasp/smodels/defines.h"}, {"start": 31198674, "audio": 0, "end": 31200079, "filename": "/packages/xasp/smodels/stack.h"}, {"start": 31200079, "audio": 0, "end": 31201279, "filename": "/packages/xasp/smodels/program.h"}, {"start": 31201279, "audio": 0, "end": 31203983, "filename": "/packages/xasp/tests/testall.sh"}, {"start": 31203983, "audio": 0, "end": 31212233, "filename": "/packages/xasp/tests/testsuite.sh"}, {"start": 31212233, "audio": 0, "end": 31213023, "filename": "/packages/xasp/tests/gentest.sh"}, {"start": 31213023, "audio": 0, "end": 31213497, "filename": "/packages/xasp/tests/basic_tests/test.sh"}, {"start": 31213497, "audio": 0, "end": 31215155, "filename": "/packages/xasp/tests/basic_tests/cooked_choice.P"}, {"start": 31215155, "audio": 0, "end": 31216486, "filename": "/packages/xasp/tests/basic_tests/rawex.P"}, {"start": 31216486, "audio": 0, "end": 31218064, "filename": "/packages/xasp/tests/basic_tests/cooked_choice_old"}, {"start": 31218064, "audio": 0, "end": 31218091, "filename": "/packages/xasp/tests/basic_tests/xnmr_int1_old"}, {"start": 31218091, "audio": 0, "end": 31218133, "filename": "/packages/xasp/tests/basic_tests/cook_ex_old"}, {"start": 31218133, "audio": 0, "end": 31219354, "filename": "/packages/xasp/tests/basic_tests/cook_ex.P"}, {"start": 31219354, "audio": 0, "end": 31219455, "filename": "/packages/xasp/tests/basic_tests/rawex_old"}, {"start": 31219455, "audio": 0, "end": 31220177, "filename": "/config/x86_64-unknown-linux-gnu/makedef.sh"}, {"start": 31220177, "audio": 0, "end": 31231120, "filename": "/config/x86_64-unknown-linux-gnu/emuMakefile"}, {"start": 31231120, "audio": 0, "end": 31233700, "filename": "/config/x86_64-unknown-linux-gnu/modMakefile"}, {"start": 31233700, "audio": 0, "end": 31235629, "filename": "/config/x86_64-unknown-linux-gnu/gppMakefile"}, {"start": 31235629, "audio": 0, "end": 31242952, "filename": "/config/x86_64-unknown-linux-gnu/xsb_config.h"}, {"start": 31242952, "audio": 0, "end": 31260277, "filename": "/config/x86_64-unknown-linux-gnu/topMakefile"}, {"start": 31260277, "audio": 0, "end": 31262490, "filename": "/config/x86_64-unknown-linux-gnu/smoMakefile"}, {"start": 31262490, "audio": 0, "end": 31262651, "filename": "/config/x86_64-unknown-linux-gnu/banner.msg"}, {"start": 31262651, "audio": 0, "end": 31263268, "filename": "/config/x86_64-unknown-linux-gnu/xsb_debug.h"}, {"start": 31263268, "audio": 0, "end": 31267568, "filename": "/config/x86_64-unknown-linux-gnu/config.cache"}, {"start": 31267568, "audio": 0, "end": 31340508, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/debug_xsb.o"}, {"start": 31340508, "audio": 0, "end": 31370712, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/loader_xsb.o"}, {"start": 31370712, "audio": 0, "end": 31378524, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/residual.o"}, {"start": 31378524, "audio": 0, "end": 31406060, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/tst_insert.o"}, {"start": 31406060, "audio": 0, "end": 31419400, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/dis.o"}, {"start": 31419400, "audio": 0, "end": 31665072, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/builtin.o"}, {"start": 31665072, "audio": 0, "end": 31671900, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/hashtable_xsb.o"}, {"start": 31671900, "audio": 0, "end": 31706028, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/trie_lookup.o"}, {"start": 31706028, "audio": 0, "end": 32248244, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/emuloop.o"}, {"start": 32248244, "audio": 0, "end": 32277500, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/tables.o"}, {"start": 32277500, "audio": 0, "end": 32357868, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/io_builtins_xsb.o"}, {"start": 32357868, "audio": 0, "end": 32381028, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/tst_utils.o"}, {"start": 32381028, "audio": 0, "end": 32395148, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/incr_xsb.o"}, {"start": 32395148, "audio": 0, "end": 32401176, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/url_encode.o"}, {"start": 32401176, "audio": 0, "end": 32406100, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/call_xsb.o"}, {"start": 32406100, "audio": 0, "end": 33693071, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/index.wasm"}, {"start": 33693071, "audio": 0, "end": 33706763, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/orient_xsb.o"}, {"start": 33706763, "audio": 0, "end": 33755147, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/function.o"}, {"start": 33755147, "audio": 0, "end": 33804023, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/findall.o"}, {"start": 33804023, "audio": 0, "end": 33814639, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/sha1.o"}, {"start": 33814639, "audio": 0, "end": 33874011, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/token_xsb.o"}, {"start": 33874011, "audio": 0, "end": 33911971, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/table_stats.o"}, {"start": 33911971, "audio": 0, "end": 33924599, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/thread_xsb.o"}, {"start": 33924599, "audio": 0, "end": 33979207, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/tst_retrv.o"}, {"start": 33979207, "audio": 0, "end": 33981647, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/getMemorySize.o"}, {"start": 33981647, "audio": 0, "end": 34530335, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/tries.o"}, {"start": 34530335, "audio": 0, "end": 34586387, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/subp.o"}, {"start": 34586387, "audio": 0, "end": 34593355, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/struct_manager.o"}, {"start": 34593355, "audio": 0, "end": 34611631, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/struct_intern.o"}, {"start": 34611631, "audio": 0, "end": 34617375, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/trie_search.o"}, {"start": 34617375, "audio": 0, "end": 34736071, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/cinterf.o"}, {"start": 34736071, "audio": 0, "end": 34785423, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/call_graph_xsb.o"}, {"start": 34785423, "audio": 0, "end": 34790435, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/dynload.o"}, {"start": 34790435, "audio": 0, "end": 35118880, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/index.js"}, {"start": 35118880, "audio": 0, "end": 35131344, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/ubi_SplayTree.o"}, {"start": 35131344, "audio": 0, "end": 35274812, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/biassert.o"}, {"start": 35274812, "audio": 0, "end": 35276044, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/deadlock.o"}, {"start": 35276044, "audio": 0, "end": 35287492, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/hash_xsb.o"}, {"start": 35287492, "audio": 0, "end": 35381205, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/index.html"}, {"start": 35381205, "audio": 0, "end": 35391693, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/sub_delete.o"}, {"start": 35391693, "audio": 0, "end": 35405237, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/memory_xsb.o"}, {"start": 35405237, "audio": 0, "end": 35435741, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/socket_xsb.o"}, {"start": 35435741, "audio": 0, "end": 35451709, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/ubi_BinTree.o"}, {"start": 35451709, "audio": 0, "end": 35461693, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/hashtable.o"}, {"start": 35461693, "audio": 0, "end": 78291778, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/index.data"}, {"start": 78291778, "audio": 0, "end": 78336054, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/init_xsb.o"}, {"start": 78336054, "audio": 0, "end": 78337286, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/scc_xsb.o"}, {"start": 78337286, "audio": 0, "end": 78338522, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/conc_compl.o"}, {"start": 78338522, "audio": 0, "end": 78340966, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/main_xsb.o"}, {"start": 78340966, "audio": 0, "end": 78482050, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/tr_utils.o"}, {"start": 78482050, "audio": 0, "end": 78486710, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/timer_xsb.o"}, {"start": 78486710, "audio": 0, "end": 78501906, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/psc_xsb.o"}, {"start": 78501906, "audio": 0, "end": 78503138, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/rw_lock.o"}, {"start": 78503138, "audio": 0, "end": 78567830, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/error_xsb.o"}, {"start": 78567830, "audio": 0, "end": 78589142, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/string_xsb.o"}, {"start": 78589142, "audio": 0, "end": 78592770, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/storage_xsb.o"}, {"start": 78592770, "audio": 0, "end": 78635886, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/inst_xsb.o"}, {"start": 78635886, "audio": 0, "end": 78642682, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/hashtable_itr.o"}, {"start": 78642682, "audio": 0, "end": 78657530, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/tst_unify.o"}, {"start": 78657530, "audio": 0, "end": 78696570, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/slgdelay.o"}, {"start": 78696570, "audio": 0, "end": 78724694, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/trace_xsb.o"}, {"start": 78724694, "audio": 0, "end": 78740054, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/pathname_xsb.o"}, {"start": 78740054, "audio": 0, "end": 78826402, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/heap_xsb.o"}, {"start": 78826402, "audio": 0, "end": 78831370, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/auxlry.o"}, {"start": 78831370, "audio": 0, "end": 78877326, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/system_xsb.o"}, {"start": 78877326, "audio": 0, "end": 78878562, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/remove_unf.o"}, {"start": 78878562, "audio": 0, "end": 78892886, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/varstring.o"}, {"start": 78892886, "audio": 0, "end": 78900870, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/random_xsb.o"}, {"start": 78900870, "audio": 0, "end": 78915406, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/md5.o"}, {"start": 78915406, "audio": 0, "end": 78920262, "filename": "/config/x86_64-unknown-linux-gnu/saved.o/dynamic_stack.o"}, {"start": 78920262, "audio": 0, "end": 78928120, "filename": "/config/x86_64-unknown-linux-gnu/lib/xsb_configuration.P"}, {"start": 78928120, "audio": 0, "end": 81865204, "filename": "/config/x86_64-unknown-linux-gnu/bin/xsb"}, {"start": 81865204, "audio": 0, "end": 81865258, "filename": "/examples/queens.H"}, {"start": 81865258, "audio": 0, "end": 81880347, "filename": "/examples/cyl.P"}, {"start": 81880347, "audio": 0, "end": 81882788, "filename": "/examples/queens.P"}, {"start": 81882788, "audio": 0, "end": 81882923, "filename": "/examples/houses.H"}, {"start": 81882923, "audio": 0, "end": 81885311, "filename": "/examples/README"}, {"start": 81885311, "audio": 0, "end": 81886878, "filename": "/examples/qsort.P"}, {"start": 81886878, "audio": 0, "end": 81890532, "filename": "/examples/mandel.P"}, {"start": 81890532, "audio": 0, "end": 81891545, "filename": "/examples/nrev.P"}, {"start": 81891545, "audio": 0, "end": 81892736, "filename": "/examples/gap.P"}, {"start": 81892736, "audio": 0, "end": 81894016, "filename": "/examples/fib.P"}, {"start": 81894016, "audio": 0, "end": 81895899, "filename": "/examples/pcretest.P"}, {"start": 81895899, "audio": 0, "end": 81896618, "filename": "/examples/exceptions.P"}, {"start": 81896618, "audio": 0, "end": 81898000, "filename": "/examples/lips_mega.P"}, {"start": 81898000, "audio": 0, "end": 81898797, "filename": "/examples/Makefile"}, {"start": 81898797, "audio": 0, "end": 81898853, "filename": "/examples/map.H"}, {"start": 81898853, "audio": 0, "end": 81901129, "filename": "/examples/map.P"}, {"start": 81901129, "audio": 0, "end": 81911429, "filename": "/examples/parser.P"}, {"start": 81911429, "audio": 0, "end": 81913172, "filename": "/examples/ptq_examples.P"}, {"start": 81913172, "audio": 0, "end": 81914851, "filename": "/examples/shortest_path.P"}, {"start": 81914851, "audio": 0, "end": 81917645, "filename": "/examples/farmer.P"}, {"start": 81917645, "audio": 0, "end": 81949109, "filename": "/examples/tree1k.P"}, {"start": 81949109, "audio": 0, "end": 81949125, "filename": "/examples/lips_mega.H"}, {"start": 81949125, "audio": 0, "end": 81952243, "filename": "/examples/wfs.P"}, {"start": 81952243, "audio": 0, "end": 81953899, "filename": "/examples/ptq_utils.P"}, {"start": 81953899, "audio": 0, "end": 81963292, "filename": "/examples/wf_examples.P"}, {"start": 81963292, "audio": 0, "end": 81969101, "filename": "/examples/table_examples.P"}, {"start": 81969101, "audio": 0, "end": 81969126, "filename": "/examples/mandel.H"}, {"start": 81969126, "audio": 0, "end": 81969175, "filename": "/examples/ham.H"}, {"start": 81969175, "audio": 0, "end": 81978196, "filename": "/examples/ora_demo.P"}, {"start": 81978196, "audio": 0, "end": 81979977, "filename": "/examples/fd.P"}, {"start": 81979977, "audio": 0, "end": 81984390, "filename": "/examples/houses.P"}, {"start": 81984390, "audio": 0, "end": 81985430, "filename": "/examples/actions.P"}, {"start": 81985430, "audio": 0, "end": 81991521, "filename": "/examples/ptq.P"}, {"start": 81991521, "audio": 0, "end": 81994607, "filename": "/examples/ham.P"}, {"start": 81994607, "audio": 0, "end": 81994735, "filename": "/examples/dyn_examples.P"}, {"start": 81994735, "audio": 0, "end": 81997227, "filename": "/examples/ptqlex.P"}, {"start": 81997227, "audio": 0, "end": 81999233, "filename": "/examples/first.P"}, {"start": 81999233, "audio": 0, "end": 81999250, "filename": "/examples/nrev.H"}, {"start": 81999250, "audio": 0, "end": 81999306, "filename": "/examples/farmer.H"}, {"start": 81999306, "audio": 0, "end": 82000881, "filename": "/examples/xpath/xpathtest.P"}, {"start": 82000881, "audio": 0, "end": 82031542, "filename": "/examples/xpath/files/examples.xml"}, {"start": 82031542, "audio": 0, "end": 82032853, "filename": "/examples/xpath/expectedoutput/example1.ok"}, {"start": 82032853, "audio": 0, "end": 82032929, "filename": "/examples/xpath/expectedoutput/greeting.ok"}, {"start": 82032929, "audio": 0, "end": 82034240, "filename": "/examples/xpath/expectedoutput/example2.ok"}, {"start": 82034240, "audio": 0, "end": 82034568, "filename": "/examples/xpath/expectedoutput/w3.ok"}, {"start": 82034568, "audio": 0, "end": 82039540, "filename": "/examples/rdf/test_rdf.P"}, {"start": 82039540, "audio": 0, "end": 82039641, "filename": "/examples/rdf/TODO"}, {"start": 82039641, "audio": 0, "end": 82040193, "filename": "/examples/rdf/suite/t22.rdf"}, {"start": 82040193, "audio": 0, "end": 82040651, "filename": "/examples/rdf/suite/t29.rdf"}, {"start": 82040651, "audio": 0, "end": 82041065, "filename": "/examples/rdf/suite/t14.rdf"}, {"start": 82041065, "audio": 0, "end": 82049019, "filename": "/examples/rdf/suite/t38.rdf"}, {"start": 82049019, "audio": 0, "end": 82049587, "filename": "/examples/rdf/suite/t33.rdf"}, {"start": 82049587, "audio": 0, "end": 82049982, "filename": "/examples/rdf/suite/xsdtypes.rdf"}, {"start": 82049982, "audio": 0, "end": 82050449, "filename": "/examples/rdf/suite/t37.rdf"}, {"start": 82050449, "audio": 0, "end": 82051424, "filename": "/examples/rdf/suite/t30.rdf"}, {"start": 82051424, "audio": 0, "end": 82052128, "filename": "/examples/rdf/suite/t21.rdf"}, {"start": 82052128, "audio": 0, "end": 82052726, "filename": "/examples/rdf/suite/t19.rdf"}, {"start": 82052726, "audio": 0, "end": 82053215, "filename": "/examples/rdf/suite/t17.rdf"}, {"start": 82053215, "audio": 0, "end": 82053774, "filename": "/examples/rdf/suite/t26.rdf"}, {"start": 82053774, "audio": 0, "end": 82054286, "filename": "/examples/rdf/suite/t16.rdf"}, {"start": 82054286, "audio": 0, "end": 82054581, "filename": "/examples/rdf/suite/t40.rdf"}, {"start": 82054581, "audio": 0, "end": 82055015, "filename": "/examples/rdf/suite/t36.rdf"}, {"start": 82055015, "audio": 0, "end": 82055473, "filename": "/examples/rdf/suite/t4.rdf"}, {"start": 82055473, "audio": 0, "end": 82055890, "filename": "/examples/rdf/suite/t6.rdf"}, {"start": 82055890, "audio": 0, "end": 82056330, "filename": "/examples/rdf/suite/t3.rdf"}, {"start": 82056330, "audio": 0, "end": 82056709, "filename": "/examples/rdf/suite/t15.rdf"}, {"start": 82056709, "audio": 0, "end": 82057111, "filename": "/examples/rdf/suite/xmllit.rdf"}, {"start": 82057111, "audio": 0, "end": 82057686, "filename": "/examples/rdf/suite/t20.rdf"}, {"start": 82057686, "audio": 0, "end": 82058103, "filename": "/examples/rdf/suite/t18.rdf"}, {"start": 82058103, "audio": 0, "end": 82058427, "filename": "/examples/rdf/suite/t42.rdf"}, {"start": 82058427, "audio": 0, "end": 82058737, "filename": "/examples/rdf/suite/t1.rdf"}, {"start": 82058737, "audio": 0, "end": 82059186, "filename": "/examples/rdf/suite/t7.rdf"}, {"start": 82059186, "audio": 0, "end": 82059664, "filename": "/examples/rdf/suite/t41.rdf"}, {"start": 82059664, "audio": 0, "end": 82060781, "filename": "/examples/rdf/suite/t39.rdf"}, {"start": 82060781, "audio": 0, "end": 82061038, "filename": "/examples/rdf/suite/t11.rdf"}, {"start": 82061038, "audio": 0, "end": 82061474, "filename": "/examples/rdf/suite/t5.rdf"}, {"start": 82061474, "audio": 0, "end": 82062307, "filename": "/examples/rdf/suite/types.rdf"}, {"start": 82062307, "audio": 0, "end": 82062798, "filename": "/examples/rdf/suite/ex_19.rdf"}, {"start": 82062798, "audio": 0, "end": 82063289, "filename": "/examples/rdf/suite/t28.rdf"}, {"start": 82063289, "audio": 0, "end": 82065296, "filename": "/examples/rdf/suite/t32.rdf"}, {"start": 82065296, "audio": 0, "end": 82066719, "filename": "/examples/rdf/suite/t31.rdf"}, {"start": 82066719, "audio": 0, "end": 82067225, "filename": "/examples/rdf/suite/t8.rdf"}, {"start": 82067225, "audio": 0, "end": 82067492, "filename": "/examples/rdf/suite/t2.rdf"}, {"start": 82067492, "audio": 0, "end": 82067800, "filename": "/examples/rdf/suite/t12.rdf"}, {"start": 82067800, "audio": 0, "end": 82068675, "filename": "/examples/rdf/suite/t27.rdf"}, {"start": 82068675, "audio": 0, "end": 82069230, "filename": "/examples/rdf/suite/t24.rdf"}, {"start": 82069230, "audio": 0, "end": 82069528, "filename": "/examples/rdf/suite/t13.rdf"}, {"start": 82069528, "audio": 0, "end": 82071909, "filename": "/examples/rdf/expectedoutput/t33.ok"}, {"start": 82071909, "audio": 0, "end": 82073310, "filename": "/examples/rdf/expectedoutput/t16.ok"}, {"start": 82073310, "audio": 0, "end": 82074798, "filename": "/examples/rdf/expectedoutput/t4.ok"}, {"start": 82074798, "audio": 0, "end": 82076246, "filename": "/examples/rdf/expectedoutput/t20.ok"}, {"start": 82076246, "audio": 0, "end": 82077329, "filename": "/examples/rdf/expectedoutput/t14.ok"}, {"start": 82077329, "audio": 0, "end": 82077973, "filename": "/examples/rdf/expectedoutput/t42.ok"}, {"start": 82077973, "audio": 0, "end": 82079566, "filename": "/examples/rdf/expectedoutput/t19.ok"}, {"start": 82079566, "audio": 0, "end": 82080985, "filename": "/examples/rdf/expectedoutput/t5.ok"}, {"start": 82080985, "audio": 0, "end": 82082231, "filename": "/examples/rdf/expectedoutput/t41.ok"}, {"start": 82082231, "audio": 0, "end": 82082921, "filename": "/examples/rdf/expectedoutput/t11.ok"}, {"start": 82082921, "audio": 0, "end": 82083684, "filename": "/examples/rdf/expectedoutput/t2.ok"}, {"start": 82083684, "audio": 0, "end": 82085134, "filename": "/examples/rdf/expectedoutput/t36.ok"}, {"start": 82085134, "audio": 0, "end": 82086433, "filename": "/examples/rdf/expectedoutput/t6.ok"}, {"start": 82086433, "audio": 0, "end": 82087481, "filename": "/examples/rdf/expectedoutput/t15.ok"}, {"start": 82087481, "audio": 0, "end": 82093439, "filename": "/examples/rdf/expectedoutput/t31.ok"}, {"start": 82093439, "audio": 0, "end": 82094628, "filename": "/examples/rdf/expectedoutput/t29.ok"}, {"start": 82094628, "audio": 0, "end": 82102107, "filename": "/examples/rdf/expectedoutput/t32.ok"}, {"start": 82102107, "audio": 0, "end": 82102204, "filename": "/examples/rdf/expectedoutput/load_rdf.ok"}, {"start": 82102204, "audio": 0, "end": 82103225, "filename": "/examples/rdf/expectedoutput/t40.ok"}, {"start": 82103225, "audio": 0, "end": 82104525, "filename": "/examples/rdf/expectedoutput/t28.ok"}, {"start": 82104525, "audio": 0, "end": 82105158, "filename": "/examples/rdf/expectedoutput/t13.ok"}, {"start": 82105158, "audio": 0, "end": 82108953, "filename": "/examples/rdf/expectedoutput/t30.ok"}, {"start": 82108953, "audio": 0, "end": 82110704, "filename": "/examples/rdf/expectedoutput/t24.ok"}, {"start": 82110704, "audio": 0, "end": 82111903, "filename": "/examples/rdf/expectedoutput/t18.ok"}, {"start": 82111903, "audio": 0, "end": 82115417, "filename": "/examples/rdf/expectedoutput/t27.ok"}, {"start": 82115417, "audio": 0, "end": 82156359, "filename": "/examples/rdf/expectedoutput/t38.ok"}, {"start": 82156359, "audio": 0, "end": 82157508, "filename": "/examples/rdf/expectedoutput/t8.ok"}, {"start": 82157508, "audio": 0, "end": 82158146, "filename": "/examples/rdf/expectedoutput/t12.ok"}, {"start": 82158146, "audio": 0, "end": 82159391, "filename": "/examples/rdf/expectedoutput/t17.ok"}, {"start": 82159391, "audio": 0, "end": 82163076, "filename": "/examples/rdf/expectedoutput/t39.ok"}, {"start": 82163076, "audio": 0, "end": 82163720, "filename": "/examples/rdf/expectedoutput/t1.ok"}, {"start": 82163720, "audio": 0, "end": 82165034, "filename": "/examples/rdf/expectedoutput/t7.ok"}, {"start": 82165034, "audio": 0, "end": 82166674, "filename": "/examples/rdf/expectedoutput/t22.ok"}, {"start": 82166674, "audio": 0, "end": 82168898, "filename": "/examples/rdf/expectedoutput/types.ok"}, {"start": 82168898, "audio": 0, "end": 82171260, "filename": "/examples/rdf/expectedoutput/t21.ok"}, {"start": 82171260, "audio": 0, "end": 82172923, "filename": "/examples/rdf/expectedoutput/t37.ok"}, {"start": 82172923, "audio": 0, "end": 82173020, "filename": "/examples/rdf/expectedoutput/xml_to_rdf.ok"}, {"start": 82173020, "audio": 0, "end": 82174151, "filename": "/examples/rdf/expectedoutput/t3.ok"}, {"start": 82174151, "audio": 0, "end": 82176767, "filename": "/examples/rdf/expectedoutput/ex_19.ok"}, {"start": 82176767, "audio": 0, "end": 82179256, "filename": "/examples/rdf/expectedoutput/t26.ok"}, {"start": 82179256, "audio": 0, "end": 82189309, "filename": "/examples/sgml/sgmltest.P"}, {"start": 82189309, "audio": 0, "end": 82189402, "filename": "/examples/sgml/files/cdata.sgml"}, {"start": 82189402, "audio": 0, "end": 82189628, "filename": "/examples/sgml/files/bar.sgml"}, {"start": 82189628, "audio": 0, "end": 82190483, "filename": "/examples/sgml/files/cent-utf8.xml"}, {"start": 82190483, "audio": 0, "end": 82190520, "filename": "/examples/sgml/files/att.xml"}, {"start": 82190520, "audio": 0, "end": 82190643, "filename": "/examples/sgml/files/sdata.sgml"}, {"start": 82190643, "audio": 0, "end": 82191920, "filename": "/examples/sgml/files/bat.sgml"}, {"start": 82191920, "audio": 0, "end": 82192076, "filename": "/examples/sgml/files/conref2.sgml"}, {"start": 82192076, "audio": 0, "end": 82192277, "filename": "/examples/sgml/files/utf8.xml"}, {"start": 82192277, "audio": 0, "end": 82192758, "filename": "/examples/sgml/files/sr2.sgml"}, {"start": 82192758, "audio": 0, "end": 82192789, "filename": "/examples/sgml/files/minus2.xml"}, {"start": 82192789, "audio": 0, "end": 82193054, "filename": "/examples/sgml/files/rcdata.sgml"}, {"start": 82193054, "audio": 0, "end": 82193273, "filename": "/examples/sgml/files/oma.sgml"}, {"start": 82193273, "audio": 0, "end": 82193527, "filename": "/examples/sgml/files/ugh.sgml"}, {"start": 82193527, "audio": 0, "end": 82193690, "filename": "/examples/sgml/files/ng.sgml"}, {"start": 82193690, "audio": 0, "end": 82193906, "filename": "/examples/sgml/files/cmt.sgml"}, {"start": 82193906, "audio": 0, "end": 82194069, "filename": "/examples/sgml/files/estag.sgml"}, {"start": 82194069, "audio": 0, "end": 82194486, "filename": "/examples/sgml/files/sr.sgml"}, {"start": 82194486, "audio": 0, "end": 82194677, "filename": "/examples/sgml/files/entent.sgml"}, {"start": 82194677, "audio": 0, "end": 82194923, "filename": "/examples/sgml/files/i.sgml"}, {"start": 82194923, "audio": 0, "end": 82195052, "filename": "/examples/sgml/files/ment.sgml"}, {"start": 82195052, "audio": 0, "end": 82195264, "filename": "/examples/sgml/files/foo.sgml"}, {"start": 82195264, "audio": 0, "end": 82195980, "filename": "/examples/sgml/files/rsre.sgml"}, {"start": 82195980, "audio": 0, "end": 82196288, "filename": "/examples/sgml/files/netc.sgml"}, {"start": 82196288, "audio": 0, "end": 82196431, "filename": "/examples/sgml/files/conref.sgml"}, {"start": 82196431, "audio": 0, "end": 82196553, "filename": "/examples/sgml/files/defent.sgml"}, {"start": 82196553, "audio": 0, "end": 82196647, "filename": "/examples/sgml/files/shortval.sgml"}, {"start": 82196647, "audio": 0, "end": 82196849, "filename": "/examples/sgml/files/rdefent.sgml"}, {"start": 82196849, "audio": 0, "end": 82197106, "filename": "/examples/sgml/files/not.sgml"}, {"start": 82197106, "audio": 0, "end": 82197288, "filename": "/examples/sgml/files/crlf.sgml"}, {"start": 82197288, "audio": 0, "end": 82197406, "filename": "/examples/sgml/files/ce.sgml"}, {"start": 82197406, "audio": 0, "end": 82197767, "filename": "/examples/sgml/files/noent.sgml"}, {"start": 82197767, "audio": 0, "end": 82198505, "filename": "/examples/sgml/files/mapbug.sgml"}, {"start": 82198505, "audio": 0, "end": 82198621, "filename": "/examples/sgml/files/amp.sgml"}, {"start": 82198621, "audio": 0, "end": 82198925, "filename": "/examples/sgml/files/utf8-cent.xml"}, {"start": 82198925, "audio": 0, "end": 82199136, "filename": "/examples/sgml/files/omit1.sgml"}, {"start": 82199136, "audio": 0, "end": 82199342, "filename": "/examples/sgml/files/per.sgml"}, {"start": 82199342, "audio": 0, "end": 82199392, "filename": "/examples/sgml/expectedoutput/sdata.ok"}, {"start": 82199392, "audio": 0, "end": 82199775, "filename": "/examples/sgml/expectedoutput/utf8-cent.ok"}, {"start": 82199775, "audio": 0, "end": 82199905, "filename": "/examples/sgml/expectedoutput/oma.ok"}, {"start": 82199905, "audio": 0, "end": 82199946, "filename": "/examples/sgml/expectedoutput/defent.ok"}, {"start": 82199946, "audio": 0, "end": 82199974, "filename": "/examples/sgml/expectedoutput/shortval.ok"}, {"start": 82199974, "audio": 0, "end": 82199996, "filename": "/examples/sgml/expectedoutput/minus2.ok"}, {"start": 82199996, "audio": 0, "end": 82200209, "filename": "/examples/sgml/expectedoutput/mapbug.ok"}, {"start": 82200209, "audio": 0, "end": 82200358, "filename": "/examples/sgml/expectedoutput/sr.ok"}, {"start": 82200358, "audio": 0, "end": 82200421, "filename": "/examples/sgml/expectedoutput/ce.ok"}, {"start": 82200421, "audio": 0, "end": 82200450, "filename": "/examples/sgml/expectedoutput/att.ok"}, {"start": 82200450, "audio": 0, "end": 82200485, "filename": "/examples/sgml/expectedoutput/entent.ok"}, {"start": 82200485, "audio": 0, "end": 82200609, "filename": "/examples/sgml/expectedoutput/conref2.ok"}, {"start": 82200609, "audio": 0, "end": 82200689, "filename": "/examples/sgml/expectedoutput/utf8string.ok"}, {"start": 82200689, "audio": 0, "end": 82200733, "filename": "/examples/sgml/expectedoutput/ng.ok"}, {"start": 82200733, "audio": 0, "end": 82200814, "filename": "/examples/sgml/expectedoutput/i.ok"}, {"start": 82200814, "audio": 0, "end": 82201421, "filename": "/examples/sgml/expectedoutput/rsre.ok"}, {"start": 82201421, "audio": 0, "end": 82201459, "filename": "/examples/sgml/expectedoutput/conref.ok"}, {"start": 82201459, "audio": 0, "end": 82201498, "filename": "/examples/sgml/expectedoutput/amp.ok"}, {"start": 82201498, "audio": 0, "end": 82201576, "filename": "/examples/sgml/expectedoutput/sr2.ok"}, {"start": 82201576, "audio": 0, "end": 82201720, "filename": "/examples/sgml/expectedoutput/bat.ok"}, {"start": 82201720, "audio": 0, "end": 82201820, "filename": "/examples/sgml/expectedoutput/rcdata.ok"}, {"start": 82201820, "audio": 0, "end": 82201948, "filename": "/examples/sgml/expectedoutput/foo.ok"}, {"start": 82201948, "audio": 0, "end": 82201970, "filename": "/examples/sgml/expectedoutput/rdefent.ok"}, {"start": 82201970, "audio": 0, "end": 82201989, "filename": "/examples/sgml/expectedoutput/cmt.ok"}, {"start": 82201989, "audio": 0, "end": 82202024, "filename": "/examples/sgml/expectedoutput/cdata.ok"}, {"start": 82202024, "audio": 0, "end": 82202245, "filename": "/examples/sgml/expectedoutput/noent.ok"}, {"start": 82202245, "audio": 0, "end": 82202310, "filename": "/examples/sgml/expectedoutput/crlf.ok"}, {"start": 82202310, "audio": 0, "end": 82202615, "filename": "/examples/sgml/expectedoutput/testdoc.ok"}, {"start": 82202615, "audio": 0, "end": 82202685, "filename": "/examples/sgml/expectedoutput/ment.ok"}, {"start": 82202685, "audio": 0, "end": 82202894, "filename": "/examples/sgml/expectedoutput/ugh.ok"}, {"start": 82202894, "audio": 0, "end": 82202965, "filename": "/examples/sgml/expectedoutput/bar.ok"}, {"start": 82202965, "audio": 0, "end": 82203352, "filename": "/examples/sgml/expectedoutput/cent-utf8.ok"}, {"start": 82203352, "audio": 0, "end": 82203421, "filename": "/examples/sgml/expectedoutput/not.ok"}, {"start": 82203421, "audio": 0, "end": 82203465, "filename": "/examples/sgml/expectedoutput/per.ok"}, {"start": 82203465, "audio": 0, "end": 82203651, "filename": "/examples/sgml/expectedoutput/netc.ok"}, {"start": 82203651, "audio": 0, "end": 82203735, "filename": "/examples/sgml/expectedoutput/utf8.ok"}, {"start": 82203735, "audio": 0, "end": 82203981, "filename": "/examples/sgml/expectedoutput/omit1.ok"}, {"start": 82203981, "audio": 0, "end": 82233925, "filename": "/examples/sgml/expectedoutput/w3.ok"}, {"start": 82233925, "audio": 0, "end": 82233961, "filename": "/examples/sgml/expectedoutput/estag.ok"}, {"start": 82233961, "audio": 0, "end": 82242533, "filename": "/examples/libwww/testsuite.P"}, {"start": 82242533, "audio": 0, "end": 82243038, "filename": "/examples/libwww/files/simple.xml"}, {"start": 82243038, "audio": 0, "end": 82402395, "filename": "/examples/libwww/files/REC-xml-19980210.xml"}, {"start": 82402395, "audio": 0, "end": 82415222, "filename": "/examples/libwww/files/w3c.html"}, {"start": 82415222, "audio": 0, "end": 82418210, "filename": "/examples/libwww/files/newsday1.html"}, {"start": 82418210, "audio": 0, "end": 82418557, "filename": "/examples/libwww/files/ex3.rdf"}, {"start": 82418557, "audio": 0, "end": 82418972, "filename": "/examples/libwww/files/ex4.rdf"}, {"start": 82418972, "audio": 0, "end": 82419335, "filename": "/examples/libwww/files/simple.html"}, {"start": 82419335, "audio": 0, "end": 82419813, "filename": "/examples/libwww/files/ex2.rdf"}, {"start": 82419813, "audio": 0, "end": 82419825, "filename": "/examples/libwww/files/001.ent"}, {"start": 82419825, "audio": 0, "end": 82420252, "filename": "/examples/libwww/files/test1.html"}, {"start": 82420252, "audio": 0, "end": 82420636, "filename": "/examples/libwww/files/simple_wrong.xml"}, {"start": 82420636, "audio": 0, "end": 82433412, "filename": "/examples/libwww/files/w3c1.html"}, {"start": 82433412, "audio": 0, "end": 82433885, "filename": "/examples/libwww/files/simple1.xml"}, {"start": 82433885, "audio": 0, "end": 82434585, "filename": "/examples/libwww/files/test2.html"}, {"start": 82434585, "audio": 0, "end": 82434966, "filename": "/examples/libwww/files/ex5.rdf"}, {"start": 82434966, "audio": 0, "end": 82435401, "filename": "/examples/libwww/files/ex7.rdf"}, {"start": 82435401, "audio": 0, "end": 82435930, "filename": "/examples/libwww/files/ex6.rdf"}, {"start": 82435930, "audio": 0, "end": 82436053, "filename": "/examples/libwww/files/simple2.html"}, {"start": 82436053, "audio": 0, "end": 82438357, "filename": "/examples/libwww/files/team-2.rdf"}, {"start": 82438357, "audio": 0, "end": 82441127, "filename": "/examples/chr_d/truckload.P"}, {"start": 82441127, "audio": 0, "end": 82441767, "filename": "/examples/chr_d/cycle.chr"}, {"start": 82441767, "audio": 0, "end": 82442261, "filename": "/examples/chr_d/gcd.chr"}, {"start": 82442261, "audio": 0, "end": 82442773, "filename": "/examples/chr_d/primes2.chr"}, {"start": 82442773, "audio": 0, "end": 82448765, "filename": "/examples/chr_d/vc1m.P"}, {"start": 82448765, "audio": 0, "end": 82450172, "filename": "/examples/chr_d/leq.chr"}, {"start": 82450172, "audio": 0, "end": 82451710, "filename": "/examples/chr_d/test_truckload.P"}, {"start": 82451710, "audio": 0, "end": 82453605, "filename": "/examples/chr_d/queens.chr"}, {"start": 82453605, "audio": 0, "end": 82453956, "filename": "/examples/chr_d/neq.chr"}, {"start": 82453956, "audio": 0, "end": 82454524, "filename": "/examples/chr_d/gcd2.chr"}, {"start": 82454524, "audio": 0, "end": 82454621, "filename": "/examples/chr_d/test_vc1m.P"}, {"start": 82454621, "audio": 0, "end": 82463807, "filename": "/examples/curl/curltest.P"}, {"start": 82463807, "audio": 0, "end": 82476624, "filename": "/examples/curl/certificates/www.cs.stonybrook.edu.crt"}, {"start": 82476624, "audio": 0, "end": 82495880, "filename": "/examples/curl/expectedoutput/redir.html"}, {"start": 82495880, "audio": 0, "end": 82496121, "filename": "/examples/curl/expectedoutput/prop_no_opt.txt"}, {"start": 82496121, "audio": 0, "end": 82505158, "filename": "/examples/curl/expectedoutput/non_secure.html"}, {"start": 82505158, "audio": 0, "end": 82505329, "filename": "/examples/curl/expectedoutput/prop_auth.txt"}, {"start": 82505329, "audio": 0, "end": 82505515, "filename": "/examples/curl/expectedoutput/misc"}, {"start": 82505515, "audio": 0, "end": 82531202, "filename": "/examples/curl/expectedoutput/http_redir.html"}, {"start": 82531202, "audio": 0, "end": 82718178, "filename": "/examples/curl/expectedoutput/timeout.html"}, {"start": 82718178, "audio": 0, "end": 82718389, "filename": "/examples/curl/expectedoutput/no_redir.html"}, {"start": 82718389, "audio": 0, "end": 82718389, "filename": "/examples/curl/expectedoutput/secure.html"}, {"start": 82718389, "audio": 0, "end": 82718579, "filename": "/examples/curl/expectedoutput/enc_no_opt.txt"}, {"start": 82718579, "audio": 0, "end": 82718784, "filename": "/examples/curl/expectedoutput/properties.txt"}, {"start": 82718784, "audio": 0, "end": 82744471, "filename": "/examples/curl/expectedoutput/no_options.html"}, {"start": 82744471, "audio": 0, "end": 82744621, "filename": "/examples/curl/expectedoutput/enc.txt"}, {"start": 82744621, "audio": 0, "end": 82744772, "filename": "/examples/curl/expectedoutput/encode_url.txt"}, {"start": 82744772, "audio": 0, "end": 82752150, "filename": "/examples/curl/expectedoutput/html_redir.html"}, {"start": 82752150, "audio": 0, "end": 82777837, "filename": "/examples/curl/expectedoutput/user_agent.html"}, {"start": 82777837, "audio": 0, "end": 82794845, "filename": "/examples/curl/expectedoutput/auth.html"}, {"start": 82794845, "audio": 0, "end": 82803882, "filename": "/examples/curl/expectedoutput/secure_crt.html"}, {"start": 82803882, "audio": 0, "end": 82806579, "filename": "/examples/c_calling_XSB/README"}, {"start": 82806579, "audio": 0, "end": 82821649, "filename": "/examples/c_calling_XSB/cregs_thread2.c"}, {"start": 82821649, "audio": 0, "end": 82824529, "filename": "/examples/c_calling_XSB/cregs.c"}, {"start": 82824529, "audio": 0, "end": 82827076, "filename": "/examples/c_calling_XSB/Makefile"}, {"start": 82827076, "audio": 0, "end": 82827925, "filename": "/examples/c_calling_XSB/makealt.P"}, {"start": 82827925, "audio": 0, "end": 82831638, "filename": "/examples/c_calling_XSB/cmain.mak"}, {"start": 82831638, "audio": 0, "end": 82837589, "filename": "/examples/c_calling_XSB/cmain2.c"}, {"start": 82837589, "audio": 0, "end": 82841615, "filename": "/examples/c_calling_XSB/cregs_thread.c"}, {"start": 82841615, "audio": 0, "end": 82841993, "filename": "/examples/c_calling_XSB/ctest.P"}, {"start": 82841993, "audio": 0, "end": 82842807, "filename": "/examples/c_calling_XSB/make_thread.P"}, {"start": 82842807, "audio": 0, "end": 82843964, "filename": "/examples/c_calling_XSB/edb.P"}, {"start": 82843964, "audio": 0, "end": 82844817, "filename": "/examples/c_calling_XSB/make_thread2.P"}, {"start": 82844817, "audio": 0, "end": 82846460, "filename": "/examples/c_calling_XSB/make.P"}, {"start": 82846460, "audio": 0, "end": 82850023, "filename": "/examples/c_calling_XSB/cvarstring_thread.c"}, {"start": 82850023, "audio": 0, "end": 82853133, "filename": "/examples/c_calling_XSB/cfixedstring.c"}, {"start": 82853133, "audio": 0, "end": 82857777, "filename": "/examples/c_calling_XSB/cmain.c"}, {"start": 82857777, "audio": 0, "end": 82860654, "filename": "/examples/c_calling_XSB/cvarstring.c"}, {"start": 82860654, "audio": 0, "end": 82874020, "filename": "/examples/c_calling_XSB/cvarstring_thread2.c"}, {"start": 82874020, "audio": 0, "end": 82878693, "filename": "/examples/XSB_calling_c/simple_foreign.mak"}, {"start": 82878693, "audio": 0, "end": 82878718, "filename": "/examples/XSB_calling_c/file_expand.H"}, {"start": 82878718, "audio": 0, "end": 82880309, "filename": "/examples/XSB_calling_c/simple_foreign.c"}, {"start": 82880309, "audio": 0, "end": 82887140, "filename": "/examples/XSB_calling_c/second_foreign.mak"}, {"start": 82887140, "audio": 0, "end": 82887510, "filename": "/examples/XSB_calling_c/second_foreign.H"}, {"start": 82887510, "audio": 0, "end": 82890087, "filename": "/examples/XSB_calling_c/fibr.c"}, {"start": 82890087, "audio": 0, "end": 82890109, "filename": "/examples/XSB_calling_c/call_simple_foreign.P"}, {"start": 82890109, "audio": 0, "end": 82892514, "filename": "/examples/XSB_calling_c/file_expand.c"}, {"start": 82892514, "audio": 0, "end": 82893363, "filename": "/examples/XSB_calling_c/fibp.P"}, {"start": 82893363, "audio": 0, "end": 82893500, "filename": "/examples/XSB_calling_c/hello.c"}, {"start": 82893500, "audio": 0, "end": 82897937, "filename": "/examples/XSB_calling_c/simple_foreignW64.mak"}, {"start": 82897937, "audio": 0, "end": 82897998, "filename": "/examples/XSB_calling_c/fibr.H"}, {"start": 82897998, "audio": 0, "end": 82899442, "filename": "/examples/XSB_calling_c/MakefileForCreatingDLLs"}, {"start": 82899442, "audio": 0, "end": 82899491, "filename": "/examples/XSB_calling_c/simple_foreign.H"}, {"start": 82899491, "audio": 0, "end": 82899511, "filename": "/examples/XSB_calling_c/hello.H"}, {"start": 82899511, "audio": 0, "end": 82899927, "filename": "/examples/XSB_calling_c/second_foreign.c"}, {"start": 82899927, "audio": 0, "end": 82901370, "filename": "/examples/XSB_calling_c/MakefileForCreatingDLLsW64"}, {"start": 82901370, "audio": 0, "end": 82904074, "filename": "/examples/chr/path.chr"}, {"start": 82904074, "audio": 0, "end": 82905070, "filename": "/examples/chr/freeze.chr"}, {"start": 82905070, "audio": 0, "end": 82906329, "filename": "/examples/chr/dom.chr"}, {"start": 82906329, "audio": 0, "end": 82909687, "filename": "/examples/chr/truckload.chr"}, {"start": 82909687, "audio": 0, "end": 82910931, "filename": "/examples/chr/leq.chr"}, {"start": 82910931, "audio": 0, "end": 82912612, "filename": "/examples/chr/ordering.P"}, {"start": 82912612, "audio": 0, "end": 82919103, "filename": "/examples/chr/gauss.chr"}, {"start": 82919103, "audio": 0, "end": 82921084, "filename": "/examples/threads/mtmsgserver2.P"}, {"start": 82921084, "audio": 0, "end": 82922063, "filename": "/examples/threads/primes2.P"}, {"start": 82922063, "audio": 0, "end": 82923575, "filename": "/examples/threads/hl_socket.P"}, {"start": 82923575, "audio": 0, "end": 82925619, "filename": "/examples/threads/mtmsgserver.P"}, {"start": 82925619, "audio": 0, "end": 82927340, "filename": "/examples/threads/msgclient.P"}, {"start": 82927340, "audio": 0, "end": 82928448, "filename": "/examples/threads/primes.P"}, {"start": 82928448, "audio": 0, "end": 82929344, "filename": "/examples/xmc/test.P"}, {"start": 82929344, "audio": 0, "end": 82931177, "filename": "/examples/xmc/testall.sh"}, {"start": 82931177, "audio": 0, "end": 82936879, "filename": "/examples/xmc/testsuite.sh"}, {"start": 82936879, "audio": 0, "end": 82937498, "filename": "/examples/xmc/gentest.sh"}, {"start": 82937498, "audio": 0, "end": 82938042, "filename": "/examples/xmc/Tests/temp.P"}, {"start": 82938042, "audio": 0, "end": 82938095, "filename": "/examples/xmc/Tests/test1.xl"}, {"start": 82938095, "audio": 0, "end": 82938145, "filename": "/examples/xmc/Tests/test2.xl"}, {"start": 82938145, "audio": 0, "end": 82938233, "filename": "/examples/xmc/Tests/test3.xl"}, {"start": 82938233, "audio": 0, "end": 82938932, "filename": "/examples/xmc/ABP/test.sh"}, {"start": 82938932, "audio": 0, "end": 82939203, "filename": "/examples/xmc/ABP/test_new"}, {"start": 82939203, "audio": 0, "end": 82939307, "filename": "/examples/xmc/ABP/test.P"}, {"start": 82939307, "audio": 0, "end": 82940508, "filename": "/examples/xmc/ABP/buggyabp.xl"}, {"start": 82940508, "audio": 0, "end": 82940508, "filename": "/examples/xmc/ABP/test_old"}, {"start": 82940508, "audio": 0, "end": 82941890, "filename": "/examples/xmc/ABP/abp.xl"}, {"start": 82941890, "audio": 0, "end": 82942542, "filename": "/examples/xmc/Iproto/test.sh"}, {"start": 82942542, "audio": 0, "end": 82942865, "filename": "/examples/xmc/Iproto/test_new"}, {"start": 82942865, "audio": 0, "end": 82952627, "filename": "/examples/xmc/Iproto/i.xl"}, {"start": 82952627, "audio": 0, "end": 82952769, "filename": "/examples/xmc/Iproto/test.P"}, {"start": 82952769, "audio": 0, "end": 82952769, "filename": "/examples/xmc/Iproto/test_old"}, {"start": 82952769, "audio": 0, "end": 82956486, "filename": "/examples/xmc/Needham/needham.xl"}, {"start": 82956486, "audio": 0, "end": 82957031, "filename": "/examples/xmc/Rether/test.sh"}, {"start": 82957031, "audio": 0, "end": 82957171, "filename": "/examples/xmc/Rether/test_new"}, {"start": 82957171, "audio": 0, "end": 82963187, "filename": "/examples/xmc/Rether/rether.xl"}, {"start": 82963187, "audio": 0, "end": 82963293, "filename": "/examples/xmc/Rether/test.P"}, {"start": 82963293, "audio": 0, "end": 82963431, "filename": "/examples/xmc/Rether/test_old"}, {"start": 82963431, "audio": 0, "end": 82964110, "filename": "/examples/xmc/Metalock/test.sh"}, {"start": 82964110, "audio": 0, "end": 82964442, "filename": "/examples/xmc/Metalock/test_new"}, {"start": 82964442, "audio": 0, "end": 82964609, "filename": "/examples/xmc/Metalock/nomutext_out"}, {"start": 82964609, "audio": 0, "end": 82964790, "filename": "/examples/xmc/Metalock/test.P"}, {"start": 82964790, "audio": 0, "end": 82979659, "filename": "/examples/xmc/Metalock/metalock.xl"}, {"start": 82979659, "audio": 0, "end": 82979659, "filename": "/examples/xmc/Metalock/test_old"}, {"start": 82979659, "audio": 0, "end": 82980219, "filename": "/examples/xmc/Sieve/test.sh"}, {"start": 82980219, "audio": 0, "end": 82980379, "filename": "/examples/xmc/Sieve/test_new"}, {"start": 82980379, "audio": 0, "end": 82980544, "filename": "/examples/xmc/Sieve/test.P"}, {"start": 82980544, "audio": 0, "end": 82980704, "filename": "/examples/xmc/Sieve/test_old"}, {"start": 82980704, "audio": 0, "end": 82984480, "filename": "/examples/xmc/Sieve/sieve.xl"}, {"start": 82984480, "audio": 0, "end": 82985119, "filename": "/examples/xmc/Leader/test.sh"}, {"start": 82985119, "audio": 0, "end": 82985437, "filename": "/examples/xmc/Leader/test_new"}, {"start": 82985437, "audio": 0, "end": 82987885, "filename": "/examples/xmc/Leader/leader.xl"}, {"start": 82987885, "audio": 0, "end": 82988049, "filename": "/examples/xmc/Leader/test.P"}, {"start": 82988049, "audio": 0, "end": 82988049, "filename": "/examples/xmc/Leader/test_old"}, {"start": 82988049, "audio": 0, "end": 82990850, "filename": "/examples/socket/streamclient.P"}, {"start": 82990850, "audio": 0, "end": 82991322, "filename": "/examples/socket/auxdefs.P"}, {"start": 82991322, "audio": 0, "end": 82994225, "filename": "/examples/socket/streamserver.P"}, {"start": 82994225, "audio": 0, "end": 82997333, "filename": "/examples/socket/msgserver.P"}, {"start": 82997333, "audio": 0, "end": 82999517, "filename": "/examples/socket/putclient.P"}, {"start": 82999517, "audio": 0, "end": 83001954, "filename": "/examples/socket/msgclient.P"}, {"start": 83001954, "audio": 0, "end": 83004069, "filename": "/examples/socket/putserver.P"}, {"start": 83004069, "audio": 0, "end": 83006450, "filename": "/examples/socket/select/readclient.P"}, {"start": 83006450, "audio": 0, "end": 83009344, "filename": "/examples/socket/select/writeclient.P"}, {"start": 83009344, "audio": 0, "end": 83009816, "filename": "/examples/socket/select/auxdefs.P"}, {"start": 83009816, "audio": 0, "end": 83013474, "filename": "/examples/socket/select/msgserver.P"}, {"start": 83013474, "audio": 0, "end": 83015913, "filename": "/examples/socket/select/writeserver.P"}, {"start": 83015913, "audio": 0, "end": 83019278, "filename": "/examples/socket/select/msgclient.P"}, {"start": 83019278, "audio": 0, "end": 83022385, "filename": "/examples/socket/select/readserver.P"}, {"start": 83022385, "audio": 0, "end": 83025760, "filename": "/examples/socket/select/msgserver2.P"}, {"start": 83025760, "audio": 0, "end": 83028574, "filename": "/examples/socket/select/readclient2.P"}, {"start": 83028574, "audio": 0, "end": 83031146, "filename": "/examples/socket/select/writeserver2.P"}, {"start": 83031146, "audio": 0, "end": 83034217, "filename": "/examples/socket/select/writeclient2.P"}, {"start": 83034217, "audio": 0, "end": 83037192, "filename": "/examples/socket/select/msgclient2.P"}, {"start": 83037192, "audio": 0, "end": 83040436, "filename": "/examples/socket/select/readserver2.P"}, {"start": 83040436, "audio": 0, "end": 83041116, "filename": "/examples/subprocess/child.P"}, {"start": 83041116, "audio": 0, "end": 83042699, "filename": "/examples/subprocess/parent2.P"}, {"start": 83042699, "audio": 0, "end": 83044206, "filename": "/examples/subprocess/parent.P"}, {"start": 83044206, "audio": 0, "end": 83044692, "filename": "/examples/subprocess/child2.P"}, {"start": 83044692, "audio": 0, "end": 83046744, "filename": "/examples/incremental/README"}, {"start": 83046744, "audio": 0, "end": 83050843, "filename": "/examples/incremental/testabolish.P"}, {"start": 83050843, "audio": 0, "end": 83052653, "filename": "/examples/incremental/testopaque.P"}, {"start": 83052653, "audio": 0, "end": 83054451, "filename": "/examples/incremental/neg2.P"}, {"start": 83054451, "audio": 0, "end": 83056150, "filename": "/examples/incremental/neg1.P"}, {"start": 83056150, "audio": 0, "end": 83059251, "filename": "/examples/incremental/reach.P"}, {"start": 83059251, "audio": 0, "end": 83685673, "filename": "/docs/userman/manual2.pdf"}, {"start": 83685673, "audio": 0, "end": 83693456, "filename": "/docs/userman/xsb.1"}, {"start": 83693456, "audio": 0, "end": 85851037, "filename": "/docs/userman/manual1.pdf"}], "remote_package_size": 85851037, "package_uuid": "5f402712-0d68-4aa4-bfff-23831202cbb1"});

})();



// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
var key;
for (key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

Module['arguments'] = [];
Module['thisProgram'] = './this.program';
Module['quit'] = function(status, toThrow) {
  throw toThrow;
};
Module['preRun'] = [];
Module['postRun'] = [];

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

var ENVIRONMENT_IS_WEB = false;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;
ENVIRONMENT_IS_WEB = typeof window === 'object';
ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function' && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)');
}


// Three configurations we can be running in:
// 1) We could be the application main() thread running in the main JS UI thread. (ENVIRONMENT_IS_WORKER == false and ENVIRONMENT_IS_PTHREAD == false)
// 2) We could be the application main() thread proxied to worker. (with Emscripten -s PROXY_TO_WORKER=1) (ENVIRONMENT_IS_WORKER == true, ENVIRONMENT_IS_PTHREAD == false)
// 3) We could be an application pthread running in a worker. (ENVIRONMENT_IS_WORKER == true and ENVIRONMENT_IS_PTHREAD == true)




// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  } else {
    return scriptDirectory + path;
  }
}

if (ENVIRONMENT_IS_NODE) {
  scriptDirectory = __dirname + '/';

  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  var nodeFS;
  var nodePath;

  Module['read'] = function shell_read(filename, binary) {
    var ret;
      if (!nodeFS) nodeFS = require('fs');
      if (!nodePath) nodePath = require('path');
      filename = nodePath['normalize'](filename);
      ret = nodeFS['readFileSync'](filename);
    return binary ? ret : ret.toString();
  };

  Module['readBinary'] = function readBinary(filename) {
    var ret = Module['read'](filename, true);
    if (!ret.buffer) {
      ret = new Uint8Array(ret);
    }
    assert(ret.buffer);
    return ret;
  };

  if (process['argv'].length > 1) {
    Module['thisProgram'] = process['argv'][1].replace(/\\/g, '/');
  }

  Module['arguments'] = process['argv'].slice(2);

  if (typeof module !== 'undefined') {
    module['exports'] = Module;
  }

  process['on']('uncaughtException', function(ex) {
    // suppress ExitStatus exceptions from showing an error
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });
  // Currently node will swallow unhandled rejections, but this behavior is
  // deprecated, and in the future it will exit with error status.
  process['on']('unhandledRejection', abort);

  Module['quit'] = function(status) {
    process['exit'](status);
  };

  Module['inspect'] = function () { return '[Emscripten Module object]'; };
} else
if (ENVIRONMENT_IS_SHELL) {


  if (typeof read != 'undefined') {
    Module['read'] = function shell_read(f) {
      return read(f);
    };
  }

  Module['readBinary'] = function readBinary(f) {
    var data;
    if (typeof readbuffer === 'function') {
      return new Uint8Array(readbuffer(f));
    }
    data = read(f, 'binary');
    assert(typeof data === 'object');
    return data;
  };

  if (typeof scriptArgs != 'undefined') {
    Module['arguments'] = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  if (typeof quit === 'function') {
    Module['quit'] = function(status) {
      quit(status);
    }
  }
} else
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  if (scriptDirectory.indexOf('blob:') !== 0) {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf('/')+1);
  } else {
    scriptDirectory = '';
  }


  Module['read'] = function shell_read(url) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      return xhr.responseText;
  };

  if (ENVIRONMENT_IS_WORKER) {
    Module['readBinary'] = function readBinary(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
        return new Uint8Array(xhr.response);
    };
  }

  Module['readAsync'] = function readAsync(url, onload, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function xhr_onload() {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  };

  Module['setWindowTitle'] = function(title) { document.title = title };
} else
{
  throw new Error('environment detection error');
}

// Set up the out() and err() hooks, which are how we can print to stdout or
// stderr, respectively.
// If the user provided Module.print or printErr, use that. Otherwise,
// console.log is checked first, as 'print' on the web will open a print dialogue
// printErr is preferable to console.warn (works better in shells)
// bind(console) is necessary to fix IE/Edge closed dev tools panel behavior.
var out = Module['print'] || (typeof console !== 'undefined' ? console.log.bind(console) : (typeof print !== 'undefined' ? print : null));
var err = Module['printErr'] || (typeof printErr !== 'undefined' ? printErr : ((typeof console !== 'undefined' && console.warn.bind(console)) || out));

// Merge back in the overrides
for (key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = undefined;

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
assert(typeof Module['memoryInitializerPrefixURL'] === 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] === 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] === 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] === 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');



// Copyright 2017 The Emscripten Authors.  All rights reserved.
// Emscripten is available under two separate licenses, the MIT license and the
// University of Illinois/NCSA Open Source License.  Both these licenses can be
// found in the LICENSE file.

// {{PREAMBLE_ADDITIONS}}

var STACK_ALIGN = 16;

// stack management, and other functionality that is provided by the compiled code,
// should not be used before it is ready
stackSave = stackRestore = stackAlloc = function() {
  abort('cannot use the stack before compiled code is ready to run, and has provided stack access');
};

function staticAlloc(size) {
  abort('staticAlloc is no longer available at runtime; instead, perform static allocations at compile time (using makeStaticAlloc)');
}

function dynamicAlloc(size) {
  assert(DYNAMICTOP_PTR);
  var ret = HEAP32[DYNAMICTOP_PTR>>2];
  var end = (ret + size + 15) & -16;
  if (end <= _emscripten_get_heap_size()) {
    HEAP32[DYNAMICTOP_PTR>>2] = end;
  } else {
    return 0;
  }
  return ret;
}

function alignMemory(size, factor) {
  if (!factor) factor = STACK_ALIGN; // stack alignment (16-byte) by default
  return Math.ceil(size / factor) * factor;
}

function getNativeTypeSize(type) {
  switch (type) {
    case 'i1': case 'i8': return 1;
    case 'i16': return 2;
    case 'i32': return 4;
    case 'i64': return 8;
    case 'float': return 4;
    case 'double': return 8;
    default: {
      if (type[type.length-1] === '*') {
        return 4; // A pointer
      } else if (type[0] === 'i') {
        var bits = parseInt(type.substr(1));
        assert(bits % 8 === 0, 'getNativeTypeSize invalid bits ' + bits + ', type ' + type);
        return bits / 8;
      } else {
        return 0;
      }
    }
  }
}

function warnOnce(text) {
  if (!warnOnce.shown) warnOnce.shown = {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    err(text);
  }
}

var asm2wasmImports = { // special asm2wasm imports
    "f64-rem": function(x, y) {
        return x % y;
    },
    "debugger": function() {
        debugger;
    }
};



var jsCallStartIndex = 1;
var functionPointers = new Array(0);

// Wraps a JS function as a wasm function with a given signature.
// In the future, we may get a WebAssembly.Function constructor. Until then,
// we create a wasm module that takes the JS function as an import with a given
// signature, and re-exports that as a wasm function.
function convertJsFunctionToWasm(func, sig) {
  // The module is static, with the exception of the type section, which is
  // generated based on the signature passed in.
  var typeSection = [
    0x01, // id: section,
    0x00, // length: 0 (placeholder)
    0x01, // count: 1
    0x60, // form: func
  ];
  var sigRet = sig.slice(0, 1);
  var sigParam = sig.slice(1);
  var typeCodes = {
    'i': 0x7f, // i32
    'j': 0x7e, // i64
    'f': 0x7d, // f32
    'd': 0x7c, // f64
  };

  // Parameters, length + signatures
  typeSection.push(sigParam.length);
  for (var i = 0; i < sigParam.length; ++i) {
    typeSection.push(typeCodes[sigParam[i]]);
  }

  // Return values, length + signatures
  // With no multi-return in MVP, either 0 (void) or 1 (anything else)
  if (sigRet == 'v') {
    typeSection.push(0x00);
  } else {
    typeSection = typeSection.concat([0x01, typeCodes[sigRet]]);
  }

  // Write the overall length of the type section back into the section header
  // (excepting the 2 bytes for the section id and length)
  typeSection[1] = typeSection.length - 2;

  // Rest of the module is static
  var bytes = new Uint8Array([
    0x00, 0x61, 0x73, 0x6d, // magic ("\0asm")
    0x01, 0x00, 0x00, 0x00, // version: 1
  ].concat(typeSection, [
    0x02, 0x07, // import section
      // (import "e" "f" (func 0 (type 0)))
      0x01, 0x01, 0x65, 0x01, 0x66, 0x00, 0x00,
    0x07, 0x05, // export section
      // (export "f" (func 0 (type 0)))
      0x01, 0x01, 0x66, 0x00, 0x00,
  ]));

   // We can compile this wasm module synchronously because it is very small.
  // This accepts an import (at "e.f"), that it reroutes to an export (at "f")
  var module = new WebAssembly.Module(bytes);
  var instance = new WebAssembly.Instance(module, {
    e: {
      f: func
    }
  });
  var wrappedFunc = instance.exports.f;
  return wrappedFunc;
}

// Add a wasm function to the table.
function addFunctionWasm(func, sig) {
  var table = wasmTable;
  var ret = table.length;

  // Grow the table
  try {
    table.grow(1);
  } catch (err) {
    if (!err instanceof RangeError) {
      throw err;
    }
    throw 'Unable to grow wasm table. Use a higher value for RESERVED_FUNCTION_POINTERS or set ALLOW_TABLE_GROWTH.';
  }

  // Insert new element
  try {
    // Attempting to call this with JS function will cause of table.set() to fail
    table.set(ret, func);
  } catch (err) {
    if (!err instanceof TypeError) {
      throw err;
    }
    assert(typeof sig !== 'undefined', 'Missing signature argument to addFunction');
    var wrapped = convertJsFunctionToWasm(func, sig);
    table.set(ret, wrapped);
  }

  return ret;
}

function removeFunctionWasm(index) {
  // TODO(sbc): Look into implementing this to allow re-using of table slots
}

// 'sig' parameter is required for the llvm backend but only when func is not
// already a WebAssembly function.
function addFunction(func, sig) {


  var base = 0;
  for (var i = base; i < base + 0; i++) {
    if (!functionPointers[i]) {
      functionPointers[i] = func;
      return jsCallStartIndex + i;
    }
  }
  throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';

}

function removeFunction(index) {

  functionPointers[index-jsCallStartIndex] = null;
}

var funcWrappers = {};

function getFuncWrapper(func, sig) {
  if (!func) return; // on null pointer, return undefined
  assert(sig);
  if (!funcWrappers[sig]) {
    funcWrappers[sig] = {};
  }
  var sigCache = funcWrappers[sig];
  if (!sigCache[func]) {
    // optimize away arguments usage in common cases
    if (sig.length === 1) {
      sigCache[func] = function dynCall_wrapper() {
        return dynCall(sig, func);
      };
    } else if (sig.length === 2) {
      sigCache[func] = function dynCall_wrapper(arg) {
        return dynCall(sig, func, [arg]);
      };
    } else {
      // general case
      sigCache[func] = function dynCall_wrapper() {
        return dynCall(sig, func, Array.prototype.slice.call(arguments));
      };
    }
  }
  return sigCache[func];
}


function makeBigInt(low, high, unsigned) {
  return unsigned ? ((+((low>>>0)))+((+((high>>>0)))*4294967296.0)) : ((+((low>>>0)))+((+((high|0)))*4294967296.0));
}

function dynCall(sig, ptr, args) {
  if (args && args.length) {
    assert(args.length == sig.length-1);
    assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
    return Module['dynCall_' + sig].apply(null, [ptr].concat(args));
  } else {
    assert(sig.length == 1);
    assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
    return Module['dynCall_' + sig].call(null, ptr);
  }
}

var tempRet0 = 0;

var setTempRet0 = function(value) {
  tempRet0 = value;
}

var getTempRet0 = function() {
  return tempRet0;
}

function getCompilerSetting(name) {
  throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for getCompilerSetting or emscripten_get_compiler_setting to work';
}

var Runtime = {
  // helpful errors
  getTempRet0: function() { abort('getTempRet0() is now a top-level function, after removing the Runtime object. Remove "Runtime."') },
  staticAlloc: function() { abort('staticAlloc() is now a top-level function, after removing the Runtime object. Remove "Runtime."') },
  stackAlloc: function() { abort('stackAlloc() is now a top-level function, after removing the Runtime object. Remove "Runtime."') },
};

// The address globals begin at. Very low in memory, for code size and optimization opportunities.
// Above 0 is static memory, starting with globals.
// Then the stack.
// Then 'dynamic' memory for sbrk.
var GLOBAL_BASE = 1024;




// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html


if (typeof WebAssembly !== 'object') {
  abort('No WebAssembly support found. Build with -s WASM=0 to target JavaScript instead.');
}


/** @type {function(number, string, boolean=)} */
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for getValue: ' + type);
    }
  return null;
}




// Wasm globals

var wasmMemory;

// Potentially used for direct table calls.
var wasmTable;


//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS = 0;

/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  var func = Module['_' + ident]; // closure exported function
  assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
  return func;
}

// C calling interface.
function ccall(ident, returnType, argTypes, args, opts) {
  // For fast lookup of conversion functions
  var toC = {
    'string': function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
        var len = (str.length << 2) + 1;
        ret = stackAlloc(len);
        stringToUTF8(str, ret, len);
      }
      return ret;
    },
    'array': function(arr) {
      var ret = stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    }
  };

  function convertReturnValue(ret) {
    if (returnType === 'string') return UTF8ToString(ret);
    if (returnType === 'boolean') return Boolean(ret);
    return ret;
  }

  var func = getCFunc(ident);
  var cArgs = [];
  var stack = 0;
  assert(returnType !== 'array', 'Return type should not be "array".');
  if (args) {
    for (var i = 0; i < args.length; i++) {
      var converter = toC[argTypes[i]];
      if (converter) {
        if (stack === 0) stack = stackSave();
        cArgs[i] = converter(args[i]);
      } else {
        cArgs[i] = args[i];
      }
    }
  }
  var ret = func.apply(null, cArgs);
  ret = convertReturnValue(ret);
  if (stack !== 0) stackRestore(stack);
  return ret;
}

function cwrap(ident, returnType, argTypes, opts) {
  return function() {
    return ccall(ident, returnType, argTypes, arguments, opts);
  }
}

/** @type {function(number, number, string, boolean=)} */
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[((ptr)>>0)]=value; break;
      case 'i8': HEAP8[((ptr)>>0)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_DYNAMIC = 2; // Cannot be freed except through sbrk
var ALLOC_NONE = 3; // Do not allocate

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
/** @type {function((TypedArray|Array<number>|number), string, number, number=)} */
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc,
    stackAlloc,
    dynamicAlloc][allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var stop;
    ptr = ret;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)>>0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(/** @type {!Uint8Array} */ (slab), ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    assert(type, 'Must know what type to store in allocate!');

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}

// Allocate memory during any stage of startup - static memory early on, dynamic memory later, malloc when ready
function getMemory(size) {
  if (!runtimeInitialized) return dynamicAlloc(size);
  return _malloc(size);
}




/** @type {function(number, number=)} */
function Pointer_stringify(ptr, length) {
  abort("this function has been removed - you should use UTF8ToString(ptr, maxBytesToRead) instead!");
}

// Given a pointer 'ptr' to a null-terminated ASCII-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function AsciiToString(ptr) {
  var str = '';
  while (1) {
    var ch = HEAPU8[((ptr++)>>0)];
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in ASCII form. The copy will require at most str.length+1 bytes of space in the HEAP.

function stringToAscii(str, outPtr) {
  return writeAsciiToMemory(str, outPtr, false);
}


// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
// a copy of that string as a Javascript String object.

var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;

/**
 * @param {number} idx
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
  var endIdx = idx + maxBytesToRead;
  var endPtr = idx;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  // (As a tiny code save trick, compare endPtr against endIdx using a negation, so that undefined means Infinity)
  while (u8Array[endPtr] && !(endPtr >= endIdx)) ++endPtr;

  if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
    return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
  } else {
    var str = '';
    // If building with TextDecoder, we have already computed the string length above, so test loop end condition against that
    while (idx < endPtr) {
      // For UTF8 byte structure, see:
      // http://en.wikipedia.org/wiki/UTF-8#Description
      // https://www.ietf.org/rfc/rfc2279.txt
      // https://tools.ietf.org/html/rfc3629
      var u0 = u8Array[idx++];
      if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
      var u1 = u8Array[idx++] & 63;
      if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
      var u2 = u8Array[idx++] & 63;
      if ((u0 & 0xF0) == 0xE0) {
        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
      } else {
        if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte 0x' + u0.toString(16) + ' encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!');
        u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (u8Array[idx++] & 63);
      }

      if (u0 < 0x10000) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 0x10000;
        str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
      }
    }
  }
  return str;
}

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns a
// copy of that string as a Javascript String object.
// maxBytesToRead: an optional length that specifies the maximum number of bytes to read. You can omit
//                 this parameter to scan the string until the first \0 byte. If maxBytesToRead is
//                 passed, and the string at [ptr, ptr+maxBytesToReadr[ contains a null byte in the
//                 middle, then the string will cut short at that byte index (i.e. maxBytesToRead will
//                 not produce a string of exact length [ptr, ptr+maxBytesToRead[)
//                 N.B. mixing frequent uses of UTF8ToString() with and without maxBytesToRead may
//                 throw JS JIT optimizations off, so it is worth to consider consistently using one
//                 style or the other.
/**
 * @param {number} ptr
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ToString(ptr, maxBytesToRead) {
  return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
}

// Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
// encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outU8Array: the array to copy to. Each index in this array is assumed to be one 8-byte element.
//   outIdx: The starting offset in the array to begin the copying.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array.
//                    This count should include the null terminator,
//                    i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
//                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
    return 0;

  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) {
      var u1 = str.charCodeAt(++i);
      u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
    }
    if (u <= 0x7F) {
      if (outIdx >= endIdx) break;
      outU8Array[outIdx++] = u;
    } else if (u <= 0x7FF) {
      if (outIdx + 1 >= endIdx) break;
      outU8Array[outIdx++] = 0xC0 | (u >> 6);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0xFFFF) {
      if (outIdx + 2 >= endIdx) break;
      outU8Array[outIdx++] = 0xE0 | (u >> 12);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else {
      if (outIdx + 3 >= endIdx) break;
      if (u >= 0x200000) warnOnce('Invalid Unicode code point 0x' + u.toString(16) + ' encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).');
      outU8Array[outIdx++] = 0xF0 | (u >> 18);
      outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    }
  }
  // Null-terminate the pointer to the buffer.
  outU8Array[outIdx] = 0;
  return outIdx - startIdx;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8(str, outPtr, maxBytesToWrite) {
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  return stringToUTF8Array(str, HEAPU8,outPtr, maxBytesToWrite);
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.
function lengthBytesUTF8(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) ++len;
    else if (u <= 0x7FF) len += 2;
    else if (u <= 0xFFFF) len += 3;
    else len += 4;
  }
  return len;
}


// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;
function UTF16ToString(ptr) {
  assert(ptr % 2 == 0, 'Pointer passed to UTF16ToString must be aligned to two bytes!');
  var endPtr = ptr;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  var idx = endPtr >> 1;
  while (HEAP16[idx]) ++idx;
  endPtr = idx << 1;

  if (endPtr - ptr > 32 && UTF16Decoder) {
    return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
  } else {
    var i = 0;

    var str = '';
    while (1) {
      var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
      if (codeUnit == 0) return str;
      ++i;
      // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
      str += String.fromCharCode(codeUnit);
    }
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16 form. The copy will require at most str.length*4+2 bytes of space in the HEAP.
// Use the function lengthBytesUTF16() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=2, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<2 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF16(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 2 == 0, 'Pointer passed to stringToUTF16 must be aligned to two bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2; // Null terminator.
  var startPtr = outPtr;
  var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
  for (var i = 0; i < numCharsToWrite; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[((outPtr)>>1)]=codeUnit;
    outPtr += 2;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[((outPtr)>>1)]=0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF16(str) {
  return str.length*2;
}

function UTF32ToString(ptr) {
  assert(ptr % 4 == 0, 'Pointer passed to UTF32ToString must be aligned to four bytes!');
  var i = 0;

  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
// Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF32(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 4 == 0, 'Pointer passed to stringToUTF32 must be aligned to four bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[((outPtr)>>2)]=codeUnit;
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[((outPtr)>>2)]=0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF32(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
    len += 4;
  }

  return len;
}

// Allocate heap space for a JS string, and write it there.
// It is the responsibility of the caller to free() that memory.
function allocateUTF8(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = _malloc(size);
  if (ret) stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Allocate stack space for a JS string, and write it there.
function allocateUTF8OnStack(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = stackAlloc(size);
  stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Deprecated: This function should not be called because it is unsafe and does not provide
// a maximum length limit of how many bytes it is allowed to write. Prefer calling the
// function stringToUTF8Array() instead, which takes in a maximum length that can be used
// to be secure from out of bounds writes.
/** @deprecated */
function writeStringToMemory(string, buffer, dontAddNull) {
  warnOnce('writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!');

  var /** @type {number} */ lastChar, /** @type {number} */ end;
  if (dontAddNull) {
    // stringToUTF8Array always appends null. If we don't want to do that, remember the
    // character that existed at the location where the null will be placed, and restore
    // that after the write (below).
    end = buffer + lengthBytesUTF8(string);
    lastChar = HEAP8[end];
  }
  stringToUTF8(string, buffer, Infinity);
  if (dontAddNull) HEAP8[end] = lastChar; // Restore the value under the null character.
}

function writeArrayToMemory(array, buffer) {
  assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)')
  HEAP8.set(array, buffer);
}

function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    assert(str.charCodeAt(i) === str.charCodeAt(i)&0xff);
    HEAP8[((buffer++)>>0)]=str.charCodeAt(i);
  }
  // Null-terminate the pointer to the HEAP.
  if (!dontAddNull) HEAP8[((buffer)>>0)]=0;
}





function demangle(func) {
  warnOnce('warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling');
  return func;
}

function demangleAll(text) {
  var regex =
    /__Z[\w\d_]+/g;
  return text.replace(regex,
    function(x) {
      var y = demangle(x);
      return x === y ? x : (y + ' [' + x + ']');
    });
}

function jsStackTrace() {
  var err = new Error();
  if (!err.stack) {
    // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
    // so try that as a special-case.
    try {
      throw new Error(0);
    } catch(e) {
      err = e;
    }
    if (!err.stack) {
      return '(no stack trace available)';
    }
  }
  return err.stack.toString();
}

function stackTrace() {
  var js = jsStackTrace();
  if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']();
  return demangleAll(js);
}



// Memory management

var PAGE_SIZE = 16384;
var WASM_PAGE_SIZE = 65536;
var ASMJS_PAGE_SIZE = 16777216;

function alignUp(x, multiple) {
  if (x % multiple > 0) {
    x += multiple - (x % multiple);
  }
  return x;
}

var HEAP,
/** @type {ArrayBuffer} */
  buffer,
/** @type {Int8Array} */
  HEAP8,
/** @type {Uint8Array} */
  HEAPU8,
/** @type {Int16Array} */
  HEAP16,
/** @type {Uint16Array} */
  HEAPU16,
/** @type {Int32Array} */
  HEAP32,
/** @type {Uint32Array} */
  HEAPU32,
/** @type {Float32Array} */
  HEAPF32,
/** @type {Float64Array} */
  HEAPF64;

function updateGlobalBufferViews() {
  Module['HEAP8'] = HEAP8 = new Int8Array(buffer);
  Module['HEAP16'] = HEAP16 = new Int16Array(buffer);
  Module['HEAP32'] = HEAP32 = new Int32Array(buffer);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(buffer);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(buffer);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(buffer);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(buffer);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(buffer);
}


var STATIC_BASE = 1024,
    STACK_BASE = 4848,
    STACKTOP = STACK_BASE,
    STACK_MAX = 5247728,
    DYNAMIC_BASE = 5247728,
    DYNAMICTOP_PTR = 4592;

assert(STACK_BASE % 16 === 0, 'stack must start aligned');
assert(DYNAMIC_BASE % 16 === 0, 'heap must start aligned');



var TOTAL_STACK = 5242880;
if (Module['TOTAL_STACK']) assert(TOTAL_STACK === Module['TOTAL_STACK'], 'the stack size can no longer be determined at runtime')

var INITIAL_TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;
if (INITIAL_TOTAL_MEMORY < TOTAL_STACK) err('TOTAL_MEMORY should be larger than TOTAL_STACK, was ' + INITIAL_TOTAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')');

// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray !== undefined && Int32Array.prototype.set !== undefined,
       'JS engine does not provide full typed array support');







// Use a provided buffer, if there is one, or else allocate a new one
if (Module['buffer']) {
  buffer = Module['buffer'];
  assert(buffer.byteLength === INITIAL_TOTAL_MEMORY, 'provided buffer should be ' + INITIAL_TOTAL_MEMORY + ' bytes, but it is ' + buffer.byteLength);
} else {
  // Use a WebAssembly memory where available
  if (typeof WebAssembly === 'object' && typeof WebAssembly.Memory === 'function') {
    assert(INITIAL_TOTAL_MEMORY % WASM_PAGE_SIZE === 0);
    wasmMemory = new WebAssembly.Memory({ 'initial': INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE, 'maximum': INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE });
    buffer = wasmMemory.buffer;
  } else
  {
    buffer = new ArrayBuffer(INITIAL_TOTAL_MEMORY);
  }
  assert(buffer.byteLength === INITIAL_TOTAL_MEMORY);
}
updateGlobalBufferViews();


HEAP32[DYNAMICTOP_PTR>>2] = DYNAMIC_BASE;


// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  assert((STACK_MAX & 3) == 0);
  HEAPU32[(STACK_MAX >> 2)-1] = 0x02135467;
  HEAPU32[(STACK_MAX >> 2)-2] = 0x89BACDFE;
}

function checkStackCookie() {
  if (HEAPU32[(STACK_MAX >> 2)-1] != 0x02135467 || HEAPU32[(STACK_MAX >> 2)-2] != 0x89BACDFE) {
    abort('Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x' + HEAPU32[(STACK_MAX >> 2)-2].toString(16) + ' ' + HEAPU32[(STACK_MAX >> 2)-1].toString(16));
  }
  // Also test the global address 0 for integrity.
  if (HEAP32[0] !== 0x63736d65 /* 'emsc' */) throw 'Runtime error: The application has corrupted its heap memory area (address zero)!';
}

function abortStackOverflow(allocSize) {
  abort('Stack overflow! Attempted to allocate ' + allocSize + ' bytes on the stack, but stack has only ' + (STACK_MAX - stackSave() + allocSize) + ' bytes available!');
}


  HEAP32[0] = 0x63736d65; /* 'emsc' */



// Endianness check (note: assumes compiler arch was little-endian)
HEAP16[1] = 0x6373;
if (HEAPU8[2] !== 0x73 || HEAPU8[3] !== 0x63) throw 'Runtime error: expected the system to be little-endian!';

function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Module['dynCall_v'](func);
      } else {
        Module['dynCall_vi'](func, callback.arg);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;
var runtimeExited = false;


function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function ensureInitRuntime() {
  checkStackCookie();
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
TTY.init();
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  checkStackCookie();
  FS.ignorePermissions = false;
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  checkStackCookie();
  runtimeExited = true;
}

function postRun() {
  checkStackCookie();
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

function unSign(value, bits, ignore) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}


assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');

var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_round = Math.round;
var Math_min = Math.min;
var Math_max = Math.max;
var Math_clz32 = Math.clz32;
var Math_trunc = Math.trunc;



// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
  return id;
}

function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err('dependency: ' + dep);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data


var memoryInitializer = null;






// Copyright 2017 The Emscripten Authors.  All rights reserved.
// Emscripten is available under two separate licenses, the MIT license and the
// University of Illinois/NCSA Open Source License.  Both these licenses can be
// found in the LICENSE file.

// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

// Indicates whether filename is a base64 data URI.
function isDataURI(filename) {
  return String.prototype.startsWith ?
      filename.startsWith(dataURIPrefix) :
      filename.indexOf(dataURIPrefix) === 0;
}




var wasmBinaryFile = 'index.wasm';
if (!isDataURI(wasmBinaryFile)) {
  wasmBinaryFile = locateFile(wasmBinaryFile);
}

function getBinary() {
  try {
    if (Module['wasmBinary']) {
      return new Uint8Array(Module['wasmBinary']);
    }
    if (Module['readBinary']) {
      return Module['readBinary'](wasmBinaryFile);
    } else {
      throw "both async and sync fetching of the wasm failed";
    }
  }
  catch (err) {
    abort(err);
  }
}

function getBinaryPromise() {
  // if we don't have the binary yet, and have the Fetch api, use that
  // in some environments, like Electron's render process, Fetch api may be present, but have a different context than expected, let's only use it on the Web
  if (!Module['wasmBinary'] && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === 'function') {
    return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function(response) {
      if (!response['ok']) {
        throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
      }
      return response['arrayBuffer']();
    }).catch(function () {
      return getBinary();
    });
  }
  // Otherwise, getBinary should be able to get it synchronously
  return new Promise(function(resolve, reject) {
    resolve(getBinary());
  });
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm(env) {
  // prepare imports
  var info = {
    'env': env
    ,
    'global': {
      'NaN': NaN,
      'Infinity': Infinity
    },
    'global.Math': Math,
    'asm2wasm': asm2wasmImports
  };
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  function receiveInstance(instance, module) {
    var exports = instance.exports;
    Module['asm'] = exports;
    removeRunDependency('wasm-instantiate');
  }
  addRunDependency('wasm-instantiate');

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to run the instantiation parallel
  // to any other async startup actions they are performing.
  if (Module['instantiateWasm']) {
    try {
      return Module['instantiateWasm'](info, receiveInstance);
    } catch(e) {
      err('Module.instantiateWasm callback failed with error: ' + e);
      return false;
    }
  }

  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiatedSource(output) {
    // 'output' is a WebAssemblyInstantiatedSource object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
      // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
      // When the regression is fixed, can restore the above USE_PTHREADS-enabled path.
    receiveInstance(output['instance']);
  }
  function instantiateArrayBuffer(receiver) {
    getBinaryPromise().then(function(binary) {
      return WebAssembly.instantiate(binary, info);
    }).then(receiver, function(reason) {
      err('failed to asynchronously prepare wasm: ' + reason);
      abort(reason);
    });
  }
  // Prefer streaming instantiation if available.
  if (!Module['wasmBinary'] &&
      typeof WebAssembly.instantiateStreaming === 'function' &&
      !isDataURI(wasmBinaryFile) &&
      typeof fetch === 'function') {
    WebAssembly.instantiateStreaming(fetch(wasmBinaryFile, { credentials: 'same-origin' }), info)
      .then(receiveInstantiatedSource, function(reason) {
        // We expect the most common failure cause to be a bad MIME type for the binary,
        // in which case falling back to ArrayBuffer instantiation should work.
        err('wasm streaming compile failed: ' + reason);
        err('falling back to ArrayBuffer instantiation');
        instantiateArrayBuffer(receiveInstantiatedSource);
      });
  } else {
    instantiateArrayBuffer(receiveInstantiatedSource);
  }
  return {}; // no exports yet; we'll fill them in later
}

// Provide an "asm.js function" for the application, called to "link" the asm.js module. We instantiate
// the wasm module at that time, and it receives imports and provides exports and so forth, the app
// doesn't need to care that it is wasm or asm.js.

Module['asm'] = function(global, env, providedBuffer) {
  // memory was already allocated (so js could use the buffer)
  env['memory'] = wasmMemory
  ;
  // import table
  env['table'] = wasmTable = new WebAssembly.Table({
    'initial': 10,
    'maximum': 10,
    'element': 'anyfunc'
  });
  env['__memory_base'] = 1024; // tell the memory segments where to place themselves
  env['__table_base'] = 0; // table starts at 0 by default (even in dynamic linking, for the main module)

  var exports = createWasm(env);
  assert(exports, 'binaryen setup failed (no wasm support?)');
  return exports;
};

// === Body ===

var ASM_CONSTS = [];





// STATICTOP = STATIC_BASE + 3824;
/* global initializers */ /*__ATINIT__.push();*/








/* no memory initializer */
var tempDoublePtr = 4832
assert(tempDoublePtr % 8 == 0);

function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
}

function copyTempDouble(ptr) {
  HEAP8[tempDoublePtr] = HEAP8[ptr];
  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];
  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];
  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];
  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];
  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];
  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];
  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];
}

// {{PRE_LIBRARY}}


  function ___lock() {}

  
  
  
  function ___setErrNo(value) {
      if (Module['___errno_location']) HEAP32[((Module['___errno_location']())>>2)]=value;
      else err('failed to set errno from JS');
      return value;
    }
  
  var PATH={splitPath:function (filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function (parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function (path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function (path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function (path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function (path) {
        return PATH.splitPath(path)[3];
      },join:function () {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function (l, r) {
        return PATH.normalize(l + '/' + r);
      },resolve:function () {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function (from, to) {
        from = PATH.resolve(from).substr(1);
        to = PATH.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  var TTY={ttys:[],init:function () {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function () {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function (dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function (stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function (stream) {
          // flush any pending line data
          stream.tty.ops.flush(stream.tty);
        },flush:function (stream) {
          stream.tty.ops.flush(stream.tty);
        },read:function (stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(ERRNO_CODES.EIO);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function (stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(ERRNO_CODES.ENXIO);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES.EIO);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function (tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              // we will read data by chunks of BUFSIZE
              var BUFSIZE = 256;
              var buf = new Buffer(BUFSIZE);
              var bytesRead = 0;
  
              var isPosixPlatform = (process.platform != 'win32'); // Node doesn't offer a direct check, so test by exclusion
  
              var fd = process.stdin.fd;
              if (isPosixPlatform) {
                // Linux and Mac cannot use process.stdin.fd (which isn't set up as sync)
                var usingDevice = false;
                try {
                  fd = fs.openSync('/dev/stdin', 'r');
                  usingDevice = true;
                } catch (e) {}
              }
  
              try {
                bytesRead = fs.readSync(fd, buf, 0, BUFSIZE, null);
              } catch(e) {
                // Cross-platform differences: on Windows, reading EOF throws an exception, but on other OSes,
                // reading EOF returns 0. Uniformize behavior by treating the EOF exception to return 0.
                if (e.toString().indexOf('EOF') != -1) bytesRead = 0;
                else throw e;
              }
  
              if (usingDevice) { fs.closeSync(fd); }
              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString('utf-8');
              } else {
                result = null;
              }
            } else
            if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function (tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },flush:function (tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }},default_tty1_ops:{put_char:function (tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },flush:function (tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }}};
  
  var MEMFS={ops_table:null,mount:function (mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function (parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },getFileDataAsRegularArray:function (node) {
        if (node.contents && node.contents.subarray) {
          var arr = [];
          for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
          return arr; // Returns a copy of the original data.
        }
        return node.contents; // No-op, the file contents are already in a JS array. Return as-is.
      },getFileDataAsTypedArray:function (node) {
        if (!node.contents) return new Uint8Array;
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },expandFileStorage:function (node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) | 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
        return;
      },resizeFileStorage:function (node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
          return;
        }
        if (!node.contents || node.contents.subarray) { // Resize a typed array if that is being used as the backing store.
          var oldContents = node.contents;
          node.contents = new Uint8Array(new ArrayBuffer(newSize)); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
          return;
        }
        // Backing with a JS array.
        if (!node.contents) node.contents = [];
        if (node.contents.length > newSize) node.contents.length = newSize;
        else while (node.contents.length < newSize) node.contents.push(0);
        node.usedBytes = newSize;
      },node_ops:{getattr:function (node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },lookup:function (parent, name) {
          throw FS.genericErrors[ERRNO_CODES.ENOENT];
        },mknod:function (parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function (old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function (parent, name) {
          delete parent.contents[name];
        },rmdir:function (parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(ERRNO_CODES.ENOTEMPTY);
          }
          delete parent.contents[name];
        },readdir:function (node) {
          var entries = ['.', '..']
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function (node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return node.link;
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },write:function (stream, buffer, offset, length, position, canOwn) {
  
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = new Uint8Array(buffer.subarray(offset, offset + length));
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) node.contents.set(buffer.subarray(offset, offset + length), position); // Use typed array write if available.
          else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position+length);
          return length;
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return position;
        },allocate:function (stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },mmap:function (stream, buffer, offset, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if ( !(flags & 2) &&
                (contents.buffer === buffer || contents.buffer === buffer.buffer) ) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < stream.node.usedBytes) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = _malloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(ERRNO_CODES.ENOMEM);
            }
            buffer.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        },msync:function (stream, buffer, offset, length, mmapFlags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(ERRNO_CODES.ENODEV);
          }
          if (mmapFlags & 2) {
            // MAP_PRIVATE calls need not to be synced back to underlying fs
            return 0;
          }
  
          var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        }}};
  
  var IDBFS={dbs:{},indexedDB:function () {
        if (typeof indexedDB !== 'undefined') return indexedDB;
        var ret = null;
        if (typeof window === 'object') ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        assert(ret, 'IDBFS used, but indexedDB not supported');
        return ret;
      },DB_VERSION:21,DB_STORE_NAME:"FILE_DATA",mount:function (mount) {
        // reuse all of the core MEMFS functionality
        return MEMFS.mount.apply(null, arguments);
      },syncfs:function (mount, populate, callback) {
        IDBFS.getLocalSet(mount, function(err, local) {
          if (err) return callback(err);
  
          IDBFS.getRemoteSet(mount, function(err, remote) {
            if (err) return callback(err);
  
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
  
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },getDB:function (name, callback) {
        // check the cache first
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
  
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return callback(e);
        }
        if (!req) {
          return callback("Unable to connect to IndexedDB");
        }
        req.onupgradeneeded = function(e) {
          var db = e.target.result;
          var transaction = e.target.transaction;
  
          var fileStore;
  
          if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
          } else {
            fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
          }
  
          if (!fileStore.indexNames.contains('timestamp')) {
            fileStore.createIndex('timestamp', 'timestamp', { unique: false });
          }
        };
        req.onsuccess = function() {
          db = req.result;
  
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },getLocalSet:function (mount, callback) {
        var entries = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        };
        function toAbsolute(root) {
          return function(p) {
            return PATH.join2(root, p);
          }
        };
  
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat;
  
          try {
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
          }
  
          entries[path] = { timestamp: stat.mtime };
        }
  
        return callback(null, { type: 'local', entries: entries });
      },getRemoteSet:function (mount, callback) {
        var entries = {};
  
        IDBFS.getDB(mount.mountpoint, function(err, db) {
          if (err) return callback(err);
  
          try {
            var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
            transaction.onerror = function(e) {
              callback(this.error);
              e.preventDefault();
            };
  
            var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
            var index = store.index('timestamp');
  
            index.openKeyCursor().onsuccess = function(event) {
              var cursor = event.target.result;
  
              if (!cursor) {
                return callback(null, { type: 'remote', db: db, entries: entries });
              }
  
              entries[cursor.primaryKey] = { timestamp: cursor.key };
  
              cursor.continue();
            };
          } catch (e) {
            return callback(e);
          }
        });
      },loadLocalEntry:function (path, callback) {
        var stat, node;
  
        try {
          var lookup = FS.lookupPath(path);
          node = lookup.node;
          stat = FS.stat(path);
        } catch (e) {
          return callback(e);
        }
  
        if (FS.isDir(stat.mode)) {
          return callback(null, { timestamp: stat.mtime, mode: stat.mode });
        } else if (FS.isFile(stat.mode)) {
          // Performance consideration: storing a normal JavaScript array to a IndexedDB is much slower than storing a typed array.
          // Therefore always convert the file contents to a typed array first before writing the data to IndexedDB.
          node.contents = MEMFS.getFileDataAsTypedArray(node);
          return callback(null, { timestamp: stat.mtime, mode: stat.mode, contents: node.contents });
        } else {
          return callback(new Error('node type not supported'));
        }
      },storeLocalEntry:function (path, entry, callback) {
        try {
          if (FS.isDir(entry.mode)) {
            FS.mkdir(path, entry.mode);
          } else if (FS.isFile(entry.mode)) {
            FS.writeFile(path, entry.contents, { canOwn: true });
          } else {
            return callback(new Error('node type not supported'));
          }
  
          FS.chmod(path, entry.mode);
          FS.utime(path, entry.timestamp, entry.timestamp);
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },removeLocalEntry:function (path, callback) {
        try {
          var lookup = FS.lookupPath(path);
          var stat = FS.stat(path);
  
          if (FS.isDir(stat.mode)) {
            FS.rmdir(path);
          } else if (FS.isFile(stat.mode)) {
            FS.unlink(path);
          }
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },loadRemoteEntry:function (store, path, callback) {
        var req = store.get(path);
        req.onsuccess = function(event) { callback(null, event.target.result); };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },storeRemoteEntry:function (store, path, entry, callback) {
        var req = store.put(entry, path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },removeRemoteEntry:function (store, path, callback) {
        var req = store.delete(path);
        req.onsuccess = function() { callback(null); };
        req.onerror = function(e) {
          callback(this.error);
          e.preventDefault();
        };
      },reconcile:function (src, dst, callback) {
        var total = 0;
  
        var create = [];
        Object.keys(src.entries).forEach(function (key) {
          var e = src.entries[key];
          var e2 = dst.entries[key];
          if (!e2 || e.timestamp > e2.timestamp) {
            create.push(key);
            total++;
          }
        });
  
        var remove = [];
        Object.keys(dst.entries).forEach(function (key) {
          var e = dst.entries[key];
          var e2 = src.entries[key];
          if (!e2) {
            remove.push(key);
            total++;
          }
        });
  
        if (!total) {
          return callback(null);
        }
  
        var errored = false;
        var completed = 0;
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return callback(err);
            }
            return;
          }
          if (++completed >= total) {
            return callback(null);
          }
        };
  
        transaction.onerror = function(e) {
          done(this.error);
          e.preventDefault();
        };
  
        // sort paths in ascending order so directory entries are created
        // before the files inside them
        create.sort().forEach(function (path) {
          if (dst.type === 'local') {
            IDBFS.loadRemoteEntry(store, path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeLocalEntry(path, entry, done);
            });
          } else {
            IDBFS.loadLocalEntry(path, function (err, entry) {
              if (err) return done(err);
              IDBFS.storeRemoteEntry(store, path, entry, done);
            });
          }
        });
  
        // sort paths in descending order so files are deleted before their
        // parent directories
        remove.sort().reverse().forEach(function(path) {
          if (dst.type === 'local') {
            IDBFS.removeLocalEntry(path, done);
          } else {
            IDBFS.removeRemoteEntry(store, path, done);
          }
        });
      }};
  
  var NODEFS={isWindows:false,staticInit:function () {
        NODEFS.isWindows = !!process.platform.match(/^win/);
        var flags = process["binding"]("constants");
        // Node.js 4 compatibility: it has no namespaces for constants
        if (flags["fs"]) {
          flags = flags["fs"];
        }
        NODEFS.flagsForNodeMap = {
          "1024": flags["O_APPEND"],
          "64": flags["O_CREAT"],
          "128": flags["O_EXCL"],
          "0": flags["O_RDONLY"],
          "2": flags["O_RDWR"],
          "4096": flags["O_SYNC"],
          "512": flags["O_TRUNC"],
          "1": flags["O_WRONLY"]
        };
      },bufferFrom:function (arrayBuffer) {
        // Node.js < 4.5 compatibility: Buffer.from does not support ArrayBuffer
        // Buffer.from before 4.5 was just a method inherited from Uint8Array
        // Buffer.alloc has been added with Buffer.from together, so check it instead
        return Buffer.alloc ? Buffer.from(arrayBuffer) : new Buffer(arrayBuffer);
      },mount:function (mount) {
        assert(ENVIRONMENT_IS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },createNode:function (parent, name, mode, dev) {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },getMode:function (path) {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // Node.js on Windows never represents permission bit 'x', so
            // propagate read bits to execute bits
            stat.mode = stat.mode | ((stat.mode & 292) >> 2);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(ERRNO_CODES[e.code]);
        }
        return stat.mode;
      },realPath:function (node) {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },flagsForNode:function (flags) {
        flags &= ~0x200000 /*O_PATH*/; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~0x800 /*O_NONBLOCK*/; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~0x8000 /*O_LARGEFILE*/; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~0x80000 /*O_CLOEXEC*/; // Some applications may pass it; it makes no sense for a single process.
        var newFlags = 0;
        for (var k in NODEFS.flagsForNodeMap) {
          if (flags & k) {
            newFlags |= NODEFS.flagsForNodeMap[k];
            flags ^= k;
          }
        }
  
        if (!flags) {
          return newFlags;
        } else {
          throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
        }
      },node_ops:{getattr:function (node) {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },setattr:function (node, attr) {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },lookup:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },mknod:function (parent, name, mode, dev) {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
          return node;
        },rename:function (oldNode, newDir, newName) {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },unlink:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },rmdir:function (parent, name) {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readdir:function (node) {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },symlink:function (parent, newName, oldPath) {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },readlink:function (node) {
          var path = NODEFS.realPath(node);
          try {
            path = fs.readlinkSync(path);
            path = NODEJS_PATH.relative(NODEJS_PATH.resolve(node.mount.opts.root), path);
            return path;
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        }},stream_ops:{open:function (stream) {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsForNode(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },close:function (stream) {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },read:function (stream, buffer, offset, length, position) {
          // Node.js < 6 compatibility: node errors on 0 length reads
          if (length === 0) return 0;
          try {
            return fs.readSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },write:function (stream, buffer, offset, length, position) {
          try {
            return fs.writeSync(stream.nfd, NODEFS.bufferFrom(buffer.buffer), offset, length, position);
          } catch (e) {
            throw new FS.ErrnoError(ERRNO_CODES[e.code]);
          }
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(ERRNO_CODES[e.code]);
              }
            }
          }
  
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
  
          return position;
        }}};
  
  var WORKERFS={DIR_MODE:16895,FILE_MODE:33279,reader:null,mount:function (mount) {
        assert(ENVIRONMENT_IS_WORKER);
        if (!WORKERFS.reader) WORKERFS.reader = new FileReaderSync();
        var root = WORKERFS.createNode(null, '/', WORKERFS.DIR_MODE, 0);
        var createdParents = {};
        function ensureParent(path) {
          // return the parent node, creating subdirs as necessary
          var parts = path.split('/');
          var parent = root;
          for (var i = 0; i < parts.length-1; i++) {
            var curr = parts.slice(0, i+1).join('/');
            // Issue 4254: Using curr as a node name will prevent the node
            // from being found in FS.nameTable when FS.open is called on
            // a path which holds a child of this node,
            // given that all FS functions assume node names
            // are just their corresponding parts within their given path,
            // rather than incremental aggregates which include their parent's
            // directories.
            if (!createdParents[curr]) {
              createdParents[curr] = WORKERFS.createNode(parent, parts[i], WORKERFS.DIR_MODE, 0);
            }
            parent = createdParents[curr];
          }
          return parent;
        }
        function base(path) {
          var parts = path.split('/');
          return parts[parts.length-1];
        }
        // We also accept FileList here, by using Array.prototype
        Array.prototype.forEach.call(mount.opts["files"] || [], function(file) {
          WORKERFS.createNode(ensureParent(file.name), base(file.name), WORKERFS.FILE_MODE, 0, file, file.lastModifiedDate);
        });
        (mount.opts["blobs"] || []).forEach(function(obj) {
          WORKERFS.createNode(ensureParent(obj["name"]), base(obj["name"]), WORKERFS.FILE_MODE, 0, obj["data"]);
        });
        (mount.opts["packages"] || []).forEach(function(pack) {
          pack['metadata'].files.forEach(function(file) {
            var name = file.filename.substr(1); // remove initial slash
            WORKERFS.createNode(ensureParent(name), base(name), WORKERFS.FILE_MODE, 0, pack['blob'].slice(file.start, file.end));
          });
        });
        return root;
      },createNode:function (parent, name, mode, dev, contents, mtime) {
        var node = FS.createNode(parent, name, mode);
        node.mode = mode;
        node.node_ops = WORKERFS.node_ops;
        node.stream_ops = WORKERFS.stream_ops;
        node.timestamp = (mtime || new Date).getTime();
        assert(WORKERFS.FILE_MODE !== WORKERFS.DIR_MODE);
        if (mode === WORKERFS.FILE_MODE) {
          node.size = contents.size;
          node.contents = contents;
        } else {
          node.size = 4096;
          node.contents = {};
        }
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },node_ops:{getattr:function (node) {
          return {
            dev: 1,
            ino: undefined,
            mode: node.mode,
            nlink: 1,
            uid: 0,
            gid: 0,
            rdev: undefined,
            size: node.size,
            atime: new Date(node.timestamp),
            mtime: new Date(node.timestamp),
            ctime: new Date(node.timestamp),
            blksize: 4096,
            blocks: Math.ceil(node.size / 4096),
          };
        },setattr:function (node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
        },lookup:function (parent, name) {
          throw new FS.ErrnoError(ERRNO_CODES.ENOENT);
        },mknod:function (parent, name, mode, dev) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        },rename:function (oldNode, newDir, newName) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        },unlink:function (parent, name) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        },rmdir:function (parent, name) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        },readdir:function (node) {
          var entries = ['.', '..'];
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function (parent, newName, oldPath) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        },readlink:function (node) {
          throw new FS.ErrnoError(ERRNO_CODES.EPERM);
        }},stream_ops:{read:function (stream, buffer, offset, length, position) {
          if (position >= stream.node.size) return 0;
          var chunk = stream.node.contents.slice(position, position + length);
          var ab = WORKERFS.reader.readAsArrayBuffer(chunk);
          buffer.set(new Uint8Array(ab), offset);
          return chunk.size;
        },write:function (stream, buffer, offset, length, position) {
          throw new FS.ErrnoError(ERRNO_CODES.EIO);
        },llseek:function (stream, offset, whence) {
          var position = offset;
          if (whence === 1) {  // SEEK_CUR.
            position += stream.position;
          } else if (whence === 2) {  // SEEK_END.
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.size;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(ERRNO_CODES.EINVAL);
          }
          return position;
        }}};
  
  var ERRNO_MESSAGES={0:"Success",1:"Not super-user",2:"No such file or directory",3:"No such process",4:"Interrupted system call",5:"I/O error",6:"No such device or address",7:"Arg list too long",8:"Exec format error",9:"Bad file number",10:"No children",11:"No more processes",12:"Not enough core",13:"Permission denied",14:"Bad address",15:"Block device required",16:"Mount device busy",17:"File exists",18:"Cross-device link",19:"No such device",20:"Not a directory",21:"Is a directory",22:"Invalid argument",23:"Too many open files in system",24:"Too many open files",25:"Not a typewriter",26:"Text file busy",27:"File too large",28:"No space left on device",29:"Illegal seek",30:"Read only file system",31:"Too many links",32:"Broken pipe",33:"Math arg out of domain of func",34:"Math result not representable",35:"File locking deadlock error",36:"File or path name too long",37:"No record locks available",38:"Function not implemented",39:"Directory not empty",40:"Too many symbolic links",42:"No message of desired type",43:"Identifier removed",44:"Channel number out of range",45:"Level 2 not synchronized",46:"Level 3 halted",47:"Level 3 reset",48:"Link number out of range",49:"Protocol driver not attached",50:"No CSI structure available",51:"Level 2 halted",52:"Invalid exchange",53:"Invalid request descriptor",54:"Exchange full",55:"No anode",56:"Invalid request code",57:"Invalid slot",59:"Bad font file fmt",60:"Device not a stream",61:"No data (for no delay io)",62:"Timer expired",63:"Out of streams resources",64:"Machine is not on the network",65:"Package not installed",66:"The object is remote",67:"The link has been severed",68:"Advertise error",69:"Srmount error",70:"Communication error on send",71:"Protocol error",72:"Multihop attempted",73:"Cross mount point (not really error)",74:"Trying to read unreadable message",75:"Value too large for defined data type",76:"Given log. name not unique",77:"f.d. invalid for this operation",78:"Remote address changed",79:"Can   access a needed shared lib",80:"Accessing a corrupted shared lib",81:".lib section in a.out corrupted",82:"Attempting to link in too many libs",83:"Attempting to exec a shared library",84:"Illegal byte sequence",86:"Streams pipe error",87:"Too many users",88:"Socket operation on non-socket",89:"Destination address required",90:"Message too long",91:"Protocol wrong type for socket",92:"Protocol not available",93:"Unknown protocol",94:"Socket type not supported",95:"Not supported",96:"Protocol family not supported",97:"Address family not supported by protocol family",98:"Address already in use",99:"Address not available",100:"Network interface is not configured",101:"Network is unreachable",102:"Connection reset by network",103:"Connection aborted",104:"Connection reset by peer",105:"No buffer space available",106:"Socket is already connected",107:"Socket is not connected",108:"Can't send after socket shutdown",109:"Too many references",110:"Connection timed out",111:"Connection refused",112:"Host is down",113:"Host is unreachable",114:"Socket already connected",115:"Connection already in progress",116:"Stale file handle",122:"Quota exceeded",123:"No medium (in tape drive)",125:"Operation canceled",130:"Previous owner died",131:"State not recoverable"};
  
  var ERRNO_CODES={EPERM:1,ENOENT:2,ESRCH:3,EINTR:4,EIO:5,ENXIO:6,E2BIG:7,ENOEXEC:8,EBADF:9,ECHILD:10,EAGAIN:11,EWOULDBLOCK:11,ENOMEM:12,EACCES:13,EFAULT:14,ENOTBLK:15,EBUSY:16,EEXIST:17,EXDEV:18,ENODEV:19,ENOTDIR:20,EISDIR:21,EINVAL:22,ENFILE:23,EMFILE:24,ENOTTY:25,ETXTBSY:26,EFBIG:27,ENOSPC:28,ESPIPE:29,EROFS:30,EMLINK:31,EPIPE:32,EDOM:33,ERANGE:34,ENOMSG:42,EIDRM:43,ECHRNG:44,EL2NSYNC:45,EL3HLT:46,EL3RST:47,ELNRNG:48,EUNATCH:49,ENOCSI:50,EL2HLT:51,EDEADLK:35,ENOLCK:37,EBADE:52,EBADR:53,EXFULL:54,ENOANO:55,EBADRQC:56,EBADSLT:57,EDEADLOCK:35,EBFONT:59,ENOSTR:60,ENODATA:61,ETIME:62,ENOSR:63,ENONET:64,ENOPKG:65,EREMOTE:66,ENOLINK:67,EADV:68,ESRMNT:69,ECOMM:70,EPROTO:71,EMULTIHOP:72,EDOTDOT:73,EBADMSG:74,ENOTUNIQ:76,EBADFD:77,EREMCHG:78,ELIBACC:79,ELIBBAD:80,ELIBSCN:81,ELIBMAX:82,ELIBEXEC:83,ENOSYS:38,ENOTEMPTY:39,ENAMETOOLONG:36,ELOOP:40,EOPNOTSUPP:95,EPFNOSUPPORT:96,ECONNRESET:104,ENOBUFS:105,EAFNOSUPPORT:97,EPROTOTYPE:91,ENOTSOCK:88,ENOPROTOOPT:92,ESHUTDOWN:108,ECONNREFUSED:111,EADDRINUSE:98,ECONNABORTED:103,ENETUNREACH:101,ENETDOWN:100,ETIMEDOUT:110,EHOSTDOWN:112,EHOSTUNREACH:113,EINPROGRESS:115,EALREADY:114,EDESTADDRREQ:89,EMSGSIZE:90,EPROTONOSUPPORT:93,ESOCKTNOSUPPORT:94,EADDRNOTAVAIL:99,ENETRESET:102,EISCONN:106,ENOTCONN:107,ETOOMANYREFS:109,EUSERS:87,EDQUOT:122,ESTALE:116,ENOTSUP:95,ENOMEDIUM:123,EILSEQ:84,EOVERFLOW:75,ECANCELED:125,ENOTRECOVERABLE:131,EOWNERDEAD:130,ESTRPIPE:86};
  
  var _stdin=4608;
  
  var _stdout=4624;
  
  var _stderr=4640;var FS={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,trackingDelegate:{},tracking:{openFlags:{READ:1,WRITE:2}},ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,handleFSError:function (e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return ___setErrNo(e.errno);
      },lookupPath:function (path, opts) {
        path = PATH.resolve(FS.cwd(), path);
        opts = opts || {};
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key];
          }
        }
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(40);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(40);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:function (node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function (parentid, name) {
        var hash = 0;
  
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function (node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function (parent, name) {
        var err = FS.mayLookup(parent);
        if (err) {
          throw new FS.ErrnoError(err, parent);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function (parent, name, mode, rdev) {
        if (!FS.FSNode) {
          FS.FSNode = function(parent, name, mode, rdev) {
            if (!parent) {
              parent = this;  // root node sets parent to itself
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.mounted = null;
            this.id = FS.nextInode++;
            this.name = name;
            this.mode = mode;
            this.node_ops = {};
            this.stream_ops = {};
            this.rdev = rdev;
          };
  
          FS.FSNode.prototype = {};
  
          // compatibility
          var readMode = 292 | 73;
          var writeMode = 146;
  
          // NOTE we must use Object.defineProperties instead of individual calls to
          // Object.defineProperty in order to make closure compiler happy
          Object.defineProperties(FS.FSNode.prototype, {
            read: {
              get: function() { return (this.mode & readMode) === readMode; },
              set: function(val) { val ? this.mode |= readMode : this.mode &= ~readMode; }
            },
            write: {
              get: function() { return (this.mode & writeMode) === writeMode; },
              set: function(val) { val ? this.mode |= writeMode : this.mode &= ~writeMode; }
            },
            isFolder: {
              get: function() { return FS.isDir(this.mode); }
            },
            isDevice: {
              get: function() { return FS.isChrdev(this.mode); }
            }
          });
        }
  
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:function (node) {
        FS.hashRemoveNode(node);
      },isRoot:function (node) {
        return node === node.parent;
      },isMountpoint:function (node) {
        return !!node.mounted;
      },isFile:function (mode) {
        return (mode & 61440) === 32768;
      },isDir:function (mode) {
        return (mode & 61440) === 16384;
      },isLink:function (mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function (mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function (mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function (mode) {
        return (mode & 61440) === 4096;
      },isSocket:function (mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function (str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function (flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function (node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return 13;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return 13;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return 13;
        }
        return 0;
      },mayLookup:function (dir) {
        var err = FS.nodePermissions(dir, 'x');
        if (err) return err;
        if (!dir.node_ops.lookup) return 13;
        return 0;
      },mayCreate:function (dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 17;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function (dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var err = FS.nodePermissions(dir, 'wx');
        if (err) {
          return err;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 20;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 16;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 21;
          }
        }
        return 0;
      },mayOpen:function (node, flags) {
        if (!node) {
          return 2;
        }
        if (FS.isLink(node.mode)) {
          return 40;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return 21;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function (fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(24);
      },getStream:function (fd) {
        return FS.streams[fd];
      },createStream:function (stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = function(){};
          FS.FSStream.prototype = {};
          // compatibility
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          });
        }
        // clone it, so we can return an instance of FSStream
        var newStream = new FS.FSStream();
        for (var p in stream) {
          newStream[p] = stream[p];
        }
        stream = newStream;
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function (fd) {
        FS.streams[fd] = null;
      },chrdev_stream_ops:{open:function (stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function () {
          throw new FS.ErrnoError(29);
        }},major:function (dev) {
        return ((dev) >> 8);
      },minor:function (dev) {
        return ((dev) & 0xff);
      },makedev:function (ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function (dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function (dev) {
        return FS.devices[dev];
      },getMounts:function (mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:function (populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          console.log('warning: ' + FS.syncFSRequests + ' FS.syncfs operations in flight at once, probably just doing extra work');
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(err) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(err);
        }
  
        function done(err) {
          if (err) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(err);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:function (type, opts, mountpoint) {
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(16);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(16);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(20);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(22);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach(function (hash) {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.indexOf(current.mount) !== -1) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },lookup:function (parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function (path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(22);
        }
        var err = FS.mayCreate(parent, name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(1);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function (path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function (path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdirTree:function (path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 17) throw e;
          }
        }
      },mkdev:function (path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function (oldpath, newpath) {
        if (!PATH.resolve(oldpath)) {
          throw new FS.ErrnoError(2);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(2);
        }
        var newname = PATH.basename(newpath);
        var err = FS.mayCreate(parent, newname);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(1);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function (old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
        try {
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
        } catch (e) {
          throw new FS.ErrnoError(16);
        }
        if (!old_dir || !new_dir) throw new FS.ErrnoError(2);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(18);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(22);
        }
        // new path should not be an ancestor of the old path
        relative = PATH.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(39);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var err = FS.mayDelete(old_dir, old_name, isdir);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        err = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(1);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(16);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          err = FS.nodePermissions(old_dir, 'w');
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        try {
          if (FS.trackingDelegate['willMovePath']) {
            FS.trackingDelegate['willMovePath'](old_path, new_path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
        try {
          if (FS.trackingDelegate['onMovePath']) FS.trackingDelegate['onMovePath'](old_path, new_path);
        } catch(e) {
          console.log("FS.trackingDelegate['onMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
      },rmdir:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, true);
        if (err) {
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(1);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(16);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(20);
        }
        return node.node_ops.readdir(node);
      },unlink:function (path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var err = FS.mayDelete(parent, name, false);
        if (err) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(err);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(1);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(16);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          console.log("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readlink:function (path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(2);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(22);
        }
        return PATH.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },stat:function (path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(2);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(1);
        }
        return node.node_ops.getattr(node);
      },lstat:function (path) {
        return FS.stat(path, true);
      },chmod:function (path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(1);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function (path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function (fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(9);
        }
        FS.chmod(stream.node, mode);
      },chown:function (path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(1);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function (path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function (fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(9);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function (path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(22);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(1);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(21);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(22);
        }
        var err = FS.nodePermissions(node, 'w');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function (fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(9);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(22);
        }
        FS.truncate(stream.node, len);
      },utime:function (path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function (path, flags, mode, fd_start, fd_end) {
        if (path === "") {
          throw new FS.ErrnoError(2);
        }
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(17);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(2);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(20);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var err = FS.mayOpen(node, flags);
          if (err) {
            throw new FS.ErrnoError(err);
          }
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            console.log("FS.trackingDelegate error on read file: " + path);
          }
        }
        try {
          if (FS.trackingDelegate['onOpenFile']) {
            var trackingFlags = 0;
            if ((flags & 2097155) !== 1) {
              trackingFlags |= FS.tracking.openFlags.READ;
            }
            if ((flags & 2097155) !== 0) {
              trackingFlags |= FS.tracking.openFlags.WRITE;
            }
            FS.trackingDelegate['onOpenFile'](path, trackingFlags);
          }
        } catch(e) {
          console.log("FS.trackingDelegate['onOpenFile']('"+path+"', flags) threw an exception: " + e.message);
        }
        return stream;
      },close:function (stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(9);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },isClosed:function (stream) {
        return stream.fd === null;
      },llseek:function (stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(9);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(29);
        }
        if (whence != 0 /* SEEK_SET */ && whence != 1 /* SEEK_CUR */ && whence != 2 /* SEEK_END */) {
          throw new FS.ErrnoError(22);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },read:function (stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(22);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(9);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(9);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(21);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(22);
        }
        var seeking = typeof position !== 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(29);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function (stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(22);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(9);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(9);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(21);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(22);
        }
        if (stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position !== 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(29);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        try {
          if (stream.path && FS.trackingDelegate['onWriteToFile']) FS.trackingDelegate['onWriteToFile'](stream.path);
        } catch(e) {
          console.log("FS.trackingDelegate['onWriteToFile']('"+stream.path+"') threw an exception: " + e.message);
        }
        return bytesWritten;
      },allocate:function (stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(9);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(22);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(9);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(19);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(95);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function (stream, buffer, offset, length, position, prot, flags) {
        // TODO if PROT is PROT_WRITE, make sure we have write access
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(13);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(19);
        }
        return stream.stream_ops.mmap(stream, buffer, offset, length, position, prot, flags);
      },msync:function (stream, buffer, offset, length, mmapFlags) {
        if (!stream || !stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },munmap:function (stream) {
        return 0;
      },ioctl:function (stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(25);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function (path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },writeFile:function (path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data === 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },cwd:function () {
        return FS.currentPath;
      },chdir:function (path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(2);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(20);
        }
        var err = FS.nodePermissions(lookup.node, 'x');
        if (err) {
          throw new FS.ErrnoError(err);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function () {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },createDefaultDevices:function () {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function(stream, buffer, offset, length, pos) { return length; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        var random_device;
        if (typeof crypto === 'object' && typeof crypto['getRandomValues'] === 'function') {
          // for modern web browsers
          var randomBuffer = new Uint8Array(1);
          random_device = function() { crypto.getRandomValues(randomBuffer); return randomBuffer[0]; };
        } else
        if (ENVIRONMENT_IS_NODE) {
          // for nodejs with or without crypto support included
          try {
            var crypto_module = require('crypto');
            // nodejs has crypto support
            random_device = function() { return crypto_module['randomBytes'](1)[0]; };
          } catch (e) {
            // nodejs doesn't have crypto support
          }
        } else
        {}
        if (!random_device) {
          // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
          random_device = function() { abort("no cryptographic support found for random_device. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };"); };
        }
        FS.createDevice('/dev', 'random', random_device);
        FS.createDevice('/dev', 'urandom', random_device);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createSpecialDirectories:function () {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount: function() {
            var node = FS.createNode('/proc/self', 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup: function(parent, name) {
                var fd = +name;
                var stream = FS.getStream(fd);
                if (!stream) throw new FS.ErrnoError(9);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: function() { return stream.path } }
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },createStandardStreams:function () {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        var stdout = FS.open('/dev/stdout', 'w');
        var stderr = FS.open('/dev/stderr', 'w');
        assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')');
        assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')');
        assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function () {
        if (FS.ErrnoError) return;
        FS.ErrnoError = function ErrnoError(errno, node) {
          this.node = node;
          this.setErrno = function(errno) {
            this.errno = errno;
            for (var key in ERRNO_CODES) {
              if (ERRNO_CODES[key] === errno) {
                this.code = key;
                break;
              }
            }
          };
          this.setErrno(errno);
          this.message = ERRNO_MESSAGES[errno];
          // Node.js compatibility: assigning on this.stack fails on Node 4 (but fixed on Node 8)
          if (this.stack) Object.defineProperty(this, "stack", { value: (new Error).stack, writable: true });
          if (this.stack) this.stack = demangleAll(this.stack);
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [2].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function () {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
          'IDBFS': IDBFS,
          'NODEFS': NODEFS,
          'WORKERFS': WORKERFS,
        };
      },init:function (input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function () {
        FS.init.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        var fflush = Module['_fflush'];
        if (fflush) fflush(0);
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function (canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function (parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function (relative, base) {
        return PATH.resolve(base, relative);
      },standardizePath:function (path) {
        return PATH.normalize(path);
      },findObject:function (path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          ___setErrNo(ret.error);
          return null;
        }
      },analyzePath:function (path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function (parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function (parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function (parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function (parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function (parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(5);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(11);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(5);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function (parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function (obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (Module['read']) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(Module['read'](obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) ___setErrNo(5);
        return success;
      },createLazyFile:function (parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }
        LazyUint8Array.prototype.get = function LazyUint8Array_get(idx) {
          if (idx > this.length-1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize)|0;
          return this.getter(chunkNum)[chunkOffset];
        }
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        }
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
          var chunkSize = 1024*1024; // Chunk size in bytes
  
          if (!hasByteServing) chunkSize = datalength;
  
          // Function to get a range from the remote URL.
          var doXHR = (function(from, to) {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
            // Some hints to the browser that we want binary data.
            if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
  
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(xhr.response || []);
            } else {
              return intArrayFromString(xhr.responseText || '', true);
            }
          });
          var lazyArray = this;
          lazyArray.setDataGetter(function(chunkNum) {
            var start = chunkNum * chunkSize;
            var end = (chunkNum+1) * chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
            return lazyArray.chunks[chunkNum];
          });
  
          if (usesGzip || !datalength) {
            // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
            chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
            datalength = this.getter(0).length;
            chunkSize = datalength;
            console.log("LazyFiles on gzip forces download of the whole file when length is accessed");
          }
  
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        }
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          Object.defineProperties(lazyArray, {
            length: {
              get: function() {
                if(!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._length;
              }
            },
            chunkSize: {
              get: function() {
                if(!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._chunkSize;
              }
            }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(5);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(5);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
        Browser.init(); // XXX perhaps this method should move onto Browser?
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH.resolve(PATH.join2(parent, name)) : parent;
        var dep = getUniqueRunDependency('cp ' + fullname); // might have several active requests for the same fullname
        function processData(byteArray) {
          function finish(byteArray) {
            if (preFinish) preFinish();
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency(dep);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency(dep);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency(dep);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function () {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function () {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          console.log('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function (paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      }};var SYSCALLS={DEFAULT_POLLMASK:5,mappings:{},umask:511,calculateAt:function (dirfd, path) {
        if (path[0] !== '/') {
          // relative path
          var dir;
          if (dirfd === -100) {
            dir = FS.cwd();
          } else {
            var dirstream = FS.getStream(dirfd);
            if (!dirstream) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
            dir = dirstream.path;
          }
          path = PATH.join2(dir, path);
        }
        return path;
      },doStat:function (func, path, buf) {
        try {
          var stat = func(path);
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            // an error occurred while trying to look up the path; we should just report ENOTDIR
            return -ERRNO_CODES.ENOTDIR;
          }
          throw e;
        }
        HEAP32[((buf)>>2)]=stat.dev;
        HEAP32[(((buf)+(4))>>2)]=0;
        HEAP32[(((buf)+(8))>>2)]=stat.ino;
        HEAP32[(((buf)+(12))>>2)]=stat.mode;
        HEAP32[(((buf)+(16))>>2)]=stat.nlink;
        HEAP32[(((buf)+(20))>>2)]=stat.uid;
        HEAP32[(((buf)+(24))>>2)]=stat.gid;
        HEAP32[(((buf)+(28))>>2)]=stat.rdev;
        HEAP32[(((buf)+(32))>>2)]=0;
        HEAP32[(((buf)+(36))>>2)]=stat.size;
        HEAP32[(((buf)+(40))>>2)]=4096;
        HEAP32[(((buf)+(44))>>2)]=stat.blocks;
        HEAP32[(((buf)+(48))>>2)]=(stat.atime.getTime() / 1000)|0;
        HEAP32[(((buf)+(52))>>2)]=0;
        HEAP32[(((buf)+(56))>>2)]=(stat.mtime.getTime() / 1000)|0;
        HEAP32[(((buf)+(60))>>2)]=0;
        HEAP32[(((buf)+(64))>>2)]=(stat.ctime.getTime() / 1000)|0;
        HEAP32[(((buf)+(68))>>2)]=0;
        HEAP32[(((buf)+(72))>>2)]=stat.ino;
        return 0;
      },doMsync:function (addr, stream, len, flags) {
        var buffer = new Uint8Array(HEAPU8.subarray(addr, addr + len));
        FS.msync(stream, buffer, 0, len, flags);
      },doMkdir:function (path, mode) {
        // remove a trailing slash, if one - /a/b/ has basename of '', but
        // we want to create b in the context of this function
        path = PATH.normalize(path);
        if (path[path.length-1] === '/') path = path.substr(0, path.length-1);
        FS.mkdir(path, mode, 0);
        return 0;
      },doMknod:function (path, mode, dev) {
        // we don't want this in the JS API as it uses mknod to create all nodes.
        switch (mode & 61440) {
          case 32768:
          case 8192:
          case 24576:
          case 4096:
          case 49152:
            break;
          default: return -ERRNO_CODES.EINVAL;
        }
        FS.mknod(path, mode, dev);
        return 0;
      },doReadlink:function (path, buf, bufsize) {
        if (bufsize <= 0) return -ERRNO_CODES.EINVAL;
        var ret = FS.readlink(path);
  
        var len = Math.min(bufsize, lengthBytesUTF8(ret));
        var endChar = HEAP8[buf+len];
        stringToUTF8(ret, buf, bufsize+1);
        // readlink is one of the rare functions that write out a C string, but does never append a null to the output buffer(!)
        // stringToUTF8() always appends a null byte, so restore the character under the null byte after the write.
        HEAP8[buf+len] = endChar;
  
        return len;
      },doAccess:function (path, amode) {
        if (amode & ~7) {
          // need a valid mode
          return -ERRNO_CODES.EINVAL;
        }
        var node;
        var lookup = FS.lookupPath(path, { follow: true });
        node = lookup.node;
        var perms = '';
        if (amode & 4) perms += 'r';
        if (amode & 2) perms += 'w';
        if (amode & 1) perms += 'x';
        if (perms /* otherwise, they've just passed F_OK */ && FS.nodePermissions(node, perms)) {
          return -ERRNO_CODES.EACCES;
        }
        return 0;
      },doDup:function (path, flags, suggestFD) {
        var suggest = FS.getStream(suggestFD);
        if (suggest) FS.close(suggest);
        return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
      },doReadv:function (stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(((iov)+(i*8))>>2)];
          var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
          var curr = FS.read(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
          if (curr < len) break; // nothing more to read
        }
        return ret;
      },doWritev:function (stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(((iov)+(i*8))>>2)];
          var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
          var curr = FS.write(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
        }
        return ret;
      },varargs:0,get:function (varargs) {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(((SYSCALLS.varargs)-(4))>>2)];
        return ret;
      },getStr:function () {
        var ret = UTF8ToString(SYSCALLS.get());
        return ret;
      },getStreamFromFD:function () {
        var stream = FS.getStream(SYSCALLS.get());
        if (!stream) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        return stream;
      },getSocketFromFD:function () {
        var socket = SOCKFS.getSocket(SYSCALLS.get());
        if (!socket) throw new FS.ErrnoError(ERRNO_CODES.EBADF);
        return socket;
      },getSocketAddress:function (allowNull) {
        var addrp = SYSCALLS.get(), addrlen = SYSCALLS.get();
        if (allowNull && addrp === 0) return null;
        var info = __read_sockaddr(addrp, addrlen);
        if (info.errno) throw new FS.ErrnoError(info.errno);
        info.addr = DNS.lookup_addr(info.addr) || info.addr;
        return info;
      },get64:function () {
        var low = SYSCALLS.get(), high = SYSCALLS.get();
        if (low >= 0) assert(high === 0);
        else assert(high === -1);
        return low;
      },getZero:function () {
        assert(SYSCALLS.get() === 0);
      }};function ___syscall140(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // llseek
      var stream = SYSCALLS.getStreamFromFD(), offset_high = SYSCALLS.get(), offset_low = SYSCALLS.get(), result = SYSCALLS.get(), whence = SYSCALLS.get();
      // NOTE: offset_high is unused - Emscripten's off_t is 32-bit
      var offset = offset_low;
      FS.llseek(stream, offset, whence);
      HEAP32[((result)>>2)]=stream.position;
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall146(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // writev
      var stream = SYSCALLS.getStreamFromFD(), iov = SYSCALLS.get(), iovcnt = SYSCALLS.get();
      return SYSCALLS.doWritev(stream, iov, iovcnt);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall54(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // ioctl
      var stream = SYSCALLS.getStreamFromFD(), op = SYSCALLS.get();
      switch (op) {
        case 21509:
        case 21505: {
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          return 0;
        }
        case 21510:
        case 21511:
        case 21512:
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21519: {
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          var argp = SYSCALLS.get();
          HEAP32[((argp)>>2)]=0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          return -ERRNO_CODES.EINVAL; // not supported
        }
        case 21531: {
          var argp = SYSCALLS.get();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          // TODO: in theory we should write to the winsize struct that gets
          // passed in, but for now musl doesn't read anything on it
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          return 0;
        }
        case 21524: {
          // TODO: technically, this ioctl call should change the window size.
          // but, since emscripten doesn't have any concept of a terminal window
          // yet, we'll just silently throw it away as we do TIOCGWINSZ
          if (!stream.tty) return -ERRNO_CODES.ENOTTY;
          return 0;
        }
        default: abort('bad ioctl syscall ' + op);
      }
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall6(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // close
      var stream = SYSCALLS.getStreamFromFD();
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___unlock() {}

  function _emscripten_get_heap_size() {
      return HEAP8.length;
    }

  
  function abortOnCannotGrowMemory(requestedSize) {
      abort('Cannot enlarge memory arrays to size ' + requestedSize + ' bytes (OOM). Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value ' + HEAP8.length + ', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ');
    }function _emscripten_resize_heap(requestedSize) {
      abortOnCannotGrowMemory(requestedSize);
    }

  
  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.set(HEAPU8.subarray(src, src+num), dest);
    }
  
   

   

   

FS.staticInit();Module["FS_createFolder"] = FS.createFolder;Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createLink"] = FS.createLink;Module["FS_createDevice"] = FS.createDevice;Module["FS_unlink"] = FS.unlink;;
if (ENVIRONMENT_IS_NODE) { var fs = require("fs"); var NODEJS_PATH = require("path"); NODEFS.staticInit(); };
var ASSERTIONS = true;

// Copyright 2017 The Emscripten Authors.  All rights reserved.
// Emscripten is available under two separate licenses, the MIT license and the
// University of Illinois/NCSA Open Source License.  Both these licenses can be
// found in the LICENSE file.

/** @type {function(string, boolean=, number=)} */
function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      if (ASSERTIONS) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      }
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}


// ASM_LIBRARY EXTERN PRIMITIVES: Int8Array,Int32Array


function nullFunc_ii(x) { err("Invalid function pointer called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("Build with ASSERTIONS=2 for more info.");abort(x) }

function nullFunc_iiii(x) { err("Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  err("Build with ASSERTIONS=2 for more info.");abort(x) }

var asmGlobalArg = {}

var asmLibraryArg = {
  "abort": abort,
  "setTempRet0": setTempRet0,
  "getTempRet0": getTempRet0,
  "abortStackOverflow": abortStackOverflow,
  "nullFunc_ii": nullFunc_ii,
  "nullFunc_iiii": nullFunc_iiii,
  "___lock": ___lock,
  "___setErrNo": ___setErrNo,
  "___syscall140": ___syscall140,
  "___syscall146": ___syscall146,
  "___syscall54": ___syscall54,
  "___syscall6": ___syscall6,
  "___unlock": ___unlock,
  "_emscripten_get_heap_size": _emscripten_get_heap_size,
  "_emscripten_memcpy_big": _emscripten_memcpy_big,
  "_emscripten_resize_heap": _emscripten_resize_heap,
  "abortOnCannotGrowMemory": abortOnCannotGrowMemory,
  "tempDoublePtr": tempDoublePtr,
  "DYNAMICTOP_PTR": DYNAMICTOP_PTR
}
// EMSCRIPTEN_START_ASM
var asm =Module["asm"]// EMSCRIPTEN_END_ASM
(asmGlobalArg, asmLibraryArg, buffer);

var real____errno_location = asm["___errno_location"]; asm["___errno_location"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real____errno_location.apply(null, arguments);
};

var real__fflush = asm["_fflush"]; asm["_fflush"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__fflush.apply(null, arguments);
};

var real__free = asm["_free"]; asm["_free"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__free.apply(null, arguments);
};

var real__main = asm["_main"]; asm["_main"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__main.apply(null, arguments);
};

var real__malloc = asm["_malloc"]; asm["_malloc"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__malloc.apply(null, arguments);
};

var real__sbrk = asm["_sbrk"]; asm["_sbrk"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__sbrk.apply(null, arguments);
};

var real_establishStackSpace = asm["establishStackSpace"]; asm["establishStackSpace"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_establishStackSpace.apply(null, arguments);
};

var real_stackAlloc = asm["stackAlloc"]; asm["stackAlloc"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_stackAlloc.apply(null, arguments);
};

var real_stackRestore = asm["stackRestore"]; asm["stackRestore"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_stackRestore.apply(null, arguments);
};

var real_stackSave = asm["stackSave"]; asm["stackSave"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_stackSave.apply(null, arguments);
};
Module["asm"] = asm;
var ___errno_location = Module["___errno_location"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["___errno_location"].apply(null, arguments) };
var _fflush = Module["_fflush"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_fflush"].apply(null, arguments) };
var _free = Module["_free"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_free"].apply(null, arguments) };
var _main = Module["_main"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_main"].apply(null, arguments) };
var _malloc = Module["_malloc"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_malloc"].apply(null, arguments) };
var _memcpy = Module["_memcpy"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_memcpy"].apply(null, arguments) };
var _memset = Module["_memset"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_memset"].apply(null, arguments) };
var _sbrk = Module["_sbrk"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["_sbrk"].apply(null, arguments) };
var establishStackSpace = Module["establishStackSpace"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["establishStackSpace"].apply(null, arguments) };
var stackAlloc = Module["stackAlloc"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["stackAlloc"].apply(null, arguments) };
var stackRestore = Module["stackRestore"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["stackRestore"].apply(null, arguments) };
var stackSave = Module["stackSave"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["stackSave"].apply(null, arguments) };
var dynCall_ii = Module["dynCall_ii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_ii"].apply(null, arguments) };
var dynCall_iiii = Module["dynCall_iiii"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return Module["asm"]["dynCall_iiii"].apply(null, arguments) };
;



// === Auto-generated postamble setup entry stuff ===

Module['asm'] = asm;

if (!Module["intArrayFromString"]) Module["intArrayFromString"] = function() { abort("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["intArrayToString"]) Module["intArrayToString"] = function() { abort("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["ccall"]) Module["ccall"] = function() { abort("'ccall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["cwrap"]) Module["cwrap"] = function() { abort("'cwrap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["setValue"]) Module["setValue"] = function() { abort("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getValue"]) Module["getValue"] = function() { abort("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["allocate"]) Module["allocate"] = function() { abort("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["getMemory"] = getMemory;
if (!Module["AsciiToString"]) Module["AsciiToString"] = function() { abort("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stringToAscii"]) Module["stringToAscii"] = function() { abort("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["UTF8ArrayToString"]) Module["UTF8ArrayToString"] = function() { abort("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["UTF8ToString"]) Module["UTF8ToString"] = function() { abort("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stringToUTF8Array"]) Module["stringToUTF8Array"] = function() { abort("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stringToUTF8"]) Module["stringToUTF8"] = function() { abort("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["lengthBytesUTF8"]) Module["lengthBytesUTF8"] = function() { abort("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["UTF16ToString"]) Module["UTF16ToString"] = function() { abort("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stringToUTF16"]) Module["stringToUTF16"] = function() { abort("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["lengthBytesUTF16"]) Module["lengthBytesUTF16"] = function() { abort("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["UTF32ToString"]) Module["UTF32ToString"] = function() { abort("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stringToUTF32"]) Module["stringToUTF32"] = function() { abort("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["lengthBytesUTF32"]) Module["lengthBytesUTF32"] = function() { abort("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["allocateUTF8"]) Module["allocateUTF8"] = function() { abort("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stackTrace"]) Module["stackTrace"] = function() { abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addOnPreRun"]) Module["addOnPreRun"] = function() { abort("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addOnInit"]) Module["addOnInit"] = function() { abort("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addOnPreMain"]) Module["addOnPreMain"] = function() { abort("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addOnExit"]) Module["addOnExit"] = function() { abort("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addOnPostRun"]) Module["addOnPostRun"] = function() { abort("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["writeStringToMemory"]) Module["writeStringToMemory"] = function() { abort("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["writeArrayToMemory"]) Module["writeArrayToMemory"] = function() { abort("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["writeAsciiToMemory"]) Module["writeAsciiToMemory"] = function() { abort("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["addRunDependency"] = addRunDependency;
Module["removeRunDependency"] = removeRunDependency;
if (!Module["ENV"]) Module["ENV"] = function() { abort("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["FS"]) Module["FS"] = function() { abort("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["FS_createFolder"] = FS.createFolder;
Module["FS_createPath"] = FS.createPath;
Module["FS_createDataFile"] = FS.createDataFile;
Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
Module["FS_createLazyFile"] = FS.createLazyFile;
Module["FS_createLink"] = FS.createLink;
Module["FS_createDevice"] = FS.createDevice;
Module["FS_unlink"] = FS.unlink;
if (!Module["GL"]) Module["GL"] = function() { abort("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["dynamicAlloc"]) Module["dynamicAlloc"] = function() { abort("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["warnOnce"]) Module["warnOnce"] = function() { abort("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["loadDynamicLibrary"]) Module["loadDynamicLibrary"] = function() { abort("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["loadWebAssemblyModule"]) Module["loadWebAssemblyModule"] = function() { abort("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getLEB"]) Module["getLEB"] = function() { abort("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getFunctionTables"]) Module["getFunctionTables"] = function() { abort("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["alignFunctionTables"]) Module["alignFunctionTables"] = function() { abort("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["registerFunctions"]) Module["registerFunctions"] = function() { abort("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["addFunction"]) Module["addFunction"] = function() { abort("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["removeFunction"]) Module["removeFunction"] = function() { abort("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getFuncWrapper"]) Module["getFuncWrapper"] = function() { abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["prettyPrint"]) Module["prettyPrint"] = function() { abort("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["makeBigInt"]) Module["makeBigInt"] = function() { abort("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["dynCall"]) Module["dynCall"] = function() { abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getCompilerSetting"]) Module["getCompilerSetting"] = function() { abort("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stackSave"]) Module["stackSave"] = function() { abort("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stackRestore"]) Module["stackRestore"] = function() { abort("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["stackAlloc"]) Module["stackAlloc"] = function() { abort("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["establishStackSpace"]) Module["establishStackSpace"] = function() { abort("'establishStackSpace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["print"]) Module["print"] = function() { abort("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["printErr"]) Module["printErr"] = function() { abort("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["getTempRet0"]) Module["getTempRet0"] = function() { abort("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["setTempRet0"]) Module["setTempRet0"] = function() { abort("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Module["Pointer_stringify"]) Module["Pointer_stringify"] = function() { abort("'Pointer_stringify' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };if (!Module["ALLOC_NORMAL"]) Object.defineProperty(Module, "ALLOC_NORMAL", { get: function() { abort("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Module["ALLOC_STACK"]) Object.defineProperty(Module, "ALLOC_STACK", { get: function() { abort("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Module["ALLOC_DYNAMIC"]) Object.defineProperty(Module, "ALLOC_DYNAMIC", { get: function() { abort("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Module["ALLOC_NONE"]) Object.defineProperty(Module, "ALLOC_NONE", { get: function() { abort("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });




/**
 * @constructor
 * @extends {Error}
 * @this {ExitStatus}
 */
function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;

var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun']) run();
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}

Module['callMain'] = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  args = args || [];

  ensureInitRuntime();

  var argc = args.length+1;
  var argv = stackAlloc((argc + 1) * 4);
  HEAP32[argv >> 2] = allocateUTF8OnStack(Module['thisProgram']);
  for (var i = 1; i < argc; i++) {
    HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1]);
  }
  HEAP32[(argv >> 2) + argc] = 0;


  try {

    var ret = Module['_main'](argc, argv, 0);


    // if we're not running an evented main loop, it's time to exit
      exit(ret, /* implicit = */ true);
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      var toLog = e;
      if (e && typeof e === 'object' && e.stack) {
        toLog = [e, e.stack];
      }
      err('exception thrown: ' + toLog);
      Module['quit'](1, e);
    }
  } finally {
    calledMain = true;
  }
}




/** @type {function(Array=)} */
function run(args) {
  args = args || Module['arguments'];

  if (runDependencies > 0) {
    return;
  }

  writeStackCookie();

  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later
  if (Module['calledRun']) return; // run may have just been called through dependencies being fulfilled just in this very frame

  function doRun() {
    if (Module['calledRun']) return; // run may have just been called while the async setStatus time below was happening
    Module['calledRun'] = true;

    if (ABORT) return;

    ensureInitRuntime();

    preMain();

    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    if (Module['_main'] && shouldRunNow) Module['callMain'](args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else {
    doRun();
  }
  checkStackCookie();
}
Module['run'] = run;

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var print = out;
  var printErr = err;
  var has = false;
  out = err = function(x) {
    has = true;
  }
  try { // it doesn't matter if it fails
    var flush = Module['_fflush'];
    if (flush) flush(0);
    // also flush in the JS FS layer
    var hasFS = true;
    if (hasFS) {
      ['stdout', 'stderr'].forEach(function(name) {
        var info = FS.analyzePath('/dev/' + name);
        if (!info) return;
        var stream = info.object;
        var rdev = stream.rdev;
        var tty = TTY.ttys[rdev];
        if (tty && tty.output && tty.output.length) {
          has = true;
        }
      });
    }
  } catch(e) {}
  out = print;
  err = printErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.');
  }
}

function exit(status, implicit) {
  checkUnflushedContent();

  // if this is just main exit-ing implicitly, and the status is 0, then we
  // don't need to do anything here and can just leave. if the status is
  // non-zero, though, then we need to report it.
  // (we may have warned about this earlier, if a situation justifies doing so)
  if (implicit && Module['noExitRuntime'] && status === 0) {
    return;
  }

  if (Module['noExitRuntime']) {
    // if exit() was called, we may warn the user if the runtime isn't actually being shut down
    if (!implicit) {
      err('exit(' + status + ') called, but EXIT_RUNTIME is not set, so halting execution but not exiting the runtime or preventing further async execution (build with EXIT_RUNTIME=1, if you want a true shutdown)');
    }
  } else {

    ABORT = true;
    EXITSTATUS = status;

    exitRuntime();

    if (Module['onExit']) Module['onExit'](status);
  }

  Module['quit'](status, new ExitStatus(status));
}

var abortDecorators = [];

function abort(what) {
  if (Module['onAbort']) {
    Module['onAbort'](what);
  }

  if (what !== undefined) {
    out(what);
    err(what);
    what = JSON.stringify(what)
  } else {
    what = '';
  }

  ABORT = true;
  EXITSTATUS = 1;

  var extra = '';
  var output = 'abort(' + what + ') at ' + stackTrace() + extra;
  if (abortDecorators) {
    abortDecorators.forEach(function(decorator) {
      output = decorator(output, what);
    });
  }
  throw output;
}
Module['abort'] = abort;

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}

  Module["noExitRuntime"] = true;

run();





// {{MODULE_ADDITIONS}}



