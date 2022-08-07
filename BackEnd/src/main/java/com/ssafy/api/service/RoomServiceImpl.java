package com.ssafy.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.RoomEndPostReq;
import com.ssafy.api.request.RoomMakePostReq;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.RoomRepository;

@Service("roomService")
public class RoomServiceImpl implements RoomService {
	@Autowired
	RoomRepository roomRepository;

	@Override
	public Room makeRoom(RoomMakePostReq roomMakePostReq, User user) {
		RoomMakePostReq tmp = roomMakePostReq;
		Room temp = Room.builder()
				.url(tmp.getUrl())
				.size(tmp.getRoomSize())
				.admin(user)
				.isActive(1)
				.build();
		roomRepository.save(temp);
		return temp;
	}

	@Override
	public Room findRoomByRoomSeq(Long roomSeq) {
		Room room = roomRepository.findByRoomSeq(roomSeq);
		return room;
	}

	@Override
	public Room endRoom(RoomEndPostReq eRoom) {
		Room room = roomRepository.findByRoomSeq(eRoom.getRoomSeq());
		room.setCoupleSize(eRoom.getCoupleSize());
		room.setIsActive(0);
		roomRepository.save(room);
		return room;
	}
}
