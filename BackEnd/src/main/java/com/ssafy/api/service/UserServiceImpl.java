package com.ssafy.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserRes;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	UserService userService;
	
	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		User user = new User();
		
		user.setUserId(userRegisterInfo.getId());
		System.out.println(userRegisterInfo.getId());
		
		user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
		user.setEmail(userRegisterInfo.getEmail());
		return userRepository.save(user);
	}

	@Override
	public User getUserByUserId(String userId) {
		User user = userRepository.findUserByUserId(userId);
		return user;
	}
	
	@Override
	public boolean idcheck(String userId) {
		boolean count = userRepository.existsByUserId(userId);
		return count;
	}
	@Override
	public boolean emailcheck(String email) {
		boolean count = userRepository.existsByEmail(email);
		return count;
	}

	@Override
	public void emailStatusUpdate(String userId) {
		
	}
	
	@Override
	public User findUserByEmail(String email) {
		return userRepository.findUserByEmail(email);
	}

	@Override
	public User certificated(User user) {
		user.setCerti(1);
		return userRepository.save(user);
	}

	@Override
	public UserRes setUserInfo(User user, UserRes userRes) {
		User tmpUser = userRepository.findUserByUserId(user.getUserId());
		tmpUser.setUserId(userRes.getUserId());
		tmpUser.setHobby(userRes.getHobby());
		tmpUser.setEmail(userRes.getEmail());
		tmpUser.setNickname(userRes.getNickname());
		tmpUser.setGender(userRes.getGender());
		tmpUser.setMbti(userRes.getMbti());
		tmpUser.setType(userRes.getType());
		userRepository.save(tmpUser);
		return UserRes.of(tmpUser);
	}

	@Override
	public UserRes getUserInfo(String userId) {
		User user = userService.getUserByUserId(userId);
		UserRes userInfo = UserRes.of(user);
		return userInfo;
	}
	
}
