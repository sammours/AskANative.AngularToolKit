module.exports = {
  name: 'shared-validation',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/validation',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
