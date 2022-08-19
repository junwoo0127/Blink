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
@ApiModel("FinalResultResponse")
public class FinalResultRes {
	@ApiModelProperty(name="Player Sequence")
	Long playerSeq;
	@ApiModelProperty(name="player nickname")
	String nickname;
	@ApiModelProperty(name="Final Choice PlayerSeq")
	Long finalChoice;
	//FinalChocie 받은 Player의 닉네임
	@ApiModelProperty(name="Final Choice nickname")
	String finalChoiceNickname;
	
	public static FinalResultRes of(Player player, Player chosenOne) {
		FinalResultRes res = FinalResultRes.builder()
				.playerSeq(player.getPlayerSeq())
				.nickname(player.getNickname())
				.finalChoice(player.getFinalChoice())
				.finalChoiceNickname(chosenOne.getNickname())
				.build();
		return res;
	}
}
