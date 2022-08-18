package com.ssafy.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.PlayerEnterPostReq;
import com.ssafy.api.request.RoomEndPostReq;
import com.ssafy.api.request.RoomMakePostReq;
import com.ssafy.api.request.RoomUserRequset;
import com.ssafy.api.response.RoomPlayerRes;
import com.ssafy.api.response.RoomRes;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.service.GameService;
import com.ssafy.api.service.RoomService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.PlayerRepository;
import com.ssafy.db.repository.RoomRepository;
import com.ssafy.util.JwtTokenUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "방만들기 API" )
@RestController
@RequestMapping("/api/v1/rooms")
public class RoomController {
	
	@Autowired
	RoomService roomService;
	@Autowired
	RoomRepository roomRepository;
	@Autowired
	PlayerRepository playerRepository;
	@Autowired
	UserService userService;
	
	@Autowired
	GameService gameService;
	
	@PostMapping("")
	@ApiOperation(value = "유저 방 만들기", notes = "로그인한 회원 본인의 정보를 응답한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<RoomPlayerRes> createRoomByUser(
			@RequestBody RoomUserRequset room,
			@ApiIgnore Authentication authentication) {
		System.out.println(authentication);
		RoomMakePostReq initroomreq = room.getRoom(); 
		PlayerEnterPostReq player =room.getPlayer();
		Player init_player = gameService.initPlayer(player);
		System.out.println(init_player.getHobby());
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		Long userseq =userDetails.getUser().getId();
		init_player.setUserSeq(userseq);
		Room init_room = Room.builder().admin(userDetails.getUser()).size(initroomreq.getRoomSize()).isActive(1).build();
		roomService.initRoom(init_room, init_player , userDetails);
		return ResponseEntity.status(200).body(RoomPlayerRes.of(init_player,init_room ));
		
		
		
		
	}
	
	
	@PostMapping("/enter")
	@ApiOperation(value = "방들어가기", notes = "로그인한 회원 본인의 정보를 응답한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<RoomPlayerRes> EnterRoom(
			@RequestBody RoomUserRequset room) {

		RoomMakePostReq initroomreq = room.getRoom(); 
		PlayerEnterPostReq player =room.getPlayer();
		Player init_player = gameService.initPlayer(player);
		System.out.println(init_player.getHobby());
		
		Room init_room =roomService.findRoomByRoomSeq(Long.parseLong(initroomreq.getUrl()));
		init_player.setRoomSeq(Long.parseLong(initroomreq.getUrl()));
		playerRepository.save(init_player);
		System.out.println(init_player.getPlayerSeq());
		return ResponseEntity.status(200).body(RoomPlayerRes.of(init_player,init_room ));
		
		
		
		
	}
	
	@PutMapping("")
	@ApiOperation(value = "방 종료", notes = "tbl_room의 is_active를 0으로 바꾼다") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Room> deactiveRoomByUser(@ApiIgnore Authentication authentication,
			@RequestBody RoomEndPostReq endRoom) {
		Room room = roomService.endRoom(endRoom);
		return ResponseEntity.status(200).body(room);
	}
	
	@GetMapping("roomSize")
	@ApiOperation(value = "방 크기 반환", notes = "tbl_room의 size를 반환") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<Integer> getRoomSize(@RequestParam Long roomSeq) {
		int roomSize = roomService.findRoomByRoomSeq(roomSeq).getSize();
		return ResponseEntity.status(200).body(roomSize);
	}

}
