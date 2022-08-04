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
				.build();
		System.out.println("-------------------------");
		System.out.println(tmp.getUrl());
		System.out.println(tmp.getRoomSize());
		System.out.println("temp : "+temp.getUrl());
		roomRepository.save(temp);
		return temp;
	}

	@Override
	public Room findRoomByRoomSeq(Long roomSeq) {
		Room room = roomRepository.findRoomByRoomSeq(roomSeq);
		return room;
	}

	@Override
	public Room endRoom(RoomEndPostReq eRoom) {
		Room room = Room.builder()
				.roomSeq(eRoom.getRoomSeq())
				.coupleSize(eRoom.getCoupleSize())
				.isActive(0)
				.build();
		
		roomRepository.save(room);
		return room;
	}
}
