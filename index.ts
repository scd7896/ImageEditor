import ImageEditor from "./ImageEditor/ImageEditor";

const init = (id: HTMLCanvasElement | string, options) => {
	const Editor = new ImageEditor(id, options);
};

init("canvas-example", {
	buttons: ["rect", "color", "pen", "undo", "redo"],
	images: [
		"https://static.lookpin.co.kr/20200416153934-9077/0dbdf15613bb2891fe82b7b9afb9a6aa.jpg?resize=360",
		"https://pbs.twimg.com/profile_images/921857360502468608/i9dG-27G.jpg",
	],
});
