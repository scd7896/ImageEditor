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

interface IAddShape {
	width: number;
	height: number;
	top: number;
	left: number;
}

type ShapeType = "triangle" | "circle" | "rect";
