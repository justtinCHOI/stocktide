package com.stocktide.stocktideserver.liama.repository;

import com.stocktide.stocktideserver.liama.entity.LiamaResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LiamaResultRepository extends JpaRepository<LiamaResult, Long> {
    // 쿼리별 결과 조회
    List<LiamaResult> findByQuery(String query);

    // 최근 N개의 결과 조회
    List<LiamaResult> findTop10ByOrderByCreatedAtDesc();

    // 특정 날짜 이후의 결과 조회
    List<LiamaResult> findByCreatedAtAfter(java.time.LocalDateTime dateTime);
}