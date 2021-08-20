# mobile-image-editor
This is an open source that allows you to edit images on your mobile.

[![npm version](https://img.shields.io/npm/v/mobile-image-editor.svg?style=flat-square)](https://www.npmjs.com/package/mobile-image-editor)

# installing
```
npm install mobile-image-editor
```

# example
React
```javascript
import React, { useEffect, useRef, useState } from 'react'
import ImageEditor from 'mobile-image-editor'

const ImageInput = () => {
	const ref = useRef();
	const [open, setOpen] = useState(false);
	const [baseUrl, setBaseUrl] = useState();

	useEffect(() => {
		if (open) {
			new ImageEditor(ref.current, {
				baseImage: baseUrl,
				images: [..."images"],
				events: {
					onFinish: async (blob) => {
            // done button click Listener
						const file = new File([blob], "file.jpg", { type: "image/jpeg" });
						const url = URL.createObjectURL(file);
						const a = document.createElement("a");
						a.download = "file.jpg";
						a.href = url;
						a.click();
						URL.revokeObjectURL(url);
						setOpen(false)
					},
					onCancel: async (blob) => {
            // back button click Listener
						const file = new File([blob], "file.jpg", { type: "image/jpeg" });
						const url = URL.createObjectURL(file);
						const a = document.createElement("a");
						a.download = "file.jpg";
						a.href = url;
						a.click();
						URL.revokeObjectURL(url);
						setOpen(false);
					},
				},
			})
		}
	}, [open, baseUrl]);

	return (
		<>
			<input type="file" onChange={(e) => {
				const url = URL.createObjectURL(e.target.files[0]);

				setBaseUrl(url)
				setOpen(true)

			}} />
			{open && <div ref={ref}></div>}
		</>
	)
}

export default ImageInput;
```

# Demo
https://scd7896.github.io/ImageEditor/examples/

![KakaoTalk_Photo_2021-08-20-19-43-26](https://user-images.githubusercontent.com/46440142/130221962-7425a04d-9e50-4b80-8595-bd499c29df44.jpeg)

https://user-images.githubusercontent.com/46440142/130221972-0dac516b-4651-4ea0-b97b-cceaba493ffb.mp4




# author
- Developer: Kim Server (scd7896@gmail.com)
- Designer: MJ Jang (https://mjjang.myportfolio.com/work)
