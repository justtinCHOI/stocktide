package com.stocktide.stocktideserver.member.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor  // 기본 생성자 추가
@AllArgsConstructor // Builder 패턴을 위한 전체 생성자
public class MemberModifyDTO {

  private long memberId;

  private String name;

  private String email;

  private String password;

}