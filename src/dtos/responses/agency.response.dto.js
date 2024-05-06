function buildBasicInfo(agency) {
  if (agency == null) return {};
  return {
    id: agency.id,
    agency_name: agency.agencyName,
  };
}

module.exports = { buildBasicInfo };
