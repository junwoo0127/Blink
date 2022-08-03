package com.ssafy.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.RoomRepository;

@Service("roomService")
public class RoomServiceImpl implements RoomService {
	@Autowired
	RoomRepository roomRepository;
	
	@Override
	public Room makeRoom(User user, int size) {
		
		Room temp = Room.builder().admin(user).size(size).build();
		roomRepository.save(temp);
		
		return temp;
	}

	
	
}
