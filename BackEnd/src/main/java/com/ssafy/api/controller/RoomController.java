package com.ssafy.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.RoomEndPostReq;
import com.ssafy.api.request.RoomMakePostReq;
import com.ssafy.api.response.RoomRes;
import com.ssafy.api.service.RoomService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;

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
	UserService userService;
	
	@PostMapping("")
	@ApiOperation(value = "유저 방 만들기", notes = "로그인한 회원 본인의 정보를 응답한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<RoomRes> createRoomByUser(
			@RequestBody RoomMakePostReq roomMakePostReq,
			@ApiIgnore Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userId = userDetails.getUsername();
		User user = userService.getUserByUserId(userId);
		Room room = roomService.makeRoom(roomMakePostReq, user);
		return ResponseEntity.status(200).body(RoomRes.of(room));
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

}
