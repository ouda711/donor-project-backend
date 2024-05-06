/* eslint-disable consistent-return */
import db from '@/database';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import { Op } from 'sequelize';
import AgencyRequestDto from '@/dtos/requests/agency.request.dto';
import AppResponseDto from '@/dtos/responses/app.response.dto';
import AgencyResponseDto from '@/dtos/responses/agency.response.dto';

exports.createAgency = (req, res) => {
  const url = '/public';
  const bindingResult = AgencyRequestDto.createAgencyRequestDto(req);
  if (!_.isEmpty(bindingResult.errors)) {
    return res.json(AppResponseDto.buildWithErrorMessages(bindingResult.errors));
  }
  const { name, contactEmail, contactPhone } = bindingResult.validatedData;
  db.models.agency.findAll(
    {
      where: {
        [Op.or]: [{ name }, { contactPhone }, { contactEmail }],
      },
    },
    // eslint-disable-next-line consistent-return
  ).then((result) => {
    if (!_.isEmpty(result)) {
      return res.json(AppResponseDto.buildWithErrorMessages('Agency already exists'));
    }
    const logoPath = [];
    db.models.agency.create(bindingResult.validatedData).then((agency) => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; req.files != null && i < req.files.length; i++) {
        const file = req.files[i];
        const filePath = file.path.replace('public', url);
        logoPath.push(filePath);
      }
      agency.update({ logoUrl: logoPath }).then((r) => console.log('Updated', r));
      res.status(201).json(AgencyResponseDto.registerDto(agency));
    }).catch((err) => {
      res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
    });
  }).catch((err) => {
    res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
  });
};

exports.getAllAgencies = async (req, res) => {
  await db.models.agency.findAll().then((agencies) => {
    res.status(200).json(AgencyResponseDto.buildListDto(agencies));
  }).catch((err) => {
    res.status(500).json(AppResponseDto.buildWithErrorMessages(err));
  });
};
