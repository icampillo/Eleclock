// Import des composants Electron nécessaires.
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

// Canaux autorisés.
const ipc = {
    'render': {
        // Du rendu au processus principal.
        'send': ['alarm-alert'],
        // Du processus principal au rendu.
        'on': ['alarm-alert'],
        // Du rendu au processus principal et vice versa.
        'sendReceive': ['get-alarms', 'add-alarm', 'delete-alarm', 'handle-alarm-on-off']
    },
};

// Méthodes protégées exposées dans le processus de rendu.
contextBridge.exposeInMainWorld(
    // Méthodes 'ipcRenderer' autorisées.
    'ipcRender', {
        // Du rendu au processus principal.
        send: (channel: string, args?: any) => {
            const validChannels: string[] = ipc.render.send;
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, args);
            }
        },
        // Du processus principal au rendu.
        on: (channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) => {
            const validChannels = ipc.render.on;
            if (validChannels.includes(channel)) {
                // Retire délibérément l'événement car il inclut `sender`.
                ipcRenderer.on(channel, (event: IpcRendererEvent, ...args: any[]) => listener(event, ...args));
            }
        },
        // Du rendu au processus principal et vice versa.
        invoke: async (channel: string, args?: any) => {
            const validChannels = ipc.render.sendReceive;
            if (validChannels.includes(channel)) {
                return await ipcRenderer.invoke(channel, args);
            }
        }
    }
);