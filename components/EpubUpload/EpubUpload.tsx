import { FilePicker } from "evergreen-ui";

export default function EpubUpload() {
	const onChange = async (files: FileList) => {
		if (files[0]) {
			const res = await sendFileToServer(files[0]);
			console.log("RESULT => ", res);
		}
	};

	return (
		<div>
			<FilePicker
				width="33%"
				onChange={(files: FileList) => {
					onChange(files);
				}}
				placeholder="Select the file here!"
			/>
		</div>
	);
}

async function sendFileToServer(file: File): Promise<boolean> {
	const response = await fetch("api/upload", {
		method: "POST",
		body: file,
	});
	return await response.json();
}
