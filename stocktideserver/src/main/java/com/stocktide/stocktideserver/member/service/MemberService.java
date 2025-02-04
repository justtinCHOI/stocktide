package com.stocktide.stocktideserver.member.service;

import com.stocktide.stocktideserver.member.dto.MemberDTO;
import com.stocktide.stocktideserver.member.dto.MemberModifyDTO;
import com.stocktide.stocktideserver.member.entity.Member;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface MemberService {

    /**
     * 카카오 OAuth를 통한 회원 정보를 조회합니다.
     *
     * @param accessToken 카카오 액세스 토큰
     * @return MemberDTO 회원 정보
     */
    MemberDTO getKakaoMember(String accessToken);

    /**
     * 회원 정보를 수정합니다.
     *
     * @param memberModifyDTO 수정할 회원 정보
     * @return MemberModifyDTO 수정된 회원 정보
     */
    MemberModifyDTO modifyMember(MemberModifyDTO memberModifyDTO);

    /**
     * Member 엔티티를 DTO로 변환합니다.
     *
     * @param member 변환할 Member 엔티티
     * @return MemberDTO 변환된 회원 정보
     */
    MemberDTO entityToDTO(Member member);

    /**
     * 이메일 중복 여부를 확인합니다.
     *
     * @param email 확인할 이메일
     * @return boolean 이메일 존재 여부
     */
    boolean checkEmail(String email);

}
