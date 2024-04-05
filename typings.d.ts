// typings.d.ts (ou tout autre fichier de déclarations TypeScript)
import { IpcRenderer } from 'electron';

declare global {
  interface Window {
    ipcRender: IpcRenderer;
  }
}