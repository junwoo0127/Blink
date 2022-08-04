package com.ssafy.api.service;

import com.ssafy.api.request.RoomEndPostReq;
import com.ssafy.api.request.RoomMakePostReq;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;

public interface RoomService {

	Room makeRoom(RoomMakePostReq roomMakePostReq, User user);
	Room endRoom(RoomEndPostReq roomEndPostReq);
	Room findRoomByRoomSeq(Long roomSeq);
}
