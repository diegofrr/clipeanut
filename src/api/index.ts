'use server';

import { promises as fs } from 'fs';
import { GetServerFileAction, SetServerFileAction } from './types';

const DIRECTORY_PATH = '/src/api/files/';

export async function getServerFileData<T>({ file }: GetServerFileAction): Promise<T> {
  try {
    const data = await fs.readFile(process.cwd() + DIRECTORY_PATH + file, 'utf8');
    return JSON.parse(data);
  } catch {
    return {} as T;
  }
}

export async function setServerFileData({ file, newData }: SetServerFileAction) {
  try {
    await fs.writeFile(process.cwd() + DIRECTORY_PATH + file, JSON.stringify(newData), 'utf8');
  } catch {
    /* empty */
  }
}
