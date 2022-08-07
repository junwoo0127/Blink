package com.ssafy.api.response;

import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@ApiModel("RoomResponse")
public class RoomRes {
	
	@ApiModelProperty(name = "Room Seq")
	Long roomSeq;
	@ApiModelProperty(name = "방 생성자 정보")
	User user;
	@ApiModelProperty(name = "방 접속 주소")
	String url;
	@ApiModelProperty(name = "방 사이즈")
	int roomSize;
	@ApiModelProperty(name = "활성화 여부")
	int isActive;
	public static RoomRes of(Room room) {
		RoomRes res = RoomRes.builder()
				.roomSeq(room.getRoomSeq())
				.user(room.getAdmin())
				.url(room.getUrl())
				.isActive(1)
				.build();
		return res;
	}
}
