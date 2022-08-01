package com.ssafy.api.test;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.ssafy.api.dto.roomPlayer;
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

//		User user = User.builder().userId("dbwowo").password("1234").email("dbwowo@naver.com").build();	
//		Room root = Room.builder().admin(user).build();
//		Player p1= Player.builder().gender('M').nickname("김").build();
//		Player p2= Player.builder().gender('M').nickname("이").build();
//		Player p3= Player.builder().gender('M').nickname("박").build();
//		List<Player> p = new ArrayList<Player>();
//		p.add(p1);
//		p.add(p2);
//		p.add(p3);
//		root.setPlayers(p);
//		roomRepo.save(root);
		Room t =roomRepo.findById(6l).get();
		System.out.println(t.getPlayers().get(0).getNickname());
		t.getPlayers().get(0).setNickname("dd");
		
		System.out.println(t.getPlayers().get(0).getNickname());
		roomRepo.save(t);
		
		


		
	}
	
	@PostMapping
	public void roomtest(@RequestBody roomPlayer player ) {
		System.out.println("SSS");
		
		
		
		Room t =roomRepo.findById(player.getRoouNum()).get();
		List<Player>temp =t.getPlayers();
		temp.add(player.getPlayer());
		t.setPlayers(temp);
		roomRepo.save(t);
		
		

		
		
		
		
	}

}
