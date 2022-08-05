package com.ssafy.db.repository;


import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.Quiz;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface QuizRepository extends JpaRepository<Quiz, Integer>{
	Quiz findByQuizSeq(int quizSeq);
}
