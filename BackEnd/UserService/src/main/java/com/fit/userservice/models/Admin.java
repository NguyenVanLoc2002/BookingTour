package com.fit.userservice.models;

import com.fit.userservice.enums.AdminPermission;

import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

public class Admin extends User {
    private AdminPermission permission;
}
