package com.stocktide.stocktideserver.stock.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStockMin is a Querydsl query type for StockMin
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStockMin extends EntityPathBase<StockMin> {

    private static final long serialVersionUID = 611730593L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStockMin stockMin = new QStockMin("stockMin");

    public final StringPath cntg_vol = createString("cntg_vol");

    public final QCompany company;

    public final StringPath stck_cntg_hour = createString("stck_cntg_hour");

    public final StringPath stck_hgpr = createString("stck_hgpr");

    public final StringPath stck_lwpr = createString("stck_lwpr");

    public final StringPath stck_oprc = createString("stck_oprc");

    public final StringPath stck_prpr = createString("stck_prpr");

    public final NumberPath<Long> stockMinId = createNumber("stockMinId", Long.class);

    public final DateTimePath<java.time.LocalDateTime> stockTradeTime = createDateTime("stockTradeTime", java.time.LocalDateTime.class);

    public QStockMin(String variable) {
        this(StockMin.class, forVariable(variable), INITS);
    }

    public QStockMin(Path<? extends StockMin> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStockMin(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStockMin(PathMetadata metadata, PathInits inits) {
        this(StockMin.class, metadata, inits);
    }

    public QStockMin(Class<? extends StockMin> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.company = inits.isInitialized("company") ? new QCompany(forProperty("company"), inits.get("company")) : null;
    }

}

