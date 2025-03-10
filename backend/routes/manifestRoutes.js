const express = require('express');
const router = express.Router();
const { protect, checkPermission, checkBranch } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// Import controllers (to be created)
const manifestController = require('../controllers/manifestController');

// Manifest routes
router
  .route('/')
  .get(
    protect,
    checkPermission('manifest', 'read'),
    manifestController.getAllManifests
  )
  .post(
    protect,
    checkPermission('manifest', 'create'),
    checkBranch(),
    validate(schemas.manifest.create),
    manifestController.createManifest
  );

router
  .route('/:id')
  .get(
    protect,
    checkPermission('manifest', 'read'),
    manifestController.getManifestById
  )
  .put(
    protect,
    checkPermission('manifest', 'update'),
    checkBranch(),
    validate(schemas.manifest.update),
    manifestController.updateManifest
  )
  .delete(
    protect,
    checkPermission('manifest', 'delete'),
    checkBranch(),
    manifestController.deleteManifest
  );

// Invoice management in manifest
router
  .route('/:id/invoices')
  .post(
    protect,
    checkPermission('manifest', 'update'),
    checkBranch(),
    validate(schemas.manifest.addInvoices),
    manifestController.addInvoices
  )
  .delete(
    protect,
    checkPermission('manifest', 'update'),
    checkBranch(),
    validate(schemas.manifest.removeInvoices),
    manifestController.removeInvoices
  );

// Tracking routes
router
  .route('/:id/tracking')
  .post(
    protect,
    checkPermission('manifest', 'update'),
    checkBranch(),
    validate(schemas.manifest.tracking),
    manifestController.addTrackingUpdate
  )
  .get(
    protect,
    checkPermission('manifest', 'read'),
    manifestController.getTrackingHistory
  );

// Status update routes
router
  .route('/:id/status')
  .put(
    protect,
    checkPermission('manifest', 'update'),
    checkBranch(),
    validate(schemas.manifest.status),
    manifestController.updateStatus
  );

// Delivery details routes
router
  .route('/:id/delivery')
  .put(
    protect,
    checkPermission('manifest', 'update'),
    checkBranch(),
    validate(schemas.manifest.delivery),
    manifestController.updateDeliveryDetails
  );

// Print routes
router
  .route('/:id/print')
  .get(
    protect,
    checkPermission('manifest', 'print'),
    manifestController.printManifest
  );

// Branch-specific routes
router
  .route('/branch/:branchId')
  .get(
    protect,
    checkPermission('manifest', 'read'),
    checkBranch(),
    manifestController.getBranchManifests
  );

// Search and filter routes
router
  .route('/search')
  .get(
    protect,
    checkPermission('manifest', 'read'),
    manifestController.searchManifests
  );

router
  .route('/filter')
  .post(
    protect,
    checkPermission('manifest', 'read'),
    validate(schemas.manifest.filter),
    manifestController.filterManifests
  );

// Vehicle tracking routes
router
  .route('/vehicle/:truckId/tracking')
  .get(
    protect,
    checkPermission('manifest', 'read'),
    manifestController.getVehicleTracking
  );

// Report routes
router
  .route('/reports/daily')
  .get(
    protect,
    checkPermission('manifest', 'read'),
    manifestController.getDailyReport
  );

router
  .route('/reports/vehicle-wise')
  .get(
    protect,
    checkPermission('manifest', 'read'),
    manifestController.getVehicleWiseReport
  );

router
  .route('/reports/destination-wise')
  .get(
    protect,
    checkPermission('manifest', 'read'),
    manifestController.getDestinationWiseReport
  );

// Export routes
router
  .route('/export')
  .post(
    protect,
    checkPermission('manifest', 'export'),
    validate(schemas.manifest.export),
    manifestController.exportManifests
  );

// Bulk operations
router
  .route('/bulk/create')
  .post(
    protect,
    checkPermission('manifest', 'create'),
    checkBranch(),
    validate(schemas.manifest.bulkCreate),
    manifestController.bulkCreateManifests
  );

router
  .route('/bulk/update')
  .put(
    protect,
    checkPermission('manifest', 'update'),
    checkBranch(),
    validate(schemas.manifest.bulkUpdate),
    manifestController.bulkUpdateManifests
  );

// Statistics routes
router
  .route('/statistics')
  .get(
    protect,
    checkPermission('manifest', 'read'),
    manifestController.getManifestStatistics
  );

router
  .route('/statistics/branch/:branchId')
  .get(
    protect,
    checkPermission('manifest', 'read'),
    checkBranch(),
    manifestController.getBranchManifestStatistics
  );

// POD (Proof of Delivery) routes
router
  .route('/:id/pod')
  .post(
    protect,
    checkPermission('manifest', 'update'),
    checkBranch(),
    manifestController.uploadPOD
  )
  .get(
    protect,
    checkPermission('manifest', 'read'),
    manifestController.getPOD
  );

// Pending manifests routes
router
  .route('/pending/delivery')
  .get(
    protect,
    checkPermission('manifest', 'read'),
    manifestController.getPendingDeliveries
  );

router
  .route('/pending/pod')
  .get(
    protect,
    checkPermission('manifest', 'read'),
    manifestController.getPendingPODs
  );

module.exports = router;
