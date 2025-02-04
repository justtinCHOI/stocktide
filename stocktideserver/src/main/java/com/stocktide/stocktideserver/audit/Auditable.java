package com.stocktide.stocktideserver.audit;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * 엔티티의 공통 감사(Audit) 정보를 관리하는 추상 클래스
 *
 * 모든 엔티티에 공통적으로 적용되는 생성 및 수정 시간을 추적합니다.
 * JPA의 Auditing 기능을 활용하여 자동으로 시간 정보를 기록합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2024-02-04
 */
@Setter
@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Schema(description = "엔티티 감사 정보 기본 클래스")
public abstract class Auditable {

    /**
     * 엔티티 생성 시간
     * JSON 직렬화 시 "yyyy-MM-dd'T'HH:mm:ss" 형식으로 표현됨
     */
    @CreatedDate
    @Column(updatable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Schema(description = "엔티티 생성 시간", example = "2024-02-04T14:30:00")
    private LocalDateTime createdAt;

    /**
     * 엔티티 최종 수정 시간
     * JSON 직렬화 시 "yyyy-MM-dd'T'HH:mm:ss" 형식으로 표현됨
     */
    @LastModifiedDate
    @Column
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Schema(description = "엔티티 최종 수정 시간", example = "2024-02-04T15:45:22")
    private LocalDateTime modifiedAt;
}
