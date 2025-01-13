package com.stocktide.stocktideserver.stock.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStockAsBi is a Querydsl query type for StockAsBi
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStockAsBi extends EntityPathBase<StockAsBi> {

    private static final long serialVersionUID = 1783430058L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStockAsBi stockAsBi = new QStockAsBi("stockAsBi");

    public final StringPath askp1 = createString("askp1");

    public final StringPath askp10 = createString("askp10");

    public final StringPath askp2 = createString("askp2");

    public final StringPath askp3 = createString("askp3");

    public final StringPath askp4 = createString("askp4");

    public final StringPath askp5 = createString("askp5");

    public final StringPath askp6 = createString("askp6");

    public final StringPath askp7 = createString("askp7");

    public final StringPath askp8 = createString("askp8");

    public final StringPath askp9 = createString("askp9");

    public final StringPath askp_rsqn1 = createString("askp_rsqn1");

    public final StringPath askp_rsqn10 = createString("askp_rsqn10");

    public final StringPath askp_rsqn2 = createString("askp_rsqn2");

    public final StringPath askp_rsqn3 = createString("askp_rsqn3");

    public final StringPath askp_rsqn4 = createString("askp_rsqn4");

    public final StringPath askp_rsqn5 = createString("askp_rsqn5");

    public final StringPath askp_rsqn6 = createString("askp_rsqn6");

    public final StringPath askp_rsqn7 = createString("askp_rsqn7");

    public final StringPath askp_rsqn8 = createString("askp_rsqn8");

    public final StringPath askp_rsqn9 = createString("askp_rsqn9");

    public final StringPath bidp1 = createString("bidp1");

    public final StringPath bidp10 = createString("bidp10");

    public final StringPath bidp2 = createString("bidp2");

    public final StringPath bidp3 = createString("bidp3");

    public final StringPath bidp4 = createString("bidp4");

    public final StringPath bidp5 = createString("bidp5");

    public final StringPath bidp6 = createString("bidp6");

    public final StringPath bidp7 = createString("bidp7");

    public final StringPath bidp8 = createString("bidp8");

    public final StringPath bidp9 = createString("bidp9");

    public final StringPath bidp_rsqn1 = createString("bidp_rsqn1");

    public final StringPath bidp_rsqn10 = createString("bidp_rsqn10");

    public final StringPath bidp_rsqn2 = createString("bidp_rsqn2");

    public final StringPath bidp_rsqn3 = createString("bidp_rsqn3");

    public final StringPath bidp_rsqn4 = createString("bidp_rsqn4");

    public final StringPath bidp_rsqn5 = createString("bidp_rsqn5");

    public final StringPath bidp_rsqn6 = createString("bidp_rsqn6");

    public final StringPath bidp_rsqn7 = createString("bidp_rsqn7");

    public final StringPath bidp_rsqn8 = createString("bidp_rsqn8");

    public final StringPath bidp_rsqn9 = createString("bidp_rsqn9");

    public final QCompany company;

    public final NumberPath<Long> stockAsBiId = createNumber("stockAsBiId", Long.class);

    public QStockAsBi(String variable) {
        this(StockAsBi.class, forVariable(variable), INITS);
    }

    public QStockAsBi(Path<? extends StockAsBi> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStockAsBi(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStockAsBi(PathMetadata metadata, PathInits inits) {
        this(StockAsBi.class, metadata, inits);
    }

    public QStockAsBi(Class<? extends StockAsBi> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.company = inits.isInitialized("company") ? new QCompany(forProperty("company"), inits.get("company")) : null;
    }

}

