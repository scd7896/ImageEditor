export function getResizeWidthHeight(_IMG) {
	// //canvas에 이미지 객체를 리사이징해서 담는 과정
	const canvas = document.createElement("canvas") as HTMLCanvasElement;
	canvas.width = 100; //리사이징하여 그릴 가로 길이
	canvas.height = 100; //리사이징하여 그릴 세로 길이

	canvas.getContext("2d").drawImage(_IMG, 0, 0, canvas.width, canvas.height);

	//canvas의 dataurl를 blob(file)화 하는 과정
	const dataURL = canvas.toDataURL("image/png"); //png => jpg 등으로 변환 가능
	const byteString = atob(dataURL.split(",")[1]);
	const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
	const ab = new ArrayBuffer(byteString.length);
	const ia = new Uint8Array(ab);
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	//리사이징된 file 객체
	const tmpThumbFile = new Blob([ab], { type: mimeString });

	return tmpThumbFile;
}
