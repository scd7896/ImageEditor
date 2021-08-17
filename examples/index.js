const init = (id, options) => {
	console.log(ImageEditor);
	const Editor = new ImageEditor(id, options);
	console.log(Editor);
};

init("canvas-example", {
	baseImage: "/assets/sample.png",
	images: [
		"/assets/sticker1.png",
		"/assets/sticker2.png",
		"/assets/sticker3.png",
		"/assets/sticker4.png",
		"/assets/sticker5.png",
	],
	events: {
		onFinish: async (blob) => {
			const file = new File([blob], "file.jpg", { type: "image/jpeg" });
			const url = URL.createObjectURL(file);
			const a = document.createElement("a");
			a.download = "file.jpg";
			a.href = url;
			a.click();
			URL.revokeObjectURL(url);
		},
		onCancel: async (blob) => {
			const file = new File([blob], "file.jpg", { type: "image/jpeg" });
			const url = URL.createObjectURL(file);
			const a = document.createElement("a");
			a.download = "file.jpg";
			a.href = url;
			a.click();
			URL.revokeObjectURL(url);
		},
	},
});
