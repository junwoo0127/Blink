package com.ssafy.db.repository;

import org.kurento.client.internal.server.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	User findUserByUserId(@Param("user_id") String userId);
	boolean existsByUserId(@Param("user_id") String userId);
	User findUserByEmail(@Param("user_email") String email);
}
