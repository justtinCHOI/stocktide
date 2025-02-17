package com.stocktide.stocktideserver.liama.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "Liama AI 질의 DTO")
public class LiamaQueryDto {
    @NotBlank(message = "질의 내용은 필수입니다.")
    @Size(min = 1, max = 500, message = "질의 내용은 1자에서 500자 사이여야 합니다.")
    @Schema(description = "Liama AI에 질의할 내용", example = "주식 투자에 대해 알려줘")
    private String query;
}