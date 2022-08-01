package com.ssafy.api.dto;

import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class roomPlayer {
	Player player;
	long roouNum;
}
