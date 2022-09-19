package com.a501.recipe.dto.token;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccessTokenResponseDto {
    private String accessToken;
    private Date accessTokenExpireDate;
}
