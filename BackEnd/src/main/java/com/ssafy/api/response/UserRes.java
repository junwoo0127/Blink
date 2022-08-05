package com.ssafy.api.response;

import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel("UserResponse")
public class UserRes{
	@ApiModelProperty(name="User ID")
	String userId;
	@ApiModelProperty(name="hobby")
	String hobby;
	@ApiModelProperty(name="email")
	String email;
	@ApiModelProperty(name="nickname")
	String nickname;
	@ApiModelProperty(name="gender")
	char gender;
	@ApiModelProperty(name="mbti")
	String mbti;
	@ApiModelProperty(name="이상형")
	String type;
	
	public static UserRes of(User user) {
		UserRes res = UserRes.builder()
				.userId(user.getUserId())
				.email(user.getEmail())
				.hobby(user.getHobby())
				.mbti(user.getMbti())
				.type(user.getType())
				.gender(user.getGender())
				.build();
		return res;
	}
}
