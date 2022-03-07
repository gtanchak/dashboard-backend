// @dec     show all bootcamp
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootCamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Show all bootcamp" });
};

// @dec     show one bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootCamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Show Bootcamp ${req.params.id}` });
};

// @dec     create one bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootCamp = (req, res, next) => {
  res.status(201).json({ success: true, msg: `Creare new Bootcamp` });
};

// @dec     update one bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootCamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update Bootcamp ${req.params.id}` });
};

// @dec     delte one bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootCamp = (req, res, next) => {
  res
    .status(201)
    .json({ success: true, msg: `delete Bootcamp ${req.params.id}` });
};
