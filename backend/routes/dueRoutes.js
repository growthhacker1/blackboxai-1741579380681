const express = require('express');
const router = express.Router();
const { protect, checkPermission, checkBranch } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// Import controllers (to be created)
const dueController = require('../controllers/dueController');

// Due Entry routes
router
  .route('/entries')
  .get(
    protect,
    checkPermission('due', 'read'),
    dueController.getAllEntries
  )
  .post(
    protect,
    checkPermission('due', 'create'),
    checkBranch(),
    validate(schemas.due.entry.create),
    dueController.createEntry
  );

router
  .route('/entries/:id')
  .get(
    protect,
    checkPermission('due', 'read'),
    dueController.getEntryById
  )
  .put(
    protect,
    checkPermission('due', 'update'),
    checkBranch(),
    validate(schemas.due.entry.update),
    dueController.updateEntry
  )
  .delete(
    protect,
    checkPermission('due', 'delete'),
    checkBranch(),
    dueController.deleteEntry
  );

// Due Receipt routes
router
  .route('/receipts')
  .get(
    protect,
    checkPermission('due', 'read'),
    dueController.getAllReceipts
  )
  .post(
    protect,
    checkPermission('due', 'create'),
    checkBranch(),
    validate(schemas.due.receipt.create),
    dueController.createReceipt
  );

router
  .route('/receipts/:id')
  .get(
    protect,
    checkPermission('due', 'read'),
    dueController.getReceiptById
  )
  .put(
    protect,
    checkPermission('due', 'update'),
    checkBranch(),
    validate(schemas.due.receipt.update),
    dueController.updateReceipt
  )
  .delete(
    protect,
    checkPermission('due', 'delete'),
    checkBranch(),
    dueController.deleteReceipt
  );

// Invoice management in due entry
router
  .route('/entries/:id/invoices')
  .post(
    protect,
    checkPermission('due', 'update'),
    checkBranch(),
    validate(schemas.due.entry.addInvoices),
    dueController.addInvoicesToEntry
  )
  .delete(
    protect,
    checkPermission('due', 'update'),
    checkBranch(),
    validate(schemas.due.entry.removeInvoices),
    dueController.removeInvoicesFromEntry
  );

// Status update routes
router
  .route('/entries/:id/status')
  .put(
    protect,
    checkPermission('due', 'update'),
    checkBranch(),
    validate(schemas.due.status),
    dueController.updateEntryStatus
  );

router
  .route('/receipts/:id/status')
  .put(
    protect,
    checkPermission('due', 'update'),
    checkBranch(),
    validate(schemas.due.status),
    dueController.updateReceiptStatus
  );

// Print routes
router
  .route('/entries/:id/print')
  .get(
    protect,
    checkPermission('due', 'print'),
    dueController.printEntry
  );

router
  .route('/receipts/:id/print')
  .get(
    protect,
    checkPermission('due', 'print'),
    dueController.printReceipt
  );

// Branch-specific routes
router
  .route('/branch/:branchId/entries')
  .get(
    protect,
    checkPermission('due', 'read'),
    checkBranch(),
    dueController.getBranchEntries
  );

router
  .route('/branch/:branchId/receipts')
  .get(
    protect,
    checkPermission('due', 'read'),
    checkBranch(),
    dueController.getBranchReceipts
  );

// Party-specific routes
router
  .route('/party/:partyId/entries')
  .get(
    protect,
    checkPermission('due', 'read'),
    dueController.getPartyEntries
  );

router
  .route('/party/:partyId/receipts')
  .get(
    protect,
    checkPermission('due', 'read'),
    dueController.getPartyReceipts
  );

// Search and filter routes
router
  .route('/entries/search')
  .get(
    protect,
    checkPermission('due', 'read'),
    dueController.searchEntries
  );

router
  .route('/receipts/search')
  .get(
    protect,
    checkPermission('due', 'read'),
    dueController.searchReceipts
  );

// Report routes
router
  .route('/reports/entries')
  .get(
    protect,
    checkPermission('due', 'read'),
    dueController.getEntriesReport
  );

router
  .route('/reports/receipts')
  .get(
    protect,
    checkPermission('due', 'read'),
    dueController.getReceiptsReport
  );

// Export routes
router
  .route('/entries/export')
  .post(
    protect,
    checkPermission('due', 'export'),
    validate(schemas.due.export),
    dueController.exportEntries
  );

router
  .route('/receipts/export')
  .post(
    protect,
    checkPermission('due', 'export'),
    validate(schemas.due.export),
    dueController.exportReceipts
  );

// Statistics routes
router
  .route('/statistics')
  .get(
    protect,
    checkPermission('due', 'read'),
    dueController.getDueStatistics
  );

router
  .route('/statistics/branch/:branchId')
  .get(
    protect,
    checkPermission('due', 'read'),
    checkBranch(),
    dueController.getBranchDueStatistics
  );

// Pending dues routes
router
  .route('/pending/entries')
  .get(
    protect,
    checkPermission('due', 'read'),
    dueController.getPendingEntries
  );

router
  .route('/pending/receipts')
  .get(
    protect,
    checkPermission('due', 'read'),
    dueController.getPendingReceipts
  );

module.exports = router;
