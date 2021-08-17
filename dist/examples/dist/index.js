/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./examples/index.js":
/*!***************************!*\
  !*** ./examples/index.js ***!
  \***************************/
/***/ (() => {

eval("const init = (id, options) => {\n  console.log(ImageEditor);\n  const Editor = new ImageEditor(id, options);\n  console.log(Editor);\n};\n\ninit(\"canvas-example\", {\n  baseImage: \"/assets/sample.png\",\n  images: [\"/assets/sticker1.png\", \"/assets/sticker2.png\", \"/assets/sticker3.png\", \"/assets/sticker4.png\", \"/assets/sticker5.png\"],\n  events: {\n    onFinish: async blob => {\n      const file = new File([blob], \"file.jpg\", {\n        type: \"image/jpeg\"\n      });\n      const url = URL.createObjectURL(file);\n      const a = document.createElement(\"a\");\n      a.download = \"file.jpg\";\n      a.href = url;\n      a.click();\n      URL.revokeObjectURL(url);\n    },\n    onCancel: async blob => {\n      const file = new File([blob], \"file.jpg\", {\n        type: \"image/jpeg\"\n      });\n      const url = URL.createObjectURL(file);\n      const a = document.createElement(\"a\");\n      a.download = \"file.jpg\";\n      a.href = url;\n      a.click();\n      URL.revokeObjectURL(url);\n    }\n  }\n});\n\n//# sourceURL=webpack://mobile-image-editor/./examples/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./examples/index.js"]();
/******/ 	
/******/ })()
;