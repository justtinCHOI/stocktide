package com.stocktide.stocktideserver.cash.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCash is a Querydsl query type for Cash
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCash extends EntityPathBase<Cash> {

    private static final long serialVersionUID = 1279404721L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCash cash = new QCash("cash");

    public final com.stocktide.stocktideserver.audit.QAuditable _super = new com.stocktide.stocktideserver.audit.QAuditable(this);

    public final StringPath accountNumber = createString("accountNumber");

    public final NumberPath<Long> cashId = createNumber("cashId", Long.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> dollar = createNumber("dollar", Long.class);

    public final com.stocktide.stocktideserver.member.entity.QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final NumberPath<Long> money = createNumber("money", Long.class);

    public QCash(String variable) {
        this(Cash.class, forVariable(variable), INITS);
    }

    public QCash(Path<? extends Cash> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCash(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCash(PathMetadata metadata, PathInits inits) {
        this(Cash.class, metadata, inits);
    }

    public QCash(Class<? extends Cash> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.stocktide.stocktideserver.member.entity.QMember(forProperty("member")) : null;
    }

}

