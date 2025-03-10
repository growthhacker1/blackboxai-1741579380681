const express = require('express');
const router = express.Router();
const { protect, checkPermission, checkBranch } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// Import controllers (to be created)
const freightChallanController = require('../controllers/freightChallanController');

// Freight challan routes
router
  .route('/')
  .get(
    protect,
    checkPermission('freight_challan', 'read'),
    freightChallanController.getAllChallans
  )
  .post(
    protect,
    checkPermission('freight_challan', 'create'),
    checkBranch(),
    validate(schemas.freightChallan.create),
    freightChallanController.createChallan
  );

router
  .route('/:id')
  .get(
    protect,
    checkPermission('freight_challan', 'read'),
    freightChallanController.getChallanById
  )
  .put(
    protect,
    checkPermission('freight_challan', 'update'),
    checkBranch(),
    validate(schemas.freightChallan.update),
    freightChallanController.updateChallan
  )
  .delete(
    protect,
    checkPermission('freight_challan', 'delete'),
    checkBranch(),
    freightChallanController.deleteChallan
  );

// Manifest management in challan
router
  .route('/:id/manifests')
  .post(
    protect,
    checkPermission('freight_challan', 'update'),
    checkBranch(),
    validate(schemas.freightChallan.addManifests),
    freightChallanController.addManifests
  )
  .delete(
    protect,
    checkPermission('freight_challan', 'update'),
    checkBranch(),
    validate(schemas.freightChallan.removeManifests),
    freightChallanController.removeManifests
  );

// Payment routes
router
  .route('/:id/advance-payment')
  .post(
    protect,
    checkPermission('freight_challan', 'update'),
    checkBranch(),
    validate(schemas.freightChallan.payment),
    freightChallanController.addAdvancePayment
  );

router
  .route('/:id/balance-payment')
  .post(
    protect,
    checkPermission('freight_challan', 'update'),
    checkBranch(),
    validate(schemas.freightChallan.payment),
    freightChallanController.addBalancePayment
  );

// Additional charges routes
router
  .route('/:id/charges')
  .post(
    protect,
    checkPermission('freight_challan', 'update'),
    checkBranch(),
    validate(schemas.freightChallan.charges),
    freightChallanController.addCharges
  )
  .put(
    protect,
    checkPermission('freight_challan', 'update'),
    checkBranch(),
    validate(schemas.freightChallan.charges),
    freightChallanController.updateCharges
  )
  .delete(
    protect,
    checkPermission('freight_challan', 'update'),
    checkBranch(),
    freightChallanController.deleteCharges
  );

// Status update routes
router
  .route('/:id/status')
  .put(
    protect,
    checkPermission('freight_challan', 'update'),
    checkBranch(),
    validate(schemas.freightChallan.status),
    freightChallanController.updateStatus
  );

// Print routes
router
  .route('/:id/print')
  .get(
    protect,
    checkPermission('freight_challan', 'print'),
    freightChallanController.printChallan
  );

// Branch-specific routes
router
  .route('/branch/:branchId')
  .get(
    protect,
    checkPermission('freight_challan', 'read'),
    checkBranch(),
    freightChallanController.getBranchChallans
  );

// Search and filter routes
router
  .route('/search')
  .get(
    protect,
    checkPermission('freight_challan', 'read'),
    freightChallanController.searchChallans
  );

router
  .route('/filter')
  .post(
    protect,
    checkPermission('freight_challan', 'read'),
    validate(schemas.freightChallan.filter),
    freightChallanController.filterChallans
  );

// Report routes
router
  .route('/reports/daily')
  .get(
    protect,
    checkPermission('freight_challan', 'read'),
    freightChallanController.getDailyReport
  );

router
  .route('/reports/vehicle-wise')
  .get(
    protect,
    checkPermission('freight_challan', 'read'),
    freightChallanController.getVehicleWiseReport
  );

router
  .route('/reports/payment-status')
  .get(
    protect,
    checkPermission('freight_challan', 'read'),
    freightChallanController.getPaymentStatusReport
  );

// TDS reports
router
  .route('/reports/tds')
  .get(
    protect,
    checkPermission('freight_challan', 'read'),
    freightChallanController.getTDSReport
  );

// Export routes
router
  .route('/export')
  .post(
    protect,
    checkPermission('freight_challan', 'export'),
    validate(schemas.freightChallan.export),
    freightChallanController.exportChallans
  );

// Bulk operations
router
  .route('/bulk/create')
  .post(
    protect,
    checkPermission('freight_challan', 'create'),
    checkBranch(),
    validate(schemas.freightChallan.bulkCreate),
    freightChallanController.bulkCreateChallans
  );

router
  .route('/bulk/update')
  .put(
    protect,
    checkPermission('freight_challan', 'update'),
    checkBranch(),
    validate(schemas.freightChallan.bulkUpdate),
    freightChallanController.bulkUpdateChallans
  );

// Statistics routes
router
  .route('/statistics')
  .get(
    protect,
    checkPermission('freight_challan', 'read'),
    freightChallanController.getChallanStatistics
  );

router
  .route('/statistics/branch/:branchId')
  .get(
    protect,
    checkPermission('freight_challan', 'read'),
    checkBranch(),
    freightChallanController.getBranchChallanStatistics
  );

// Pending payments routes
router
  .route('/pending/payments')
  .get(
    protect,
    checkPermission('freight_challan', 'read'),
    freightChallanController.getPendingPayments
  );

// Vehicle-specific routes
router
  .route('/vehicle/:truckId')
  .get(
    protect,
    checkPermission('freight_challan', 'read'),
    freightChallanController.getVehicleChallans
  );

module.exports = router;
