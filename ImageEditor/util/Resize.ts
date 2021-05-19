function getResizeWidthHeight({ width, height }: HTMLImageElement, maxSize: number) {
	let resizeWidth;
	let resizeHeight;
	if (width < height) {
		resizeHeight = maxSize;
		resizeWidth = (width * maxSize) / height;
	} else {
		resizeWidth = maxSize;
		resizeHeight = (height * maxSize) / width;
	}
	return {
		width: resizeWidth,
		height: resizeHeight,
	};
}

export function canvasImageToFileConverter(canvas: HTMLCanvasElement, type: "png" | "jpeg" = "png") {
	if (type === "jpeg") {
		const ctx = canvas.getContext("2d");
		const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const data = imgData.data;
		for (let i = 0; i < data.length; i += 4) {
			if (data[i + 3] < 255) {
				data[i] = 255;
				data[i + 1] = 255;
				data[i + 2] = 255;
				data[i + 3] = 255;
			}
		}
		ctx.putImageData(imgData, 0, 0);
	}
	const dataURL = canvas.toDataURL(`image/${type}`); //png => jpg 등으로 변환 가능
	const byteString = atob(dataURL.split(",")[1]);
	const ab = new ArrayBuffer(byteString.length);
	const ia = new Uint8Array(ab);

	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	//리사이징된 file 객체
	const tmpThumbFile = new Blob([ab], { type: `image/${type}` });
	return tmpThumbFile;
}

export function getResizeImage(_IMG: HTMLImageElement, maxSize = 100) {
	const canvas = document.createElement("canvas") as HTMLCanvasElement;
	const { width, height } = getResizeWidthHeight(_IMG, maxSize);
	canvas.width = width;
	canvas.height = height;

	canvas.getContext("2d").drawImage(_IMG, 0, 0, canvas.width, canvas.height);

	//리사이징된 file 객체
	const tmpThumbFile = canvasImageToFileConverter(canvas);

	return { file: tmpThumbFile, width, height };
}
