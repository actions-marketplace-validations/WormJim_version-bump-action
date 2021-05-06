import * as core from '@actions/core';

export interface Inputs {
  token: string;
  pathToPackage: string;
  commitMessage: string;
  tag: boolean;
  minor: string[];
  major: string[];
  patch: string[] | undefined;
  ref: string;
}

export const getInputs = async (): Promise<Inputs> => {
  const defaults = {
    commitMessage: 'CI: Bump version to {{version}}',
    pathToPackage: process.env.GITHUB_WORKSPACE!,
    major: ['BREAKING CHANGE', 'major'],
    minor: ['feature', 'minor'],
    patch: [''],
    ref: 'main',
  };

  return {
    token: core.getInput('token', { required: true }),
    commitMessage: core.getInput('commit_message') || defaults.commitMessage,
    pathToPackage: core.getInput('path_to_package') || defaults.pathToPackage,
    major: (core.getInput('major').length && [...defaults.major, ...core.getInput('major').split(',')]) || defaults.major,
    minor: (core.getInput('minor').length && [...defaults.minor, ...core.getInput('minor').split(',')]) || defaults.minor,
    patch: (core.getInput('patch').length && [...defaults.patch, ...core.getInput('patch').split(',')]) || undefined,
    tag: /true/i.test(core.getInput('tag')),
    ref: core.getInput('ref').split('/').pop() || defaults.ref,
  };
};

export default {
  getInputs,
};
