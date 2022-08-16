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
	//플레이어 번호
	@ApiModelProperty(name="Player Sequence")
	Long playerSeq;
	//플레이어의 닉네임 ( PlayerSeq와 매칭되는 nickname)
	@ApiModelProperty(name="Player Nickname")
	String nickname;
	//PlayerSeq가 고른 첫인상 가장 좋은 사람의 번호
	@ApiModelProperty(name="First Choice")
	Long firstChoice;
	//firstChocie 받은 Player의 닉네임
	@ApiModelProperty(name="First Choice nickname")
	String firstChoiceNickname;
	public static FirstResultRes of(Player player, Player chosenOne) {
		FirstResultRes res = FirstResultRes.builder()
				.playerSeq(player.getPlayerSeq())
				.nickname(player.getNickname())
				.firstChoice(player.getFirstChoice())
				.firstChoiceNickname(chosenOne.getNickname())
				.build();
		return res;
	}
}
