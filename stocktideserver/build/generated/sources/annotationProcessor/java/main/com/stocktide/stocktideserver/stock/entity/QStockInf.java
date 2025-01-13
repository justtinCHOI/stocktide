package com.stocktide.stocktideserver.stock.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStockInf is a Querydsl query type for StockInf
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStockInf extends EntityPathBase<StockInf> {

    private static final long serialVersionUID = 611726896L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStockInf stockInf = new QStockInf("stockInf");

    public final StringPath acml_tr_pbmn = createString("acml_tr_pbmn");

    public final StringPath acml_vol = createString("acml_vol");

    public final QCompany company;

    public final StringPath prdy_ctrt = createString("prdy_ctrt");

    public final StringPath prdy_vrss = createString("prdy_vrss");

    public final StringPath stck_prpr = createString("stck_prpr");

    public final NumberPath<Long> stockInfId = createNumber("stockInfId", Long.class);

    public QStockInf(String variable) {
        this(StockInf.class, forVariable(variable), INITS);
    }

    public QStockInf(Path<? extends StockInf> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStockInf(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStockInf(PathMetadata metadata, PathInits inits) {
        this(StockInf.class, metadata, inits);
    }

    public QStockInf(Class<? extends StockInf> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.company = inits.isInitialized("company") ? new QCompany(forProperty("company"), inits.get("company")) : null;
    }

}

