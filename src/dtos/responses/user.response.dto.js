import RolesDto from '@/dtos/responses/role.response.dto';
import pageMetaResponseDto from '@/dtos/responses/page.meta.response.dto';

function registerDto(user) {
  return {
    success: true,
    user_id: user.id,
    full_messages: ['User registered successfully'],
  };
}

function loginSuccess(user) {
  return {
    success: true,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      email: user.email,
      date_of_birth: user.dateOfBirth,
      gender: user.gender,
      phone: user.phone,
      isPhoneVerified: user.isPhoneVerified,
      isEmailVerified: user.isEmailVerified,
      isKycVerified: user.isKycVerified,
      roles: RolesDto.toNameList(user.roles || []),
      token: user.token,
      refreshToken: user.refreshToken,
    },
  };
}

function buildDto(user) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    middleName: user.middleName,
    email: user.email,
    phone: user.phone,
    profilePicture: user.profilePicture,
    roles: RolesDto.toNameList(user.roles || []),
    dateOfBirth: user.dateOfBirth,
    isPhoneVerified: user.isPhoneVerified,
    isEmailVerified: user.isEmailVerified,
    verificationStatus: user.verificationStatus,
  };
}

function buildDtos(users) {
  if (!users) return [];
  return {
    user: users.map((user) => buildDto(user)),
  };
}

function buildBasicInfo(user) {
  if (user == null) return {};
  return {
    id: user.id,
    full_name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    phone: user.phone,
    profilePicture: user.profilePicture,
  };
}

function buildPagedList(users, page, pageSize, totalResourceCount, basePath) {
  return {
    success: true,
    page_meta: pageMetaResponseDto.build(users.length, page, pageSize, totalResourceCount, basePath),
    ...buildDtos(users),
  };
}

module.exports = {
  registerDto, loginSuccess, buildDto, buildDtos, buildPagedList, buildBasicInfo,
};
