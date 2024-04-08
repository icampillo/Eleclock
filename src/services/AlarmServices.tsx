const ipcRender = window.ipcRender;

export const getAlarms = async () => {
  try {
    const result = await ipcRender.invoke('get-alarms');
    return result;
  } catch (error) {
    console.error('Error fetching alarms:', error);
    throw error;
  }
};

export const deleteAlarm = async (id: number) => {
  try {
    await ipcRender.invoke('delete-alarm', { id });
  } catch (error) {
    console.error('Error deleting alarm:', error);
    throw error;
  }
};

export const addAlarm = async (time:Date) => {
  try {
    await ipcRender.invoke('add-alarm', { time });
  } catch (error) {
    console.error('Error adding alarm:', error);
    throw error;
  }
};

export const handleAlarmOnOff = async (id: number, is_active: boolean) => {
  try {
    return ipcRender.invoke('handle-alarm-on-off', { id, is_active });
  } catch (error) {
    console.error('Error adding alarm:', error);
    throw error;
  }
}