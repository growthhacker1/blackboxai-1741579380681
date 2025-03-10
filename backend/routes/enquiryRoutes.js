const express = require('express');
const router = express.Router();
const { protect, checkPermission } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// Import controllers (to be created)
const enquiryController = require('../controllers/enquiryController');

// Global search route
router
  .route('/search')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    validate(schemas.enquiry.search),
    enquiryController.globalSearch
  );

// Document tracking routes
router
  .route('/track/bilti/:biltiNo')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.trackBilti
  );

router
  .route('/track/manifest/:manifestNo')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.trackManifest
  );

router
  .route('/track/challan/:challanNo')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.trackChallan
  );

router
  .route('/track/statement/:statementNo')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.trackStatement
  );

// Document history routes
router
  .route('/history/bilti/:biltiNo')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getBiltiHistory
  );

router
  .route('/history/manifest/:manifestNo')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getManifestHistory
  );

router
  .route('/history/challan/:challanNo')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getChallanHistory
  );

router
  .route('/history/statement/:statementNo')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getStatementHistory
  );

// Status enquiry routes
router
  .route('/status/bilti/:biltiNo')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getBiltiStatus
  );

router
  .route('/status/manifest/:manifestNo')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getManifestStatus
  );

router
  .route('/status/challan/:challanNo')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getChallanStatus
  );

router
  .route('/status/statement/:statementNo')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getStatementStatus
  );

// Party enquiry routes
router
  .route('/party/:partyId/bilti')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getPartyBilti
  );

router
  .route('/party/:partyId/statements')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getPartyStatements
  );

router
  .route('/party/:partyId/dues')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getPartyDues
  );

// Vehicle enquiry routes
router
  .route('/vehicle/:truckId/manifests')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getVehicleManifests
  );

router
  .route('/vehicle/:truckId/challans')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getVehicleChallans
  );

// Branch enquiry routes
router
  .route('/branch/:branchId/bilti')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getBranchBilti
  );

router
  .route('/branch/:branchId/manifests')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getBranchManifests
  );

router
  .route('/branch/:branchId/statements')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getBranchStatements
  );

// Document relationships
router
  .route('/relationships/bilti/:biltiNo')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getBiltiRelationships
  );

router
  .route('/relationships/manifest/:manifestNo')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getManifestRelationships
  );

// Advanced search routes
router
  .route('/advanced/bilti')
  .post(
    protect,
    checkPermission('enquiry', 'read'),
    validate(schemas.enquiry.advancedBilti),
    enquiryController.advancedBiltiSearch
  );

router
  .route('/advanced/manifest')
  .post(
    protect,
    checkPermission('enquiry', 'read'),
    validate(schemas.enquiry.advancedManifest),
    enquiryController.advancedManifestSearch
  );

router
  .route('/advanced/challan')
  .post(
    protect,
    checkPermission('enquiry', 'read'),
    validate(schemas.enquiry.advancedChallan),
    enquiryController.advancedChallanSearch
  );

// Export search results
router
  .route('/export')
  .post(
    protect,
    checkPermission('enquiry', 'export'),
    validate(schemas.enquiry.export),
    enquiryController.exportSearchResults
  );

// Audit trail routes
router
  .route('/audit/bilti/:biltiNo')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getBiltiAuditTrail
  );

router
  .route('/audit/manifest/:manifestNo')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getManifestAuditTrail
  );

router
  .route('/audit/challan/:challanNo')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getChallanAuditTrail
  );

// Recent activity routes
router
  .route('/recent/bilti')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getRecentBilti
  );

router
  .route('/recent/manifest')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getRecentManifests
  );

router
  .route('/recent/challan')
  .get(
    protect,
    checkPermission('enquiry', 'read'),
    enquiryController.getRecentChallans
  );

module.exports = router;
