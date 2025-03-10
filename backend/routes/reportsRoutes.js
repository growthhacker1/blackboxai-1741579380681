const express = require('express');
const router = express.Router();
const { protect, checkPermission } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// Import controllers (to be created)
const reportsController = require('../controllers/reportsController');

// Financial Reports
router
  .route('/financial/balance-sheet')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.dateRange),
    reportsController.getBalanceSheet
  );

router
  .route('/financial/profit-loss')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.dateRange),
    reportsController.getProfitAndLoss
  );

router
  .route('/financial/trial-balance')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.dateRange),
    reportsController.getTrialBalance
  );

router
  .route('/financial/group-balance')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.groupBalance),
    reportsController.getGroupBalance
  );

// Operational Reports
router
  .route('/operational/booking-register')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.dateRange),
    reportsController.getBookingRegister
  );

router
  .route('/operational/manifest-register')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.dateRange),
    reportsController.getManifestRegister
  );

router
  .route('/operational/delivery-register')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.dateRange),
    reportsController.getDeliveryRegister
  );

// Branch Reports
router
  .route('/branch/cash-bank')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.branchReport),
    reportsController.getCashBankReport
  );

router
  .route('/branch/performance')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.branchReport),
    reportsController.getBranchPerformance
  );

// Vehicle Reports
router
  .route('/vehicle/performance')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.vehicleReport),
    reportsController.getVehiclePerformance
  );

router
  .route('/vehicle/maintenance')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.vehicleReport),
    reportsController.getVehicleMaintenance
  );

// Party Reports
router
  .route('/party/ledger')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.partyLedger),
    reportsController.getPartyLedger
  );

router
  .route('/party/outstanding')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.partyOutstanding),
    reportsController.getPartyOutstanding
  );

// Tax Reports
router
  .route('/tax/vat')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.taxReport),
    reportsController.getVATReport
  );

router
  .route('/tax/tds')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.taxReport),
    reportsController.getTDSReport
  );

// Summary Reports
router
  .route('/summary/monthly')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.monthlySummary),
    reportsController.getMonthlySummary
  );

router
  .route('/summary/yearly')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.yearlySummary),
    reportsController.getYearlySummary
  );

// Stock Reports
router
  .route('/stock/godown')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.stockReport),
    reportsController.getGodownStock
  );

router
  .route('/stock/movement')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.stockMovement),
    reportsController.getStockMovement
  );

// Due Reports
router
  .route('/due/entry')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.dueReport),
    reportsController.getDueEntryReport
  );

router
  .route('/due/receipt')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.dueReport),
    reportsController.getDueReceiptReport
  );

// Profit Reports
router
  .route('/profit/branch-wise')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.profitReport),
    reportsController.getBranchWiseProfit
  );

router
  .route('/profit/vehicle-wise')
  .get(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.profitReport),
    reportsController.getVehicleWiseProfit
  );

// Custom Reports
router
  .route('/custom')
  .post(
    protect,
    checkPermission('reports', 'read'),
    validate(schemas.reports.customReport),
    reportsController.generateCustomReport
  );

// Export Reports
router
  .route('/export/:reportType')
  .get(
    protect,
    checkPermission('reports', 'export'),
    validate(schemas.reports.export),
    reportsController.exportReport
  );

// Schedule Reports
router
  .route('/schedule')
  .post(
    protect,
    checkPermission('reports', 'create'),
    validate(schemas.reports.schedule),
    reportsController.scheduleReport
  )
  .get(
    protect,
    checkPermission('reports', 'read'),
    reportsController.getScheduledReports
  );

router
  .route('/schedule/:id')
  .put(
    protect,
    checkPermission('reports', 'update'),
    validate(schemas.reports.schedule),
    reportsController.updateScheduledReport
  )
  .delete(
    protect,
    checkPermission('reports', 'delete'),
    reportsController.deleteScheduledReport
  );

// Report Templates
router
  .route('/templates')
  .post(
    protect,
    checkPermission('reports', 'create'),
    validate(schemas.reports.template),
    reportsController.createTemplate
  )
  .get(
    protect,
    checkPermission('reports', 'read'),
    reportsController.getTemplates
  );

router
  .route('/templates/:id')
  .put(
    protect,
    checkPermission('reports', 'update'),
    validate(schemas.reports.template),
    reportsController.updateTemplate
  )
  .delete(
    protect,
    checkPermission('reports', 'delete'),
    reportsController.deleteTemplate
  );

module.exports = router;
