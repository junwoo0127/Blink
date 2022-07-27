package com.ssafy.db.entity;

import java.time.LocalDateTime;

import javax.persistence.*;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.*;

@Entity
@Table(name ="tbl_user")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
@EntityListeners(AuditingEntityListener.class)

public class User {
	
	@Id
	@Column(name = "user_seq")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name= "hobby")
	private String hobby;
	
	@Column(name = "id")
	private String userId;
	
	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Column(name = "pw")
	private String password;
	
	@Column(name ="reg_date",updatable = false)
	@CreatedDate
	private LocalDateTime reg_date;
	
	@Column(name ="email")
	private String email;
	
	@Column(name ="social")
	private String social;
	
	@Column(name="sign_out")
	private char signOut;
	
	@Column(name = "out_date")
	private LocalDateTime outDate;
	
	@Column(name = "nickname")
	private String nickname;
	
	@Column(name = "gender")
	private char gender;
	
	@Column(name = "mbti")
	private String mbti;
	
	@Column(name ="type")
	private String type;
	
	@Column(name = "first_match")
	private int firstMatch;
	
	@Column(name= "first_chosen")
	private int firstChosen;
	
	@Column (name= "final_match")
	private int finalMatch;
	
	@Column (name= "final_chosen")
	private int finalChosen;
	
	@Column (name= "match_size")
	private int matchSize;
	
	@Column (name= "certi")
	private int certi;
	
	
	@Column (name= "certi_key")
	private String certiKey;



	
	
	
	
	
	
	

	
	
}
