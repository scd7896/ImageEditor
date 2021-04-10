import ImageEditor from "./ImageEditor/ImageEditor";

const init = (id: HTMLCanvasElement | string, options) => {
	const Editor = new ImageEditor(id, options);
	const button = document.querySelector(".button");
	button.addEventListener("click", () => {
		const img = document.createElement("img");
		document.body.appendChild(img);
		img.src = Editor.getImage();
	});
};

init("canvas-example", {});
