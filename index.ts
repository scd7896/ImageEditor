import ImageEditor from "./ImageEditor/ImageEditor";

const init = (id: HTMLCanvasElement | string, options) => {
	const Editor = new ImageEditor(id, options);
};

init("canvas-example", { buttons: ["rect", "color", "pen", "undo", "redo"] });
