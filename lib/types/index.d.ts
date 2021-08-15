declare module "*.png";
declare module "*.svg";
interface IOption {
	baseImage: string;
	stickers: string[];
	events: {
		onFinish?: (blob?: Blob) => void;
		onCancel?: (blob?: Blob) => void;
	};
}

interface IAddShape {
	width: number;
	height: number;
	top: number;
	left: number;
}

type ShapeType = "triangle" | "circle" | "rect";
