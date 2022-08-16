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
	@ApiModelProperty(name="Final Choice")
	Long finalChoice;
	
	public static FinalResultRes of(Player player) {
		FinalResultRes res = FinalResultRes.builder()
				.playerSeq(player.getPlayerSeq())
				.finalChoice(player.getFinalChoice())
				.build();
		return res;
	}
}
