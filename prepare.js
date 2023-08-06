import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
import dir from 'node-dir';
import semver from 'semver';
import { props, features, slots } from './src/infos.js';

function minifyFile(inputFile, outputFile) {
	esbuild
		.build({
			entryPoints: [inputFile],
			outfile: outputFile,
			allowOverwrite: true,
			minify: true
		})
		.catch(() => process.exit(1));
}

function mangleFilesInFolders(dirPath) {
	dir.files(dirPath, function (err, files) {
		if (err) throw err;
		files.forEach(function (filePath) {
			var ext = path.extname(filePath || '').split('.');
			var ext = ext[ext.length - 1];
			if (ext === 'js' && !filePath.includes('.min.js')) {
				var newPath = filePath;
				minifyFile(filePath, newPath);
			}
		});
	});
}

function incrementVersion() {
	let p = JSON.parse(fs.readFileSync('./package.json'));
	p.version = semver.inc(p.version, 'patch');
	fs.writeFileSync('./package.json', JSON.stringify(p, null, 3));
}

function prepareMardown() {
	let readme = fs.readFileSync('./README.md', 'utf8');
	const replaceInMd = (t, array, init, cb) => {
		const startString = `<!-- START:${t} -->`;
		const endString = `<!-- END:${t} -->`;
		const start = readme.indexOf(startString);
		const end = readme.indexOf(endString);
		const table = ['', ...init];

		array.forEach((prop) => {
			cb(table, prop);
		});
		readme =
			readme.slice(0, start + startString.length) + table.join('\n') + '\n' + readme.slice(end);
	};
	replaceInMd('FEATURES', features, [], (table, prop) => {
		table.push(`- ${prop}`);
	});
	replaceInMd(
		'PROPS',
		props,
		['| Name | Type | Default | Description |', '| ---- | ---- | ------- | ----------- |'],
		(table, prop) => {
			table.push(`| ${prop.name} | ${prop.type} | ${prop.default} | ${prop.description} |`);
		}
	);
	replaceInMd('SLOTS', slots, [], (table, prop) => {
		table.push(
			`### ${prop.name}`,
			prop.description,
			`<!-- START:${prop.name} -->`,
			`<!-- END:${prop.name} -->`
		);
	});

	slots.forEach((slot) => {
		replaceInMd(slot.name, slot.props, ['| Name | Type |', '| ---- | ---- |'], (table, prop) => {
			table.push(`| ${prop.name} | ${prop.type} |`);
		});
	});

	fs.writeFileSync('./README.md', readme);
}

mangleFilesInFolders('./dist');

incrementVersion();
prepareMardown();
