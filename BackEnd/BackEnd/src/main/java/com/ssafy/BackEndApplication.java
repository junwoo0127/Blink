package com.ssafy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;

@SpringBootApplication

public class BackEndApplication {

	@Autowired
	static
	UserRepository userRepo;
	public static void test(User user) {
		userRepo.save(user);
		
	}

	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
		
		
		
		
		System.out.println("SS");
		User user =User.builder().user_id("dbwowo").password("1234").email("dbwowo@naver.com").build();
		
		test(user);
		
	}
	
	

}
