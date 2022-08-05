package com.ssafy.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.PlayerEnterPostReq;
import com.ssafy.db.entity.Player;
import com.ssafy.db.repository.PlayerRepository;

@Service("playerService")
public class PlayerServiceImpl implements PlayerService {

	@Autowired
	PlayerRepository playerRepository;
	
	@Override
	public Player enterPlayer(PlayerEnterPostReq player) {
		
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
		Player selectedPlayer = playerRepository.findByPlayerSeq(player.getPlayerSeq());
		selectedPlayer.setFirstChoice(player.getFirstChoice());
		selectedPlayer.setFinalChoice(player.getFinalChoice());
		selectedPlayer.setIsFinalMatch(player.getIsFinalMatch());
		selectedPlayer.setIsFirstMatch(player.getIsFirstMatch());
		playerRepository.save(selectedPlayer);
		return selectedPlayer;
	}

	@Override
	public void liarUpdate(Player player) {
		Player tmp = playerRepository.findByPlayerSeq(player.getPlayerSeq());
		tmp.setLiar(player.getLiar());
		playerRepository.save(tmp);
	}

	@Override
	public Player findPlayerByPlayerSeq(Long id) {
		return playerRepository.findByPlayerSeq(id);
	}

}
