package com.stocktide.stocktideserver.stock.entity;

public enum MarketType {
    DOMESTIC, OVERSEAS;

    public String getApiEndpoint() {
        return switch(this) {
            case DOMESTIC -> "domestic-api-endpoint";
            case OVERSEAS -> "overseas-api-endpoint";
        };
    }
}