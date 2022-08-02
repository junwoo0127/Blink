package com.ssafy.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.service.MailAuthService;
import com.ssafy.api.service.MailAuthServiceImpl;
import com.ssafy.api.service.UserService;
import com.ssafy.api.service.UserServiceImpl;
import com.ssafy.db.entity.EmailAuth;
import com.ssafy.db.entity.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/mailAuth")
@RequiredArgsConstructor
public class MailAuthController {
	
	@Autowired
	MailAuthService mailAuthService;
	@Autowired
	UserService userService;
	
	
	@GetMapping("/check-email-token")
	public User verifyEmail(String token, String email) {
		EmailAuth account = mailAuthService.findAccountByEmail(email);
		User certing_user = userService.findUserByEmail(email);

		if (account == null) {
			System.out.println("account is null");
			return null;
		}
		if (!token.equals(account.getAuthToken())) {
			System.out.println("wrong token");
			return null;
		}

		return userService.certificated(certing_user);
	}
}
