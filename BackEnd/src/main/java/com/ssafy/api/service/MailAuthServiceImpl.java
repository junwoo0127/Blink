package com.ssafy.api.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import com.ssafy.db.entity.EmailAuth;
import com.ssafy.db.repository.EmailAuthRepository;

//@EnableAsync
//@Service("mailAuthService")
public class MailAuthServiceImpl implements MailAuthService {

	private JavaMailSender mailSender;
	private EmailAuthRepository emailRepository;

//	private test_email saveNewAccount(String email) {
//		test_email account = test_email.builder().email(email).build();
//
//		return test_EmailRepository.save(account);
//	}

	public void fromController(String email) {
		// 컨트롤러부터 처음 응답을 받는 곳
		EmailAuth ret = saveEmail(email);
		sendVerificationEmail(ret);
	}

	public EmailAuth saveEmail(String email) {
		EmailAuth account = EmailAuth.builder()
				.email(email)
				.authToken(UUID.randomUUID().toString())
				.build();
		return emailRepository.save(account);
	}

	public void sendVerificationEmail(EmailAuth newAccount) {
		SimpleMailMessage mailMessage = new SimpleMailMessage();
		mailMessage.setTo(newAccount.getEmail());
		mailMessage.setSubject("Webluxible 회원 가입 인증");
		mailMessage.setText(String.format("/check-email-token?token=%s&email=%s", newAccount.getAuthToken(),
				newAccount.getEmail()));
		mailSender.send(mailMessage);
	}

	public EmailAuth findAccountByEmail(String email) {
		return emailRepository.findByEmail(email);
	}

}
