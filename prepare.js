import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
import dir from 'node-dir';
import semver from 'semver';

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

mangleFilesInFolders('./dist');

incrementVersion();
