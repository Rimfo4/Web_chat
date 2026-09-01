console.log('Hello World');
console.log(process.version);
console.log(process.cwd());

// 파일 출력
const fs = require('fs'); //file System 라이브러리 => 브라우저에선 작동 X
console.log(fs.readFileSync(__filename, 'utf8'));
