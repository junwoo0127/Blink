package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RoomMakePostRequest")
public class RoomMakePostReq {
	@ApiModelProperty(name="방 주소", example="https://localhost8080")
	String url;
	@ApiModelProperty(name="최대 인원 수", example="6")
	int roomSize;
}
