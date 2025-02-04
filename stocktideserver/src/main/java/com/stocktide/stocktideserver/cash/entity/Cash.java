package com.stocktide.stocktideserver.cash.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.stocktide.stocktideserver.audit.Auditable;
import com.stocktide.stocktideserver.member.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 * 회원의 현금 계좌 정보를 나타내는 엔티티 클래스
 *
 * 회원별로 생성되는 현금 계좌의 세부 정보를 관리합니다.
 * 계좌 번호, 원화 및 달러 잔액 등의 정보를 포함합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2024-02-04
 */
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Schema(description = "회원 현금 계좌 정보")
public class Cash extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "고유 계좌 ID", example = "1")
    private Long cashId;

    @Column(nullable = false, unique = true)
    @Schema(description = "계좌 번호", example = "12345-67-890")
    private String accountNumber;

    @Builder.Default
    @Column(nullable = false)
    @Schema(description = "원화 잔액", example = "5000000")
    private long money = 0;

    @Builder.Default
    @Column(nullable = false)
    @Schema(description = "달러 잔액", example = "5000")
    private long dollar = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference
    @Schema(description = "연결된 회원 정보")
    private Member member;

    @Override
    public String toString() {
        return "Cash{" +
                "cashId=" + cashId +
                ", accountNumber='" + accountNumber + '\'' +
                ", money=" + money +
                ", dollar=" + dollar +
                '}';
    }
}
