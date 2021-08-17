const init = (id, options) => {
	console.log(ImageEditor);
	const Editor = new ImageEditor(id, options);
	console.log(Editor);
};

init("canvas-example", {
	baseImage: "https://scd7896.github.io/ImageEditor/assets/sample.png",
	images: [
		"https://scd7896.github.io/ImageEditor/assets/sticker1.png",
		"https://scd7896.github.io/ImageEditor/assets/sticker2.png",
		"https://scd7896.github.io/ImageEditor/assets/sticker3.png",
		"https://scd7896.github.io/ImageEditor/assets/sticker4.png",
		"https://scd7896.github.io/ImageEditor/assets/sticker5.png",
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
