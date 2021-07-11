from model import LevelState
from dataclasses import asdict
import requests


class WebClient:
    base_url = "https://sump.pauldev.io"

    def __init__(self) -> None:
        self.headers = {"x-api-key": self.__get_api_key()}

    def __get_api_key(self) -> str:
        with open("token.txt") as f:
            return f.read()

    def phone_home(self) -> bool:
        result = requests.post(
            url=f"{self.base_url}/phoneHome", json={}, headers=self.headers
        )
        return result.status_code == 200

    def create_level_state(self, level_state: LevelState) -> bool:
        result = requests.post(
            url=f"{self.base_url}/levelState",
            json=asdict(level_state),
            headers=self.headers,
        )
        return result.status_code == 200
