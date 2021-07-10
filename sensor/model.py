from dataclasses import dataclass


@dataclass
class LevelState:
    mainPumpSensor1Underwater: bool
    mainPumpSensor2Underwater: bool
    backupPumpSensor1Underwater: bool
    backupPumpSensor2Underwater: bool
    floodAlarmSensor1Underwater: bool
    floodAlarmSensor2Underwater: bool
