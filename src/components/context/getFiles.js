import RNFS from 'react-native-fs';
export async function getFiles(path) {
    const result = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath + path);
    // result.sort((a, b) => new Date(b.mtime) - new Date(a.mtime));
    const files = result.filter((item) => item.isFile());
    return files;
}

// console.log(result);
// result.sort((a, b) => b.mtime - a.mtime);
// result.sort((a, b) => new Date(b.mtime) - new Date(a.mtime));
// console.log('=======start here===============');
// for (let re of result) {
//     console.log(re.mtime);
// }
// console.log('=======done here===============');