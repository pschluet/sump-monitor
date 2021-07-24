from web_client import WebClient
from model import LevelState
import RPi.GPIO as gpio
import time
import logging
import traceback

logging.basicConfig(
    format="%(asctime)s.%(msecs)03d %(levelname)-8s %(message)s",
    level=logging.INFO,
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger("main")

web_client = WebClient()

gpio.setmode(gpio.BOARD)


# RPi Pins: https://pinout.xyz/pinout/pin19_gpio10
float_switch_1a = 7  # Low 1 - RPi Board Pin 7
float_switch_1b = 13  # Low 2
float_switch_2a = 31  # Mid 1
float_switch_2b = 36  # Mid 2
float_switch_3a = 22  # High 1
float_switch_3b = 18  # High 2

channel_map = {
    float_switch_1a: "1A",
    float_switch_1b: "1B",
    float_switch_2a: "2A",
    float_switch_2b: "2B",
    float_switch_3a: "3A",
    float_switch_3b: "3B",
}


def handle_change(channel: int):
    changed_pin_state = "DOWN" if gpio.input(channel) else "UP"
    log.info(f"{channel_map[channel]} changed {changed_pin_state}")

    state = LevelState(
        mainPumpSensor1Underwater=not gpio.input(float_switch_1a),
        mainPumpSensor2Underwater=not gpio.input(float_switch_1b),
        backupPumpSensor1Underwater=not gpio.input(float_switch_2a),
        backupPumpSensor2Underwater=not gpio.input(float_switch_2b),
        floodAlarmSensor1Underwater=not gpio.input(float_switch_3a),
        floodAlarmSensor2Underwater=not gpio.input(float_switch_3b),
    )

    web_client.create_level_state(state)


def main():
    log.info("started")
    gpio.setup(list(channel_map.keys()), gpio.IN, pull_up_down=gpio.PUD_DOWN)

    for channel in channel_map.keys():
        gpio.add_event_detect(channel, gpio.BOTH, callback=handle_change)

    while True:
        web_client.phone_home()
        time.sleep(60 * 5)


if __name__ == "__main__":
    while True:
        try:
            main()
        except:
            log.error(traceback.format_exc())
        finally:
            log.info("stopped")
            gpio.cleanup(list(channel_map.keys()))
            time.sleep(5)
