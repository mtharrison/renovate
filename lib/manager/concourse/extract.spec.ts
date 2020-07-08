import { readFileSync } from 'fs';
import { extractPackageFile } from './extract';

const concourseImagesFile = readFileSync(
  'lib/manager/concourse/__fixtures__/concourse.yaml',
  'utf8'
);

const concourseConfigMapFile = readFileSync(
  'lib/manager/concourse/__fixtures__/configmap.yaml',
  'utf8'
);

const concourseArraySyntaxFile = readFileSync(
  'lib/manager/concourse/__fixtures__/array-syntax.yaml',
  'utf8'
);

const otherYamlFile = readFileSync(
  'lib/manager/concourse/__fixtures__/gitlab-ci.yaml',
  'utf8'
);

describe('lib/manager/concourse/extract', () => {
  describe('extractPackageFile()', () => {
    it('returns null for empty', () => {
      expect(extractPackageFile(concourseConfigMapFile)).toBeNull();
    });
    it('extracts multiple image lines', () => {
      const res = extractPackageFile(concourseImagesFile);
      expect(res.deps).toMatchSnapshot();
      expect(res.deps).toHaveLength(2);
    });
    it('extracts image line in a YAML array', () => {
      const res = extractPackageFile(concourseArraySyntaxFile);
      expect(res.deps).toMatchSnapshot();
      expect(res.deps).toHaveLength(1);
    });
    it('ignores non-concourse YAML files', () => {
      expect(extractPackageFile(otherYamlFile)).toBeNull();
    });
  });
});
