package com.ssafy.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import com.ssafy.db.repository.EmailAuthRepository;

@EnableAsync
@Service("mailAuthService")
public class MailAuthServiceImpl implements MailAuthService {

	@Autowired
	EmailAuthRepository emailAuthRepository;
	
	private final JavaMailSender javaMailSender = null;
	
	@Async //메일 전송할 때까지 기다리기 싫으니까 비동기
	@Override
	public void sendMailAuth(String email, String authToken) {
		SimpleMailMessage smm = new SimpleMailMessage();
		smm.setTo(email+"@gmail.com");
		smm.setSubject("이메일 인증을 진행합니다.");
		smm.setText("http://localhost:8080/sign/confirm-email?email="+email+"&authToken="+authToken);
		
		javaMailSender.send(smm);
	}

}
