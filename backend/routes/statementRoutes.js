const express = require('express');
const router = express.Router();
const { protect, checkPermission, checkBranch } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// Import controllers (to be created)
const statementController = require('../controllers/statementController');

// Statement routes
router
  .route('/')
  .get(
    protect,
    checkPermission('statement', 'read'),
    statementController.getAllStatements
  )
  .post(
    protect,
    checkPermission('statement', 'create'),
    checkBranch(),
    validate(schemas.statement.create),
    statementController.createStatement
  );

router
  .route('/:id')
  .get(
    protect,
    checkPermission('statement', 'read'),
    statementController.getStatementById
  )
  .put(
    protect,
    checkPermission('statement', 'update'),
    checkBranch(),
    validate(schemas.statement.update),
    statementController.updateStatement
  )
  .delete(
    protect,
    checkPermission('statement', 'delete'),
    checkBranch(),
    statementController.deleteStatement
  );

// Invoice management in statement
router
  .route('/:id/invoices')
  .post(
    protect,
    checkPermission('statement', 'update'),
    checkBranch(),
    validate(schemas.statement.addInvoices),
    statementController.addInvoices
  )
  .delete(
    protect,
    checkPermission('statement', 'update'),
    checkBranch(),
    validate(schemas.statement.removeInvoices),
    statementController.removeInvoices
  );

// Additional charges routes
router
  .route('/:id/additional-charges')
  .post(
    protect,
    checkPermission('statement', 'update'),
    checkBranch(),
    validate(schemas.statement.additionalCharges),
    statementController.addAdditionalCharges
  )
  .put(
    protect,
    checkPermission('statement', 'update'),
    checkBranch(),
    validate(schemas.statement.additionalCharges),
    statementController.updateAdditionalCharges
  )
  .delete(
    protect,
    checkPermission('statement', 'update'),
    checkBranch(),
    statementController.deleteAdditionalCharges
  );

// Payment routes
router
  .route('/:id/payments')
  .post(
    protect,
    checkPermission('statement', 'update'),
    checkBranch(),
    validate(schemas.statement.payment),
    statementController.addPayment
  )
  .get(
    protect,
    checkPermission('statement', 'read'),
    statementController.getPaymentHistory
  );

// Status update routes
router
  .route('/:id/status')
  .put(
    protect,
    checkPermission('statement', 'update'),
    checkBranch(),
    validate(schemas.statement.status),
    statementController.updateStatus
  );

// Print routes
router
  .route('/:id/print')
  .get(
    protect,
    checkPermission('statement', 'print'),
    statementController.printStatement
  );

// Branch-specific routes
router
  .route('/branch/:branchId')
  .get(
    protect,
    checkPermission('statement', 'read'),
    checkBranch(),
    statementController.getBranchStatements
  );

// Party-specific routes
router
  .route('/party/:partyId')
  .get(
    protect,
    checkPermission('statement', 'read'),
    statementController.getPartyStatements
  );

// Search and filter routes
router
  .route('/search')
  .get(
    protect,
    checkPermission('statement', 'read'),
    statementController.searchStatements
  );

router
  .route('/filter')
  .post(
    protect,
    checkPermission('statement', 'read'),
    validate(schemas.statement.filter),
    statementController.filterStatements
  );

// Report routes
router
  .route('/reports/daily')
  .get(
    protect,
    checkPermission('statement', 'read'),
    statementController.getDailyReport
  );

router
  .route('/reports/party-wise')
  .get(
    protect,
    checkPermission('statement', 'read'),
    statementController.getPartyWiseReport
  );

router
  .route('/reports/payment-status')
  .get(
    protect,
    checkPermission('statement', 'read'),
    statementController.getPaymentStatusReport
  );

// Export routes
router
  .route('/export')
  .post(
    protect,
    checkPermission('statement', 'export'),
    validate(schemas.statement.export),
    statementController.exportStatements
  );

// Bulk operations
router
  .route('/bulk/create')
  .post(
    protect,
    checkPermission('statement', 'create'),
    checkBranch(),
    validate(schemas.statement.bulkCreate),
    statementController.bulkCreateStatements
  );

router
  .route('/bulk/update')
  .put(
    protect,
    checkPermission('statement', 'update'),
    checkBranch(),
    validate(schemas.statement.bulkUpdate),
    statementController.bulkUpdateStatements
  );

// Statistics routes
router
  .route('/statistics')
  .get(
    protect,
    checkPermission('statement', 'read'),
    statementController.getStatementStatistics
  );

router
  .route('/statistics/branch/:branchId')
  .get(
    protect,
    checkPermission('statement', 'read'),
    checkBranch(),
    statementController.getBranchStatementStatistics
  );

// Due date reminder routes
router
  .route('/due-reminders')
  .get(
    protect,
    checkPermission('statement', 'read'),
    statementController.getDueReminders
  );

// Outstanding statement routes
router
  .route('/outstanding')
  .get(
    protect,
    checkPermission('statement', 'read'),
    statementController.getOutstandingStatements
  );

// Party balance routes
router
  .route('/party-balance/:partyId')
  .get(
    protect,
    checkPermission('statement', 'read'),
    statementController.getPartyBalance
  );

// Email statement routes
router
  .route('/:id/email')
  .post(
    protect,
    checkPermission('statement', 'update'),
    validate(schemas.statement.email),
    statementController.emailStatement
  );

module.exports = router;
