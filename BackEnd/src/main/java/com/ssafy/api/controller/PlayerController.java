package com.ssafy.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.PlayerEnterPostReq;
import com.ssafy.api.service.PlayerService;
import com.ssafy.db.entity.Player;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api("Player 관련 API")
@RestController
@RequestMapping("/api/v1/players")
public class PlayerController {
	
	@Autowired
	PlayerService playerService;
	
	@PostMapping("")
	@ApiOperation(value = "플레이어 입장 시 기본 정보 저장", notes = "Player 객체를 저장한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공")})
	public ResponseEntity<Player> enterRoom(@RequestBody PlayerEnterPostReq playerEnterPostReq) {
		Player player = playerService.findPlayerByPlayerSeq(playerEnterPostReq.getId());
		playerService.enterPlayer(playerEnterPostReq);
		return ResponseEntity.status(200).body(player);
	}
	
	@GetMapping("")
	@ApiOperation(value = "플레이어 정보 반환", notes = "Player 객체를 저장한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공")})
	public ResponseEntity<Player> enterRoom(@RequestParam Long playerSeq) {
		Player player = playerService.findPlayerByPlayerSeq(playerSeq);
		return ResponseEntity.status(200).body(player);
	}
}
