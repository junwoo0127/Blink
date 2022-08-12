package com.ssafy.api.response;

import com.ssafy.db.entity.Player;
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
@ApiModel("RoomPlayerRes")

public class RoomPlayerRes {
	
	
	@ApiModelProperty(name="question")
	Long Roomseq;
	@ApiModelProperty(name="answerA")
	Long PlayerSeq;
	@ApiModelProperty(name="answerB")
	String URL;
	
	public static RoomPlayerRes of(Player player , Room room) {
		RoomPlayerRes res = RoomPlayerRes.builder().Roomseq(room.getRoomSeq()).URL(room.getUrl()).
				PlayerSeq(player.getPlayerSeq()).build();
		return res;
	}

}
