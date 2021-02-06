const utils = require('../src/utils')

describe("fileExists", () => {
  test('existing file is truthy', async () => {
    const existingFile = './test/utils.test.js'
    const fileExists = await utils.fileExists(existingFile)
    expect(fileExists).toBeTruthy()
  });

  test('returns false when file does not exist', async () => {
    const existingFile = './test/nope.nope.js'
    const fileExists = await utils.fileExists(existingFile)
    expect(fileExists).toBeFalsy()
  });
})

describe("isAsync", () => {
  test('async method should return true truthy', () => {
    const asyncMethod = async () => {}
    expect(utils.isAsync(asyncMethod)).toBeTruthy()
  });

  test('returns false when method is not async', async () => {
    const syncMethod = () => {}
    expect(utils.isAsync(syncMethod)).toBeFalsy()
  });
})

describe("camelToFileName", () => {
  test('converts caps to hyphens', () => {
    const camel = "aFileName"
    expect(utils.camelToFileName(camel)).toEqual('a-file-name')
  });

  test('preserves slashes and existing hyphens', () => {
    const camel = "a/file-path/fileName"
    expect(utils.camelToFileName(camel)).toEqual('a/file-path/file-name')
  });
})

describe("fileNameToCamel", () => {
  test('converts hyphens to caps', () => {
    const hyphens = "a-file-name"
    expect(utils.fileNameToCamel(hyphens)).toEqual('aFileName')
  });

  test('preserves slashes and existing caps', () => {
    const camel = "a/file-path/fileName"
    expect(utils.fileNameToCamel(camel)).toEqual('a/filePath/fileName')
  });
})
