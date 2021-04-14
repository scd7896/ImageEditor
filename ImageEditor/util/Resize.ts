function getResizeWidthHeight({ width, height }: HTMLImageElement) {
	const MAX_SIZE = 100;
	let resizeWidth;
	let resizeHeight;
	if (width < height) {
		resizeHeight = MAX_SIZE;
		resizeWidth = (width * MAX_SIZE) / height;
	} else {
		resizeWidth = MAX_SIZE;
		resizeHeight = (height * MAX_SIZE) / width;
	}
	return {
		width: resizeWidth,
		height: resizeHeight,
	};
}

export function getResizeImage(_IMG: HTMLImageElement) {
	const canvas = document.createElement("canvas") as HTMLCanvasElement;
	const { width, height } = getResizeWidthHeight(_IMG);
	canvas.width = width;
	canvas.height = height;

	canvas.getContext("2d").drawImage(_IMG, 0, 0, canvas.width, canvas.height);

	//canvas의 dataurl를 blob(file)화 하는 과정
	const dataURL = canvas.toDataURL("image/png"); //png => jpg 등으로 변환 가능
	const byteString = atob(dataURL.split(",")[1]);
	const ab = new ArrayBuffer(byteString.length);
	const ia = new Uint8Array(ab);
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	//리사이징된 file 객체
	const tmpThumbFile = new Blob([ab], { type: "image/png" });

	return { file: tmpThumbFile, width, height };
}
