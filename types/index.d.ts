declare module "*.png";
declare module "*.svg";
interface IOption {
	baseImage: string;
	stickers: string[];
	events: {
		onDownLoad?: (blob: Blob) => void;
		onFinish?: (blob: Blob) => void;
		onCancel?: () => void;
	};
}
