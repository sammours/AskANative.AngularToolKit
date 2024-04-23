module.exports = {
  name: 'shared-common',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/common',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
