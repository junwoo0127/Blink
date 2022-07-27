package com.ssafy.db.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name ="tbl_room")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate

public class Room {
	
	@Id
	@Column(name = "room_seq")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name ="user_seq")
	private User admin;
	
	@Column(name = "url")
	private String url;
	
	@Column(name = "size")
	private int size;
	
	@Column(name ="reg_date",updatable = false)
	@CreatedDate
	private LocalDateTime reg_date;
	
	@Column(name = "out_date")
	private LocalDateTime out_date;
	
	@Column(name = "couple_size")
	private int couple_size;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "room_seq")
	private List<Player> players = new ArrayList<>();

}
