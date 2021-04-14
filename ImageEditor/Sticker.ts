import Canvas from "./Canvas";
import { getResizeImage } from "./util/Resize";

export default class Sticker {
	private images: HTMLImageElement[];
	constructor(urls: string[], canvas: Canvas) {
		const images = urls.map((url) => {
			const img = new Image();
			const tmpImg = new Image();
			img.crossOrigin = "anonymous";
			tmpImg.crossOrigin = "anonymous";
			img.onload = () => {
				const { file, width, height } = getResizeImage(img);
				tmpImg.width = width;
				tmpImg.height = height;

				tmpImg.src = URL.createObjectURL(file);
			};

			tmpImg.onclick = () => {
				canvas.addImage(tmpImg);
			};
			img.onerror = () => {};
			img.src = url;
			return tmpImg;
		});

		this.images = images;
	}

	get imageList() {
		return this.images;
	}
}
