const express = require('express');
const router = express.Router();
const { protect, checkPermission, checkBranch } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// Import controllers (to be created)
const billingController = require('../controllers/billingController');

// Invoice (Bilti) routes
router
  .route('/')
  .get(
    protect,
    checkPermission('billing', 'read'),
    billingController.getAllInvoices
  )
  .post(
    protect,
    checkPermission('billing', 'create'),
    checkBranch(),
    validate(schemas.billing.create),
    billingController.createInvoice
  );

router
  .route('/:id')
  .get(
    protect,
    checkPermission('billing', 'read'),
    billingController.getInvoiceById
  )
  .put(
    protect,
    checkPermission('billing', 'update'),
    checkBranch(),
    validate(schemas.billing.update),
    billingController.updateInvoice
  )
  .delete(
    protect,
    checkPermission('billing', 'delete'),
    checkBranch(),
    billingController.deleteInvoice
  );

// VCTS (Value Added Services) routes
router
  .route('/:id/vcts')
  .post(
    protect,
    checkPermission('billing', 'create'),
    checkBranch(),
    validate(schemas.billing.vcts),
    billingController.addVCTS
  )
  .put(
    protect,
    checkPermission('billing', 'update'),
    checkBranch(),
    validate(schemas.billing.vcts),
    billingController.updateVCTS
  )
  .delete(
    protect,
    checkPermission('billing', 'delete'),
    checkBranch(),
    billingController.deleteVCTS
  );

// Invoice items routes
router
  .route('/:id/items')
  .post(
    protect,
    checkPermission('billing', 'create'),
    checkBranch(),
    validate(schemas.billing.item),
    billingController.addItem
  )
  .put(
    protect,
    checkPermission('billing', 'update'),
    checkBranch(),
    validate(schemas.billing.item),
    billingController.updateItem
  )
  .delete(
    protect,
    checkPermission('billing', 'delete'),
    checkBranch(),
    billingController.deleteItem
  );

// Invoice status routes
router
  .route('/:id/status')
  .put(
    protect,
    checkPermission('billing', 'update'),
    checkBranch(),
    validate(schemas.billing.status),
    billingController.updateStatus
  );

// Invoice print routes
router
  .route('/:id/print')
  .get(
    protect,
    checkPermission('billing', 'print'),
    billingController.printInvoice
  );

// Invoice delivery details routes
router
  .route('/:id/delivery')
  .put(
    protect,
    checkPermission('billing', 'update'),
    checkBranch(),
    validate(schemas.billing.delivery),
    billingController.updateDeliveryDetails
  );

// Branch-specific routes
router
  .route('/branch/:branchId')
  .get(
    protect,
    checkPermission('billing', 'read'),
    checkBranch(),
    billingController.getBranchInvoices
  );

// Search and filter routes
router
  .route('/search')
  .get(
    protect,
    checkPermission('billing', 'read'),
    billingController.searchInvoices
  );

router
  .route('/filter')
  .post(
    protect,
    checkPermission('billing', 'read'),
    validate(schemas.billing.filter),
    billingController.filterInvoices
  );

// Report routes
router
  .route('/reports/booking-register')
  .get(
    protect,
    checkPermission('billing', 'read'),
    billingController.getBookingRegister
  );

router
  .route('/reports/undispatched')
  .get(
    protect,
    checkPermission('billing', 'read'),
    billingController.getUndispatchedInvoices
  );

router
  .route('/reports/freight-receipt')
  .get(
    protect,
    checkPermission('billing', 'read'),
    billingController.getFreightReceiptReport
  );

router
  .route('/reports/discrepancies')
  .get(
    protect,
    checkPermission('billing', 'read'),
    billingController.getDiscrepanciesReport
  );

// Export routes
router
  .route('/export')
  .post(
    protect,
    checkPermission('billing', 'export'),
    validate(schemas.billing.export),
    billingController.exportInvoices
  );

// Bulk operations
router
  .route('/bulk/create')
  .post(
    protect,
    checkPermission('billing', 'create'),
    checkBranch(),
    validate(schemas.billing.bulkCreate),
    billingController.bulkCreateInvoices
  );

router
  .route('/bulk/update')
  .put(
    protect,
    checkPermission('billing', 'update'),
    checkBranch(),
    validate(schemas.billing.bulkUpdate),
    billingController.bulkUpdateInvoices
  );

// Rate calculation routes
router
  .route('/calculate-rate')
  .post(
    protect,
    validate(schemas.billing.rateCalculation),
    billingController.calculateRate
  );

// VAT calculation routes
router
  .route('/calculate-vat')
  .post(
    protect,
    validate(schemas.billing.vatCalculation),
    billingController.calculateVAT
  );

// Statistics routes
router
  .route('/statistics')
  .get(
    protect,
    checkPermission('billing', 'read'),
    billingController.getBillingStatistics
  );

router
  .route('/statistics/branch/:branchId')
  .get(
    protect,
    checkPermission('billing', 'read'),
    checkBranch(),
    billingController.getBranchBillingStatistics
  );

module.exports = router;
