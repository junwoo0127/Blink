package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("PlayerEnterPostReq")
public class PlayerEnterPostReq {
	@ApiModelProperty(name="입장하는 방 번호", example = "5")
	Long roomSeq;
	@ApiModelProperty(name="유저 번호, 비회원이라면 NULL", example = "5")
	Long userSeq;
	@ApiModelProperty(name="player 번호", example = "5")
	Long id;
	@ApiModelProperty(name="닉네임", example = "HOONDOC")
	String nickname;
	@ApiModelProperty(name="성별", example = "M")
	char gender;
	@ApiModelProperty(name="본인 MBTI", example = "ESTP")
	String mbti;
	@ApiModelProperty(name="이상형", example = "김채원")
	String type;
	@ApiModelProperty(name="취미", example = "jogging")
	String hobby;
}
