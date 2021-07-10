export default {
  type: 'object',
  properties: {
    mainPumpSensor1Underwater: { type: 'boolean' },
    mainPumpSensor2Underwater: { type: 'boolean' },
    backupPumpSensor1Underwater: { type: 'boolean' },
    backupPumpSensor2Underwater: { type: 'boolean' },
    floodAlarmSensor1Underwater: { type: 'boolean' },
    floodAlarmSensor2Underwater: { type: 'boolean' },
  },
  required: [
    'mainPumpSensor1Underwater',
    'mainPumpSensor2Underwater',
    'backupPumpSensor1Underwater',
    'backupPumpSensor2Underwater',
    'floodAlarmSensor1Underwater',
    'floodAlarmSensor2Underwater',
  ],
} as const;
