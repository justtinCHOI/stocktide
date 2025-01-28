package com.stocktide.stocktideserver.stock.entity;

import com.stocktide.stocktideserver.audit.Auditable;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Company extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long companyId;

    @Column
    private String code;

    @Enumerated(EnumType.STRING)
    private MarketType marketType;

    @Column
    private String korName;

    @Column
    private String engName;

    @OneToOne(mappedBy = "company", cascade = CascadeType.ALL)
    private StockAsBi stockAsBi;

    @OneToOne(mappedBy = "company", cascade = CascadeType.ALL)
    private StockInf stockInf;

}
