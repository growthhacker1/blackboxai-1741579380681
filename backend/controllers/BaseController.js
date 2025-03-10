class BaseController {
  constructor(Model) {
    this.Model = Model;
  }

  // Get all records
  getAll = async (req, res) => {
    try {
      const docs = await this.Model.find();
      res.status(200).json({
        success: true,
        count: docs.length,
        data: docs
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  // Get single record by ID
  getById = async (req, res) => {
    try {
      const doc = await this.Model.findById(req.params.id);
      if (!doc) {
        return res.status(404).json({
          success: false,
          message: 'Document not found'
        });
      }
      res.status(200).json({
        success: true,
        data: doc
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  // Create new record
  create = async (req, res) => {
    try {
      const doc = await this.Model.create(req.body);
      res.status(201).json({
        success: true,
        data: doc
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  // Update record
  update = async (req, res) => {
    try {
      const doc = await this.Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );
      if (!doc) {
        return res.status(404).json({
          success: false,
          message: 'Document not found'
        });
      }
      res.status(200).json({
        success: true,
        data: doc
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  // Delete record
  delete = async (req, res) => {
    try {
      const doc = await this.Model.findByIdAndDelete(req.params.id);
      if (!doc) {
        return res.status(404).json({
          success: false,
          message: 'Document not found'
        });
      }
      res.status(200).json({
        success: true,
        data: {}
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };
}

module.exports = BaseController;
