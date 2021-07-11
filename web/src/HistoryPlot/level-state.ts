export interface LevelState {
  date: string; // yyyy-MM-dd
  timestamp: number; // epoch milliseconds
  mainPumpSensor1Underwater: boolean;
  mainPumpSensor2Underwater: boolean;
  backupPumpSensor1Underwater: boolean;
  backupPumpSensor2Underwater: boolean;
  floodAlarmSensor1Underwater: boolean;
  floodAlarmSensor2Underwater: boolean;
}
