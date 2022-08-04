package com.ssafy.db.repository;

import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.Room;

import org.kurento.client.internal.server.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RoomRepository extends JpaRepository<Room, Long>{
	Room findRoomByRoomSeq(@Param("room_seq") Long roomSeq);
}
