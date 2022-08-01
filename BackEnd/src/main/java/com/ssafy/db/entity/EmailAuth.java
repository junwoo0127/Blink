//package com.ssafy.db.entity;
//
//import java.time.LocalDateTime;
//
//import javax.persistence.*;
//
//import lombok.AccessLevel;
//
//import org.hibernate.annotations.DynamicInsert;
//import org.hibernate.annotations.DynamicUpdate;
//import org.springframework.data.annotation.CreatedDate;
//import org.springframework.data.jpa.domain.support.AuditingEntityListener;
//
//import com.fasterxml.jackson.annotation.JsonProperty;
//
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Entity
//@Table(name="tbl_email")
//@Getter
//@Setter
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@DynamicInsert
//@DynamicUpdate
//@EntityListeners(AuditingEntityListener.class)
//
//public class EmailAuth {
//	private static final Long MAX_EXPIRE_TIME = 5L;
//
//    @Id
//    @Column(name = "mail_seq")
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    
//    @Column(name = "mail_adr")
//    private String email;
//    @Column(name = "auth_token")
//    private String authToken;
//    @Column(name = "expired")
//    private Boolean expired;
//    @Column(name = "expired_date")
//    private LocalDateTime expireDate;
//
//    @Builder
//    public EmailAuth(String email, String authToken, Boolean expired) {
//        this.email = email;
//        this.authToken = authToken;
//        this.expired = expired;
//        this.expireDate = LocalDateTime.now().plusMinutes(MAX_EXPIRE_TIME);
//    }
//
//    public void useToken() {
//        this.expired = true;
//    }
//}
