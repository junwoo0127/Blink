package com.ssafy.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.service.MailAuthServiceImpl;
import com.ssafy.api.service.UserServiceImpl;
import com.ssafy.db.entity.EmailAuth;
import com.ssafy.db.entity.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/mailAuth")
@RequiredArgsConstructor
public class MailAuthController {
	
	MailAuthServiceImpl mailAuthServiceImpl;
	UserServiceImpl userServiceImpl;
	
	
	@GetMapping("/check-email-token")
	public String verifyEmail(String token, String email) {
		EmailAuth account = mailAuthServiceImpl.findAccountByEmail(email);
		User certing_user = userServiceImpl.findUserByEmail(email);

		if (account == null) {
			System.out.println("account is null");
			return "account is null";
		}
		if (!token.equals(account.getAuthToken())) {
			System.out.println("wrong token");
			return "wrong token";
		}

		certing_user.certificated();
		return "certificated OK";
	}
}
