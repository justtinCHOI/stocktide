package com.stocktide.stocktideserver.liama.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "liama_results")
@EntityListeners(AuditingEntityListener.class)
public class LiamaResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String markdown;

    @Column(length = 500)
    private String query;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;
}