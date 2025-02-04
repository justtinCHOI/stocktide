package com.stocktide.stocktideserver.member.service;

import com.stocktide.stocktideserver.cash.entity.Cash;
import com.stocktide.stocktideserver.cash.service.CashService;
import com.stocktide.stocktideserver.member.dto.MemberDto;
import com.stocktide.stocktideserver.member.dto.MemberModifyDto;
import com.stocktide.stocktideserver.member.entity.Member;
import com.stocktide.stocktideserver.member.entity.MemberRole;
import com.stocktide.stocktideserver.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * 회원 관리 서비스 구현체
 * MemberService 인터페이스의 구현을 담당합니다.
 *
 * @author StockTide Dev Team
 * @version 1.0
 * @since 2025-02-03
 */
@Service
@Slf4j
@Transactional(readOnly = false)
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CashService cashService;

    /**
     * 카카오 OAuth를 통한 회원 정보를 조회하고 필요한 경우 신규 회원을 생성합니다.
     * accessToken -> 사용자 정보 -> 새로운 사용자 DTO || 기존 사용자 DTO
     *
     * @param accessToken 카카오 액세스 토큰
     * @return MemberDTO 회원 정보
     * @throws RuntimeException Access Token이 null인 경우
     */
    @Override //
    public MemberDto getKakaoMember(String accessToken) {

        String nickname = getNicknameFromKakaoAccessToken(accessToken);

        List<Member> result = memberRepository.findByNickname(nickname);

        //기존의 회원
        if (!result.isEmpty()) {
            return entityToDTO(result.get(0));
        }
        //새로운 회원이라면
        //닉네임: '소셜회원' 패스워드는 임의로 생성 -> 저장
        Member socialMember = makeSocialMember(nickname);
        log.info("socialMember: {}", socialMember);
        memberRepository.save(socialMember);

        return entityToDTO(socialMember);
    }

    /**
     * 카카오 액세스 토큰으로부터 사용자 닉네임을 조회합니다.
     *
     * @param accessToken 카카오 액세스 토큰
     * @return String 사용자 닉네임
     * @throws RuntimeException API 호출 실패 시
     */
    private String getNicknameFromKakaoAccessToken(String accessToken) {

        String kakaoGetUserURL = "https://kapi.kakao.com/v2/user/me";

        if (accessToken == null) {
            throw new RuntimeException("Access Token is null");
        }
        //header 추가
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        UriComponents uriBuilder = UriComponentsBuilder.fromHttpUrl(kakaoGetUserURL).build();

        ResponseEntity<LinkedHashMap> response =
                restTemplate.exchange(
                        uriBuilder.toString(),
                        HttpMethod.GET,
                        entity,
                        LinkedHashMap.class);

        LinkedHashMap<String, LinkedHashMap> bodyMap = response.getBody();

        //response body 에 properties/nickname 또는 kakao_account/profile/nickname 으로 접근할 수 있다.
        LinkedHashMap<String, String> kakaoAccount = bodyMap.get("properties");

        return kakaoAccount.get("nickname");
    }

    /**
     * nickname(email)으로 소셜 로그인 회원 정보를 생성합니다.
     *
     * @param nickname 사용자 닉네임
     * @return Member 생성된 회원 정보
     */
    private Member makeSocialMember(String nickname) {
        Member member = Member.builder()
                .password(passwordEncoder.encode(makeTempPassword()))
                .nickname(nickname)
                .email("nickname@aaa.com")
                .name(nickname)
                .social(true)
                .build();
        member.addRole(MemberRole.USER);

        Cash cash = Cash.builder()
                .accountNumber(cashService.generateUniqueAccountNumber())
                .member(member)
                .build();

        List<Cash> cashList = new ArrayList<>();
        cashList.add(cash);
        member.setCashList(cashList);

        return member;
    }

    /**
     * 10자리의 임시 비밀번호를 생성합니다.
     *
     * @return String 생성된 임시 비밀번호
     */
    private String makeTempPassword() {

        StringBuffer buffer = new StringBuffer();

        for (int i = 0; i < 10; i++) {
            buffer.append((char) ((int) (Math.random() * 55) + 65));
        }
        return buffer.toString();
    }


    /**
     * 회원 정보를 수정합니다.
     *
     * @param memberModifyDTO 수정할 회원 정보
     * @return MemberModifyDTO 수정된 회원 정보
     */
    @Override
    public MemberModifyDto modifyMember(MemberModifyDto memberModifyDTO) {

        Optional<Member> result = memberRepository.findById(memberModifyDTO.getMemberId());

        Member member = result.orElseThrow();

        member.setName(memberModifyDTO.getName());
        member.setEmail(memberModifyDTO.getEmail());
        member.setPassword(passwordEncoder.encode(memberModifyDTO.getPassword()));
        member.setSocial(false);

        Member savedMember = memberRepository.save(member);
        log.info("savedMember.getEmail() {}", savedMember.getEmail());

        return MemberModifyDto.builder()
                .memberId(savedMember.getMemberId())
                .name(savedMember.getName())
                .email(savedMember.getEmail())
                .password(savedMember.getPassword()).build();
    }

    /**
     * Member 엔티티를 DTO로 변환합니다.
     *
     * @param member 변환할 Member 엔티티
     * @return MemberDTO 변환된 회원 정보
     */
    @Override
    public MemberDto entityToDTO(Member member) {
        return new MemberDto(
                member.getMemberId(),
                member.getEmail(),
                member.getName(),
                member.getNickname(),
                member.getPassword(),
                member.getCashList(),
                member.isSocial(),
                member.getMemberRoleList().stream()
                        .map(Enum::name)
                        .collect(Collectors.toList()),
                member.getMemberStatus().name()
        );
    }

    /**
     * 이메일 중복 여부를 확인합니다.
     *
     * @param email 확인할 이메일
     * @return boolean 이메일 존재 여부
     */
    @Override
    public boolean checkEmail(String email) {
        Optional<Member> byEmail = memberRepository.findByEmail(email);
        return byEmail.isPresent();
    }

}
