//package com.ssafy.db.repository;
//
//import java.time.LocalDateTime;
//
//import org.kurento.client.internal.server.Param;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import com.google.common.base.Optional;
//import com.ssafy.db.entity.EmailAuth;
//
//@Repository
//public interface EmailAuthRepository extends JpaRepository<EmailAuth, Long>{
//	Optional<EmailAuth> findValidAuthByEmail(@Param("mail") String email, 
//			String authToken, LocalDateTime currentTime);
//}
