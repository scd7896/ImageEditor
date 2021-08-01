export const getWindowCenter = (canvasWrapper: HTMLElement, width: number, height: number) => {
	const halfWidth = window.innerWidth / 2;
	const top = halfWidth - width / 2;
	const left = halfWidth - height / 2;

	return {
		top: canvasWrapper.scrollTop + top,
		left: canvasWrapper.scrollLeft + left,
	};
};
