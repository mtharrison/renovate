import { logger } from '../../logger';
import { PackageDependency, PackageFile } from '../common';
import { getDep } from '../dockerfile/extract';
import yaml from 'yaml';

function createPackageDependency(
  currentValue: string,
  depName: string,
  replaceString: string
): PackageDependency {
  return {
    autoReplaceStringTemplate: '{{#if newValue}}{{newValue}}{{/if}}',
    currentDigest: undefined,
    datasource: 'docker',
    currentValue,
    depName,
    replaceString,
  };
}

export function extractPackageFile(content: string): PackageFile | null {
  logger.trace('concourse.extractPackageFile()');
  let deps: PackageDependency[] = [];

  const document = yaml.parse(content);
  console.log(document);

  for (const resource of document.resources || []) {
    if (resource.type != 'docker-image') {
      continue;
    }

    const { source } = resource;

    deps.push(
      createPackageDependency(source.tag, source.repository, source.tag)
    );
  }

  if (!deps.length) {
    return null;
  }

  return { deps };
  // const isconcourseManifest =
  //   /\s*apiVersion\s*:/.test(content) && /\s*kind\s*:/.test(content);
  // if (!isconcourseManifest) {
  //   return null;
  // }

  // for (const line of content.split('\n')) {
  //   const match = /^\s*-?\s*image:\s*'?"?([^\s'"]+)'?"?\s*$/.exec(line);
  //   if (match) {
  //     const currentFrom = match[1];
  //     const dep = getDep(currentFrom);
  //     logger.debug(
  //       {
  //         depName: dep.depName,
  //         currentValue: dep.currentValue,
  //         currentDigest: dep.currentDigest,
  //       },
  //       'concourse image'
  //     );
  //     deps.push(dep);
  //   }
  // }
  // deps = deps.filter(
  //   (dep) => !(dep.currentValue && dep.currentValue.includes('${'))
  // );
  // if (!deps.length) {
  //   return null;
  // }
  // return { deps };
}
