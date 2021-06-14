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
    const limit = 10;
    const skip = limit * (Math.abs(page - 1));

    // find emails
    const email = await Email.find(filterSearch)
      .select('email').skip(skip).limit(limit)
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

module.exports = { getAllEmails };
