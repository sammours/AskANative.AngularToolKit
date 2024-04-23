module.exports = {
  name: 'aan-toolkit',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/aan-toolkit',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
