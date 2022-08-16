package com.ssafy.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.response.FinalResultRes;
import com.ssafy.api.response.FirstResultRes;
import com.ssafy.api.response.QuizRes;
import com.ssafy.api.service.GameService;
import com.ssafy.api.service.PlayerService;
import com.ssafy.api.service.RoomService;
import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.Quiz;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value = "gameController")
@RestController
@RequestMapping("/api/v1/game")
public class GameController {

	@Autowired
	PlayerService playerService;

	@Autowired
	GameService gameService;

	@Autowired
	RoomService roomService;

	@GetMapping("/voteFirst")
	@ApiOperation(value = "첫인상 투표", notes = "첫 인상 호감도 가장 높은 사람을 투표한다.")
	public ResponseEntity<Player> voteFirst(@RequestParam Long playerSeq, @RequestParam Long firstChoice) {
		Player player = gameService.voteFirstUpdate(playerSeq, firstChoice);
		return ResponseEntity.status(200).body(player);
	}

	@GetMapping("/voteFinal")
	@ApiOperation(value = "최종 투표", notes = "첫 인상 호감도 가장 높은 사람을 투표한다.")
	public ResponseEntity<Player> voteFinal(@RequestParam Long playerSeq, @RequestParam Long finalChoice) {
		Player player = gameService.voteFinalUpdate(playerSeq, finalChoice);
		return ResponseEntity.status(200).body(player);
	}

	@GetMapping("/isFirstMatch")
	@ApiOperation(value = "첫인상 결과", notes = "매칭이 되었는지 여부를 반환한다.")
	public ResponseEntity<Integer> isFirstMatch(@RequestParam Long playerSeq) {
		int result = gameService.isFirstMatch(playerSeq);
		return ResponseEntity.status(200).body(result);
	}

	@GetMapping("/isFinalMatch")
	@ApiOperation(value = "최종선택 결과", notes = "최종 매칭이 되었는지 여부를 반환한다.")
	public ResponseEntity<Integer> isFinalMatch(@RequestParam Long playerSeq) {
		int result = gameService.isFinalMatch(playerSeq);
		return ResponseEntity.status(200).body(result);
	}

	@GetMapping("/isLiar")
	@ApiOperation(value = "거짓말쟁이 여부 갱신", notes = "1이면 거짓말쟁이, 0이면 아님.")
	public ResponseEntity<String> updateLiar(@RequestParam Long playerSeq, @RequestParam int isLiar) {
		gameService.liarUpdate(playerSeq, isLiar);
		return ResponseEntity.status(200).body("업데이트 성공");
	}

	@GetMapping("/vote")
	@ApiOperation(value = "거짓말쟁이 투표", notes = "정답 여부에 따라 점수 갱신.")
	public ResponseEntity<Player> voteLiar(@RequestParam Long playerSeq, @RequestParam Long liarSeq) {
		Player player = gameService.scoreUpdate(playerSeq, liarSeq);
		return ResponseEntity.status(200).body(player);
	}

	@GetMapping("/mbti")
	@ApiOperation(value = "MBTI 질문지 배부", notes = "질문지와 선택지 배부.")
	public ResponseEntity<QuizRes> getQuestion(@RequestParam int quizSeq) {
		Quiz quiz = gameService.mbtiQuiz(quizSeq);
		return ResponseEntity.status(200).body(QuizRes.of(quiz.getQuestion(), quiz.getAnswerA(), quiz.getAnswerB()));
	}
	
	@GetMapping("/rank")
	@ApiOperation(value = "1등 찾기", notes = "1등 Player 반환")
	public ResponseEntity<Player> getTopRank(@RequestParam Long roomSeq) {
		return ResponseEntity.status(200).body(gameService.getTopRank(roomSeq));
	}
	
	@GetMapping("/resultFirst")
	@ApiOperation(value = "첫인상 결과지", notes = "해당 방 안의 첫인상 투표 결과 반환")
	public ResponseEntity<List<FirstResultRes>> resultFirstChocie(@RequestParam Long roomSeq) {
		return ResponseEntity.status(200).body(gameService.getFirstVoteResultByRoomSeq(roomSeq));
	}
	
	@GetMapping("/resultFinal")
	@ApiOperation(value = "최종 결과지", notes = "해당 방 안의 최종 투표 결과 반환")
	public ResponseEntity<List<FinalResultRes>> resultFinalChocie(@RequestParam Long roomSeq) {
		return ResponseEntity.status(200).body(gameService.getFinalVoteResultByRoomSeq(roomSeq));
	}
	
	@GetMapping("/matchedFinal")
	@ApiOperation(value = "커플 결과지", notes = "해당 방 안에서 매칭된 사람들의 정보 반환")
	public ResponseEntity<List<FinalResultRes>> matchedFinalChocie(@RequestParam Long roomSeq) {
		return ResponseEntity.status(200).body(gameService.getMatchedFinalVoteResultByRoomSeq(roomSeq));
	}
}
