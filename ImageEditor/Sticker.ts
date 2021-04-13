import Canvas from "./Canvas";
import { getResizeWidthHeight } from "./util/Resize";

export default class Sticker {
	private images: HTMLImageElement[];
	constructor(urls: string[], canvas: Canvas) {
		const images = urls.map((url) => {
			const img = new Image();
			const tmpImg = new Image();
			img.crossOrigin = "anonymous";
			tmpImg.crossOrigin = "anonymous";
			img.onload = () => {
				const resize = getResizeWidthHeight(img);
				tmpImg.width = 100;
				tmpImg.height = 100;
				tmpImg.src = URL.createObjectURL(resize);
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
