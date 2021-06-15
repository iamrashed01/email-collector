const mongoose = require('mongoose');
const { Parser } = require('json2csv');
const Email = require('../model/email');

async function getAllEmails(req, res, next) {
  let filterSearch = {};
  if (req.query.search) {
    filterSearch = {
      $or: [
        {
          email: new RegExp(req.query.search, 'i'),
        },
        {
          address: new RegExp(req.query.search, 'i'),
        },
        {
          first_name: new RegExp(req.query.search, 'i'),
        },
      ],
    };
  }

  try {
    // variables
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.perPage) || 20;
    const skip = limit * (Math.abs(page - 1));

    // find emails
    const email = await Email.find(filterSearch)
      .skip(skip).limit(limit)
      .populate('host_ids')
      .sort({ updatedAt: -1 });

    // total documents
    const total = await Email.countDocuments();
    let from = skip + 1;
    let to = Math.min(skip + limit, total);
    const totalPage = Math.ceil(total / limit);

    if (email.length <= 0) {
      from = 0;
      to = 0;
    }

    return res.status(200).json({
      data: email,
      page,
      from,
      limit,
      to,
      total,
      totalPage,
      message: 'successfully retrieved emails',
      success: true,
    });
  } catch (err) {
    return next(err);
  }
}

async function deleteEmail(req, res) {
  const validateId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!validateId) {
    return res.status(400).json({
      message: 'Invalid Id!',
      success: false,
    });
  }

  const email = await Email.findByIdAndDelete(req.params.id);
  if (!email) {
    return res.status(400).json({
      message: 'email no longer exist!',
      success: false,
    });
  }
  return res.status(200).json({
    data: email,
    message: 'successfully deleted!',
    success: true,
  });
}

async function exportAllEmails(req, res, next) {
  const email = await Email.find().select('-__v');

  const fields = [
    '_id',
    'email',
    'first_name',
    'last_name',
    'job_title',
    'company_name',
    'office_phone',
    'mobile_phone',
    'address',
    'createdAt',
    'updatedAt',
  ];
  const opts = { fields };

  try {
    const parser = new Parser(opts);
    const csv = parser.parse(email);

    res.header('Content-Type', 'text/csv');
    res.attachment('signatures.csv');
    return res.status(200).send(csv);
  } catch (err) {
    return next(err);
  }
}

module.exports = { getAllEmails, deleteEmail, exportAllEmails };
