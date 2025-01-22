package com.stocktide.stocktideserver.stock.repository;

import com.stocktide.stocktideserver.stock.entity.StockAsBi;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StockAsBiRepository extends JpaRepository<StockAsBi, Long> {
    @EntityGraph(attributePaths = {"company"})
    Optional<StockAsBi> findByCompanyCompanyId(Long companyId);
}