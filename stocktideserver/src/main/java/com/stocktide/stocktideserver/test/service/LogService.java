package com.stocktide.stocktideserver.test.service;

import com.stocktide.stocktideserver.stock.entity.StockAsBi;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@Transactional
public class LogService {

    public void logStockAsBi(long price, StockAsBi stockAsBi, int stockCount, long companyId){
        log.info("buyDiscrimination companyId {} ", companyId);
        log.info("buyDiscrimination price {} ", price);
        log.info("buyDiscrimination stockAsBi.getAskp1(): {}", stockAsBi.getAskp1());
        log.info("buyDiscrimination stockAsBi.getAskp2(): {}", stockAsBi.getAskp2());
        log.info("buyDiscrimination stockAsBi.getAskp3(): {}", stockAsBi.getAskp3());
        log.info("buyDiscrimination stockAsBi.getAskp4(): {}", stockAsBi.getAskp4());
        log.info("buyDiscrimination stockAsBi.getAskp5(): {}", stockAsBi.getAskp5());
        log.info("buyDiscrimination stockAsBi.getAskp6(): {}", stockAsBi.getAskp6());
        log.info("buyDiscrimination stockAsBi.getAskp7(): {}", stockAsBi.getAskp7());
        log.info("buyDiscrimination stockAsBi.getAskp8(): {}", stockAsBi.getAskp8());
        log.info("buyDiscrimination stockAsBi.getAskp9(): {}", stockAsBi.getAskp9());
        log.info("buyDiscrimination stockAsBi.getAskp10(): {}", stockAsBi.getAskp10());
        log.info("buyDiscrimination stockCount {} ", stockCount);
        log.info("buyDiscrimination stockAsBi.getAskp_rsqn1(): {}", stockAsBi.getAskp_rsqn1());
        log.info("buyDiscrimination stockAsBi.getAskp_rsqn2(): {}", stockAsBi.getAskp_rsqn2());
        log.info("buyDiscrimination stockAsBi.getAskp_rsqn3(): {}", stockAsBi.getAskp_rsqn3());
        log.info("buyDiscrimination stockAsBi.getAskp_rsqn4(): {}", stockAsBi.getAskp_rsqn4());
        log.info("buyDiscrimination stockAsBi.getAskp_rsqn5(): {}", stockAsBi.getAskp_rsqn5());
        log.info("buyDiscrimination stockAsBi.getAskp_rsqn6(): {}", stockAsBi.getAskp_rsqn6());
        log.info("buyDiscrimination stockAsBi.getAskp_rsqn7(): {}", stockAsBi.getAskp_rsqn7());
        log.info("buyDiscrimination stockAsBi.getAskp_rsqn8(): {}", stockAsBi.getAskp_rsqn8());
        log.info("buyDiscrimination stockAsBi.getAskp_rsqn9(): {}", stockAsBi.getAskp_rsqn9());
        log.info("buyDiscrimination stockAsBi.getAskp_rsqn10(): {}", stockAsBi.getAskp_rsqn10());
    }


}
