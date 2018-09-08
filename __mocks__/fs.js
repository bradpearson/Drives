const fs = jest.genMockFromModule('fs');
let existsSyncShouldReturn = true;
let fileReadSyncContents = '';

fs.existsSync = filePath => existsSyncShouldReturn;
fs._existsSyncShouldReturn = value => {
  existsSyncShouldReturn = value;
};

fs.readFileSync = filePath => fileReadSyncContents;
fs.__readFileSyncContents = contents => {
  fileReadSyncContents = contents;
};

module.exports = fs;
