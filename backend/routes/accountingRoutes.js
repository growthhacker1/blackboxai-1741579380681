const express = require('express');
const router = express.Router();
const { protect, checkPermission } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// Import controllers (to be created)
const accountingController = require('../controllers/accountingController');

// Ledger group routes
router
  .route('/groups')
  .get(
    protect,
    checkPermission('accounting', 'read'),
    accountingController.getAllGroups
  )
  .post(
    protect,
    checkPermission('accounting', 'create'),
    validate(schemas.accounting.group),
    accountingController.createGroup
  );

router
  .route('/groups/:id')
  .get(
    protect,
    checkPermission('accounting', 'read'),
    accountingController.getGroupById
  )
  .put(
    protect,
    checkPermission('accounting', 'update'),
    validate(schemas.accounting.group),
    accountingController.updateGroup
  )
  .delete(
    protect,
    checkPermission('accounting', 'delete'),
    accountingController.deleteGroup
  );

// Ledger routes
router
  .route('/ledgers')
  .get(
    protect,
    checkPermission('accounting', 'read'),
    accountingController.getAllLedgers
  )
  .post(
    protect,
    checkPermission('accounting', 'create'),
    validate(schemas.accounting.ledger),
    accountingController.createLedger
  );

router
  .route('/ledgers/:id')
  .get(
    protect,
    checkPermission('accounting', 'read'),
    accountingController.getLedgerById
  )
  .put(
    protect,
    checkPermission('accounting', 'update'),
    validate(schemas.accounting.ledger),
    accountingController.updateLedger
  )
  .delete(
    protect,
    checkPermission('accounting', 'delete'),
    accountingController.deleteLedger
  );

// Sub-ledger routes
router
  .route('/ledgers/:ledgerId/sub-ledgers')
  .get(
    protect,
    checkPermission('accounting', 'read'),
    accountingController.getSubLedgers
  )
  .post(
    protect,
    checkPermission('accounting', 'create'),
    validate(schemas.accounting.subLedger),
    accountingController.createSubLedger
  );

// Opening balance routes
router
  .route('/ledgers/:id/opening-balance')
  .post(
    protect,
    checkPermission('accounting', 'create'),
    validate(schemas.accounting.openingBalance),
    accountingController.setOpeningBalance
  )
  .put(
    protect,
    checkPermission('accounting', 'update'),
    validate(schemas.accounting.openingBalance),
    accountingController.updateOpeningBalance
  );

// Branch cash balance routes
router
  .route('/branches/:branchId/cash-balance')
  .post(
    protect,
    checkPermission('accounting', 'create'),
    validate(schemas.accounting.cashBalance),
    accountingController.setBranchCashBalance
  )
  .put(
    protect,
    checkPermission('accounting', 'update'),
    validate(schemas.accounting.cashBalance),
    accountingController.updateBranchCashBalance
  );

// Ledger transactions routes
router
  .route('/ledgers/:id/transactions')
  .get(
    protect,
    checkPermission('accounting', 'read'),
    accountingController.getLedgerTransactions
  );

// Ledger balance routes
router
  .route('/ledgers/:id/balance')
  .get(
    protect,
    checkPermission('accounting', 'read'),
    accountingController.getLedgerBalance
  );

// Client panel credentials routes
router
  .route('/ledgers/:id/client-panel')
  .post(
    protect,
    checkPermission('accounting', 'create'),
    validate(schemas.accounting.clientPanel),
    accountingController.setClientPanelCredentials
  )
  .put(
    protect,
    checkPermission('accounting', 'update'),
    validate(schemas.accounting.clientPanel),
    accountingController.updateClientPanelCredentials
  )
  .delete(
    protect,
    checkPermission('accounting', 'delete'),
    accountingController.removeClientPanelAccess
  );

// Ledger statement routes
router
  .route('/ledgers/:id/statement')
  .get(
    protect,
    checkPermission('accounting', 'read'),
    accountingController.getLedgerStatement
  );

// Trial balance routes
router
  .route('/trial-balance')
  .get(
    protect,
    checkPermission('accounting', 'read'),
    accountingController.getTrialBalance
  );

// Balance sheet routes
router
  .route('/balance-sheet')
  .get(
    protect,
    checkPermission('accounting', 'read'),
    accountingController.getBalanceSheet
  );

// Profit and loss routes
router
  .route('/profit-loss')
  .get(
    protect,
    checkPermission('accounting', 'read'),
    accountingController.getProfitAndLoss
  );

// Group-wise balance routes
router
  .route('/group-balance')
  .get(
    protect,
    checkPermission('accounting', 'read'),
    accountingController.getGroupBalance
  );

// Utility routes
router
  .route('/ledgers/search')
  .get(
    protect,
    checkPermission('accounting', 'read'),
    accountingController.searchLedgers
  );

router
  .route('/ledgers/validate-pan')
  .post(
    protect,
    validate(schemas.accounting.panValidation),
    accountingController.validatePAN
  );

router
  .route('/ledgers/:id/documents')
  .post(
    protect,
    checkPermission('accounting', 'create'),
    accountingController.uploadDocuments
  );

module.exports = router;
