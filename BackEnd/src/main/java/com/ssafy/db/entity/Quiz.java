package com.ssafy.db.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name ="tbl_quiz")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
@DynamicUpdate
public class Quiz {
	
	@Id
	@Column(name = "quiz_seq")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int quizSeq;
	
	@Column(name = "question")
	private String question;


	@Column(name = "answer_a")
	private String answerA;


	@Column(name = "answer_b")
	private String answerB;
	
	@Column(name = "type")
	private String type;
	
	
	
	

}
