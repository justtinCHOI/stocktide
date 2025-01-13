package com.stocktide.stocktideserver.star.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStar is a Querydsl query type for Star
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStar extends EntityPathBase<Star> {

    private static final long serialVersionUID = -2143909265L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStar star = new QStar("star");

    public final com.stocktide.stocktideserver.audit.QAuditable _super = new com.stocktide.stocktideserver.audit.QAuditable(this);

    public final com.stocktide.stocktideserver.stock.entity.QCompany company;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final com.stocktide.stocktideserver.member.entity.QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final NumberPath<Long> starId = createNumber("starId", Long.class);

    public QStar(String variable) {
        this(Star.class, forVariable(variable), INITS);
    }

    public QStar(Path<? extends Star> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStar(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStar(PathMetadata metadata, PathInits inits) {
        this(Star.class, metadata, inits);
    }

    public QStar(Class<? extends Star> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.company = inits.isInitialized("company") ? new com.stocktide.stocktideserver.stock.entity.QCompany(forProperty("company"), inits.get("company")) : null;
        this.member = inits.isInitialized("member") ? new com.stocktide.stocktideserver.member.entity.QMember(forProperty("member")) : null;
    }

}

