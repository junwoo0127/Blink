package com.ssafy.db.repository;

import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.Player;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface PlayerRepository extends JpaRepository<Player, Long>{
	Player findByPlayerSeq(Long seq);
	List<Player> findAllByRoomSeq(Long roomSeq);
}
