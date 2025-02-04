package com.stocktide.stocktideserver.cash.service;

import com.stocktide.stocktideserver.cash.entity.Cash;
import com.stocktide.stocktideserver.cash.repository.CashRepository;
import com.stocktide.stocktideserver.exception.BusinessLogicException;
import com.stocktide.stocktideserver.exception.ExceptionCode;
import com.stocktide.stocktideserver.member.entity.Member;
import com.stocktide.stocktideserver.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;

/**
 * 현금 자산 관리 서비스
 * 계좌 생성, 조회, 수정, 삭제 등의 기능을 제공합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class CashService {

    private final CashRepository cashRepository;
    private final MemberRepository memberRepository;

    /**
     * 새로운 현금 계좌를 생성합니다.
     *
     * @param memberId 계좌를 생성할 회원의 ID
     * @return 생성된 Cash 엔티티
     * @throws BusinessLogicException 이미 최대 계좌 수를 보유한 경우
     */
    public Cash createCash(long memberId) {

        Member member = memberRepository.findById(memberId).get();

        if (validateCash(member)) {
            throw new BusinessLogicException(ExceptionCode.CASH_DUPLICATION);
        }

        Cash cash = Cash.builder()
                .accountNumber(generateUniqueAccountNumber())
                .member(member).build();
        Cash createdCash = cashRepository.save(cash);

        List<Cash> cashList = member.getCashList();
        cashList.add(createdCash);
        member.setCashList(cashList);

        return createdCash;
    }

    /**
     * 회원이 보유할 수 있는 최대 계좌 수를 검증합니다.
     *
     * @param member 검증할 회원 정보
     * @return boolean 최대 계좌 수 초과 여부
     * @throws BusinessLogicException CASH_DUPLICATION - 최대 계좌 수(10개) 초과 시
     */
    private boolean validateCash(Member member) {

        List<Cash> existingCashList = cashRepository.findByMember(member);

        return existingCashList.size() > 9;
    }

    /**
     * 고유한 계좌번호를 생성합니다.
     * 형식: XXXXX-XX-XXX (예: 12345-67-890)
     *
     * @return String 생성된 계좌번호
     */
    public String generateUniqueAccountNumber() {
        Random random = new Random();
        String accountNumber;
        do {
            accountNumber = String.format("%05d-%02d-%03d", random.nextInt(100000), random.nextInt(100), random.nextInt(1000));
        } while (accountNumberExists(accountNumber));
        return accountNumber;
    }

    /**
     * 계좌번호의 중복 여부를 확인합니다.
     *
     * @param accountNumber 확인할 계좌번호
     * @return boolean 계좌번호 존재 여부
     */
    private boolean accountNumberExists(String accountNumber) {
        return cashRepository.existsByAccountNumber(accountNumber);
    }

    /**
     * 계좌를 삭제합니다.
     *
     * @param cashId 삭제할 계좌 ID
     */
    public void remove(Long cashId) {
        cashRepository.deleteById(cashId);
    }

    /**
     * 계좌의 현금 잔액을 업데이트합니다.
     *
     * @param cashId 업데이트할 계좌 ID
     * @param money 원화 금액
     * @param dollar 달러 금액
     * @return 업데이트된 Cash 엔티티
     */
    public Cash updateCash(Long cashId, long money, long dollar){


        Cash cash = cashRepository.findByCashId(cashId);

        cash.setMoney(money);
        cash.setDollar(dollar);

        return cashRepository.save(cash);

    }

    /**
     * 회원의 특정 계좌를 조회합니다.
     *
     * @param memberId 회원 ID
     * @return Cash 엔티티
     * @throws BusinessLogicException 계좌를 찾을 수 없는 경우
     */
    public Cash findCash(Long memberId) {

        Optional<Member> member = memberRepository.findByMemberId(memberId);

        if (member.isEmpty()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        List<Cash> cashList = member.get().getCashList();

        if (cashList == null) {
            throw new BusinessLogicException(ExceptionCode.INVALID_CASH);
        }

        return cashList.get(0);
    }

    /**
     * 거래 가능 여부를 확인합니다.
     *
     * @param price 거래 금액
     * @param member 회원 정보
     * @throws BusinessLogicException 잔액이 부족한 경우
     */
    public void checkCash(long price, Member member) {
        if(price > member.getCashList().get(0).getMoney())
            throw new BusinessLogicException(ExceptionCode.NOT_ENOUGH_MONEY);
        else
            return;
    }

}


//    private void validateAuthor(Cash cash, Member member) {
//
//        if (!cash.getMember().equals(member)) {
//            throw new BusinessLogicException(ExceptionCode.INVALID_CASH);
//        }
//    }

