package com.stocktide.stocktideserver.scheduler;

import com.stocktide.stocktideserver.stock.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class StockScheduler {
    private final StockAsBiService stockAsBiService;
    private final StockMinService stockMinService;
    private final CompanyService companyService;
    private final TokenService tokenService;
    private final StockOrderService stockOrderService;

    @Scheduled(cron = "0 30 9-15 * * MON-FRI")
    public void myScheduledStockAsBiMethod() throws InterruptedException {
        LocalDateTime start = LocalDateTime.now();

        stockAsBiService.updateStockAsBi();
        stockOrderService.checkOrder();

        LocalDateTime end = LocalDateTime.now();
        Duration duration = Duration.between(start, end);
        System.out.println(duration.getSeconds());
    }

    @Scheduled(cron = "0 0 10-15 * * MON-FRI")
    public void myScheduledStockAsBiMethod2() throws InterruptedException {
        stockAsBiService.updateStockAsBi();
        stockOrderService.checkOrder();
    }

    @Scheduled(cron = "0 30 9-15 * * MON-FRI")
    public void myScheduledStockMinMethod() throws InterruptedException {
        stockMinService.updateStockMin();
    }
    @Scheduled(cron = "0 0 10-15 * * MON-FRI")
    public void myScheduledStockMinMethod2() throws InterruptedException {
        stockMinService.updateStockMin();

    }
}
