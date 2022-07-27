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
	private Long id;
	
	@Column(name= "room_seq")
	private Long room_seq;
	

	@Column(name= "user_seq")
	private Long user_seq;

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
	private LocalDateTime reg_date;
	
	@OneToOne
	@JoinColumn(name ="first_choice" , insertable = false, updatable = false)
	private Player first_choice;
	
	@OneToOne
	@JoinColumn(name ="final_choice", insertable = false, updatable = false)
	private Player final_choice;
	
	@Column(name = "is_first_match")
	private int is_first_match;
	
	@Column(name ="is_final_match")
	private int is_final_match;
	
	@Column(name ="liar")
	private int liar;
	
	
	
	

}
