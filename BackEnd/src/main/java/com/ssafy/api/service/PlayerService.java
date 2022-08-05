package com.ssafy.api.service;

import com.ssafy.db.entity.Player;

public interface PlayerService {
	Player enterPlayer(Player player);
	Player updatePlayer(Player player);
	void liarUpdate(Player player);
}
