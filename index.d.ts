export class ImageEditor {
	constructor(wrapper: string | HTMLDivElement, options: IOption);
}

export default ImageEditor;

export interface IOption {
	baseImage: string;
	images: string[];
	events: {
		onFinish?: (blob?: Blob) => void;
		onCancel?: (blob?: Blob) => void;
	};
}
