import RPi.GPIO as gpio
import time

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
    state = "DOWN" if gpio.input(channel) else "UP"
    print(f"{channel_map[channel]} changed {state}!")


def main():
    gpio.setup(list(channel_map.keys()), gpio.IN, pull_up_down=gpio.PUD_DOWN)

    for channel in channel_map.keys():
        gpio.add_event_detect(channel, gpio.BOTH, callback=handle_change)

    while True:
        time.sleep(0.3)


if __name__ == "__main__":
    try:
        main()
    finally:
        gpio.cleanup(list(channel_map.keys()))
