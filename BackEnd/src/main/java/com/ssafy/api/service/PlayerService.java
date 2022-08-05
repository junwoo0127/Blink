package com.ssafy.api.service;

import com.ssafy.api.request.PlayerEnterPostReq;
import com.ssafy.db.entity.Player;

public interface PlayerService {
	Player findPlayerByPlayerSeq(Long id);
	Player enterPlayer(PlayerEnterPostReq player);
	Player updatePlayer(Player player);
	void liarUpdate(Player player);
}
