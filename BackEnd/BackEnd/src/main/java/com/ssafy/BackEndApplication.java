package com.ssafy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;

@SpringBootApplication
@EnableJpaAuditing

public class BackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
		
	}
	
	

}
