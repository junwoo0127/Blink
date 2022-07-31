package com.ssafy.api.response;

import com.ssafy.db.entity.Room;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RoomResponse")
public class RoomRes {
	
	@ApiModelProperty(name = "Room Seq")
	Long roomSeq;
	public static RoomRes of(Room room) {
		RoomRes res = new RoomRes();
		res.setRoomSeq(room.getId());
		return res;
	}
	
}
