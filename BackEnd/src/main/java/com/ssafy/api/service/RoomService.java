package com.ssafy.api.service;

import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;

public interface RoomService {

	Room makeRoom(User user, int size);
}
