const express = require('express');
const router = express.Router();
const { protect, checkPermission } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');
const masterSetupController = require('../controllers/masterSetupController');

// Branch routes
router
  .route('/branches')
  .get(
    protect,
    checkPermission('masterSetup', 'read'),
    masterSetupController.getBranches
  )
  .post(
    protect,
    checkPermission('masterSetup', 'create'),
    validate(schemas.masterSetup.createBranch),
    masterSetupController.createBranch
  );

router
  .route('/branches/:id')
  .get(
    protect,
    checkPermission('masterSetup', 'read'),
    masterSetupController.getBranchById
  )
  .put(
    protect,
    checkPermission('masterSetup', 'update'),
    validate(schemas.masterSetup.updateBranch),
    masterSetupController.updateBranch
  )
  .delete(
    protect,
    checkPermission('masterSetup', 'delete'),
    masterSetupController.deleteBranch
  );

// Truck routes
router
  .route('/trucks')
  .get(
    protect,
    checkPermission('masterSetup', 'read'),
    masterSetupController.getTrucks
  )
  .post(
    protect,
    checkPermission('masterSetup', 'create'),
    validate(schemas.masterSetup.createTruck),
    masterSetupController.createTruck
  );

router
  .route('/trucks/:id')
  .get(
    protect,
    checkPermission('masterSetup', 'read'),
    masterSetupController.getTruckById
  )
  .put(
    protect,
    checkPermission('masterSetup', 'update'),
    validate(schemas.masterSetup.updateTruck),
    masterSetupController.updateTruck
  )
  .delete(
    protect,
    checkPermission('masterSetup', 'delete'),
    masterSetupController.deleteTruck
  );

// Driver routes
router
  .route('/drivers')
  .get(
    protect,
    checkPermission('masterSetup', 'read'),
    masterSetupController.getDrivers
  )
  .post(
    protect,
    checkPermission('masterSetup', 'create'),
    validate(schemas.masterSetup.createDriver),
    masterSetupController.createDriver
  );

router
  .route('/drivers/:id')
  .get(
    protect,
    checkPermission('masterSetup', 'read'),
    masterSetupController.getDriverById
  )
  .put(
    protect,
    checkPermission('masterSetup', 'update'),
    validate(schemas.masterSetup.updateDriver),
    masterSetupController.updateDriver
  )
  .delete(
    protect,
    checkPermission('masterSetup', 'delete'),
    masterSetupController.deleteDriver
  );

module.exports = router;
