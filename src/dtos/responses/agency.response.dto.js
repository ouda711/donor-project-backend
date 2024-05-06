function registerDto(agency) {
  return {
    success: true,
    id: agency.id,
    full_messages: ['Agency registered successfully'],
  };
}
function buildBasicInfo(agency) {
  if (agency == null) return {};
  return {
    id: agency.id,
    agencyName: agency.name,
  };
}

function buildDto(agency) {
  return {
    id: agency.id,
    agencyName: agency.name,
    website: agency.website,
    contactEmail: agency.contactEmail,
    contactPhone: agency.contactPhone,
    logoUrl: agency.logoUrl,
    isActive: agency.isActive,
    contactName: agency.contactName,
    createdAt: agency.createdAt,
  };
}

function buildListDto(agencies) {
  return {
    agencies: agencies.map((agency) => buildDto(agency)),
  };
}

module.exports = {
  buildBasicInfo, buildDto, registerDto, buildListDto,
};
