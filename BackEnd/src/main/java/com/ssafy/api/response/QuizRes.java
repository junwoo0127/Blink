package com.ssafy.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("quizRes")
public class QuizRes {
	@ApiModelProperty(name="question")
	String question;
	@ApiModelProperty(name="answerA")
	String answerA;
	@ApiModelProperty(name="answerB")
	String answerB;
	
	public static QuizRes of(String question, String answerA, String answerB) {
		QuizRes quizRes = new QuizRes();
		quizRes.setQuestion(question);
		quizRes.setAnswerA(answerA);
		quizRes.setAnswerB(answerB);
		return quizRes;
	}
}
