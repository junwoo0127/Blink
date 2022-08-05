package com.ssafy.api.service;

import org.checkerframework.checker.units.qual.s;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.db.entity.Player;
import com.ssafy.db.repository.PlayerRepository;

@Service("playerService")
public class PlayerServiceImpl implements PlayerService {

	@Autowired
	PlayerRepository playerRepository;
	
	@Override
	public Player enterPlayer(Player player) {
		Player tmp = Player.builder()
				.roomSeq(player.getRoomSeq())
				.userSeq(player.getUserSeq())
				.nickname(player.getNickname())
				.gender(player.getGender())
				.mbti(player.getMbti())
				.type(player.getType())
				.hobby(player.getHobby())
				.build();
		playerRepository.save(tmp);
		return tmp;
	}

	@Override
	public Player updatePlayer(Player player) {
		selectedPlayer.setFirstChoice(player.getFirstChoice());
		selectedPlayer.setFinalChoice(player.getFinalChoice());
		selectedPlayer.setIsfinalMatch(player.getIsfinalMatch());
		selectedPlayer.setIsfirstMatch(player.getIsfirstMatch());
		playerRepository.save(selectedPlayer);
		return null;
	}

	@Override
	public void liarUpdate(Player player) {
		Player tmp = playerRepository.findByPlayerSeq(player.getId());
		tmp.setLiar(player.getLiar());
		playerRepository.save(tmp);
	}

}
