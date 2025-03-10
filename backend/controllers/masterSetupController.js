const BaseController = require('./BaseController');
const BTD = require('../models/BTD');

class MasterSetupController extends BaseController {
  constructor() {
    super(BTD);
  }

  // Get all branches
  getBranches = async (req, res) => {
    try {
      const branches = await this.Model.find({ type: 'branch' });
      res.status(200).json({
        success: true,
        count: branches.length,
        data: branches
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  // Create branch
  createBranch = async (req, res) => {
    try {
      const branch = await this.Model.create({
        ...req.body,
        type: 'branch',
        createdBy: req.user.id
      });
      res.status(201).json({
        success: true,
        data: branch
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  // Get all trucks
  getTrucks = async (req, res) => {
    try {
      const trucks = await this.Model.find({ type: 'truck' });
      res.status(200).json({
        success: true,
        count: trucks.length,
        data: trucks
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  // Create truck
  createTruck = async (req, res) => {
    try {
      const truck = await this.Model.create({
        ...req.body,
        type: 'truck',
        createdBy: req.user.id
      });
      res.status(201).json({
        success: true,
        data: truck
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  // Get all drivers
  getDrivers = async (req, res) => {
    try {
      const drivers = await this.Model.find({ type: 'driver' });
      res.status(200).json({
        success: true,
        count: drivers.length,
        data: drivers
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  // Create driver
  createDriver = async (req, res) => {
    try {
      const driver = await this.Model.create({
        ...req.body,
        type: 'driver',
        createdBy: req.user.id
      });
      res.status(201).json({
        success: true,
        data: driver
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  // Get branch by ID
  getBranchById = async (req, res) => {
    try {
      const branch = await this.Model.findOne({
        _id: req.params.id,
        type: 'branch'
      });
      if (!branch) {
        return res.status(404).json({
          success: false,
          message: 'Branch not found'
        });
      }
      res.status(200).json({
        success: true,
        data: branch
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  // Update branch
  updateBranch = async (req, res) => {
    try {
      const branch = await this.Model.findOneAndUpdate(
        { _id: req.params.id, type: 'branch' },
        {
          ...req.body,
          updatedBy: req.user.id
        },
        { new: true, runValidators: true }
      );
      if (!branch) {
        return res.status(404).json({
          success: false,
          message: 'Branch not found'
        });
      }
      res.status(200).json({
        success: true,
        data: branch
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  // Delete branch
  deleteBranch = async (req, res) => {
    try {
      const branch = await this.Model.findOneAndDelete({
        _id: req.params.id,
        type: 'branch'
      });
      if (!branch) {
        return res.status(404).json({
          success: false,
          message: 'Branch not found'
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

  // Get truck by ID
  getTruckById = async (req, res) => {
    try {
      const truck = await this.Model.findOne({
        _id: req.params.id,
        type: 'truck'
      });
      if (!truck) {
        return res.status(404).json({
          success: false,
          message: 'Truck not found'
        });
      }
      res.status(200).json({
        success: true,
        data: truck
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  // Update truck
  updateTruck = async (req, res) => {
    try {
      const truck = await this.Model.findOneAndUpdate(
        { _id: req.params.id, type: 'truck' },
        {
          ...req.body,
          updatedBy: req.user.id
        },
        { new: true, runValidators: true }
      );
      if (!truck) {
        return res.status(404).json({
          success: false,
          message: 'Truck not found'
        });
      }
      res.status(200).json({
        success: true,
        data: truck
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  // Delete truck
  deleteTruck = async (req, res) => {
    try {
      const truck = await this.Model.findOneAndDelete({
        _id: req.params.id,
        type: 'truck'
      });
      if (!truck) {
        return res.status(404).json({
          success: false,
          message: 'Truck not found'
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

  // Get driver by ID
  getDriverById = async (req, res) => {
    try {
      const driver = await this.Model.findOne({
        _id: req.params.id,
        type: 'driver'
      });
      if (!driver) {
        return res.status(404).json({
          success: false,
          message: 'Driver not found'
        });
      }
      res.status(200).json({
        success: true,
        data: driver
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

  // Update driver
  updateDriver = async (req, res) => {
    try {
      const driver = await this.Model.findOneAndUpdate(
        { _id: req.params.id, type: 'driver' },
        {
          ...req.body,
          updatedBy: req.user.id
        },
        { new: true, runValidators: true }
      );
      if (!driver) {
        return res.status(404).json({
          success: false,
          message: 'Driver not found'
        });
      }
      res.status(200).json({
        success: true,
        data: driver
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };

  // Delete driver
  deleteDriver = async (req, res) => {
    try {
      const driver = await this.Model.findOneAndDelete({
        _id: req.params.id,
        type: 'driver'
      });
      if (!driver) {
        return res.status(404).json({
          success: false,
          message: 'Driver not found'
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

module.exports = new MasterSetupController();
