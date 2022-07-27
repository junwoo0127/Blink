package com.ssafy.api.test;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.Room;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.PlayerRepository;
import com.ssafy.db.repository.RoomRepository;
import com.ssafy.db.repository.UserRepository;


@RestController
@RequestMapping("/test")

public class testController {
	
	@Autowired
	private  UserRepository userRepo;
	
	@Autowired
	private  PlayerRepository playerRepo;
	
	@Autowired
	private RoomRepository roomRepo;
	

	@GetMapping
	public void test() {
		System.out.println("SS");

		User user = User.builder().userId("dbwowo").password("1234").email("dbwowo@naver.com").build();	
		userRepo.save(user);


		
	}
	
	@PostMapping
	public void roomtest(@RequestBody Player player) {
		System.out.println("SSS");
		System.out.println(player.getNickname());
		
		
	}

}
