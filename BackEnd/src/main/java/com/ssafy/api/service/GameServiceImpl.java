package com.ssafy.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.Quiz;
import com.ssafy.db.repository.PlayerRepository;
import com.ssafy.db.repository.QuizRepository;

@Service("gameService")
public class GameServiceImpl implements GameService {

	@Autowired
	PlayerRepository playerRepository;

	@Autowired
	QuizRepository quizRepository;

	@Override
	public Quiz mbtiQuiz(int quizSeq) {
		return quizRepository.findByQuizSeq(quizSeq);
	}

	@Override
	public Player scoreUpdate(Long playerSeq, Long liarSeq) {
		Player player = playerRepository.findByPlayerSeq(playerSeq);
		Player liarPlayer = playerRepository.findByPlayerSeq(liarSeq);

		if (liarPlayer.getLiar() == 1) {
			int nextScore = player.getScore() + 1;
			player.setScore(nextScore);
			playerRepository.save(player);
			return player;
		} else {
			int nextScore = player.getScore() - 1;
			player.setScore(nextScore);
			playerRepository.save(player);
			return player;
		}
	}

	@Override
	public Player voteFirstUpdate(Long playerSeq, Long voteSeq) {
		Player player = playerRepository.findByPlayerSeq(playerSeq);
		player.setFirstChoice(playerRepository.findByPlayerSeq(voteSeq));
		playerRepository.save(player);
		return player;
	}

	@Override
	public Player voteFinalUpdate(Long playerSeq, Long voteSeq) {
		Player player = playerRepository.findByPlayerSeq(playerSeq);
		player.setFinalChoice(playerRepository.findByPlayerSeq(voteSeq));
		playerRepository.save(player);
		return player;
	}

	@Override
	public Player liarUpdate(Long playerSeq, int isLiar) {
		Player player = playerRepository.findByPlayerSeq(playerSeq);
		if(isLiar == 1) player.setScore(1);
		else player.setScore(0);
		
		player.setLiar(isLiar);
		playerRepository.save(player);
		return player;
	}

	@Override
	public int isFirstMatch(Long playerSeq) {
		Player originPlayer = playerRepository.findByPlayerSeq(playerSeq);
		Player nextPlayer = originPlayer.getFirstChoice();
		if (playerSeq == nextPlayer.getPlayerSeq())
			return 1;
		else
			return 0;
	}

	@Override
	public int isFinalMatch(Long playerSeq) {
		Player originPlayer = playerRepository.findByPlayerSeq(playerSeq);
		Player nextPlayer = originPlayer.getFinalChoice();
		if (playerSeq == nextPlayer.getPlayerSeq())
			return 1;
		else
			return 0;
	}

	@Override
	public Player getTopRank(Long roomSeq) {
		List<Player> players = playerRepository.findAllByRoomSeq(roomSeq);
		Long playerSeq = null;
		int scr = Integer.MIN_VALUE;
		for(int i = 0; i<players.size(); i++) {
			if(scr < players.get(i).getScore()) {
				scr = players.get(i).getScore();
				playerSeq = players.get(i).getPlayerSeq();
			}
		}
		return playerRepository.findByPlayerSeq(playerSeq);
	}

}
