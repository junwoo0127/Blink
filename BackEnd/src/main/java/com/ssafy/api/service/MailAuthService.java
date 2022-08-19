package com.ssafy.api.service;

import java.util.UUID;

import org.springframework.mail.SimpleMailMessage;

import com.ssafy.db.entity.EmailAuth;
import com.ssafy.db.entity.User;

public interface MailAuthService {
	
	public void fromController(String email);
	
	
	public EmailAuth saveEmail(String email);

	public void sendVerificationEmail(EmailAuth newAccount);
	
	public EmailAuth findAccountByEmail(String email);
	
	public void resend(String email);

	
}
