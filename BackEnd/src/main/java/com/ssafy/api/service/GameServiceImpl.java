package com.ssafy.api.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.PlayerEnterPostReq;
import com.ssafy.api.response.FinalResultRes;
import com.ssafy.api.response.FirstResultRes;
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
	
	@Autowired
	GameService gameService;

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
		player.setFirstChoice(voteSeq);
		playerRepository.save(player);
		return player;
	}

	@Override
	public Player voteFinalUpdate(Long playerSeq, Long voteSeq) {
		Player player = playerRepository.findByPlayerSeq(playerSeq);
		player.setFinalChoice(voteSeq);
		playerRepository.save(player);
		return player;
	}

	@Override
	public Player liarUpdate(Long playerSeq, int isLiar) {
		Player player = playerRepository.findByPlayerSeq(playerSeq);
		if(isLiar == 1) {
			player.setScore(1);
			player.setLiar(isLiar);
		}
		else {
			player.setScore(0);
			player.setLiar(isLiar);
		}
		
		player.setLiar(isLiar);
		playerRepository.save(player);
		return player;
	}

	@Override
	public int isFirstMatch(Long playerSeq) {
		Player originPlayer = playerRepository.findByPlayerSeq(playerSeq);
		Player nextPlayer = playerRepository.findByPlayerSeq(originPlayer.getFirstChoice());
		if (playerSeq == nextPlayer.getFirstChoice()) {
			originPlayer.setIsFirstMatch(1);
			playerRepository.save(originPlayer);
			return 1;
		}
		else {
			originPlayer.setIsFirstMatch(0);
			playerRepository.save(originPlayer);
			return 0;
		}
	}

	@Override
	public int isFinalMatch(Long playerSeq) {
		Player originPlayer = playerRepository.findByPlayerSeq(playerSeq);
		Player nextPlayer = playerRepository.findByPlayerSeq(originPlayer.getFinalChoice());
		System.out.println("-------------------"+playerSeq+" "+nextPlayer.getFinalChoice());
		if (playerSeq == (long)nextPlayer.getFinalChoice()) {
			originPlayer.setIsFinalMatch(1);
			playerRepository.save(originPlayer);
			return 1;
		}
		else {
			originPlayer.setIsFinalMatch(0);
			playerRepository.save(originPlayer);
			return 0;
		}
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

	@Override
	public Player initPlayer(PlayerEnterPostReq playerpost) {
		Player player = Player.builder().nickname(playerpost.getNickname()).gender(playerpost.getGender()).mbti(playerpost.getMbti())
				.type(playerpost.getType()).hobby(playerpost.getHobby()).build();
		
		return player;
	}
	
	@Override
	public List<FirstResultRes> getFirstVoteResultByRoomSeq(Long roomSeq) {
		List<Player> players = playerRepository.findAllByRoomSeq(roomSeq);
		List<FirstResultRes> res = new ArrayList<FirstResultRes>();
		for(Player p : players) {
			Player chosenOne = playerRepository.findByPlayerSeq(p.getFirstChoice());
			res.add(FirstResultRes.of(p, chosenOne));
		}
		return res;
	}

	@Override
	public List<FinalResultRes> getFinalVoteResultByRoomSeq(Long roomSeq) {
		List<Player> players = playerRepository.findAllByRoomSeq(roomSeq);
		List<FinalResultRes> res = new ArrayList<FinalResultRes>();
		for(Player p : players) {
			Player chosenOne = playerRepository.findByPlayerSeq(p.getFinalChoice());
			res.add(FinalResultRes.of(p, chosenOne));
		}
		return res;
	}

	@Override
	public List<FinalResultRes> getMatchedFinalVoteResultByRoomSeq(Long roomSeq) {
		List<Player> players = playerRepository.findAllByRoomSeq(roomSeq);
		List<FinalResultRes> res = new ArrayList<FinalResultRes>();
		HashMap<Long, Long> tmp = new HashMap<>(); //중복 방지로 사용할 해쉬맵
		for(Player p : players) {
			gameService.isFinalMatch(p.getPlayerSeq());
			//매칭되지 않은 사람은 저장하지 않음
			if(p.getIsFinalMatch() != 1) continue;
			//한 커플이 두 번 입력되는 경우를 방지
			if(tmp.containsKey(p.getPlayerSeq()) || tmp.containsValue(p.getPlayerSeq())) continue;
			Player chosenOne = playerRepository.findByPlayerSeq(p.getFinalChoice());
			tmp.put(p.getPlayerSeq(), chosenOne.getPlayerSeq());
			res.add(FinalResultRes.of(p, chosenOne));
		}
		return res;
	}

}
