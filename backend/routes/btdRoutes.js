const express = require('express');
const router = express.Router();
const { protect, checkPermission, checkBranch } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// Import controllers (to be created)
const btdController = require('../controllers/btdController');

// Branch routes
router
  .route('/branches')
  .get(
    protect,
    checkPermission('btd', 'read'),
    btdController.getAllBranches
  )
  .post(
    protect,
    checkPermission('btd', 'create'),
    validate(schemas.btd.branch),
    btdController.createBranch
  );

router
  .route('/branches/:id')
  .get(
    protect,
    checkPermission('btd', 'read'),
    btdController.getBranchById
  )
  .put(
    protect,
    checkPermission('btd', 'update'),
    validate(schemas.btd.branch),
    btdController.updateBranch
  )
  .delete(
    protect,
    checkPermission('btd', 'delete'),
    btdController.deleteBranch
  );

// Branch place group routes
router
  .route('/branches/:branchId/place-groups')
  .get(
    protect,
    checkPermission('btd', 'read'),
    checkBranch(),
    btdController.getBranchPlaceGroups
  )
  .post(
    protect,
    checkPermission('btd', 'create'),
    checkBranch(),
    validate(schemas.btd.placeGroup),
    btdController.createPlaceGroup
  );

router
  .route('/branches/:branchId/place-groups/:id')
  .put(
    protect,
    checkPermission('btd', 'update'),
    checkBranch(),
    validate(schemas.btd.placeGroup),
    btdController.updatePlaceGroup
  )
  .delete(
    protect,
    checkPermission('btd', 'delete'),
    checkBranch(),
    btdController.deletePlaceGroup
  );

// Truck routes
router
  .route('/trucks')
  .get(
    protect,
    checkPermission('btd', 'read'),
    btdController.getAllTrucks
  )
  .post(
    protect,
    checkPermission('btd', 'create'),
    validate(schemas.btd.truck),
    btdController.createTruck
  );

router
  .route('/trucks/:id')
  .get(
    protect,
    checkPermission('btd', 'read'),
    btdController.getTruckById
  )
  .put(
    protect,
    checkPermission('btd', 'update'),
    validate(schemas.btd.truck),
    btdController.updateTruck
  )
  .delete(
    protect,
    checkPermission('btd', 'delete'),
    btdController.deleteTruck
  );

// Truck document routes
router
  .route('/trucks/:id/documents')
  .post(
    protect,
    checkPermission('btd', 'create'),
    btdController.uploadTruckDocuments
  );

// Truck maintenance routes
router
  .route('/trucks/:id/maintenance')
  .get(
    protect,
    checkPermission('btd', 'read'),
    btdController.getTruckMaintenance
  )
  .post(
    protect,
    checkPermission('btd', 'create'),
    validate(schemas.btd.maintenance),
    btdController.addMaintenanceRecord
  );

// Driver routes
router
  .route('/drivers')
  .get(
    protect,
    checkPermission('btd', 'read'),
    btdController.getAllDrivers
  )
  .post(
    protect,
    checkPermission('btd', 'create'),
    validate(schemas.btd.driver),
    btdController.createDriver
  );

router
  .route('/drivers/:id')
  .get(
    protect,
    checkPermission('btd', 'read'),
    btdController.getDriverById
  )
  .put(
    protect,
    checkPermission('btd', 'update'),
    validate(schemas.btd.driver),
    btdController.updateDriver
  )
  .delete(
    protect,
    checkPermission('btd', 'delete'),
    btdController.deleteDriver
  );

// Driver document routes
router
  .route('/drivers/:id/documents')
  .post(
    protect,
    checkPermission('btd', 'create'),
    btdController.uploadDriverDocuments
  );

// Driver assignment routes
router
  .route('/drivers/:id/assign')
  .post(
    protect,
    checkPermission('btd', 'update'),
    validate(schemas.btd.driverAssignment),
    btdController.assignDriver
  )
  .delete(
    protect,
    checkPermission('btd', 'update'),
    btdController.unassignDriver
  );

// Utility routes
router
  .route('/trucks/search')
  .get(
    protect,
    checkPermission('btd', 'read'),
    btdController.searchTrucks
  );

router
  .route('/drivers/search')
  .get(
    protect,
    checkPermission('btd', 'read'),
    btdController.searchDrivers
  );

router
  .route('/branches/search')
  .get(
    protect,
    checkPermission('btd', 'read'),
    btdController.searchBranches
  );

// Branch statistics
router
  .route('/branches/:id/statistics')
  .get(
    protect,
    checkPermission('btd', 'read'),
    btdController.getBranchStatistics
  );

// Truck statistics
router
  .route('/trucks/:id/statistics')
  .get(
    protect,
    checkPermission('btd', 'read'),
    btdController.getTruckStatistics
  );

// Driver statistics
router
  .route('/drivers/:id/statistics')
  .get(
    protect,
    checkPermission('btd', 'read'),
    btdController.getDriverStatistics
  );

// Export routes
router
  .route('/branches/export')
  .get(
    protect,
    checkPermission('btd', 'export'),
    btdController.exportBranches
  );

router
  .route('/trucks/export')
  .get(
    protect,
    checkPermission('btd', 'export'),
    btdController.exportTrucks
  );

router
  .route('/drivers/export')
  .get(
    protect,
    checkPermission('btd', 'export'),
    btdController.exportDrivers
  );

module.exports = router;
