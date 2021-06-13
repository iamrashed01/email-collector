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
    const email = await Email.find(filterSearch)
      .populate('host_id');
    return res.status(200).json({ data: email, message: 'successfully retrieved emails', success: true });
  } catch (err) {
    return next(err);
  }
}

module.exports = { getAllEmails };
