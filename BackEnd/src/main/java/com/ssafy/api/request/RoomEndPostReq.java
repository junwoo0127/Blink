package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RoomEndPostRequest")
public class RoomEndPostReq {
	@ApiModelProperty(name="매칭된 커플의 수", example="1")
	int coupleSize;
	@ApiModelProperty(name="방 번호", example="100")
	Long roomSeq;
}
