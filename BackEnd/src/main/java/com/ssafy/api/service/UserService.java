package com.ssafy.api.service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserRes;
import com.ssafy.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserId(String userId);
	boolean idcheck(String userId);
	boolean emailcheck(String userId);
	void emailStatusUpdate(String userId);
	User findUserByEmail(String email);
	
	UserRes setUserInfo(User user, UserRes userRes);
	UserRes getUserInfo(String userId);
	public User certificated(User user);
}


