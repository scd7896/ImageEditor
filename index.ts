import ImageEditor from "./ImageEditor/ImageEditor";

const init = (id: HTMLCanvasElement | string, options) => {
	const Editor = new ImageEditor(id, options);
};

init("canvas-example", {
	buttons: ["rect", "color", "pen", "undo", "redo", "download"],
	images: [
		"https://static.lookpin.co.kr/20200416153934-9077/0dbdf15613bb2891fe82b7b9afb9a6aa.jpg?resize=360",
		"https://pbs.twimg.com/profile_images/921857360502468608/i9dG-27G.jpg",
		"https://static.lookpin.co.kr/20210402105237-f418/41f00bba439e648ec3a9a41eeec55314.jpg?resize=1000",
		"/assets/redHart.png",
		"/assets/orange.png",
		"/assets/face.png",
	],
	events: {
		onDownLoad: (blob: Blob) => {
			const file = new File([blob], "test.png");
			const url = URL.createObjectURL(file);
			const a = document.createElement("a");
			a.download = file.name;
			a.href = url;
			document.body.appendChild(a);
			a.click();
			URL.revokeObjectURL(url);
		},
	},
});
