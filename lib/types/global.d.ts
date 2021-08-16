import ImageEditor from "../ImageEditor/ImageEditor";

declare global {
	interface Window {
		ImageEditor: typeof ImageEditor;
	}
}
