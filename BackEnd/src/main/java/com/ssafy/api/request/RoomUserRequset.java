package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RoomUserRequset")
public class RoomUserRequset {
	
	RoomMakePostReq room;
	
	
	PlayerEnterPostReq player;
}
