package com.stocktide.stocktideserver.stock.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStockOrder is a Querydsl query type for StockOrder
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStockOrder extends EntityPathBase<StockOrder> {

    private static final long serialVersionUID = -535310883L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStockOrder stockOrder = new QStockOrder("stockOrder");

    public final com.stocktide.stocktideserver.audit.QAuditable _super = new com.stocktide.stocktideserver.audit.QAuditable(this);

    public final QCompany company;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final com.stocktide.stocktideserver.member.entity.QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final EnumPath<StockOrder.OrderStates> orderStates = createEnum("orderStates", StockOrder.OrderStates.class);

    public final EnumPath<StockOrder.OrderTypes> orderTypes = createEnum("orderTypes", StockOrder.OrderTypes.class);

    public final NumberPath<Long> price = createNumber("price", Long.class);

    public final NumberPath<Integer> stockCount = createNumber("stockCount", Integer.class);

    public final NumberPath<Long> stockOrderId = createNumber("stockOrderId", Long.class);

    public QStockOrder(String variable) {
        this(StockOrder.class, forVariable(variable), INITS);
    }

    public QStockOrder(Path<? extends StockOrder> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStockOrder(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStockOrder(PathMetadata metadata, PathInits inits) {
        this(StockOrder.class, metadata, inits);
    }

    public QStockOrder(Class<? extends StockOrder> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.company = inits.isInitialized("company") ? new QCompany(forProperty("company"), inits.get("company")) : null;
        this.member = inits.isInitialized("member") ? new com.stocktide.stocktideserver.member.entity.QMember(forProperty("member")) : null;
    }

}

