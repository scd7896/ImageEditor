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

eval("const init = (id, options) => {\n  console.log(ImageEditor);\n  const Editor = new ImageEditor(id, options);\n  console.log(Editor);\n};\n\ninit(\"canvas-example\", {\n  baseImage: \"/assets/couple.png\",\n  images: [\"https://static.lookpin.co.kr/20200416153934-9077/0dbdf15613bb2891fe82b7b9afb9a6aa.jpg?resize=360\", \"https://pbs.twimg.com/profile_images/921857360502468608/i9dG-27G.jpg\", \"https://static.lookpin.co.kr/20210402105237-f418/41f00bba439e648ec3a9a41eeec55314.jpg?resize=1000\", \"/assets/redHart.png\", \"/assets/orange.png\", \"/assets/face.png\"],\n  events: {\n    onFinish: async blob => {\n      const file = new File([blob], \"file.jpg\", {\n        type: \"image/jpeg\"\n      });\n      const url = URL.createObjectURL(file);\n      const a = document.createElement(\"a\");\n      a.download = \"file.jpg\";\n      a.href = url;\n      a.click();\n      URL.revokeObjectURL(url);\n    },\n    onCancel: async blob => {\n      const file = new File([blob], \"file.jpg\", {\n        type: \"image/jpeg\"\n      });\n      const url = URL.createObjectURL(file);\n      const a = document.createElement(\"a\");\n      a.download = \"file.jpg\";\n      a.href = url;\n      a.click();\n      URL.revokeObjectURL(url);\n    }\n  }\n});\n\n//# sourceURL=webpack://mobile-image-editor/./examples/index.js?");

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