package com.stocktide.stocktideserver.stock.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStockHold is a Querydsl query type for StockHold
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStockHold extends EntityPathBase<StockHold> {

    private static final long serialVersionUID = 1783636048L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStockHold stockHold = new QStockHold("stockHold");

    public final com.stocktide.stocktideserver.audit.QAuditable _super = new com.stocktide.stocktideserver.audit.QAuditable(this);

    public final QCompany company;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final com.stocktide.stocktideserver.member.entity.QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final NumberPath<Long> price = createNumber("price", Long.class);

    public final NumberPath<Integer> reserveStockCount = createNumber("reserveStockCount", Integer.class);

    public final NumberPath<Integer> stockCount = createNumber("stockCount", Integer.class);

    public final NumberPath<Long> stockHoldId = createNumber("stockHoldId", Long.class);

    public QStockHold(String variable) {
        this(StockHold.class, forVariable(variable), INITS);
    }

    public QStockHold(Path<? extends StockHold> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStockHold(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStockHold(PathMetadata metadata, PathInits inits) {
        this(StockHold.class, metadata, inits);
    }

    public QStockHold(Class<? extends StockHold> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.company = inits.isInitialized("company") ? new QCompany(forProperty("company"), inits.get("company")) : null;
        this.member = inits.isInitialized("member") ? new com.stocktide.stocktideserver.member.entity.QMember(forProperty("member")) : null;
    }

}

