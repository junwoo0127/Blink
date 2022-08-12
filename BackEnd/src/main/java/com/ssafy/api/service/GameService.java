package com.ssafy.api.service;

import com.ssafy.api.request.PlayerEnterPostReq;
import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.Quiz;

public interface GameService {
	Player voteFirstUpdate(Long playerSeq, Long voteSeq);
	Player voteFinalUpdate(Long playerSeq, Long voteSeq);
	Player liarUpdate(Long playerSeq, int isLiar);

	int isFirstMatch(Long playerSeq);
	int isFinalMatch(Long playerSeq);

	Quiz mbtiQuiz(int quizSeq);
	Player scoreUpdate(Long playerSeq, Long liarSeq);
	
	Player getTopRank(Long roomSeq);
	Player initPlayer(PlayerEnterPostReq playerpost);
}
