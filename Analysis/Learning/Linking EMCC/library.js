// Copyright 2011 The Emscripten Authors.  All rights reserved.
// Emscripten is available under two separate licenses, the MIT license and the
// University of Illinois/NCSA Open Source License.  Both these licenses can be
// found in the LICENSE file.

// Capture the output of this into a variable, if you want
(function(fb, parentModule) {
  var Module = {};
  var args = [];
  Module.arguments = [];
  Module.cleanups = [];

  var gb = 0;
  // Each module has its own stack
  var STACKTOP = getMemory(TOTAL_STACK);
  assert(STACKTOP % 8 == 0);
  var STACK_MAX = STACKTOP + TOTAL_STACK;
  Module.cleanups.push(function() {
    parentModule['_free'](STACKTOP); // XXX ensure exported, and that it was actually malloc'ed and not static memory FIXME
    parentModule['_free'](gb);
  });

  

// === Auto-generated preamble library stuff ===

//========================================
// Runtime essentials
//========================================



// === Body ===

var ASM_CONSTS = [];






gb = alignMemory(getMemory(264 + 4), 4 || 1);

for (var i = gb; i < gb + 264; ++i) HEAP8[i] = 0;

// STATICTOP = STATIC_BASE + 264;
/* global initializers */ /*__ATINIT__.push();*/


/* memory initializer */ allocate([103,101,116,78,117,109,98,101,114,40,41,32,105,115,32,98,101,105,110,103,32,99,97,108,108,101,100,0], "i8", ALLOC_NONE, gb);





/* no memory initializer */
// {{PRE_LIBRARY}}

function _printf() {
  if (!parentModule['_printf']) abort("external function 'printf' is missing. perhaps a side module was not linked in? if this function was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment");return parentModule['_printf'].apply(null, arguments);
  }
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





var asmGlobalArg = { "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array, "NaN": NaN, "Infinity": Infinity }

var asmLibraryArg = {
  "abort": abort,
  "setTempRet0": setTempRet0,
  "getTempRet0": getTempRet0,
  "abortStackOverflow": abortStackOverflow,
  "_printf": _printf,
  "tempDoublePtr": tempDoublePtr,
  "DYNAMICTOP_PTR": DYNAMICTOP_PTR,
  "gb": gb,
  "fb": fb
}
// EMSCRIPTEN_START_ASM
var asm = (/** @suppress {uselessCode} */ function(global, env, buffer) {
'almost asm';

  var HEAP8 = new global.Int8Array(buffer),
  HEAP16 = new global.Int16Array(buffer),
  HEAP32 = new global.Int32Array(buffer),
  HEAPU8 = new global.Uint8Array(buffer),
  HEAPU16 = new global.Uint16Array(buffer),
  HEAPU32 = new global.Uint32Array(buffer),
  HEAPF32 = new global.Float32Array(buffer),
  HEAPF64 = new global.Float64Array(buffer),
  tempDoublePtr=env.tempDoublePtr|0,
  DYNAMICTOP_PTR=env.DYNAMICTOP_PTR|0,
  gb=env.gb|0,
  fb=env.fb|0,
  __THREW__ = 0,
  threwValue = 0,
  setjmpId = 0,
  tempInt = 0,
  tempBigInt = 0,
  tempBigIntS = 0,
  tempValue = 0,
  tempDouble = 0.0,
  nan = global.NaN,
  inf = global.Infinity,
  Math_floor=global.Math.floor,
  Math_abs=global.Math.abs,
  Math_sqrt=global.Math.sqrt,
  Math_pow=global.Math.pow,
  Math_cos=global.Math.cos,
  Math_sin=global.Math.sin,
  Math_tan=global.Math.tan,
  Math_acos=global.Math.acos,
  Math_asin=global.Math.asin,
  Math_atan=global.Math.atan,
  Math_atan2=global.Math.atan2,
  Math_exp=global.Math.exp,
  Math_log=global.Math.log,
  Math_ceil=global.Math.ceil,
  Math_imul=global.Math.imul,
  Math_min=global.Math.min,
  Math_max=global.Math.max,
  Math_clz32=global.Math.clz32,
  abort=env.abort,
  setTempRet0=env.setTempRet0,
  getTempRet0=env.getTempRet0,
  abortStackOverflow=env.abortStackOverflow,
  _printf=env._printf,
  STACKTOP = 272,
  STACK_MAX = 5243152,
  tempFloat = 0.0;

// EMSCRIPTEN_START_FUNCS

function stackAlloc(size) {
  size = size|0;
  var ret = 0;
  ret = STACKTOP;
  STACKTOP = (STACKTOP + size)|0;
  STACKTOP = (STACKTOP + 15)&-16;
    if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(size|0);

  return ret|0;
}
function stackSave() {
  return STACKTOP|0;
}
function stackRestore(top) {
  top = top|0;
  STACKTOP = top;
}
function establishStackSpace(stackBase, stackMax) {
  stackBase = stackBase|0;
  stackMax = stackMax|0;
  STACKTOP = stackBase;
  STACK_MAX = stackMax;
}

function _getNumber() {
 var $vararg_buffer = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $vararg_buffer = sp;
 (_printf(((gb + (0) | 0)|0),($vararg_buffer|0))|0);
 STACKTOP = sp;return 10;
}

  


// EMSCRIPTEN_END_FUNCS


  return { _getNumber: _getNumber, establishStackSpace: establishStackSpace, stackAlloc: stackAlloc, stackRestore: stackRestore, stackSave: stackSave };
})
// EMSCRIPTEN_END_ASM
(asmGlobalArg, asmLibraryArg, buffer);

var real__getNumber = asm["_getNumber"]; asm["_getNumber"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__getNumber.apply(null, arguments);
};
var _getNumber = Module["_getNumber"] = asm["_getNumber"];





var NAMED_GLOBALS = {  };
for (var named in NAMED_GLOBALS) {
  Module['_' + named] = gb + NAMED_GLOBALS[named];
}
Module['NAMED_GLOBALS'] = NAMED_GLOBALS;
;

parentModule['registerFunctions']([], Module);



// === Auto-generated postamble setup entry stuff ===




if (runtimeInitialized) {
  // dlopen case: we are being loaded after the system is fully initialized, so just run our prerun and atinit stuff now
  callRuntimeCallbacks(__ATPRERUN__);
  callRuntimeCallbacks(__ATINIT__);
} // otherwise, general dynamic linking case: stuff we added to prerun and init will be executed with the rest of the system as it loads





  // {{MODULE_ADDITIONS}}

  return Module;
});




