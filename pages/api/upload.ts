import type { NextApiRequest, NextApiResponse } from "next";
import os from "os";
import path from "path";
import crypto from "crypto";
import fs from "fs";
//import publicationParser from "r2-shared-js/dist/es8-es2017/src/parser/publication-parser";

type Data = {
	didSucceed: boolean;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	//const file = req.body as File;
	//const buffer = await file.arrayBuffer();
	try {
		const pathToEpub = getTempPathToEpub();
		const didSucceed = writeTest(pathToEpub);
		deleteLocalFile(pathToEpub);
		res.status(200).json({ didSucceed });
	} catch (err) {
		console.error((err as Error).message);
		res.status(500).json({ didSucceed: false });
	}
}

function writeTest(pathToFile: string): boolean {
	const content = "Some content!";
	try {
		fs.writeFileSync(pathToFile, content);
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
}

function getTempPathToEpub() {
	return path.resolve(
		os.tmpdir(),
		crypto.randomBytes(8).toString("hex") + ".txt"
	);
}

function deleteLocalFile(pathToFile: string) {
	if (fs.existsSync(pathToFile)) {
		fs.unlinkSync(pathToFile);
	}
}
