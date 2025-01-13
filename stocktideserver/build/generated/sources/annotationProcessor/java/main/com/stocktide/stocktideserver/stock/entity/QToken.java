package com.stocktide.stocktideserver.stock.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QToken is a Querydsl query type for Token
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QToken extends EntityPathBase<Token> {

    private static final long serialVersionUID = -2024219948L;

    public static final QToken token1 = new QToken("token1");

    public final DateTimePath<java.time.LocalDateTime> expired = createDateTime("expired", java.time.LocalDateTime.class);

    public final StringPath token = createString("token");

    public final NumberPath<Long> tokenId = createNumber("tokenId", Long.class);

    public QToken(String variable) {
        super(Token.class, forVariable(variable));
    }

    public QToken(Path<? extends Token> path) {
        super(path.getType(), path.getMetadata());
    }

    public QToken(PathMetadata metadata) {
        super(Token.class, metadata);
    }

}

