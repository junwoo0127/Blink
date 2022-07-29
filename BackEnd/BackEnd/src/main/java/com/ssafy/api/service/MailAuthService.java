package com.ssafy.api.service;


public interface MailAuthService {
	void sendMailAuth(String email, String authToken);
}
