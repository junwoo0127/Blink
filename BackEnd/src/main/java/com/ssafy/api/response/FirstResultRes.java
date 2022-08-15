package com.ssafy.api.response;

import com.ssafy.db.entity.Player;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel("FirstResultResponse")
public class FirstResultRes {
	@ApiModelProperty(name="Player Sequence")
	Long playerSeq;
	@ApiModelProperty(name="First Choice")
	Long firstChoice;
	
	public static FirstResultRes of(Player player) {
		FirstResultRes res = FirstResultRes.builder()
				.playerSeq(player.getPlayerSeq())
				.firstChoice(player.getFirstChoice())
				.build();
		return res;
	}
}
