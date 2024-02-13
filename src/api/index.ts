'use server';

import { promises as fs } from 'fs';
import { GetServerFileAction, SetServerFileAction } from './types';

const DIRECTORY_PATH = '/src/api/files/';

export async function getServerFileData<T>({ file }: GetServerFileAction): Promise<T> {
  return JSON.parse(await fs.readFile(process.cwd() + DIRECTORY_PATH + file, 'utf8'));
}

export async function setServerFileData({ file, newData }: SetServerFileAction) {
  await fs.writeFile(process.cwd() + DIRECTORY_PATH + file, JSON.stringify(newData), 'utf8');
}
