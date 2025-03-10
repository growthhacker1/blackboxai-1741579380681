const express = require('express');
const router = express.Router();
const { protect, checkPermission } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// Import controllers (to be created)
const settingsController = require('../controllers/settingsController');

// Company Information routes
router
  .route('/company')
  .get(
    protect,
    checkPermission('settings', 'read'),
    settingsController.getCompanyInfo
  )
  .put(
    protect,
    checkPermission('settings', 'update'),
    validate(schemas.settings.company),
    settingsController.updateCompanyInfo
  );

// Company logo/image routes
router
  .route('/company/images')
  .post(
    protect,
    checkPermission('settings', 'update'),
    settingsController.uploadCompanyImages
  );

// VAT settings routes
router
  .route('/vat')
  .get(
    protect,
    checkPermission('settings', 'read'),
    settingsController.getVATSettings
  )
  .put(
    protect,
    checkPermission('settings', 'update'),
    validate(schemas.settings.vat),
    settingsController.updateVATSettings
  );

// Bill terms routes
router
  .route('/bill-terms')
  .get(
    protect,
    checkPermission('settings', 'read'),
    settingsController.getBillTerms
  )
  .post(
    protect,
    checkPermission('settings', 'create'),
    validate(schemas.settings.billTerm),
    settingsController.createBillTerm
  );

router
  .route('/bill-terms/:id')
  .put(
    protect,
    checkPermission('settings', 'update'),
    validate(schemas.settings.billTerm),
    settingsController.updateBillTerm
  )
  .delete(
    protect,
    checkPermission('settings', 'delete'),
    settingsController.deleteBillTerm
  );

// Series settings routes
router
  .route('/series')
  .get(
    protect,
    checkPermission('settings', 'read'),
    settingsController.getAllSeries
  )
  .post(
    protect,
    checkPermission('settings', 'create'),
    validate(schemas.settings.series),
    settingsController.createSeries
  );

router
  .route('/series/:id')
  .put(
    protect,
    checkPermission('settings', 'update'),
    validate(schemas.settings.series),
    settingsController.updateSeries
  )
  .delete(
    protect,
    checkPermission('settings', 'delete'),
    settingsController.deleteSeries
  );

// Series blocking routes
router
  .route('/series/:id/block')
  .put(
    protect,
    checkPermission('settings', 'update'),
    settingsController.blockSeries
  );

// Print settings routes
router
  .route('/print')
  .get(
    protect,
    checkPermission('settings', 'read'),
    settingsController.getPrintSettings
  )
  .put(
    protect,
    checkPermission('settings', 'update'),
    validate(schemas.settings.print),
    settingsController.updatePrintSettings
  );

// Mail settings routes
router
  .route('/mail')
  .get(
    protect,
    checkPermission('settings', 'read'),
    settingsController.getMailSettings
  )
  .put(
    protect,
    checkPermission('settings', 'update'),
    validate(schemas.settings.mail),
    settingsController.updateMailSettings
  );

// Test mail configuration
router
  .route('/mail/test')
  .post(
    protect,
    checkPermission('settings', 'update'),
    validate(schemas.settings.mailTest),
    settingsController.testMailConfiguration
  );

// POD settings routes
router
  .route('/pod')
  .get(
    protect,
    checkPermission('settings', 'read'),
    settingsController.getPODSettings
  )
  .put(
    protect,
    checkPermission('settings', 'update'),
    validate(schemas.settings.pod),
    settingsController.updatePODSettings
  );

// System settings routes
router
  .route('/system')
  .get(
    protect,
    checkPermission('settings', 'read'),
    settingsController.getSystemSettings
  )
  .put(
    protect,
    checkPermission('settings', 'update'),
    validate(schemas.settings.system),
    settingsController.updateSystemSettings
  );

// Backup settings routes
router
  .route('/backup')
  .get(
    protect,
    checkPermission('settings', 'read'),
    settingsController.getBackupSettings
  )
  .put(
    protect,
    checkPermission('settings', 'update'),
    validate(schemas.settings.backup),
    settingsController.updateBackupSettings
  );

// Manual backup route
router
  .route('/backup/manual')
  .post(
    protect,
    checkPermission('settings', 'create'),
    settingsController.createManualBackup
  );

// Restore from backup route
router
  .route('/backup/restore')
  .post(
    protect,
    checkPermission('settings', 'update'),
    settingsController.restoreFromBackup
  );

// IRD (Inland Revenue Department) settings
router
  .route('/ird')
  .get(
    protect,
    checkPermission('settings', 'read'),
    settingsController.getIRDSettings
  )
  .put(
    protect,
    checkPermission('settings', 'update'),
    validate(schemas.settings.ird),
    settingsController.updateIRDSettings
  );

// User role management routes
router
  .route('/roles')
  .get(
    protect,
    checkPermission('settings', 'read'),
    settingsController.getAllRoles
  )
  .post(
    protect,
    checkPermission('settings', 'create'),
    validate(schemas.settings.role),
    settingsController.createRole
  );

router
  .route('/roles/:id')
  .put(
    protect,
    checkPermission('settings', 'update'),
    validate(schemas.settings.role),
    settingsController.updateRole
  )
  .delete(
    protect,
    checkPermission('settings', 'delete'),
    settingsController.deleteRole
  );

// System maintenance routes
router
  .route('/maintenance/recalculate')
  .post(
    protect,
    checkPermission('settings', 'update'),
    settingsController.recalculateSystem
  );

router
  .route('/maintenance/cleanup')
  .post(
    protect,
    checkPermission('settings', 'update'),
    settingsController.cleanupSystem
  );

// Export settings
router
  .route('/export')
  .get(
    protect,
    checkPermission('settings', 'export'),
    settingsController.exportSettings
  );

// Import settings
router
  .route('/import')
  .post(
    protect,
    checkPermission('settings', 'update'),
    settingsController.importSettings
  );

module.exports = router;
