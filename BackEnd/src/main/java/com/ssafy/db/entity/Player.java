package com.ssafy.db.entity;

import java.time.LocalDateTime;

import javax.persistence.*;


import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name ="tbl_player")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate

public class Player {
	
	
	@Id
	@Column(name = "player_seq")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long playerSeq;
	
	@Column(name= "room_seq")
	private Long roomSeq;

	@Column(name= "user_seq")
	private Long userSeq;

	@Column(name = "nickname")
	private String nickname;
	
	@Column(name= "gender")
	private char gender;
	
	@Column(name = "mbti")
	private String mbti;
	
	@Column(name ="type")
	private String type;
	
	@Column(name ="hobby")
	private String hobby;
	
	
	@Column(name ="reg_date",updatable = false)
	@CreatedDate
	private LocalDateTime regDate;
	

	@OneToOne
	@JoinColumn(name ="first_choice" , insertable = false, updatable = false)
	private Player firstChoice;

	@OneToOne
	@JoinColumn(name ="final_choice", insertable = false, updatable = false)
	private Player finalChoice;

	@Column(name = "is_first_match")
	private int isfirstMatch;
	
	@Column(name ="is_final_match")
	private int isfinalMatch;
	
	@Column(name ="liar")
	private int liar;
	
	
	
	

}
